import './index.css'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./Landing"
import Signup from "./routes/signup";
import Setpassword from "./routes/setpassword";
import Dashboard from './routes/dashboard';
import Account from './Account';
import Createnew from "./routes/Createnew";
import Settings from "./routes/Settings";
import PasswordReset from './routes/passwordReset';
import PageNotFound from './routes/pagenotfound';


export default function App() {

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
       <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/passwordReset' element={<PasswordReset />} />
                

                {/* 404 - Page Not Found */}
                <Route path='/*' element={<PageNotFound />} />
                <Route path='/pagenotfound' element={<PageNotFound />} />

                {/* Protected Routes */}
                <Route path='/account' element={!session ? <Landing /> : <Account key={session.user.id} session={session} />} />
                <Route path='/setpassword' element={!session ? <Landing /> : <Setpassword />} />
                <Route path='/dashboard' element={!session ? <Landing /> : <Dashboard />} />
                <Route path='/createnew' element={!session ? <Landing /> : <Createnew />} />
                <Route path='/settings' element={!session ? <Landing /> : <Settings />} />
              </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}
