'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase/client'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const supabase = createClient()

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.error(error.message)
  }

  const handleSignup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) console.error(error.message)
  }

  return (
    <div className='flex flex-col justify-center align-center'>
    <>

      {isSignUp ? (
        <SignupForm onSignup={handleSignup} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </>
    </div>
  )
}
