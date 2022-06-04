import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Addview.css';
import {  useParams } from "react-router-dom";
import Navbar from '../Admin/nav-bar';
import {Alert} from '../alert/message'; 

function NoticeEdit() {

  

    const [noticeId, setnoticeid] = useState('');
    const [noticeTitle, setTitle] = useState('');
    const [date, setdate] = useState('');
    const [noticePurpose, setpurpose] = useState('');
  
    const params = useParams();
  
    const selectNotice = () => {
      axios.get(`http://localhost:8088/notice/get/${params.id}`)
        .then((response) => {
          console.log(response.data);
        //  setValues(response.data.data);
        setnoticeid(response.data.noticeId);
        setTitle(response.data.noticeTitle);
        setdate(response.data.date);
        setpurpose(response.data.noticePurpose);
        })
    }
  
    useEffect(() => {
        selectNotice();
    }, []);
  
    const NoticeDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        noticeId: noticeId,
        noticeTitle: noticeTitle,
        date: date,
        noticePurpose: noticePurpose,
      }
  
      axios.put(`http://localhost:8088/notice/update/${params.id}`,updateData)
        .then((res)=> {Alert("success", "success", res.data);  window.location = `/Admin/viewNotice`})
       
        .catch((err) => Alert("error", "error", err.message))
       
    }



    return ( 
        <div>

<Navbar/>

   <div class="form-container-group">
        
        <form class="Groupreg-form-group">
          
          <h2 class="group-title">Edit Notices</h2>
         
        <label className='lbl-group'>Notice ID</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="Notice ID"
            name="noticeId"
            onChange={(e) =>  setnoticeid(e.target.value)}
            value={noticeId}
          />

           <label className='lbl-group'>Notice Title</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="Notice Title"
            name="noticeTitle"
            onChange={(e) => setTitle(e.target.value)}
            value={noticeTitle}
          />
         

       <label className='lbl-group'>Date Of the notice</label>
          <input
            class="form-field-group"
            type="date"
            placeholder="Date Of the notice"
            name="date"
            onChange={(e) =>setdate(e.target.value)}
            value={date}
          />

    
       
        <label className='lbl-group'>Notice Details</label>
          <textarea 
            class="form-field-group"
            type="textarea"
            placeholder="Notice Details"
            name="noticePurpose"
            onChange={(e) => setpurpose(e.target.value)}
            value={noticePurpose}
          />

             {/* <label className='lbl-group'>Member No 04</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            name=" memberfour"
            onChange={handleAddData}
            value={values.memberfour}
          /> */}


          <div className="btngroup-group">  
             
              <button className="cancel-group" onclick="document.getElementById('myInput').value = ''">
                    Clear
              </button>
            
              <button class="submit-group" onClick={NoticeDetails} type="submit">
                    Submit
             </button>
            
          </div>
        </form>
      </div>
        </div>
     );
}

export default NoticeEdit;
