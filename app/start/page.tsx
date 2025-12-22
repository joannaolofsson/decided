"use client"
import React, { useEffect, useState } from "react";
import Auth from "@/app/start/Authentication";
import Dashboard from "../dashboard/page";
import { createClient } from "../../lib/supabase/client";
import Button from "../components/ui/Button";

export default function AppHome() {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null)

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    console.log("Current session: ", currentSession)
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    fetchSession()

    const { data: authListener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
      setSession(session)
    }
  );

  return () => {
      authListener?.subscription.unsubscribe()
    };
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (

    <div className="flex flex-col justify-center align-center p-8 gap-8">
      
      {session ? (
        <>
        <Dashboard />
        </>
      ) : <Auth />}
    </div>
  )
}