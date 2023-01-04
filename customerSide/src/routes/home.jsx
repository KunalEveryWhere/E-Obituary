import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import CompanyLogo from "../assets/cp-logo.jpg"
import Loader from "../components/loader";


export default function Home ({value}) {

  const [uuid, setUuid] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //16 character alphanumenic validation using regex
  function isValidUUID(data) {
    return /^[a-zA-Z0-9]{16}$/.test(data);
  }

  const handleUUID = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{

      if(!isValidUUID(uuid) || !uuid) {
        throw new Error("錯誤的檔案編號，請重新輸入 \nInvalid UUID. Please enter correctly.")
      }

      else {
      navigate("/"+uuid);
      }
    }
    catch(error)
    {
      alert(error.error_description || error.message+"\n addhere")
    }
    finally{
      setLoading(false);
    }

  }

  /* Setting Browser Tabs Title here */
  document.title = "福豐玉石有限公司 | HOME";




  return (
    <React.Fragment>

      {loading ? <Loader /> : ''}

      <section className='bg-image2'>
        </section>  
      <div className='row flex-center flex'>
        <div className="col-6" aria-live="polite">
            <div className=''>
                <div className='textCenter'>
                <div className='full-screen-center' >
                  <img src={CompanyLogo} alt="company-logo" className='home-page-image'/>
                  <h2 style={{color: 'white', fontSize: '2em'}}>福豐玉石有限公司</h2>
                  <h5 style={{color: 'white', fontSize: '0.8em', fontWeight: '400'}}>抱歉，此網頁已過期 <br/> The page you're looking for has expired / incorrect UUID.</h5>

                  <form  onSubmit={handleUUID}>
                    <label htmlFor="uuid" style={{color: 'white', fontSize: '0.8em', fontWeight: '400', textAlign: 'left'}}>輸入檔案編號 (UUID)</label>
                    <input
                            id="uuid"
                            className="inputField"
                            type="text"
                            placeholder="aSxH3AlzyqADmG7h"
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                          />
                          <button className="button primary block" aria-live="polite">
                          前往電子訃聞
                          </button>
                  </form>
                </div>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
