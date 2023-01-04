import React from 'react';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Switch from "react-switch";
import { supabase } from '../supabaseClient'

import parse from 'html-react-parser';

import  Navigationbar from '../components/navigationbar';
import Loader from "../components/loader";


import SettingsIcon from "../assets/settings-icon.png"
import SaveIcon from "../assets/save-icon.png"
import RefreshIcon from "../assets/refresh-icon.png"
import DeleteIcon from "../assets/delete-icon.png"

import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../components/editortoolbar";
import 'react-quill/dist/quill.snow.css';

export default function Settings() {

  const [footerID, setFooterID] = useState(1)
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [addressText, setAddressText] = useState('')
  const [addressURL, setAddressURL] = useState('')
  const [buffer1, setBuffer1] = useState('')
  const [buffer2, setBuffer2] = useState('')
  const [buffer3, setBuffer3] = useState('')

  const [loading, setLoading] = useState(false);

  const [footerDatafromDB, setFooterDatafromDB] = useState([]);
  const [templateDatafromDB, setTemplateDatafromDB] = useState([]);

  //let footerCards; //Do not delete, it is being used dynamically.
   
  const [signupCheck, setSignupCheck] = useState(false);
  const [signUpLastUpdated, setSignUpLastUpdated] = useState('');
  const [purgeCheck, setPurgeCheck] = useState(false);


  const [templateID, setTemplateID] = useState('1');
  const [selectedFormat, setSelectedFormat] = useState('1');

  const [titleTemp, setTitleTemp] = useState('');
  const [parameter1, setParameter1] = useState('');
  const [parameter2, setParameter2] = useState('');
  const [parameter3, setParameter3] = useState('');
  const [parameter4, setParameter4] = useState('');
  const [parameter5, setParameter5] = useState('');
  const [parameter6, setParameter6] = useState('');
  const [addressTempURL, setAddressTempURL] = useState('');
  const [footerTempID, setFooterTempID] = useState(1);
  const templateName = ['粉色梅花', '白色底', ' 綠色底', '紅色底', '粉色底', '黃色底', '藍色底'];

  

  useEffect(() => { 
    setLoading(true);
    
    async function fetchFooterData()
    {
      try {
      let { data: footerStyle, error } = await supabase
      .from('footerStyle')
      .select('*')
      .order('footerID', {ascending: true})

      if(error) throw error;

      setFooterDatafromDB(footerStyle);
    
      }
      catch(error) {
        alert(error.error_description || error.message + "\n請確認您的連線狀態, 或是重新整理頁面")
      }
      finally
      {
        setLoading(false)
      }
    }

    async function fetchTemplateData() {
      try {
        let { data: templateData, error } = await supabase
        .from('templateData')
        .select('*')
        .order('templateID', {ascending: true})

        setTemplateDatafromDB(templateData);

        if (error) throw error;
      
        }
        catch(error) {
          alert(error.error_description || error.message + "\n請確認您的連線狀態, 或是重新整理頁面")
        }
        finally
        {
          setLoading(false);
        }
    }

    async function fetchSignUpData()
  {
    try {
      let { data: signUp, error } = await supabase
      .from('signUp')
      .select('*');

      if (error) throw error;

      setSignupCheck(signUp[0].isOpen);
      setSignUpLastUpdated(signUp[0].lastModified);
      
      if(signUpLastUpdated !== '')
      {
        
        let temp = new Date (signUpLastUpdated);
        temp = temp.toString();
        setSignUpLastUpdated(temp);
      }
      
    
      }
      catch(error) {
        alert(error.error_description || error.message + "\n請確認您的連線狀態, 或是重新整理頁面")
      }
      finally
      {
        setLoading(false)
      }
  }

    fetchFooterData();
    fetchSignUpData();
    fetchTemplateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleCRUDFooterStyle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      // All Checks Here
      if((footerID < 1) || (footerID > 7))
        {
            throw new Error("請選擇公司資訊欄"); 
        }

        

      // Sending Data Here
      const { error } = await supabase
      .from('footerStyle')
      .upsert([
        { 
          footerID,
          desc,
          title,
          mobileNumber,
          addressText,
          addressURL,
         },
      ]);
  
      if(error) {
        throw error;
      } else {
        alert("已成功更新");
        window.location.reload();
      }
    }
    catch (error) {
      alert(error.error_description || error.message + "\n 輸入錯誤，請重新輸入")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUpChange = async () => {
    if(signupCheck){
      setSignupCheck(false);
    }
    else {
      setSignupCheck(true);
    }

    try {

      // Sending Data Here
      const { error } = await supabase
      .from('signUp')
      .update({ id: '1', isOpen: !signupCheck })

      if(error) {
        throw error;
      } else {
        alert("Updated Sucessfully!");
      }
    }
    catch (error) {
      alert(error.error_description || error.message + "\n 輸入錯誤，請重新輸入")
    } finally {
      setLoading(false)
    }
  };

  const handlePurgeChange = async () => {
    if(purgeCheck){
      setPurgeCheck(false);
    }
    else {
      setPurgeCheck(true);
    }
  };

  const handlePurgeOlderSites = async (e) => { 
    e.preventDefault();
    setLoading(true);
    let purgeDate = new Date();
    purgeDate.setMonth(purgeDate.getMonth() - 2);

    // console.log(`${purgeDate.getFullYear()}-${purgeDate.getMonth()+1}-${purgeDate.getDate()} 00:00:00.00+00`);

    try {

    const { error } = await supabase
    .from('generatedSites')
    .delete()
    .lt('updatedAt', (`${purgeDate.getFullYear()}-${purgeDate.getMonth()+1}-${purgeDate.getDate()} 00:00:00.00+00`))

    if(error) {
      throw error;
    } else {
      alert("已成功刪除!");
      window.location.reload();
    }
      }
      catch (error) {
        alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
      } finally {
        setLoading(false)
      }

  }




  //Functions for Template Data
  const handleSaveTemplateDatatoDB = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

    if(!titleTemp || !footerTempID || !selectedFormat)
    {
      throw new Error("請完整填寫所有表格 \n* 為必填項目")
    }

    if(footerID <=0 || footerID >7)
    {
      throw new Error("未選訃聞模板")
    }

    if(!addressTempURL) 
    {
      setAddressTempURL('');
    }

    //Checking if a particular parameter is blank (in BG it has '<p><br></p>')
    if(parameter1 === "<p><br></p>") {setParameter1("")}
    if(parameter2 === "<p><br></p>") {setParameter2("")}
    if(parameter3 === "<p><br></p>") {setParameter3("")}
    if(parameter4 === "<p><br></p>") {setParameter4("")}
    if(parameter5 === "<p><br></p>") {setParameter5("")}
    if(parameter6 === "<p><br></p>") {setParameter6("")}

    //Uploading all to DB
    const {error} = await supabase
    .from("templateData")
    .upsert([
      {
        templateID, 
        siteFormat: "template"+selectedFormat,
        title: titleTemp,
        parameter1,
        parameter2,
        parameter3,
        parameter4,
        parameter5,
        parameter6,
        addressURL: addressTempURL,
        footerID: footerTempID
       },
    ]);

    if(error) {throw error}
    else {
      alert("已成功更新");
      window.location.reload();
    }
  }
  catch(error) {
    alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
  }
  finally
  {
    setLoading(false);
  }
  }

  const clearTemplateData = async (e) => {

    e.preventDefault();

      setSelectedFormat(1);
      setTemplateID("1");
      setTitleTemp('');
      setParameter1('');
      setParameter2('');
      setParameter3('');
      setParameter4('');
      setParameter5('');
      setParameter6('');
      setAddressTempURL('');
      setFooterTempID(1);
  }


  return (
    <React.Fragment>
      <Navigationbar />
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1><img src={SettingsIcon} alt="Settings Icon" style={{height:"36px", verticalAlign:'top'}}/>&nbsp;&nbsp;設定</h1></div>
       </div>


      {/*This if for turning SignUps ON / OFF  */}
     <div className='row flex-center flex'>
        <div className="col-8 form-widget" aria-live="polite">
            <div className='card'>
              <h4>開啟建立帳號功能</h4>
              <label className='label-interactiveSwitch'>
              <span>開啟功能，使新用戶可以註冊帳號</span>
              <Switch
                onChange={handleSignUpChange}
                checked={signupCheck}
                className="interactiveSwitch"
                onColor="#635BFF"
                uncheckedIcon={false}
                checkedIcon={false}
                activeBoxShadow = '0 0 2px 3px #635BFF'
              />
            </label>
            <div style={{textAlign: 'right'}}><h6 className='last-updated-date'>{signUpLastUpdated} </h6> </div>
            </div>
        </div>
      </div>




      <hr style={{width: "30em"}}/>




      {/*This if for CRUD operations for QuickFill Template Data on DB Table: savedTemplate  */}
      <div className='row flex-center flex'>
        <div className="col-8 form-widget" aria-live="polite">
            <div className='card'>
              <h4>預設模板設定</h4>
              <details>
              <summary>編輯與建立預設模板內容</summary>
              <div> <br/>
              <label htmlFor="compulsaryToFill"><i><b>* 為必填項目</b></i></label>
              <br/>
                <form>
                          <label htmlFor="templateID">模板預設內容 *</label>
                          <select value={templateID} onChange={(e) => setTemplateID(e.target.value)}>
                              <option value="1">預設模板 1</option>
                              <option value="2">預設模板 2</option>
                              <option value="3">預設模板 3</option>
                              <option value="4">預設模板 4</option>
                              <option value="5">預設模板 5</option>
                              <option value="6">預設模板 6</option>
                              <option value="7">(保留)自定義預設模板</option>
                            </select>


                            <br/> <br/> <br/> 

                            <label htmlFor="templateStyle">模板背景樣式 *</label>
                            <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
                              <option value="1">背景樣式 1 - 粉色梅花</option>
                              <option value="2">背景樣式 2 - 白色底</option>
                              <option value="3">背景樣式 3 - 綠色底</option>
                              <option value="4">背景樣式 4 - 紅色底</option>
                              <option value="5">背景樣式 5 - 粉色底</option>
                              <option value="6">背景樣式 6 - 黃色底</option>
                              <option value="7">背景樣式 7 - 藍色底</option>
                            </select>

               
                          
                          <label htmlFor="title">標題 *</label>
                          <input
                            id="title"
                            className="inputField"
                            type="text"
                            placeholder="主標題"
                            value={titleTemp}
                            disabled = {false}
                            onChange={(e) => setTitleTemp(e.target.value)}
                          />
                          
                          <label htmlFor="parameter1" style={{marginTop: '1em'}}>追思函</label>
                          <div className="richEditor2" >
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar1"/>
                            <ReactQuill theme="snow" value={parameter1} onChange={setParameter1} modules={modules("toolbar1")} formats={formats} className="form-editor"/>
                          </div>

                          <label htmlFor="parameter2" style={{marginTop: '2em'}}>親眷名單</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar2"/>
                            <ReactQuill theme="snow" value={parameter2} onChange={setParameter2} modules={modules("toolbar2")} formats={formats} className="form-editor"/>
                          </div>

                          <label htmlFor="parameter3" style={{marginTop: '2em'}}>生平介紹</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar3"/>
                            <ReactQuill theme="snow" value={parameter3} onChange={setParameter3} modules={modules("toolbar3")} formats={formats} className="form-editor"/>
                          </div>

                          <label htmlFor="parameter4" style={{marginTop: '2em'}}>溫馨提醒</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar4"/>
                            <ReactQuill theme="snow" value={parameter4} onChange={setParameter4} modules={modules("toolbar4")} formats={formats} className="form-editor"/>
                          </div>

                          <label htmlFor="parameter5" style={{marginTop: '2em'}}>追思回憶</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar5"/>
                            <ReactQuill theme="snow" value={parameter5} onChange={setParameter5} modules={modules("toolbar5")} formats={formats} className="form-editor"/>
                          </div>

                          <label htmlFor="parameter6" style={{marginTop: '2em'}}>儀式地點</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar6"/>
                            <ReactQuill theme="snow" value={parameter6} onChange={setParameter6} modules={modules("toolbar6")} formats={formats} className="form-editor"/>
                          </div>
                            
                          <label htmlFor="addressURL">Google Maps 連結</label>
                          <input
                            id="addressURL"
                            className="inputField"
                            type="text"
                            placeholder="https://maps.google.com/sdjh"
                            value={addressTempURL}
                            disabled = {false}
                            onChange={(e) => setAddressTempURL(e.target.value)}
                          />

                            <label style={{marginTop: '1em'}}>
                            選擇公司編號 *
                            <select value={footerTempID} onChange={(e) => setFooterTempID(e.target.value)}>
                              <option value="1">公司編號 1</option>
                              <option value="2">公司編號 2</option>
                              <option value="3">公司編號 3</option>
                              <option value="4">公司編號 4</option>
                              <option value="5">公司編號 5</option>
                              <option value="6">公司編號 6</option>
                              <option value="7">Custom 公司編號 1</option>
                            </select>
                          </label>

                          <section className='row'>
                              <section className='col-10'>
                                  <button className="button primary block" aria-live="polite" onClick={handleSaveTemplateDatatoDB} >
                                  {/* <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top'}}/>&nbsp;&nbsp;儲存設定
                                  </button> */}
                                  <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top', width: "16px"}}/>&nbsp;&nbsp;儲存設定
                                  </button>
                              </section>
                              <section className='col-2'>
                                  <button onClick={clearTemplateData} style={{fontSize: "0.7em"}}> 清除目前內容 </button>
                              </section>
                          </section>       
                          
                </form>
                </div>
              </details>
            </div>
        </div>
      </div>



      {/* This is for viewing the saved QuickFill Template Data */}
      <div className='row flex-center flex'>
    <div className='col-8 form-widget' aria-live="polite">
            <div className='card'>
              <h4>預覽預設模板</h4>
              <button  onClick={() => window.location.reload()} className='button secondary block button-within-summary' aria-live="polite" ><img src={RefreshIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'middle', lineHeight: '36px'}}/>&nbsp;&nbsp;重新整理</button>
              {
                  templateDatafromDB.map((templateData, id) => (
                  <details key={id}>
                  <summary>預設模板 {id+1} ({templateData.title})</summary>
                  <div>
                  <p><b>預設模板:&emsp;</b>{templateData.templateID}</p>
                  <p><b>背景樣式:&emsp;</b>{templateName[(templateData.siteFormat.charAt(templateData.siteFormat.length - 1)) - 1]}&emsp;|&emsp;{templateData.siteFormat}</p>
                  <p><b>標題:&emsp;</b>{templateData.title}</p>
                  <p><b>追思函:&emsp;</b></p>{parse(templateData.parameter1)}
                  <p><b>孝眷名單:&emsp;</b></p>{parse(templateData.parameter2)}
                  <p><b>親眷名單:&emsp;</b></p>{parse(templateData.parameter3)}
                  <p><b>儀式地點:&emsp;</b></p>{parse(templateData.parameter4)}
                  <p><b>生平介紹:&emsp;</b></p>{parse(templateData.parameter6)}
                  <p><b>禮俗提醒:&emsp;</b></p>{parse(templateData.parameter5)}
                  <p><b>Google Maps 連結:&emsp;</b>{templateData.addressURL}</p>
                  <p><b>公司資訊欄:&emsp;</b>{templateData.footerID}</p>
                  <p><b>Updated At:&emsp;</b>{templateData.updatedAt}</p>
                  </div>
                  </details>
                  ))
              }
            </div>
        </div>
    </div>



      <hr style={{width: "30em"}}/>





      {/*This if for CRUD operations on DB Table: footerStyle  */}
      <div className='row flex-center flex'>
        <div className="col-8 form-widget" aria-live="polite">
            <div className='card'>
              <h4>公司資訊欄設定</h4>
              <details>
              <summary>修改公司資訊</summary>
              <div> <br/>
                <form>
                          <label htmlFor="footerID">公司編號</label>
                          <select value={footerID} onChange={(e) => setFooterID(e.target.value)}>
                              <option value="1">公司編號 1</option>
                              <option value="2">公司編號 2</option>
                              <option value="3">公司編號 3</option>
                              <option value="4">公司編號 4</option>
                              <option value="5">公司編號 5</option>
                              <option value="6">公司編號 6</option>
                              <option value="7">Custom 公司編號 1</option>
                            </select>
                          {/* <input
                            id="footerID"
                            className="inputField"
                            type="number"
                            min="1" max="5"
                            placeholder="1"
                            value={footerID}
                            disabled = {false}
                            onChange={(e) => setFooterID(e.target.value)}
                          /> */}
                          <label htmlFor="title">公司名稱</label>
                          <input
                            id="title"
                            className="inputField"
                            type="text"
                            placeholder="Company Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <label htmlFor="desc">公司簡介</label>
                          <input
                            id="desc"
                            className="inputField"
                            type="text"
                            placeholder="Footer Desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                          <label htmlFor="desc">電話</label>
                          <input
                            id="mobileNumber"
                            className="inputField"
                            type="number"
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                          <label htmlFor="address">地址</label>
                          <input
                            id="addressText"
                            className="inputField"
                            type="text"
                            placeholder="Address"
                            value={addressText}
                            onChange={(e) => setAddressText(e.target.value)}
                          />
                          <label htmlFor="addressURL">Google Maps 連結</label>
                          <input
                            id="addressURL"
                            className="inputField"
                            type="text"
                            placeholder="https://maps.google.com/sdjh.."
                            value={addressURL}
                            onChange={(e) => setAddressURL(e.target.value)}
                          />
                          <label htmlFor="buffer1">Buffer 1 (disabled)</label>
                          <input
                            id="buffer1"
                            className="inputField"
                            type="text"
                            placeholder="Footer Desc"
                            value={buffer1}
                            disabled = {true}
                            onChange={(e) => setBuffer1(e.target.value)}
                          />
                          <label htmlFor="buffer2">Buffer 2 (disabled)</label>
                          <input
                            id="buffer3"
                            className="inputField"
                            type="text"
                            placeholder="Footer Desc"
                            value={buffer2}
                            disabled = {true}
                            onChange={(e) => setBuffer2(e.target.value)}
                          />
                          <label htmlFor="buffer3">Buffer 3 (disabled)</label>
                          <input
                            id="buffer3"
                            className="inputField"
                            type="text"
                            placeholder="Footer Desc"
                            value={buffer3}
                            disabled = {true}
                            onChange={(e) => setBuffer3(e.target.value)}
                          />
                          <button className="button primary block" aria-live="polite" onClick={handleCRUDFooterStyle}>
                          <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top', width: "16px"}}/>&nbsp;&nbsp;儲存設定
                          </button>
                </form>
                </div>
              </details>
            </div>
        </div>
      </div>

    {/* For Viewing current Footer Values */}
    <div className='row flex-center flex'>
    <div className='col-8 form-widget' aria-live="polite">
            <div className='card'>
              <h4>公司資訊欄</h4>
              <button  onClick={() => window.location.reload()} className='button secondary block button-within-summary' aria-live="polite" ><img src={RefreshIcon} alt="Settings Icon" style={{height:"20px", verticalAlign:'middle', lineHeight: '36px'}}/>&nbsp;&nbsp;重新整理</button>
              {
                  footerDatafromDB.map((footer, id) => (
                  <details key={id}>
                  <summary>公司編號 {id+1} ({footer.title})</summary>
                  <div>
                  <p><b>公司編號:&emsp;</b>{footer.footerID}</p>
                  <p><b>公司名稱:&emsp;</b>{footer.title}</p>
                  <p><b>公司簡介:&emsp;</b>{footer.desc}</p>
                  <p><b>電話:&emsp;</b>{footer.mobileNumber}</p>
                  <p><b>地址:&emsp;</b>{footer.addressText}</p>
                  <p><b>Google Maps 連結:&emsp;</b>{footer.addressURL}</p>
                  </div>
                  </details>
                  ))
              }
            </div>
        </div>
    </div>

    {/*This if for Delete all website older than 2 months.  */}
    <div className='row flex-center flex'>
        <div className="col-8 form-widget" aria-live="polite">
            <div className='card'>
              <h4>刪除舊電子訃聞</h4> <h6 style={{color:' #DF1B41'}}>刪除已建立2個月以上的電子訃聞</h6>
              <label className='label-interactiveSwitch'>
              <span>你確定嗎？刪除後資料將無法回復</span>
              <Switch
                onChange={handlePurgeChange}
                checked={purgeCheck}
                className="interactiveSwitch"
                onColor="#635BFF"
                uncheckedIcon={false}
                checkedIcon={false}
                activeBoxShadow = '0 0 2px 3px #635BFF'
              />
            </label>
            <div className='purge-older' style={{marginLeft: '2em'}}>
                  <button className="button secondary block" aria-live="polite" onClick={handlePurgeOlderSites} disabled={!purgeCheck}>
                          <img src={DeleteIcon} alt="Delete Icon" style={{height:"16px", verticalAlign:'top'}}/>&nbsp;&nbsp;刪除舊訃聞
                  </button>
            </div>
            </div>
        </div>
      </div>


     
    </React.Fragment>
  );
}
