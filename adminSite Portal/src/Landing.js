import './index.css'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import Dashboard from "./routes/dashboard"

export default function Landing() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <React.Fragment>
      {!session ? <Auth /> :  <Dashboard />}
    </React.Fragment>
  )
}
