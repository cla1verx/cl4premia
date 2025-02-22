import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please click "Connect to Supabase" button to set up your project.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Sign in admin
export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return { data, error: null };
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get session
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { data: { session }, error };
};

interface Participant {
  name: string;
  email: string;
  phone: string;
}

// Participant management with Supabase
export const getParticipants = async () => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching participants:', error);
    return { data: [], error };
  }
};

export const addParticipant = async (participant: Participant) => {
  try {
    // Validate participant data
    if (!participant.name || !participant.email || !participant.phone) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(participant.email)) {
      throw new Error('Email inválido');
    }

    // Validate phone format (accepts formats like (00) 00000-0000 or 00000000000)
    const phoneRegex = /^[\d()-\s]{10,}$/;
    if (!phoneRegex.test(participant.phone)) {
      throw new Error('Telefone inválido');
    }

    // Check if email already exists
    const { data: existingParticipant, error: checkError } = await supabase
      .from('participants')
      .select('id')
      .eq('email', participant.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingParticipant) {
      throw new Error('Este email já está cadastrado');
    }

    // Insert new participant
    const { data, error: insertError } = await supabase
      .from('participants')
      .insert([{
        name: participant.name.trim(),
        email: participant.email.toLowerCase().trim(),
        phone: participant.phone.replace(/\D/g, '') // Remove non-digits
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

export const deleteParticipant = async (id: string) => {
  try {
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting participant:', error);
    return { error };
  }
};