import { getSupabase, cors } from './_supabase.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('pattern_stats')
      .select('pattern_hash, count, correct, precision, last_seen')
      .neq('count', 0)
      .order('precision', { ascending: false })
      .order('count', { ascending: false })
      .limit(10);

    if (error) throw error;

    const rows = (data || []).map(r => ({
      ...r,
      quality_rating:
        r.count >= 50 && r.precision >= 0.8 ? 'Excellent' :
        r.count >= 20 && r.precision >= 0.7 ? 'Good' :
        r.count >= 10 && r.precision >= 0.6 ? 'Fair' : 'Insufficient Data'
    }));

    res.status(200).json({ ok: true, patterns: rows });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
