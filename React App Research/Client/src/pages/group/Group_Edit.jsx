import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Group_view.css';
import {  useParams } from "react-router-dom";
import Navbar from '../student/nav-bar';
import AlertMsg from '../alert/message';


function GroupEdit() {

  

    const [groupid, setgroupid] = useState('');
    const [department, setdepartment] = useState('');
    const [memberLeader, setmemberLeader] = useState('');
    const [memberone, setmemberone] = useState('');
    const [membertwo, setmembertwo] = useState('');
    const [mamberthree, setmamberthree] = useState('');
  
  
    const params = useParams();
  
    const getSelectedgroup = () => {
      axios.get(`http://localhost:8088/group/viewgroup/${params.id}`)
        .then((response) => {
          console.log(response.data);
        //  setValues(response.data.data);
        setgroupid(response.data.groupid);
        setdepartment(response.data.department);
        setmemberLeader(response.data.memberLeader);
        setmemberone(response.data.memberone);
        setmembertwo(response.data.membertwo);
        setmamberthree(response.data.mamberthree); 
        })
    }
  
    useEffect(() => {
        getSelectedgroup();
    }, []);
  
    const updateGroupDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        groupid: groupid,
        department: department,
        memberLeader: memberLeader,
        memberone: memberone,
        membertwo: membertwo,
        mamberthree: mamberthree,
      }
  
      axios.put(`http://localhost:8088/group/edit/${params.id}`,updateData)
      .then((res)=> {AlertMsg("success", "success", res.data); window.location = `/Student/GroupView`})
      .catch((err) => AlertMsg("error", "error", err.message))
        
    }


    return ( 
        <div>

<Navbar/>



   <div class="form-container-group">

  
        
        <form class="Groupreg-form-group">
          
          <h2 class="group-title">Edit Group </h2>
         
        <label className='lbl-group'>Group ID</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="Group ID"
            name="groupid"
            onChange={(e) => setgroupid(e.target.value)}
            value={groupid}
          />

           <label className='lbl-group'>Department</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="Department"
            name="department"
            onChange={(e) => setdepartment(e.target.value)}
            value={department}
          />
         

       <label className='lbl-group'>Leader ID</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            name="memberLeader"
            onChange={(e) => setmemberLeader(e.target.value)}
            value={memberLeader}
          />

        <label className='lbl-group'> Member No 01 </label>
          <input
            class="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            name="memberone"
            onChange={(e) => setmemberone(e.target.value)}
            value={memberone}
          />
    
       <label className='lbl-group'>Member No 02</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            name="membertwo"
            onChange={(e) => setmembertwo(e.target.value)}
            value={membertwo}
          />
        <label className='lbl-group'>Member No 03</label>
          <input
            class="form-field-group"
            type="text"
            placeholder="SLIIT ID"
            name="mamberthree"
            onChange={(e) => setmamberthree(e.target.value)}
            value={mamberthree}
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
            
              <button class="submit-group" onClick={updateGroupDetails} type="submit">
                    Submit
             </button>
            
          </div>
        </form>
      </div>
        </div>
     );
}

export default GroupEdit;
