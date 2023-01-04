import React, {useState, useEffect } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';

import  Navigationbar from '../components/navigationbar';
import CreateIcon from "../assets/create-icon.png"
import EditIcon from "../assets/edit-icon.png"
import EditIcon2 from "../assets/edit-icon-2.png"
import DeleteIcon from "../assets/delete-icon.png"
import URLIcon from "../assets/openURL-icon.png"

import { supabase } from '../supabaseClient'

import Loader from "../components/loader";
import Pagination from "react-js-pagination";



export default function Dashboard(props) {

  const customerSiteDomain = "https://luxuriant-ashes-cans.netlify.app/";

  const [loading, setLoading] = useState(false);
  const [siteDatafromDB, setSiteDatafromDB] = useState([]);

  const [activePage, setActivePage] = useState(1);
  
  const navigate = useNavigate();

  const numberOfListPerPage = 10;


  useEffect(() => {
    setLoading(true);

    async function deleteExpiredWebsites() { 
      setLoading(true);
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth());
  
      try {

        //Getting imagePath of all expired websites
        let { data: imagePathToDelete, error } = await supabase
        .from('generatedSites')
        .select('imagePath')
        .lt('deleteOn', (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} 23:59:59.00+00`));
        if(error) {throw error}
  
        //Creating an array of file-names to delete
        let pathArray = [];
        if(imagePathToDelete.length > 0) {
          for(let i=0; i<imagePathToDelete.length; i++)
            pathArray.push(imagePathToDelete[i].imagePath)
        
            //Deleting Them
            const { error } = await supabase
            .storage
            .from('avatars')
            .remove(pathArray);

            if(error) {throw error}
        }
      
          //Deleting all sites data with 'deleteOn' Date older than current date.
          const { error: primaryError } = await supabase
          .from('generatedSites')
          .delete()
          .lt('deleteOn', (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} 23:59:59.00+00`))



          const { error: tertairyError } = await supabase
          .from('generatedSites')
          .delete()
          .lt('deleteOn', '1800-02-02 00:00:00+00')
      
          if( primaryError || tertairyError) {
            let error = primaryError || tertairyError;
            throw error;
      }
        }
        catch(error) {
          alert(error.error_description || error.message + "\n輸入錯誤, 請重新輸入\nPlease Check you Internet Connection / Reload the Page.")
        } finally {
          setLoading(false)
        }
  
    }

    async function fetchWebsitesData()
    {
      setLoading(true);
      try {
      let { data: generatedSites, error } = await supabase
      .from('generatedSites')
      .select('*')
      .order('updatedAt', {ascending: false})
      .limit(numberOfListPerPage);

      setSiteDatafromDB(generatedSites);

      if (error)
      throw error
    
      }
      catch(error) {
        alert(error.error_description || error.message + "\n輸入錯誤, 請重新輸入\nPlease Check you Internet Connection / Reload the Page.")
      }
      finally
      {
        setLoading(false)
      }
    }
    
    deleteExpiredWebsites();
    fetchWebsitesData();
    
  }, [])


function handlePageChange(pageNumber) {
  setActivePage(pageNumber);
  Renderinglist(pageNumber);
}

async function deleteSite(uuid, title) {
  setLoading(true);

  try {

    //Getting the associated ImagePath
    let { data: imagePathToDelete, errorA } = await supabase
    .from('generatedSites')
    .select('imagePath')
    .eq('uuid', uuid);

    //Delteing from Storage Bucket
    const { errorB } = await supabase
          .storage
          .from('avatars')
          .remove(imagePathToDelete[0].imagePath);
  
  //Deleting DB Record from Table
  const { error } = await supabase
  .from('generatedSites')
  .delete()
  .eq('uuid', uuid)

  if (error || errorA || errorB) 
  throw error || errorA || errorB;
  }
  catch(error) {
    alert(error.error_description || error.message + "\n輸入錯誤, 請重新輸入\nPlease Check you Internet Connection / Reload the Page.")
  }
  finally {
    Renderinglist(activePage);
    setLoading(false);
    alert("這則電子訃聞已刪除成功\n Website "+title+" with UUID: "+uuid+" was deleted successfully!");
  }
}

