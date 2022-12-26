import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Loader from "../components/loader";
import { supabase } from '../supabaseClient'

import  Navigationbar from '../components/navigationbar';

export default function Setpassword() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  //Minimum eight characters, at least one letter, one number and one special character
  function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);

      //Validations
      if(password !== confirmPassword) {
        throw new Error("兩個密碼不一致");
      }

      if(!isValidPassword(password)) {
        throw new Error("密碼設定格式不符, 需8 個字元以上，包含至少 1 個字母、1 個數字和 1 個特殊字符（@$!%*#?&)");
      }

      const { data, error } = await supabase.auth.updateUser({ password })

      if(error)
      {
        throw error;
      }
      else {
        alert("已成功更新密碼!");
      }
  }
  catch (error) {
    alert(error.error_description || error.message +("\n 輸入錯誤，請重新輸入"))
  } finally {
    setLoading(false);
  }
}

  return (
    <React.Fragment>
      <Navigationbar />
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1>設定新密碼</h1></div>
       </div>
      <div className='row flex-center flex'>
        <div className="col-6 form-widget" aria-live="polite">
          <div className='card'>
            
            <div>
              <h4>請輸入新密碼.</h4>
                        <form onSubmit={handleUpdatePassword}>
                        <label htmlFor="password">設定密碼 (Password) <i className='last-updated-date' style={{textDecoration: 'none', fontSize: '.8em', lineHeight:'20px', verticalAlign: 'bottom'}}> 8 個字元以上，至少 1 個字母、1 個數字和 1 個特殊字符（@$!%*#?&）</i></label>
                          <input
                            id="password"
                            className="inputField"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="confirmPassword">再次輸入密碼 (Confirm Password)</label>
                          <input
                            id="confirmPassword"
                            className="inputField"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button className="button primary block" aria-live="polite">
                          更新密碼
                          </button>
                        </form>
            </div> 

            <Link to="/" className='Link'>
                        <button className="button secondary block" aria-live="polite">
                        返回後台管理
                        </button>
            </Link>

        </div>
        </div>
      </div>
    </React.Fragment>
  );
}
