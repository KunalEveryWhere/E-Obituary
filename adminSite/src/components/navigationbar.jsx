import React from 'react';
import { NavLink } from 'react-router-dom';
import  {supabase}  from '../supabaseClient'

import DashboardIcon from "../assets/dashboard-icon.png"
import AccountIcon from "../assets/account-icon.png"
import SettingsIcon from "../assets/settings-icon.png"
import LogoutIcon from "../assets/logout-icon.png"


export default function navigationbar() {


  return (
    <React.Fragment>
            <div className="nav">
                    <input type="checkbox" id="nav-check" />
                    <div className="nav-header">
                        <div className="nav-title">
                        福豐玉石有限公司
                        </div>
                    </div>
                    <div className="nav-btn">
                        <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                        </label>
                    </div>
                    
                    <div className="nav-links" >
                        <NavLink to="/dashboard"><img src={DashboardIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'top'}}/>&nbsp;&nbsp;後台管理</NavLink>
                        <NavLink to="/account" ><img src={AccountIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'top'}}/>&nbsp;&nbsp;帳號</NavLink>
                        <NavLink to="/settings" ><img src={SettingsIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'top'}}/>&nbsp;&nbsp;設定</NavLink>
                        <NavLink to="/" onClick={() => supabase.auth.signOut()}><img src={LogoutIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'top'}}/>&nbsp;&nbsp;登出</NavLink>
                    </div>
             </div>
    </React.Fragment>
  );
}