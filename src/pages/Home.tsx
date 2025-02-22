import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bem-vindo
        </h1>
        <p className="text-lg text-gray-300">
          Participe do nosso sorteio.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Participe</h2>
          <p className="text-gray-300">
            Faça seu cadastro gratuitamente para participar do sorteio.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="flex justify-center mb-4">
            <Gift className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Prêmios</h2>
          <p className="text-gray-300">
            Diversos prêmios especiais para os ganhadores.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Sorteio</h2>
          <p className="text-gray-300">
            Sorteio transparente e justo para todos os participantes.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Participar Agora
        </Link>
      </div>
    </div>
  );
}