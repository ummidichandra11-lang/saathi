const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment from .env.local if present
try {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (e) {
  // No .env.local, use process.env
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set.');
  console.log('Skipping remote database sync. The application uses the verified embedded schemes data automatically.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection at:', supabaseUrl);
  const { data, error } = await supabase.from('schemes').select('id, name').limit(1);
  if (error) {
    console.log('Supabase connection note:', error.message);
    console.log('If the "schemes" table does not exist yet, run supabase/schema.sql in the Supabase SQL Editor.');
  } else {
    console.log(`Connection successful. Found ${data.length} existing scheme(s).`);
  }
}

testConnection();
