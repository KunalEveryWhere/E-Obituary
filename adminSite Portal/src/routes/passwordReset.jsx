import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from "../components/loader";
import { supabase } from '../supabaseClient'

export default function PasswordReset() {

  const [email, setEmail] = useState('');


  const [loading, setLoading] = useState(false);

  useEffect(() => { 
  }, []);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleUserEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);

      //Validations

      if(!isValidEmail(email)) {
        throw new Error("電子信箱格式不符\n\nThe email is invalid.");
      }

      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      console.log(email);

      if(error)
      {
        throw error;
      }
  }
  catch (error) {
    alert(error.error_description || error.message)
  } finally {
    setLoading(false);
    alert("更改密碼的驗證信已寄至信箱，麻煩到信箱確認並點擊\n\nPassword reset link has been sent. Kindly check your email address.")
  }
}

  return (
    <React.Fragment>
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1>Forgot Password</h1></div>
       </div>
      <div className='row flex-center flex'>
        <div className="col-6 form-widget" aria-live="polite">
          <div className='card'>
            
            <div>
              <h4>輸入你的電子郵箱地址 (Email Address)</h4>
                        <form onSubmit={handleUserEmail}>
                          <label htmlFor="emailID">電子信箱 (emailID)</label>
                          <input
                            id="email"
                            className="inputField"
                            type="email"
                            placeholder="joey@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <button className="button primary block" aria-live="polite">
                          發送電子郵件以重置
                          </button>
                        </form>
                        <hr />
                        <Link to="/" className='Link'>
                        <button className="button secondary block" aria-live="polite">
                            Goto 登入
                        </button>
                        </Link>
            </div> 
            
            

        </div>
        </div>
      </div>
    </React.Fragment>
  );
}