import React, { useState } from "react";
import axios from "axios";
import './Topic.css'
import Navbar from '../student/nav-bar';


function TopicRegister() {

  const[values, setValues] = useState({
    stdID:"",
    grpID:"",
    title:"",
    email:""
  });

  const handleAddData =(e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value});
  }  

  const addTopic = async (e) => {
    e.preventDefault();
    let topicdata = {
      stdID: values.stdID,
      grpID: values.grpID,
      title: values.title,
      email: values.email
    }

    console.log(topicdata);
           
    axios.post("http://localhost:8088/topic/add", topicdata)
    .then((res) =>  alert(res.data))
    .catch((error) => {console.log(error);})

  }



    return(
        <div>
         
            

<Navbar/>

<div className="topic_page">
<div className="form-container-topic">
        
        <form className="topic-form-title">
        <h2 className="topic-title">Research Topic Submission</h2>
         
        <label className='lbl-topic'>Student ID</label>
          <input
            className="form-field-topic"
            type="text"
            placeholder="Student ID"
            name="stdID"
            data-testid="stdID"
            onChange={handleAddData}
            value={values.stdID}
          />

           <label className='lbl-topic'>Group ID</label>
          <input
            className="form-field-topic"
            type="text"
            data-testid="grpID"
            placeholder="Group ID"
            name="grpID"
            onChange={handleAddData}
            value={values.grpID}
          />
         

       <label className='lbl-topic'>Title</label>
          <input
            className="form-field-topic"
            type="text"
            placeholder="Title"
            data-testid="title"
            name="title"
            onChange={handleAddData}
            value={values.title}
          />

        <label className='lbl-topic'>Email</label>
          <input
            className="form-field-topic"
            type="Email"
            data-testid="email"
            placeholder="****@gmail.com"
            name="email"
            onChange={handleAddData}
            value={values.email}
          />
          <div className="btngroup-topic">  
             
              <button className="form-field cancel-topic" onclick="document.getElementById('myInput').value = ''">
                 Clear
              </button>     
              <button className="form-field submit-topic"   data-testid ="submit" onClick={addTopic}  type="submit"> 
                    Submit
             </button>
               
          </div>
        </form>
      </div>
     
      </div>
        </div>

      
    )
}

export default TopicRegister;