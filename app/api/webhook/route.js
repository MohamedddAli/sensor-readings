import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const SINGLE_ALERT_ID = '00000000-0000-0000-0000-000000000001';

export async function POST(req) {
  const body = await req.json();

  const { message } = body;

  const timestamp = new Date().toISOString();

  const { error } = await supabase.from('alerts').upsert([
    {
      id: SINGLE_ALERT_ID,
      message,
      created_at: timestamp,
    }
  ], {
    onConflict: 'id',
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  await supabase.from('alerts').delete().neq('id', SINGLE_ALERT_ID);

  return new Response(JSON.stringify({ status: 'received' }), {
    status: 200,
  });
}