import React, { useState } from "react";
import './Group_view.css';
import axios from "axios";
import Navbar from '../student/nav-bar';

function GroupReg() {

  const [values, setValues] = useState({
    groupid: "",
    department: "",
    memberLeader: "",
    memberone : "",
    membertwo: "",
    mamberthree: ""
 });

  const handleAddData = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value});
  }  

  const addGroup = (e) => {
    e.preventDefault();
    let groupData = {
      groupid: values.groupid,
      department: values.department,
      memberLeader: values.memberLeader,
      memberone: values.memberone,
      membertwo: values.membertwo,
      mamberthree: values.mamberthree,
      // memberfour: values. memberfour,
   
    }

    console.log(groupData);
           
  axios.post("http://localhost:8088/group/addgroup", groupData )
      .then((response) => {
        console.log(response.data);
      })
      
      .catch((error) => {
        console.log(error);
      })

    }



    return(
    
<div className="my">

<Navbar/>

<div className="form-container-group">
        
        <form className="Groupreg-form-group">
        <h2 className="group-title">Group Assign</h2>
         
        <label className='lbl-group'>Group ID</label>
        <input
          className="form-field-group"
          type="text"
          data-testid="groupid"
          placeholder="Group ID"
          name="groupid"
          onChange={handleAddData}
          value={values.groupid}
        />

        <label className='lbl-group'>Department</label>
        <input
          className="form-field-group"
          type="text"
          data-testid="department"
          placeholder="Department"
          name="department"
          onChange={handleAddData}
          value={values.department}
        />
        

        <label className='lbl-group'>Leader ID</label>
        <input
          className="form-field-group"
          type="text"
          placeholder="SLIIT ID"
          data-testid="memberLeader"
          name="memberLeader"
          onChange={handleAddData}
          value={values.memberLeader}
        />

        <label className='lbl-group'> Member No 01 </label>
        <input
          className="form-field-group"
          type="text"
          data-testid="memberone"
          placeholder="SLIIT ID"
          name="memberone"
          onChange={handleAddData}
          value={values.memberone}
        />
  
        <label className='lbl-group'>Member No 02</label>
        <input
          className="form-field-group"
          type="text"
          data-testid="membertwo"
          placeholder="SLIIT ID"
          name="membertwo"
          onChange={handleAddData}
          value={values.membertwo}
        />
        <label className='lbl-group'>Member No 03</label>
          <input
            className="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            data-testid="mamberthree"
            name="mamberthree"
            onChange={handleAddData}
            value={values.mamberthree}
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
             
              <button className="form-field cancel-group" onClick="document.getElementById('myInput').value = ''">
                 Clear
              </button>
            
              <button className="form-field submit-group" onClick={addGroup}  type="submit">
                    Submit
             </button>
               
          </div>
        </form>
      </div>
     

        </div>
 
    )
}

export default GroupReg;