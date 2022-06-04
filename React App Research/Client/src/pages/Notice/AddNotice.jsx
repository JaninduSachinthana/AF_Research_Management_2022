import React, { useState } from "react";
import './Addview.css';
import axios from "axios";
import Navbar from '../Admin/nav-bar';
import {Alert} from '../alert/message'; 

import{ MDBInput, MDBBtn } from "mdbreact";

function noticeReg() {

  const [values, setValues] = useState({
    noticeId : "",
    noticeTitle : "",
    date : "",
    noticePurpose : "",
 });

  const handleAddData = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value});
  }  

  const addNotice = (e) => {
    e.preventDefault();
    let NoticeData = {
        noticeId: values.noticeId,
        noticeTitle: values.noticeTitle,
        date: values.date,
        noticePurpose: values.noticePurpose,

   
    }

    console.log(NoticeData );

axios.post("http://localhost:8088/notice/AddNotice", NoticeData )
    .then((res)=> Alert("success", "success", res.data))
    .catch((err) => Alert("error", "error", err.message))

    }
           
  


    return(
    
<div className="my">

<Navbar/>

<div class="form-container-group">
      
        <form class="Groupreg-form-group">
        <h2 class="group-title">Notice</h2>


         

                <label for="noticeId" className='lbl-group'>Notice Id</label>
                <input type="text" class="form-field-group" id="noticeId" name="noticeId" value={values.noticeId} onChange={handleAddData} placeholder="Enter Notice Id" />


                <label for="noticeTitle" className='lbl-group'>Notice Title</label>
                <input type="text" class="form-field-group" id="noticeTitle" name="noticeTitle" value={values.noticeTitle} onChange={handleAddData} placeholder="Enter Notice Title" />
   
                <label for="date"className='lbl-group'>Date</label>

                <input type="date" class="form-field-group" id="date" name="date" value={values.date} onChange={handleAddData} placeholder="Enter Date" />

                <label for="noticePurpose"className='lbl-group'>Notice Purpose</label>
                {/* <input type="textarea" class="form-field-group" id="noticePurpose" name="noticePurpose" value={values.noticePurpose} onChange={handleAddData} placeholder="Enter Notice Purpose" />
                <MDBInput type="textarea" label="Icon Prefix" rows="2" icon="pencil-alt" /> */}

                <textarea class="form-field-group" id="noticePurpose" name="noticePurpose" rows="5" cols="33"value={values.noticePurpose} onChange={handleAddData} placeholder="Enter Notice Purpose"></textarea>
          <div className="btngroup-group">  
              <button className="form-field cancel-group" onclick="document.getElementById('myInput').value = ''">
                 Clear
              </button>
            
              <button class="form-field submit-group" onClick={addNotice}  type="submit">
                    Submit
             </button>

          
             
               
          </div>
        </form>
      </div>
     

        </div>
 
    )
}

export default noticeReg;