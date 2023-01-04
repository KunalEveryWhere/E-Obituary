import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect} from 'react'

import  Navigationbar from '../components/navigationbar';
import Loader from "../components/loader";

import SaveIcon from "../assets/save-icon.png"
import EditIcon from "../assets/edit-icon-2.png"


import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../components/editortoolbar";
import 'react-quill/dist/quill.snow.css';

import { supabase } from '../supabaseClient'


export default function Editwebsite() {

  const customerSiteDomain = "https://luxuriant-ashes-cans.netlify.app/";

  const [loading, setLoading] = useState(false);

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
  //const [siteFormat, setSiteFormat] = useState('template1');
  //const [generatedLink, setGeneratedLink] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [fileExtenstion, setFileExtension] = useState('');

  //const templateName = ['粉色梅花', '白色底', ' 綠色底', '紅色底', '粉色底', '黃色底', '藍色底'];

  const [searchParams] = useSearchParams();



  useEffect(() => {
    async function UUIDRetreived(uuid){
      setLoading(true);
      try{
        let { data: generatedSite, error } = await supabase
        .from('generatedSites')
        .select()
        .eq('uuid', uuid);
  
        if (generatedSite.length === 0) {
          throw new Error ("Invalid UUID \n 輸入錯誤的UUID");
        }
        
  
        else if(error)
        throw error
  
        else if(generatedSite){
          //Checking if a particular parameter is blank (in BG it has '<p><br></p>')
          if(generatedSite[0].parameter1 === "<p><br></p>") {generatedSite[0].parameter1 = ""}
          if(generatedSite[0].parameter2 === "<p><br></p>") {generatedSite[0].parameter2 = ""}
          if(generatedSite[0].parameter3 === "<p><br></p>") {generatedSite[0].parameter3 = ""}
          if(generatedSite[0].parameter4 === "<p><br></p>") {generatedSite[0].parameter4 = ""}
          if(generatedSite[0].parameter5 === "<p><br></p>") {generatedSite[0].parameter5 = ""}
          if(generatedSite[0].parameter6 === "<p><br></p>") {generatedSite[0].parameter6 = ""}
  
          if(generatedSite[0].addressURL){
            if (!(generatedSite[0].addressURL.startsWith("http")) && !(generatedSite[0].addressURL.startsWith("HTTP"))) {
                generatedSite[0].addressURL = "http://" + generatedSite[0].addressURL;
              }
              else if (!(generatedSite[0].addressURL.startsWith("HTTP")) && !(generatedSite[0].addressURL.startsWith("http"))) {
                generatedSite[0].addressURL = "http://" + generatedSite[0].addressURL;
              }
          }
  
          //Setting all values into form:
          setPreview("https://luvbkgreocipllqdrhjn.supabase.co/storage/v1/object/public/avatars/"+generatedSite[0].imagePath);
          setSelectedFormat(generatedSite[0].siteFormat.charAt(generatedSite[0].siteFormat.length - 1));
          setTitle(generatedSite[0].title);
          setParameter1(generatedSite[0].parameter1);
          setParameter2(generatedSite[0].parameter2);
          setParameter3(generatedSite[0].parameter3);
          setParameter4(generatedSite[0].parameter4);
          setParameter5(generatedSite[0].parameter5);
          setParameter6(generatedSite[0].parameter6);
          setAddressURL(generatedSite[0].addressURL);
          setImagePath(generatedSite[0].imagePath);
          setDeleteOn(generatedSite[0].deleteOn.substring(0, generatedSite[0].deleteOn.length - 9));
          setFooterID(generatedSite[0].footerID);
        }
      }
      catch(error)
      { 
        alert(error.description || error.message + "\n輸入錯誤的UUID Incorrect UUID. \n 請確認您的連線狀態, 或是重新整理頁面\nFailed to load data from DB. \nPlease Check you Internet Connection / Reload the Page.")
      }
      finally{
        setLoading(false);
      }
    }

    if(searchParams.get("uuid")) {
      setUuid(searchParams.get("uuid"));
      UUIDRetreived(searchParams.get("uuid"));
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const handleImageUpload = async (e) => {
    setLoading(true);
    let file;
    try {

      if (e.target.files) {
        file = e.target.files[0];
        setFile(file);
      }
      //Setting Preview
      setPreview(URL.createObjectURL(e.target.files[0]));

      //Setting File Extension
      setFileExtension('' + file.type.split('/')[1]);
    
      }
      catch(error) {
        alert(error.error_description || error.message+"\n 輸入錯誤，請重新輸入")
      }
      finally
      {
        setLoading(false)
      }
  }

  const handleUUIDSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      let { data: generatedSite, error } = await supabase
      .from('generatedSites')
      .select()
      .eq('uuid', uuid);

      if (generatedSite.length === 0) {
        throw new Error ("輸入錯誤的UUID");
      }
      

      else if(error)
      throw error

      else if(generatedSite){
        //Checking if a particular parameter is blank (in BG it has '<p><br></p>')
        if(generatedSite[0].parameter1 === "<p><br></p>") {generatedSite[0].parameter1 = ""}
        if(generatedSite[0].parameter2 === "<p><br></p>") {generatedSite[0].parameter2 = ""}
        if(generatedSite[0].parameter3 === "<p><br></p>") {generatedSite[0].parameter3 = ""}
        if(generatedSite[0].parameter4 === "<p><br></p>") {generatedSite[0].parameter4 = ""}
        if(generatedSite[0].parameter5 === "<p><br></p>") {generatedSite[0].parameter5 = ""}
        if(generatedSite[0].parameter6 === "<p><br></p>") {generatedSite[0].parameter6 = ""}

        if(generatedSite[0].addressURL){
          if (!(generatedSite[0].addressURL.startsWith("http")) && !(generatedSite[0].addressURL.startsWith("HTTP"))) {
              generatedSite[0].addressURL = "http://" + generatedSite[0].addressURL;
            }
            else if (!(generatedSite[0].addressURL.startsWith("HTTP")) && !(generatedSite[0].addressURL.startsWith("http"))) {
              generatedSite[0].addressURL = "http://" + generatedSite[0].addressURL;
            }
        }

        //Setting all values into form:
        setPreview("https://luvbkgreocipllqdrhjn.supabase.co/storage/v1/object/public/avatars/"+generatedSite[0].imagePath);
        setSelectedFormat(generatedSite[0].siteFormat.charAt(generatedSite[0].siteFormat.length - 1));
        setTitle(generatedSite[0].title);
        setParameter1(generatedSite[0].parameter1);
        setParameter2(generatedSite[0].parameter2);
        setParameter3(generatedSite[0].parameter3);
        setParameter4(generatedSite[0].parameter4);
        setParameter5(generatedSite[0].parameter5);
        setParameter6(generatedSite[0].parameter6);
        setAddressURL(generatedSite[0].addressURL);
        setImagePath(generatedSite[0].imagePath);
        setDeleteOn(generatedSite[0].deleteOn.substring(0, generatedSite[0].deleteOn.length - 9));
        setFooterID(generatedSite[0].footerID);
      }
    }
    catch(error)
    { 
      alert(error.description || error.message + "\n輸入錯誤的UUID \n 請確認您的連線狀態, 或是重新整理頁面\nFailed to load data from DB. \nPlease Check you Internet Connection / Reload the Page.")
    }
    finally{
      setLoading(false);
    }
  }

  const handleSubmitToDB = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

    if(file === undefined) {
      if(preview === undefined) 
        throw new Error("請上傳往生者照片（建議照片比例為直立長方形或正方形，且人物在中間）\n * 為必填項目<")
    }


    if(!title || !footerID || !deleteOn || !selectedFormat)
    {
      throw new Error("請完整填寫所有表格  \n * 為必填項目<")
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


    setDBDeleteOn(new Date(deleteOn));
    if(dBDeleteOn === null) {
      setDBDeleteOn(`${(new Date().getFullYear())}-${(new Date().getMonth() + 2)}-${(new Date().getDate())}T00:00`);
    }

    


    let fileChange = false;
    //Uploading File
    if(file !== undefined) {

    //Deleting the image associated with the ImagePath of current(yet to be uploaded) website from Storage Bucket
    const { error: errorA } = await supabase
          .storage
          .from('avatars')
          .remove(imagePath);
    
    //Uploading new image 
    const { error: errorB } = await supabase.storage
        .from("avatars")
        .upload(`./${uuid}.${fileExtenstion}`, file, {
          upsert: true
        });
        setImagePath(uuid+"."+fileExtenstion);
        fileChange = true;

        if(errorA || errorB) {throw new Error("Issue in Image Upload Section")}
    }
    
    //Uploading all to DB
    const {error} = await supabase
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
        imagePath: fileChange ? (uuid+"."+fileExtenstion) : imagePath, //Updating new image path.
        footerID
       },
    ]);
    fileChange = false;

        if(error) {throw error}

        else {
          alert(`訃聞建立成功！訃聞連結：\n\n ${customerSiteDomain}${uuid}`);
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








  return (
    <React.Fragment>
      <Navigationbar />
      {loading ? <Loader /> : ''}
      <div className='row flex'>
        <div className='col-12'><h1>編輯訃聞</h1></div>
       </div>

       {/* Select Format */}
      <div className='row flex flex-center'>
          <div className="col-10 form-widget" aria-live="polite">
              <div className='card'>
                  <div>
                  <form>
                      <div className='row'>
                      <div className='col-8' style={{marginLeft: '0em'}}>
                      <label htmlFor="uuid">檔案編號（系統自動生成 - UUID) * </label>
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
                      <div className='col-4' style={{marginBottom: '0em'}}>
                        {/*The Button below, when clicked, opens a new tab with uuid in the customoerSide domain adress.  */}
                      <button className='renderList-button renderList-url' style={{marginTop: '2.2em'}} disabled={!uuid} onClick={handleUUIDSubmit}><img src={EditIcon} alt="view-icon" style={{verticalAlign: "text-top"}}/> 編輯此訃聞</button>
                      </div>
                      </div>
                  </form>
                  <hr style={{width: "70%"}}/>
                  <br/>
              <label htmlFor="compulsaryToFill"><i><b>* 為必填項目</b></i></label>
              <br/>
                <form>
                          {/* DIV for Image Upload */}
                              <div style={{marginBottom: '2em'}}>
                              <label htmlFor="addFile">請上傳往生者照片 *（建議照片比例為直立長方形或正方形，且人物在中間）[.JPG, .JPEG, .PNG, .WEBP, .BMP, .TIFF, .GIF] &#60; 5MB</label>
                              {preview ? <div className='' style={{marginTop: '1em', padding: '1em', border: '1px solid grey', borderRadius: '6px'}}>
                                <img src={preview} style={{height: '100px'}} alt="upload preview"/>
                                </div> : ''}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                  id="avatarImageFile"
                                  onChange={(e) => handleImageUpload(e)}
                                />
                              </div>

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

                          <section className='row' style={{marginTop: '2em'}}>
                              <section>
                                  <button className="button primary block" aria-live="polite" onClick={handleSubmitToDB} >
                                  <img src={SaveIcon} alt="Settings Icon" style={{height:"16px", verticalAlign:'top', width: "16px"}}/>&nbsp;&nbsp;儲存設定
                                  </button>
                              </section>
                          </section>       
                          
                </form>
                </div>
              </div>
          </div>
      </div>


    </React.Fragment>
  );
}
