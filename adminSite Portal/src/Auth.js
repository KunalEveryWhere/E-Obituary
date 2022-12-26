import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Link } from "react-router-dom";

import Companylogo from "./assets/cp-logo.jpg"
import Loader from "./components/loader";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if(error)
      {
        throw error;
      }

    } catch (error) {
      alert(error.error_description || error.message + "\n 輸入錯誤，請重新輸入")
    } finally {
      setLoading(false)
    }
  }
  
  

  return (
    <React.Fragment> 
      {loading ? <Loader /> : ''}
    <div className='container' style={{ padding: '50px 0 100px 0', marginTop: "2em", marginBottom: "2em" }}>
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <div className='card '>
                <img src={Companylogo} alt={"Company Logo"} style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "40%"}}/>
                <h1 className="header textCenter">福豐玉石有限公司</h1>
                <h3 className='textCenter'>電子訃聞生成平台</h3>
                {/* <p className="description">Sign in via magic link with your email below</p> */}
                {loading ? (
                  'Loading...'
                ) : (
                  <form onSubmit={handleLogin}>
                    <label htmlFor="email">電子信箱(Email)</label>
                    <input
                      id="email"
                      className="inputField"
                      type="email"
                      placeholder="joey@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">設定密碼(Password)</label>
                    <input
                      id="password"
                      className="inputField"
                      type="password"
                      placeholder="*********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button primary block" aria-live="polite">
                    登入
                    </button><hr />
                    <Link to="/signup" className='Link'>
                      <button className='button secondary block' aria-live="polite">申請帳號</button>
                    </Link>
                    <Link to="/passwordReset" className='Link'>
                      <p href="/passwordReset" target='_self' className='last-updated-date' style={{textDecoration: 'underline', marginTop: '1em', fontSize: "0.8em" }}>忘記密碼?</p>
                    </Link>
                  </form>
                )}
          </div>
      </div>
    </div>
    </div>
    </React.Fragment>
  )
}
