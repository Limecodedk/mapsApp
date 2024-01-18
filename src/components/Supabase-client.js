import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://aqhovmkjkvytcnixsmij.supabase.co";
//const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaG92bWtqa3Z5dGNuaXhzbWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzOTQ4NzQsImV4cCI6MjAyMDk3MDg3NH0.pm0uDPQS39IGzr9AjHdx9yjnIsriy9S0PZP09CpraVA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;