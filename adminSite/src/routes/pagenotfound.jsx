import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

import  Navigationbar from '../components/navigationbar';

import PageNotFoundError from "../assets/404-icon.png"
import { supabase } from '../supabaseClient'

export default function Pagenotfound() {
    const [session, setSession] = useState(null);
    const [userAuth, setUserAuth] = useState(false);

    useEffect(()=> {
        async function getSessionStatus (){
          try {
            const { data, error } = await supabase.auth.getSession();
            if(error) {throw error}
            setSession(data.session);
            if(session !== null){
                setUserAuth(true);
            }
            else {
                setUserAuth(false);
            }
          }
          catch (error) {alert (error)}
        }
      
        getSessionStatus();
    })

  return (
    <React.Fragment>
      {(userAuth) ? <Navigationbar /> : ''}
      <div className='row flex-center flex'>
        <div className="col-6 form-widget" aria-live="polite">
            <div className='card'>
                <div className='textCenter'>
                        <img src={PageNotFoundError} alt="Settings Icon" style={{height:"40vh"}}/>
                        <h1>抱歉，這個網頁並不存在</h1>
                        <Link to="/" className='Link'>
                        <button className='button primary block' style={{marginTop: "2em"}}>返回首頁</button>
                        </Link>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
