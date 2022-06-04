import React, { useEffect, useState } from 'react';
import "./Group_view.css";
import axios from 'axios';
import Navbar from '../student/nav-bar';
import { Box } from '@mui/material';


function GroupStudentView() {


  const [group, setgroup] = useState([])

   const getgroups=()=>{
             axios.get("http://localhost:8088/group/viewgroup/")
              .then((res)=>{
                console.log(res.data);
                setgroup(res.data);
              })
              .catch((error)=>{
                console.log(error);
              })
   }
    
    useEffect(()=>{
      getgroups();
    })

   
   

 




    return(

        <div>
        <Navbar/>


             <Box sx={{  border: '4px dashed blue', marginTop:16 }}>
                    <h1 style={{color: 'white'}}>Research Topic</h1>
            </Box>

                      <table class="table-ab">
    
    
                        <tr>
                           <th>Group ID</th>
                           <th>Department</th>
                           <th>Leader</th>
                           <th>Member No 01</th>
                           <th>Member No 02</th>
                           <th>Member No 03</th>
                                                       
                        </tr>
    
                        {group.map((view)=>(
                     <tr>
                        <td>{view.groupid}</td>
                        <td>{view.department}</td>
                        <td>{view.memberLeader}</td>
                        <td>{view.memberone}</td>
                        <td>{view.membertwo}</td>
                        <td>{view.mamberthree}</td>
                       
                        
                     </tr>
                    ))}
                             
                 </table>
    
              </div>  
    
         
    
       
        )
    }
    
    export default GroupStudentView;