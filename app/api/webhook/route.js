import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function POST(req) {
  const body = await req.json();

  const { message } = body;

  await supabase.from('alerts').insert([
    { message }
  ]);

  return new Response(JSON.stringify({ status: 'received' }), {
    status: 200,
  });
}