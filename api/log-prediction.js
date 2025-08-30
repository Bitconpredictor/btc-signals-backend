import { getSupabase, cors } from './_supabase.js';

const VALID_H = new Set(['10m','30m','1h','24h']);
const VALID_L = new Set(['Increase','Decrease','Flat','No Signal']);

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method Not Allowed' });

  try {
    const supabase = getSupabase();
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const ts       = body.ts ? new Date(body.ts).toISOString() : new Date().toISOString();
    const symbol   = body.symbol || 'BTCUSDT';
    const horizon  = body.horizon;
    const label    = body.label;
    const confidence = Number(body.confidence ?? 0);
    const score      = Number(body.score ?? 0);
    const probs      = body.probs ?? { increase:0, flat:1, decrease:0 };
    const gate       = Boolean(body.gate_passed ?? false);
    const pHash      = body.pattern_hash || 'unknown';
    const features   = body.features ?? { note: 'no features provided' };

    if (!VALID_H.has(horizon)) return res.status(400).json({ ok:false, error:'Invalid horizon' });
    if (!VALID_L.has(label))   return res.status(400).json({ ok:false, error:'Invalid label' });

    const { error } = await supabase.from('predictions').insert({
      ts, symbol, horizon, label,
      confidence, score, probs,
      gate_passed: gate,
      pattern_hash: pHash,
      features
    });

    if (error) throw error;

    res.status(200).json({ ok:true, message:'Prediction logged', key: { ts, symbol, horizon } });
  } catch (e) {
    res.status(500).json({ ok:false, error: String(e.message || e) });
  }
}
