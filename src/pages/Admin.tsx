import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogOut, Trash2 } from 'lucide-react';
import { signOut, getSession, getParticipants, deleteParticipant } from '../lib/supabase';

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function Admin() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data, error } = await getSession();
      if (error) throw error;

      if (!data.session) {
        navigate('/login');
        return;
      }
      
      setIsAuthenticated(true);
      loadParticipants();
    } catch (error) {
      console.error('Error checking auth:', error);
      navigate('/login');
    }
  };

  const loadParticipants = async () => {
    try {
      const { data, error } = await getParticipants();
      if (error) throw error;
      setParticipants(data);
    } catch (error) {
      toast.error('Erro ao carregar participantes');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao sair');
    }
  };

  const handleDeleteParticipant = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este participante?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await deleteParticipant(id);
      if (error) throw error;
      
      setParticipants(participants.filter(p => p.id !== id));
      toast.success('Participante excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir participante');
    } finally {
      setIsLoading(false);
    }
  };

  const drawWinner = () => {
    if (participants.length === 0) {
      toast.error('Não há participantes para realizar o sorteio');
      return;
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex]);
    toast.success('Sorteio realizado com sucesso!');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Painel Administrativo
          </h2>
          <div className="flex gap-4">
            <button
              onClick={drawWinner}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={participants.length === 0 || isLoading}
            >
              Realizar Sorteio
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        {winner && (
          <div className="mb-8 p-4 bg-gray-700 border border-gray-600 rounded-md">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Ganhador do Sorteio
            </h3>
            <p className="text-gray-300">
              <strong>Nome:</strong> {winner.name}
              <br />
              <strong>Email:</strong> {winner.email}
              <br />
              <strong>Telefone:</strong> {winner.phone}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Lista de Participantes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {participants.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{participant.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{participant.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{participant.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteParticipant(participant.id)}
                        className="text-red-400 hover:text-red-300 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}