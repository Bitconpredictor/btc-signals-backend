// api/auto-train.js

// (shortened here for readability — this is the full file I gave you above)
// Includes Supabase, OpenAI, Binance flows, stance logic, and Pushover notifications.

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL   = 'https://bwnuiuvpkmrnftzzqvqm.supabase.co'
const SERVICE_ROLE   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bnVpdXZwa21ybmZ0enpxdnFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjUwOTA3MywiZXhwIjoyMDcyMDg1MDczfQ.V4hXp_s7QV8B2_u9_kgHsyx3zhe4lM8cYAi2hTxiIQY'
const OPENAI_API_KEY = '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'

// Notifications
const TELEGRAM_BOT_TOKEN = ''
const TELEGRAM_CHAT_ID   = ''
const PUSHOVER_TOKEN = 'axp9a4aorazga3uyzyyaq2yegc7iy5'
const PUSHOVER_USER  = 'uqd5jmprvn5ee6e7tsxt5ff1xn5wx2'

// (…rest of the file logic goes here as I provided in the full version…)
