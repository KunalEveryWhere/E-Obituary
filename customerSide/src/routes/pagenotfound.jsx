import React from 'react';

import PageNotFoundError from "../assets/404-icon.png"

export default function Pagenotfound() {
  return (
    <React.Fragment>
      <div className='row flex-center flex'>
        <div className="col-6 form-widget" aria-live="polite">
            <div className='card'>
                <div className='textCenter'>
                        <img src={PageNotFoundError} alt="Settings Icon" style={{height:"40vh"}}/>
                        <h1>抱歉，這個網頁並不存在<br/>Sorry, Page not Found.</h1>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
