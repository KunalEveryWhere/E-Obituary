import React from 'react';
import { useState, useEffect} from 'react'

import  Navigationbar from '../components/navigationbar';
import Loader from "../components/loader";

import SaveIcon from "../assets/save-icon.png"
import URLIcon from "../assets/openURL-icon.png"

import Format1 from "../assets/format-1-demo.png"
import Format2 from "../assets/format-2-demo.png"
import Format3 from "../assets/format-3-demo.png"
import Format4 from "../assets/format-4-demo.png"
import Format5 from "../assets/format-5-demo.png"
import Format6 from "../assets/format-6-demo.png"
import Format7 from "../assets/format-7-demo.png"


import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../components/editortoolbar";
import 'react-quill/dist/quill.snow.css';

import { supabase } from '../supabaseClient'


export default function Createnew() {


  const customerSiteDomain = "https://luxuriant-ashes-cans.netlify.app/";

  const [templateDatafromDB, setTemplateDatafromDB] = useState([]);

  const [loading, setLoading] = useState(false);

  const [format1Value, setFormat1Value] = useState(true);
  const [format2Value, setFormat2Value] = useState(false);
  const [format3Value, setFormat3Value] = useState(false);
  const [format4Value, setFormat4Value] = useState(false);
  const [format5Value, setFormat5Value] = useState(false);
  const [format6Value, setFormat6Value] = useState(false);
  const [format7Value, setFormat7Value] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(1);

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  // This is preppinng the data to sent to DB
  const [title, setTitle] = useState('');
  const [parameter1, setParameter1] = useState('');
  const [parameter2, setParameter2] = useState('');
  const [parameter3, setParameter3] = useState('');
  const [parameter4, setParameter4] = useState('');
  const [parameter5, setParameter5] = useState('');
  const [parameter6, setParameter6] = useState('');
  const [addressURL, setAddressURL] = useState('');
  const [deleteOn, setDeleteOn] = useState('');
  const [dBDeleteOn, setDBDeleteOn] = useState();
  const [footerID, setFooterID] = useState(1);

  const [uuid, setUuid] = useState('');

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


  useEffect(() => {
    setLoading(true);

    async function fetchTemplateData() {
      try {
        let { data: templateData, error } = await supabase
        .from('templateData')
        .select('*')
        .order('templateID', {ascending: true})
  
        setTemplateDatafromDB(templateData);

        if(error) throw error
      
        }
        catch(error) {
          alert(error.error_description || error.message + "\n請確認您的連線狀態, 或是重新整理頁面")
        }
        finally
        {
          setLoading(false)
        }
    }

    fetchTemplateData();
    
  }, [])

  function handleFormat1Change() {
    setFormat1Value(!format1Value);
    setFormat2Value(false); setFormat3Value(false); setFormat4Value(false);
    setFormat5Value(false); setFormat6Value(false); setFormat7Value(false);
    setSelectedFormat(1);
  } 

  function handleFormat2Change() {
    setFormat2Value(!format2Value);
    setFormat1Value(false); setFormat3Value(false); setFormat4Value(false);
    setFormat5Value(false); setFormat6Value(false); setFormat7Value(false);
    setSelectedFormat(2);
  }

  function handleFormat3Change() {
    setFormat3Value(!format3Value);
    setFormat1Value(false); setFormat2Value(false); setFormat4Value(false);
    setFormat5Value(false); setFormat6Value(false); setFormat7Value(false);
    setSelectedFormat(3);
  }

  function handleFormat4Change() {
    setFormat4Value(!format4Value);
    setFormat1Value(false); setFormat2Value(false); setFormat3Value(false);
    setFormat5Value(false); setFormat6Value(false); setFormat7Value(false);
    setSelectedFormat(4);
  }

  function handleFormat5Change() {
    setFormat5Value(!format5Value);
    setFormat1Value(false); setFormat2Value(false); setFormat3Value(false);
    setFormat4Value(false); setFormat6Value(false); setFormat7Value(false);
    setSelectedFormat(5);
  }

  function handleFormat6Change() {
    setFormat6Value(!format6Value);
    setFormat1Value(false); setFormat2Value(false); setFormat3Value(false);
    setFormat4Value(false); setFormat5Value(false); setFormat7Value(false);
    setSelectedFormat(6);
  }

  function handleFormat7Change() {
    setFormat7Value(!format7Value);
    setFormat1Value(false); setFormat2Value(false); setFormat3Value(false);
    setFormat4Value(false); setFormat5Value(false); setFormat6Value(false);
    setSelectedFormat(7);
  }

    function generateRandomString(length) {
    setLoading(true);
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
      setLoading(false);
      return result;
  }

  function handleNewUUID(e){
    e.preventDefault();
    const val = generateRandomString(16);
    setUuid(val);
  }

  //16 character alphanumenic validation using regex
  function isValidUUID(data) {
    return /^[a-zA-Z0-9]{16}$/.test(data);
  }

  const handleImageUpload = async (e) => {
    setLoading(true);
    let file;
    try {

      if (e.target.files) {
        file = e.target.files[0];
        setFile(file);
      }
      setPreview(URL.createObjectURL(e.target.files[0]));
    
      }
      catch(error) {
        alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
      }
      finally
      {
        setLoading(false)
      }
  }

  const handleSubmitToDB = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

    if(file === undefined) {
      throw new Error("請上傳往生者照片（建議照片比例為直立長方形或正方形，且人物在中間）\n * 為必填項目<")
    }


    if(!title || !footerID || !deleteOn || !selectedFormat)
    {
      throw new Error("請完整填寫所有表格  \n * 為必填項目")
    }

    if(!isValidUUID(uuid) || !uuid) {
      throw new Error("錯誤的檔案編號，請點擊「自動生成」")
    }

    if(footerID <=0 || footerID >7)
    {
      throw new Error("未選訃聞模板")
    }

    if(!addressURL) 
    {
      setAddressURL('');
    }

    //Checking if a particular parameter is blank (in BG it has '<p><br></p>')
    if(parameter1 === "<p><br></p>") {setParameter1("")}
    if(parameter2 === "<p><br></p>") {setParameter2("")}
    if(parameter3 === "<p><br></p>") {setParameter3("")}
    if(parameter4 === "<p><br></p>") {setParameter4("")}
    if(parameter5 === "<p><br></p>") {setParameter5("")}
    if(parameter6 === "<p><br></p>") {setParameter6("")}

    


    //Setting File
    let fileExtenstion = '' + file.type.split('/')[1];

    setDBDeleteOn(new Date(deleteOn));
    if(dBDeleteOn === null) {
      setDBDeleteOn(`${(new Date().getFullYear())}-${(new Date().getMonth() + 2)}-${(new Date().getDate())}T00:00`);
    }


    
    //Uploading File
    const { error: error1 } = await supabase.storage
        .from("avatars")
        .upload(`./${uuid}.${fileExtenstion}`, file, {
          upsert: true
        });
    
    //Uploading all to DB
    const { error: error2 } = await supabase
    .from("generatedSites")
    .upsert([
      { 
        uuid,
        siteFormat: "template"+selectedFormat,
        title,
        generatedLink: `/${uuid}`,
        parameter1,
        parameter2,
        parameter3,
        parameter4,
        parameter5,
        parameter6,
        addressURL,
        deleteOn: deleteOn,
        imagePath: `${uuid}.${fileExtenstion}`,
        footerID
       },
    ]);


        if(error1) {throw error1}

        if(error2) {throw error2}

        else {
          try {
            let { data: siteColumnCount, error } = await supabase
            .from('siteColumnCount')
            .select('count');
    
            const { error: errorA } = await supabase
            .from('siteColumnCount')
            .update({ count: (siteColumnCount[0].count+1) })
            .eq('id', 20230104);
    
            if(error || errorA){throw error}
          }
          catch(error) {alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入"); }
          alert(`訃聞建立成功！訃聞連結：\n\n ${customerSiteDomain}${uuid}`);
        }
    }
    catch(error) {
      alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
    }
    finally{
      setLoading(false);
    }
  }

  function handleQuickFill(id, e) {
    e.preventDefault();
    setLoading(true);

    try {
    let dataToFill = templateDatafromDB[id - 1];
    
    let templateStyle = dataToFill.siteFormat.charAt(dataToFill.siteFormat.length-1)
    switch (templateStyle) {
      case '1':
        handleFormat1Change();
        break;
      case '2':
        handleFormat2Change();
        break;
      case '3':
        handleFormat3Change();
        break;
      case '4':
        handleFormat4Change();
        break;
      case '5':
        handleFormat5Change();
        break;
      case '6':
        handleFormat6Change();
        break;
      case '7':
        handleFormat7Change();
        break;
      default:
        handleFormat1Change();
        throw new Error("載入模板失敗，請稍後再嘗試\n Failed to auto-fill template style. Please Try Again Later");
    }

    setTitle(dataToFill.title);
    handleNewUUID(e);
    setParameter1(dataToFill.parameter1);
    setParameter2(dataToFill.parameter2);
    setParameter3(dataToFill.parameter3);
    setParameter4(dataToFill.parameter4);
    setParameter5(dataToFill.parameter5);
    setParameter6(dataToFill.parameter6);
    setFooterID(dataToFill.footerID);
    setAddressURL(dataToFill.addressURL);

  }
  catch(error) {
    alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
  }
  finally
  {
    setLoading(false);
  }

  }

  const clearForm = async (e) => {

    e.preventDefault();

    handleFormat1Change();
    setTitle('');
    setUuid('');
    setParameter1('');
    setParameter2('');
    setParameter3('');
    setParameter4('');
    setParameter5('');
    setParameter6('');
    setFooterID(1);
    setAddressURL('');
  }

  return (
    <React.Fragment>
      <Navigationbar />
      {loading ? <Loader /> : ''}



      <div className='row flex'>
        <div className='col-12'><h1>建立電子訃聞</h1></div>
       </div>

       {/* Quick Fill Buttons */}
       <div className='row flex-center flex'>
        <div className="col-10 form-widget" aria-live="polite">
            <div className='card'>
              <h4>選擇預設模板</h4>
                <center>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(1, e)} >預設模板 1</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(2, e)} >預設模板 2</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(3, e)} >預設模板 3</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(4, e)} >預設模板 4</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(5, e)} >預設模板 5</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(6, e)} >預設模板 6</button>
                  <button style={{marginRight: '1em', width: "10%"}} onClick={(e) => handleQuickFill(7, e)} >預設模板 7</button>
                  <button  className= "primary" aria-live="polite" style={{width: "10%", color: "#FFFFFF", backgroundColor: "#30313D", borderColor: "#30313D", fontSize: "0.7em"}} onClick={clearForm}>清除目前內容</button>
                </center>
        </div>
        </div>
        </div>



       {/* Select Format */}
      <div className='row flex flex-center'>
            <div className='createnew-flex-select-format-container col-10'>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式1 - 粉色梅花</p>
                          <RadioButton label={Format1} value={format1Value} onChange={handleFormat1Change} disabled={false}/>
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式2 - 白色底</p>
                          <RadioButton label={Format2} value={format2Value} onChange={handleFormat2Change} disabled={false}/>
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式3 - 綠色底</p>
                          <RadioButton label={Format3} value={format3Value} onChange={handleFormat3Change} disabled={false} />
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式4 - 紅色底</p>
                          <RadioButton label={Format4} value={format4Value} onChange={handleFormat4Change} disabled={false}/>
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式5 - 粉色底</p>
                          <RadioButton label={Format5} value={format5Value} onChange={handleFormat5Change} disabled={false}/>
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式6 - 黃色底</p>
                          <RadioButton label={Format6} value={format6Value} onChange={handleFormat6Change} disabled={false} />
                  </div>
                  <div className='createnew-flex-select-format-container-item1'>
                          <p style={{fontSize: '0.8em', fontWeight: '500', marginBottom: '-8px'}}>背景樣式7 - 藍色底</p>
                          <RadioButton label={Format7} value={format7Value} onChange={handleFormat7Change} disabled={false} />
                  </div>
            </div>
      </div>


      {/* Upload Image and Major Content */}
      <div className='row flex-center flex'>
        <div className="col-10 form-widget" aria-live="polite">
            <div className='card'>
              <h4>編輯訃聞內容</h4>
              <div> 
              <label htmlFor="compulsaryToFill"><i><b>* 為必填項目</b></i></label>
              <br/>

              {/* DIV for Image Upload */}
              <div style={{marginBottom: '2em'}}>
              <label htmlFor="addFile">請上傳往生者照片 *（建議照片比例為直立長方形或正方形，且人物在中間）[.JPG, .JPEG, .PNG, .WEBP, .BMP, .TIFF, .GIF] &#60; 5MB </label>
              {preview ? <div className='' style={{marginTop: '1em', padding: '1em', border: '1px solid grey', borderRadius: '6px'}}>
                <img src={preview} style={{height: '60px'}} alt="upload preview"/>
                </div> : ''}
                <input
                  type="file"
                  accept="image/*"
                  className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="avatarImageFile"
                  onChange={(e) => handleImageUpload(e)}
                />

              </div>




                {/* DIV for data and rest main content */}
                <div className=''>
                <form>
                <div className='row'>
                <div className='col-11' style={{marginLeft: '0em'}}>
                <label htmlFor="uuid">檔案編號（系統自動生成 - UUID) * <i className='last-updated-date' style={{textDecoration: 'none', fontSize: '.8em', lineHeight:'20px', verticalAlign: 'bottom'}}>如需修改現有訃聞，請輸入該檔案編號</i></label>
                          <input
                            id="uuid"
                            className="inputField"
                            type="text"
                            placeholder="IKIp44xQBnIsRWAC"
                            value={uuid}
                            disabled = {false}
                            onChange={(e) => setUuid(e.target.value)}
                          />
                </div>
                <div className='col-1' style={{marginBottom: '0em'}}>
                  {/*The Button below, when clicked, opens a new tab with uuid in the customoerSide domain adress.  */}
                <button className='renderList-button renderList-url' style={{marginTop: '2.2em'}} disabled={!uuid} onClick={(e) => {e.preventDefault(); window.open(customerSiteDomain+uuid, '_blank');}}><img src={URLIcon} alt="view-icon"/></button>
                </div>
                </div>
                          <button style={{marginTop: '.5em', height: '36px', marginBottom: '1em'}} onClick={(e) => handleNewUUID(e)} >自動生成</button>
                          <label htmlFor="title">標題 *</label>
                          <input
                            id="title"
                            className="inputField"
                            type="text"
                            placeholder="主標題"
                            value={title}
                            disabled = {false}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          
                          <label htmlFor="parameter1" style={{marginTop: '1em'}}>追思函</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar1"/>
                            <ReactQuill theme="snow" value={parameter1} onChange={setParameter1} modules={modules("toolbar1")} formats={formats} />
                          </div>

                          <label htmlFor="parameter2" style={{marginTop: '2em'}}>親眷名單</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar2"/>
                            <ReactQuill theme="snow" value={parameter2} onChange={setParameter2} modules={modules("toolbar2")} formats={formats} />
                          </div>

                          <label htmlFor="parameter3" style={{marginTop: '2em'}}>生平介紹</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar3"/>
                            <ReactQuill theme="snow" value={parameter3} onChange={setParameter3} modules={modules("toolbar3")} formats={formats} />
                          </div>

                          <label htmlFor="parameter4" style={{marginTop: '2em'}}>溫馨提醒</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar4"/>
                            <ReactQuill theme="snow" value={parameter4} onChange={setParameter4} modules={modules("toolbar4")} formats={formats} />
                          </div>

                          <label htmlFor="parameter5" style={{marginTop: '2em'}}>追思回憶</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar5"/>
                            <ReactQuill theme="snow" value={parameter5} onChange={setParameter5} modules={modules("toolbar5")} formats={formats} />
                          </div>

                          <label htmlFor="parameter6" style={{marginTop: '2em'}}>儀式地點</label>
                          <div className="richEditor2">
                            {/* Each Toolbar and ReactQuill must have 'uniqueId' attribute filled with unique for each instance of Quill*/}
                            <EditorToolbar uniqueId="toolbar6"/>
                            <ReactQuill theme="snow" value={parameter6} onChange={setParameter6} modules={modules("toolbar6")} formats={formats} />
                          </div>
                            
                          <label htmlFor="addressURL">Google Maps 連結</label>
                          <input
                            id="addressURL"
                            className="inputField"
                            type="text"
                            placeholder="https://maps.google.com/sdjh"
                            value={addressURL}
                            disabled = {false}
                            onChange={(e) => setAddressURL(e.target.value)}
                          />

                          <label htmlFor="deleteOn" style={{marginTop: '1em'}}>訃聞刪除日期 * (DD/MM/YYYY + HH:MM:SS)</label>
                          <input
                            id="deleteOn"
                            className="inputField"
                            type="datetime-local"
                            placeholder="Nov 12, 2022 at 12:00"
                            value={deleteOn}
                            disabled = {false}
                            onChange={(e) => setDeleteOn(e.target.value)}
                          />

                            <label style={{marginTop: '1em'}}>
                            選擇公司編號 *
                            <select value={footerID} onChange={(e) => setFooterID(e.target.value)}>
                              <option value="1">公司編號 1</option>
                              <option value="2">公司編號 2</option>
                              <option value="3">公司編號 3</option>
                              <option value="4">公司編號 4</option>
                              <option value="5">公司編號 5</option>
                              <option value="6">公司編號 6</option>
                              <option value="7">Custom 公司編號 1</option>
                            </select>
                          </label>

                          <button className="button primary block" aria-live="polite" onClick={handleSubmitToDB} >
                          <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top'}}/>&nbsp;&nbsp;儲存設定
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

const RadioButton = ({ label, value, onChange, disabled }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} disabled={disabled} />
      <img src={label} alt='format-screenshot' />
    </label>
  );
};
