import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clw-gabinet.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxbGRmbnVrZHBsaGhxaXFpbGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTAxNTksImV4cCI6MjA5MzUyNjE1OX0.50uPv9cYLWJ0LVpM6Q_QYXDnVCeXBk3bIdYxkzwknVI'

export const supabase = createClient(supabaseUrl, supabaseKey)