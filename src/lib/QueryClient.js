/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js"

const projectUrl = import.meta.env.VITE_SUPABASE_URL
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY


if (!projectUrl || !apiKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(projectUrl, apiKey)