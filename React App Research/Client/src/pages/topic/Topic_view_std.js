import React, { useEffect, useState } from "react";                                                                   
import Card from '@mui/material/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {  useParams } from "react-router-dom";
import axios from 'axios';
import './Topic.css'
import Navbar from '../student/nav-bar';


function TopicViewStd() {

    // const history = useHistory();

    const [stdID, setstdID] = useState('');
    const [grpID, setgrpID] = useState('');
    const [title, settitle] = useState('');
    const [email, setemail] = useState('');

    const params = useParams();
  
    const getSelectedtopic = () => {
      axios.get(`http://localhost:8088/topic/viewtopic/${params.id}`)
        .then((response) => {
          console.log(response.data);
        //  setValues(response.data.data);
        setstdID(response.data.stdID);
        setgrpID(response.data.grpID);
        settitle(response.data.title);
        setemail(response.data.email);
       
        })
    }
  
    useEffect(() => {
        getSelectedtopic();
    }, []);


    return ( 
        <>

<Navbar/>
        
    <Card elevation={12} sx={{ marginTop:16, maxWidth: 500, marginLeft:40 }} height={140}>
        
                <CardHeader
                    title="Topic Registration"
                />

        <TextField sx={{display: 'grid', p: 1, marginLeft: 10, marginRight:20, borderRadius: 2}} 
               id="outlined-basic" 
               label="Student ID" 
               variant="outlined" 
               value={stdID}
               />
     
           <TextField sx={{display: 'grid', p: 1, marginLeft: 10, marginRight:20, borderRadius: 2}} 
               id="outlined-basic" 
               label="Group ID" 
               variant="outlined" 
               value={grpID}
               />

         <TextField sx={{display: 'grid', p: 1, marginLeft: 10, marginRight:20, borderRadius: 2}} 
               id="outlined-basic" 
               label="Title" 
               variant="outlined" 
               value={title}
               />
     
           <TextField sx={{display: 'grid', p: 1, marginLeft: 10, marginRight:20, borderRadius: 2}} 
               id="outlined-basic" 
               label="Email" 
               variant="outlined" 
               value={email}
               />

             <Button sx={{ paddingLeft: 6, paddingRight:6, marginLeft: 16, marginRight:20, marginTop:3,marginBottom:6, alignContent:"center"}} 
                             variant="outlined" 
                             color="error">
                    Edit
              </Button>
          </Card>

        </>
     );
}

export default TopicViewStd;
