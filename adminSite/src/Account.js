import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom';

import  Navigationbar from './components/navigationbar';
import SaveIcon from "./assets/save-icon.png"

import Loader from "./components/loader";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const { user } = session
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert(error.message+"\n輸入錯誤, 請重新輸入")
      } finally {
        setLoading(false)
      }
    }
    
    getProfile()
  }, [session])

  // const getProfile = async () => {
  //   try {
  //     setLoading(true)
  //     const { user } = session

  //     let { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`username, website, avatar_url`)
  //       .eq('id', user.id)
  //       .single()

  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setUsername(data.username)
  //       setWebsite(data.website)
  //       setAvatarUrl(data.avatar_url)
  //     }
  //   } catch (error) {
  //     alert(error.message+"\n輸入錯誤, 請重新輸入")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
      else {
        alert("帳號已更新成功!")
      }
    } catch (error) {
      alert(error.error_description || error.message + "\n 輸入錯誤，請重新輸入")
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Navigationbar />
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1>帳號設定</h1></div>
       </div>
      <div className='container' style={{ padding: '50px 50px 100px 50px' }}>
    <div aria-live="polite">
      {loading ? (
        '儲存中...'
      ) : (
        
        <form onSubmit={updateProfile} className="form-widget">
          <div>Email: {session.user.email}</div>
          <div>
            <label htmlFor="username">姓名</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">網站</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
          <button className="button primary block" aria-live="polite">
              <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top'}}/>&nbsp;&nbsp;儲存設定
           </button>
          </div>
        </form>
      )} <br/>
      <Link to="/setpassword" className='Link'>
        <button className='button secondary block' aria-live="polite">更新密碼</button>
      </Link>
    </div>
    </div>
    </React.Fragment>
  )
}

export default Account
