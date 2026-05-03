import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function GET() {
  const { data } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false });

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}