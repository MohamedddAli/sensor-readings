import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const SINGLE_ALERT_ID = '00000000-0000-0000-0000-000000000001';

export async function GET() {
  const { data } = await supabase
    .from('alerts')
    .select('*')
    .eq('id', SINGLE_ALERT_ID)
    .limit(1);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}