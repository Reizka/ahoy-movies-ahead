'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    console.log("Login function called") // Debug log
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        console.error('Login error:', error) // Debug log
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    console.log("Signup function called") // Debug log
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signUp(data)
    if (error) {
        console.error('Signup error:', error) // Debug log
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}