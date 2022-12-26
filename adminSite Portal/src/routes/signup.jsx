import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from "../components/loader";
import { supabase } from '../supabaseClient'

import emailSignupExample from "../assets/email-signup-example.jpg"

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [signupCheck, setSignupCheck] = useState(false);

  useEffect(() => { 
    setLoading(true);

    async function fetchSignUpData()
  {
    try {
      let { data: signUp, error } = await supabase
      .from('signUp')
      .select('*')

      setSignupCheck(signUp[0].isOpen);

    
      }
      catch(error) {
        alert(error.error_description || error.message + "\n請確認您的連線狀態, 或是重新整理頁面")
      }
      finally
      {
        setLoading(false)
      }
  }

    fetchSignUpData();
  }, []);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  //Minimum eight characters, at least one letter, one number and one special character
  function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);

      //Validations
      if(password !== confirmPassword) {
        throw new Error("密碼不正確");
      }

      if(!isValidEmail(email)) {
        throw new Error("電子信箱格式不符");
      }

      if(!isValidPassword(password)) {
        throw new Error("密碼設定格式不符, 需8 個字元以上，包含至少 1 個字母、1 個數字和 1 個特殊字符（@$!%*#?&)");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if(error)
      {
        throw error;
      }
  }
  catch (error) {
    alert(error.error_description || error.message +("\n 輸入錯誤，請重新輸入"))
  } finally {
    setLoading(false);
    alert("註冊成功！請至信箱收取信件，以開通帳號（若找不到信件，請至垃圾郵件區尋找）")
  }
}

  return (
    <React.Fragment>
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1>申請帳號</h1></div>
       </div>
      <div className='row flex-center flex'>
        <div className="col-6 form-widget" aria-live="polite">
          <div className='card'>
            
            {signupCheck ? 
            
            <div>
              <h4>申請帳號</h4>
                        <form onSubmit={handleSignUp}>
                          <label htmlFor="emailID">電子信箱</label>
                          <input
                            id="email"
                            className="inputField"
                            type="email"
                            placeholder="joey@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="password">設定密碼 <i className='last-updated-date' style={{textDecoration: 'none', fontSize: '.8em', lineHeight:'20px', verticalAlign: 'bottom'}}> 8 個字元以上，至少 1 個字母、1 個數字和 1 個特殊字符（@$!%*#?&） </i></label>
                          <input
                            id="password"
                            className="inputField"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="confirmPassword">再次輸入密碼</label>
                          <input
                            id="confirmPassword"
                            className="inputField"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button className="button primary block" aria-live="polite">
                          註冊
                          </button>
                        </form>
                        <div style={{marginTop: "1em", marginBottom: "1em"}}>
                            <img src={emailSignupExample} alt="Email Signup Link Example" style={{width: "100%"}}/>
                        </div>
                        <hr />
                        <Link to="/" className='Link'>
                        <button className="button secondary block" aria-live="polite">
                            登入
                        </button>
                        </Link>                      
            </div> 
            
            
            
            
            : 




            <div>
                <h3 style={{textAlign: "justify"}}>請聯絡網站管理員，以申請新帳號</h3>
                <p>Email ID: KunalEveryWher@gmail.com <br /> LineID: KunalEveryWhere <br /> Phone: +866 0910-598-200</p>
                    <Link to="/" className='Link'>
                      <button className='button primary block' style={{marginTop: "2em"}}>回到登入首頁</button>
                    </Link>
            </div>}
            

        </div>
        </div>
      </div>
    </React.Fragment>
  );
}