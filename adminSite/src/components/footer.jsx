import React from 'react';
import Companylogo from "../assets/cp-logo.jpg"

import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone} from "react-icons/ai";

export default function footer() {
  return (
    <React.Fragment>
      <div className='footer'>
        <div className='row flex' style={{marginBottom: "0px"}}>
            <div className='col-8 footerSpacing' aria-live="polite">
              <div >
              <img src={Companylogo} alt={"Company Logo"}/>
              </div>
                <div>
                      <a href="https://goo.gl/maps/nS3cQdqcKUXJ1snP6" target='_blank' rel='noreferrer' style={{textDecoration: 'none'}}>
                      <h2 style={{marginTop: "0px", textAlign: "center"}}>福豐玉石有限公司<br />
                      <p style={{fontSize: "12px", fontWeight: "600", textAlign: "left"}}>台中總公司</p>
                     <p style={{fontSize: "12px", fontWeight: "400", textAlign: "left"}}>
                     台中市北屯區軍功路一段61巷156號
                     </p> 
                      </h2>
                      </a>
                </div>
            </div>
            <div className='col-4' aria-live="polite" >
              <div className='lowerFooterSpacing'>
                    <h2 style={{marginTop: "0px"}}>聯絡資訊
                    <p style={{fontSize: "12px", fontWeight: "500", textAlign: "left"}}>
                    電話: 04-2436-7005 <br/>
                    04-2436-7006 <br/>
                    傳真: 04-2436-6971 <br/>
                    連絡人：康永來 (0937-210-208) <br/>
                    </p>
                    </h2>
              </div>
              <div className='lowerFooterSpacing'>
                <ul className='footerUL'>
                  <a href={"https://www.luxuriant.com.tw/"} target={"_blank"} className='footerIcon'  rel="noopener noreferrer"><AiOutlineGlobal /></a>
                  <a href={"mailto:roseblue320@yahoo.com.tw"} target={"_blank"} className='footerIcon' rel="noopener noreferrer"><AiOutlineMail  /></a>
                  <a href={"tel:04-2436-7005"} target={"_blank"} className='footerIcon' rel="noopener noreferrer"><AiOutlinePhone /></a>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}