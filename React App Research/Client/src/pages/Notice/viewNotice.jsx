import React, { useEffect, useState } from 'react';
// import "./Addview.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import './Addview.css';

import Navbar from '../admin/nav-bar';
import AlertMsg from '../alert/message'; 



function View() {

 

  const [notice, setnotice] = useState([])

    const getnotice=()=>{
                axios.get("http://localhost:8088/notice/viewNotice/")
                    .then((res)=>{  
                        console.log(res.data);  
                        setnotice(res.data);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
    }
    
    useEffect(()=>{
        getnotice();
    })

    const onDeleteHandlle = (id) => {    
        axios
            .delete("http://localhost:8088/notice/delete/"+ id)
            .then((res)=> AlertMsg("success", "success", res.data))
            .catch((err) => AlertMsg("error", "error", err.message))
    };

   

  const updategroupNavigate = (id) => {
    window.location = `/UpdateNotice/${id}`;
    
}


// const updategroupNavigate= ()=>{
//   let path = "/Group_Edit";
//   history.push(path);
// }

    return(
        <div>
            <Navbar/>

            <div class="tablealign-inv">
                 <table class="table-Inv">

                        <tr>
                        <th>Notice ID</th>
                          <th>Notice Title</th>
                          <th>Date</th>
                         <th>Description</th>
                            <th>Action</th>
                      
                        
                </tr>  
                
                 {notice.map((notice) => (
                        <tr>
                            <td>{notice.noticeId}</td>
                            <td>{notice.noticeTitle}</td>
                            <td>{notice.date}</td>
                            <td>{notice.noticePurpose}</td>
                            <td>
                              
                            <IconButton aria-label="delete" onClick={()=>onDeleteHandlle(notice._id)}>  

                                <DeleteIcon color={'secondary'} />

                            </IconButton>         

                                <IconButton aria-label="delete" onClick={() =>updategroupNavigate(notice._id)} >        

                                <CreateIcon color={'primary'}/>
                                </IconButton>


                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
       
    );
}



export default View;