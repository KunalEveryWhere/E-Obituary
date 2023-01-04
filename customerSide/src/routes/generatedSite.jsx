import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Loader from "../components/loader";
import { supabase } from '../supabaseClient';

import parse from 'html-react-parser';
import LinkLogo from "../assets/open-link-logo.png";
import Companylogo from "../assets/cp-logo.jpg"

import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";

import template1BGImage from "../assets/template1BGImage.svg";
import template2BGImage from "../assets/template2BGImage.svg";
import template3BGImage from "../assets/template3BGImage.svg";
import template4BGImage from "../assets/template4BGImage.svg";
import template5BGImage from "../assets/template5BGImage.svg";
import template6BGImage from "../assets/template6BGImage.svg";
import template7BGImage from "../assets/template7BGImage.svg";


export default function GeneratedSite () {

    const { uuid } = useParams();
    const [loading, setLoading] = useState(false);
    const [templateID, setTemplateID] = useState("1");

    const [siteData, setSiteData] = useState();
    const [footerID, setFooterID] = useState(1);
    const [footer, setFooter] = useState();

    /*Things that change in every template:
      1. Backgroung Image -> URL ✅
      2. Title (H2) -> Text Color ✅
      3. Section Title and Drowdowm Icon -> Text Color ✅
      4. Dropdown Summary Tag -> Background Color ✅
      6. Native Paragraph Text -> Color ✅
      7. Button Link Text -> Color ✅
    */

      //Cannot change the paragraph text color, because it is inherently from the ReactQuill -> id Est from inside and thus we cannot traget it.
      const templatesCss = [
        //Template 1
        {
          backgroungImage: template1BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#E84078",
          sectionDropdownBorderColor: "#E84078",
          sectionParagraphBackgroundColor: "#81818133",
          mapsButtonBackgroundColor: "#ffffffe6",
          mapsButtonTextColor: "#E84078"
        },
        //Template 2
        {
          backgroungImage: template2BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#C3B28F",
          sectionDropdownBorderColor: "#C3B28F",
          sectionParagraphBackgroundColor: "#8181811a",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#C3B28F"
        },
        //Template 3
        {
          backgroungImage: template3BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#658A73",
          sectionDropdownBorderColor: "#658A73",
          sectionParagraphBackgroundColor: "#FFFFFFE6",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#658A73"
        },
        //Template 4
        {
          backgroungImage: template4BGImage,
          titleTextColor: "#FFFFFF",
          sectionTitleTextColor: "#231F20",
          sectionDropdownBackgroundColor: "#FFD48E",
          sectionDropdownBorderColor: "#FFD48E",
          sectionParagraphBackgroundColor: "#FFFFFFE6",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#231F20"
        },
        //Template 5
        {
          backgroungImage: template5BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#A24338",
          sectionDropdownBorderColor: "#A24338",
          sectionParagraphBackgroundColor: "#F1EDE6E6",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#A24338"
        },
        //Template 6
        {
          backgroungImage: template6BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#E0BD2F",
          sectionDropdownBorderColor: "#E0BD2F",
          sectionParagraphBackgroundColor: "#F1EDE6E6",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#E0BD2F"
        },
        //Template 7
        {
          backgroungImage: template7BGImage,
          titleTextColor: "#231F20",
          sectionTitleTextColor: "#FFFFFF",
          sectionDropdownBackgroundColor: "#6989CC",
          sectionDropdownBorderColor: "#6989CC",
          sectionParagraphBackgroundColor: "#FFFFFFE6",
          mapsButtonBackgroundColor: "#FFFFFFE6",
          mapsButtonTextColor: "#6989CC"
        },
      ];

    const navigate = useNavigate();

    useEffect (() => {

      async function getSiteData () {
        setLoading(true);

        try{
          let { data: generatedSites, error } = await supabase
          .from('generatedSites')
          .select()
          .eq('uuid', uuid);

          if (generatedSites.length === 0) {
            alert ("Invalid Link / UUID.");
            navigate("/");
          }
          else if(error)
          throw error
          else if(generatedSites){
            //Checking if a particular parameter is blank (in BG it has '<p><br></p>')
            if(generatedSites[0].parameter1 === "<p><br></p>") {generatedSites[0].parameter1 = ""}
            if(generatedSites[0].parameter2 === "<p><br></p>") {generatedSites[0].parameter2 = ""}
            if(generatedSites[0].parameter3 === "<p><br></p>") {generatedSites[0].parameter3 = ""}
            if(generatedSites[0].parameter4 === "<p><br></p>") {generatedSites[0].parameter4 = ""}
            if(generatedSites[0].parameter5 === "<p><br></p>") {generatedSites[0].parameter5 = ""}
            if(generatedSites[0].parameter6 === "<p><br></p>") {generatedSites[0].parameter6 = ""}


            if (!(generatedSites[0].addressURL.startsWith("http")) && !(generatedSites[0].addressURL.startsWith("HTTP"))) {
              generatedSites[0].addressURL = "http://" + generatedSites[0].addressURL;
            }
            else if (!(generatedSites[0].addressURL.startsWith("HTTP")) && !(generatedSites[0].addressURL.startsWith("http"))) {
              generatedSites[0].addressURL = "http://" + generatedSites[0].addressURL;
            }


            setSiteData(generatedSites);
            setFooterID(generatedSites[0].footerID);

            //* Setting Browser Tabs Title here */
            document.title = generatedSites[0].title + " | 福豐玉石有限公司";
          }


          //CSS for Multiple Templates handled here.
          setTemplateID(generatedSites[0].siteFormat.charAt(generatedSites[0].siteFormat.length - 1));
        }
        catch(error)
        { 
          alert(error.error_description || error.message + "請確認您的連線狀態，或是重新整理頁面\nFailed to load data from DB. \nPlease Check you Internet Connection / Reload the Page.")
        }
        finally{
          setLoading(false);
        }
      }

      async function getFooterData () {
        setLoading(true);

        try{
          let { data: footerStyle, error } = await supabase
          .from('footerStyle')
          .select('*')
          .order('footerID', { ascending: true })

          if((footerStyle.length === 0) || (!footerStyle))
          {throw new Error ("請重新整理頁面 \n Failed to load footer. Try Again.")}

          else if(error)
          throw error

          else {
            
            setFooter(footerStyle);
          }
          
        }
        catch(error)
        { 
          alert(error.error_description || error.message + "請確認您的連線狀態，或是重新整理頁面\nFailed to load data from DB. \nPlease Check you Internet Connection / Reload the Page.")
        }
        finally{
          setLoading(false);
        }
      }

      getSiteData();
      getFooterData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isValidUrl = (urlString)=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}

    const doesParameterConatinContent = (parameterValue) => {
      if (parameterValue === '') {
        return false;
      }
      else {
        return true;
      }
    }


  return (
    <React.Fragment>
      {loading ? <Loader /> : ''}
      {(siteData) ? 

      <div>
        
        <section className='bg-image1' 
        style={{
          backgroundImage: `url(${templatesCss[templateID - 1].backgroungImage})`
          }}>
        </section>  

         {/*Main Content */}
        <div className='row flex flex-center '>
              <div className='col-6 content-card titleCenter'>
                <div className=''>
                      <img src={"https://luvbkgreocipllqdrhjn.supabase.co/storage/v1/object/public/avatars/"+siteData[0].imagePath} alt="avatar" className='avatarImg imageCentered'/>
                </div>
                <h2 style={{
                  color: templatesCss[templateID - 1].titleTextColor,
                  fontWeight: '700', marginTop: '1em',
                  textAlign: 'center'}}>
                    {siteData[0].title}
                </h2>
                
                <div>
                { 
                doesParameterConatinContent(siteData[0].parameter1) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>追思函</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor,
                    }}>
                    {parse(siteData[0].parameter1)}
                    </div>
                  </details>
                  :
                  ''
                }

                { 
                doesParameterConatinContent(siteData[0].parameter2) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>親眷名單</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor,
                    }}>
                    {parse(siteData[0].parameter2)}
                    </div>
                  </details>
                  :
                  ''
                  }

                  {
                    doesParameterConatinContent(siteData[0].parameter3) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>生平介紹</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor,
                    }}>
                    {parse(siteData[0].parameter3)}
                    </div>
                  </details>
                  :
                  ''
                  }

                  {
                    doesParameterConatinContent(siteData[0].parameter4) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>溫馨提醒</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor,
                    }}>
                    {parse(siteData[0].parameter4)}
                    </div>
                  </details>
                  :
                  ''
                  }

                  {
                    doesParameterConatinContent(siteData[0].parameter5) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>追思回憶</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor
                    }}>
                    {parse(siteData[0].parameter5)}
                    </div>
                  </details>
                  :
                  ''
                  }

                  {
                    doesParameterConatinContent(siteData[0].parameter6) ? 
                  <details>
                    <summary style={{
                      color: templatesCss[templateID - 1].sectionTitleTextColor,
                      borderColor: templatesCss[templateID - 1].sectionDropdownBorderColor,
                      backgroundColor: templatesCss[templateID - 1].sectionDropdownBackgroundColor
                      }}>儀式地點</summary>
                    <div style={{
                      backgroundColor: templatesCss[templateID - 1].sectionParagraphBackgroundColor
                    }}>
                    {parse(siteData[0].parameter6)}
                    </div>
                  </details>
                  :
                  ''
                  }


                  {isValidUrl(siteData[0].addressURL) ? 
                  <div>
                      <a href={""+siteData[0].addressURL} target="_blank" rel="noreferrer" className='Link'>
                      <button className='button secondary block' style={{
                        color:  templatesCss[templateID - 1].mapsButtonTextColor,
                        backgroundColor: templatesCss[templateID - 1].mapsButtonBackgroundColor
                        }}><img src={LinkLogo} alt="Open Link Icon" style={{height:"16px", verticalAlign:'top'}}/>&nbsp;&nbsp;交通指引</button>
                      </a>
                  </div>

                  :

                      ''

                  }
                </div>
              </div>
            </div> 


          {/* Footer */}
          {
            (footer) ? 
                <div className='footer' style={{position: 'relative', backgroundColor: 'white', height: '100%'}}>
                <div className='row flex' style={{marginBottom: "0px"}}>
                    <div className='col-8 footerSpacing' aria-live="polite">
                      <div >
                      <img src={Companylogo} alt={"Company Logo"}/>
                      </div>
                        <div>
                              <h2 style={{marginTop: "0px", textAlign: "left", fontSize: '2em', fontWeight: '600'}}>{footer[footerID-1].title}<br />

                              {
                                (footer[footerID-1].addressURL) ? 
                                    <a href={footer[footerID-1].addressURL} target="_blank" referrerPolicy='norefferal' rel="noreferrer">
                                    <p style={{fontSize: "0.7em", fontWeight: "500", textAlign: "left"}}>地址:</p>
                                    </a>
                                  :
                                  <p style={{fontSize: "0.7em", fontWeight: "500", textAlign: "left"}}>地址:</p>
                              }
                              
                            <p style={{fontSize: "0.4em", fontWeight: "400", textAlign: "left"}}>{footer[footerID-1].addressText} <br/> {footer[footerID-1].desc}</p> 
                              </h2>
                              
                        </div>
                    </div>
                    <div className='col-4' aria-live="polite" >
                      <div className='lowerFooterSpacing'>
                              <div>
                                  <h2 style={{marginTop: "0px"}}>聯絡資訊
                                  <p style={{fontSize: "16px", fontWeight: "500", textAlign: "left"}}>
                                  電話: {footer[footerID-1].mobileNumber}
                                  </p>
                                  </h2>
                            </div>
                      </div>
                      <div className='lowerFooterSpacing'>
                        <ul className='footerUL'>
                          <a href={"https://www.luxuriant.com.tw/"} target={"_blank"} className='footerIcon'  rel="noopener noreferrer"><AiOutlineGlobal /></a>
                          <a href={"mailto:roseblue320@yahoo.com.tw"} target={"_blank"} className='footerIcon' rel="noopener noreferrer"><AiOutlineMail  /></a>
                          <a href={"tel:"+footer[footerID-1].mobileNumber} target={"_blank"} className='footerIcon' rel="noopener noreferrer"><AiOutlinePhone /></a>
                        </ul>
                      </div>
                    </div>
                </div>
                </div>
              :
              <div className='footer' style={{position: 'relative', backgroundColor: 'white', height: '100%'}}>
                  <h4>載入中...</h4>
              </div>
          }

      </div> 

      

      :

      <div>
        <section className='bg-image1'>
      </section>   
      <div className='row flex flex-center '>
            <div className='col-6 content-card titleCenter'>
              <h2 style={{color: 'white', fontWeight: '700', marginTop: '1em'}}>Loading...</h2>
              
            </div>
          </div> 
    </div>

      }
        
        
        </React.Fragment>
  );
}