async function Renderinglist (pgno) {
  setLoading(true);

  try {
    let { data: generatedSites, error } = await supabase
    .from('generatedSites')
    .select('*')
    .order('updatedAt', {ascending: false})
    .range(((pgno * numberOfListPerPage)-numberOfListPerPage), ((pgno * numberOfListPerPage)-1));

    setSiteDatafromDB(generatedSites);

    if(error)
    throw error
  
    }
    catch(error) {
      alert(error.error_description || error.message + "\n輸入錯誤, 請重新輸入\nPlease Check you Internet Connection / Reload the Page.")
    }
    finally
    {
      setLoading(false)
    }
}

async function towardsEdit(uuid) {
  navigate({
    pathname: "/editwebsite",
    search: createSearchParams({
      uuid
    }).toString()
  });
}


  return (
    <React.Fragment>
       <Navigationbar />
       {loading ? <Loader /> : ''}
       <div className='row flex'>
        <div className='col-12'><h1> 後台管理</h1></div>
       </div>

      {/* Create New Website */}
      <div className='dashboard-flex-main-cont' style={{}}>
        <div className='side-inner-flex' style={{}}>
              {/* Create New Website */}
              <div className='dashboard-flex-main-cont-item1'>
                <Link to="/createnew" className='create-new-link-text Link textCenter'>
                        <div>
                              <img src={CreateIcon} alt="create new icon" height="80px" style={{marginTop: '15px'}}/>
                              <h2 className='create-new-link-text'>新增與修改訃聞</h2>
                        </div>
                </Link>
              </div>
              {/* Edit Website */}
              <div className='dashboard-flex-main-cont-item1' style={{backgroundColor: "#e66f2f"}}>
                <Link to="/editwebsite" className='create-new-link-text Link textCenter'>
                        <div>
                              <img src={EditIcon} alt="edit website icon" height="70px" style={{marginTop: '15px'}}/>
                              <h2 className='create-new-link-text'>編輯訃聞</h2>
                        </div>
                </Link>
              </div>
          </div>
            
            {/* List of Active Websites */}
            <div className='dashboard-flex-main-cont-item2 setting-pagination' style={{}}>
              <div>
              <div className='row renderList-top'>
                <div className='col-3' style={{marginBottom: '0em'}}><span>檔案編號（系統自動生成 - UUID)</span></div>
                <div className='col-4' style={{marginBottom: '0em'}}><span>訃聞名稱</span></div>
                <div className='col-1' style={{marginBottom: '0em', textAlign: "center"}}><span>檢視</span></div>
                <div className='col-1' style={{marginBottom: '0em', textAlign: "center"}}><span>編輯</span></div>
                <div className='col-2' style={{marginBottom: '0em', textAlign: 'right'}}>刪除日期</div>
                <div className='col-1' style={{marginBottom: '0em', textAlign: "center"}}><span>刪除</span></div>
              </div>
              
              {
                siteDatafromDB.map((genSite, id) => (
                  <div key={id} className='renderList'>
                  <div className='row'>
                    <div className='col-3' style={{marginBottom: '0em'}}><span>{genSite.uuid}</span></div>
                    <div className='col-4' style={{marginBottom: '0em', overflow: 'hidden'}}><span>{genSite.title}</span></div>
                    <div className='col-1' style={{marginBottom: '0em'}}><a href={customerSiteDomain+""+genSite.uuid} target="_blank" rel="noreferrer"><button className='renderList-button renderList-url'><img src={URLIcon} alt="view-icon"/></button></a></div>
                    <div className='col-1' style={{marginBottom: '0em'}}><button className='renderList-button renderList-edit' onClick={() => towardsEdit(genSite.uuid)}><img src={EditIcon2} alt="edit-icon"/></button></div>
                    <div className='col-2' style={{marginBottom: '0em', textAlign: 'right'}}><span>{new Date(genSite.deleteOn).getDate()}-{new Date(genSite.deleteOn).getMonth()+1}-{new Date(genSite.deleteOn).getFullYear()}</span></div>
                    <div className='col-1' style={{marginBottom: '0em'}}><button onClick={() => deleteSite(genSite.uuid, genSite.title)} className='renderList-button'><img src={DeleteIcon} alt="delete-icon"/></button></div>
                  </div>
                  </div>
                  ))
              }
              </div>

            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />

            </div>
      </div>
      <div></div>
    </React.Fragment>
  );
}