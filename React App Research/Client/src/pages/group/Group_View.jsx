import React, { useEffect, useState } from 'react';
import "./Group_view.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Grid} from '@material-ui/core';
import axios from 'axios';
import Navbar from '../admin/nav-bar';


import Box from '@mui/material/Box';

;
import AlertMsg from '../alert/message';

function GroupView() {

  

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

    const onDeleteHandlle = (id) => {    
      axios
        .delete("http://localhost:8088/group/delete/"+ id)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
    };

   

  const updategroupNavigate = (id) => {
   window.location = `/Student/Group_Edit/${id}`;  
}

    return(
       

    <div>
    <Navbar/>

    <Box sx={{  border: '4px dashed blue', marginTop:16 }}>
           <h1 style={{color: 'white'}}>Eveluate Topic</h1>
       </Box>
                  <table class="table-ab">


                    <tr>
                       <th>Group ID</th>
                       <th>Department</th>
                       <th>Leader</th>
                       <th>Member No 01</th>
                       <th>Member No 02</th>
                       <th>Member No 03</th>
                       <th>Action</th>                                 
                    </tr>

                    {group.map((view)=>(
                 <tr>
                    <td>{view.groupid}</td>
                    <td>{view.department}</td>
                    <td>{view.memberLeader}</td>
                    <td>{view.memberone}</td>
                    <td>{view.membertwo}</td>
                    <td>{view.mamberthree}</td>
                   
                    <td>                      
                       <Grid container> 
                             <Grid item> 
                               <IconButton aria-label="delete" onClick={()=>onDeleteHandlle(view._id)}>  
                                   <DeleteIcon color={'secondary'} /> 
                               </IconButton> 
                             </Grid>
                                <Grid item>                      
                                   <IconButton aria-label="delete" onClick={() =>updategroupNavigate(view._id)} >        
                                     <CreateIcon color={'primary'}/> 
                                   </IconButton> 
                               </Grid>  
                           </Grid>    
                     </td>
      
                 </tr>
                ))}
                         
             </table>

          </div>  

     

   
    )
}

export default GroupView;