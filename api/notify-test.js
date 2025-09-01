// api/notify-test.js
// Send yourself a quick notification to verify Pushover is configured.

const TELEGRAM_BOT_TOKEN = ''
const TELEGRAM_CHAT_ID   = ''

const PUSHOVER_TOKEN = 'axp9a4aorazga3uyzyyaq2yegc7iy5'
const PUSHOVER_USER  = 'uqd5jmprvn5ee6e7tsxt5ff1xn5wx2'

async function po(text){
  if(!PUSHOVER_TOKEN || !PUSHOVER_USER) return { ok:false, skipped:true }
  const r = await fetch('https://api.pushover.net/1/messages.json',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({ token:PUSHOVER_TOKEN, user:PUSHOVER_USER, message:text, title:'BTC TEST' })
  })
  return { ok:r.ok }
}

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  if(req.method==='OPTIONS') return res.status(204).end()

  const text = (req.method==='POST' ? (await req.text()||'') : '') || 'Test notification from btc-signals-backend'
  const out  = await po(text)
  res.status(200).json({ ok:true, sent: out })
}
