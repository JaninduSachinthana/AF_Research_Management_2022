import React from 'react'
import { useNavigate } from "react-router-dom";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Like from './LikeButton.jsx';


// import {  FaStar } from 'react-icons/fa';
// import "./noticss.css";
const PackageSmallView = (props) => {

    const notice = props.notice;
    const count = props.count;

    const history = useNavigate();
    const handleClick = (path) => {
        history.push(path);
    }

    return (
    

        <Accordion sx={{
            marginTop:"20px",
            background: "linear-gradient(90deg, rgba(66,65,91,1) 0%, rgba(0,0,0,1) 35%, rgba(58,63,64,1) 100%)",
            border: "2px solid white",
            radius: 10,
            }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"white"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography sx={{color:"white", fontSize:"30px", fontWeight:"bold"}}>{notice.noticeTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            <Grid container spacing={3}>
                <Grid item xs={2} sx={{color:"white", width:"200px"}}>
                    Notice ID :   {notice.noticeId}
                </Grid>
                <Grid item xs={3} sx={{color:"white", width:"200px", border:"2px"}}>
                   Date: {notice.date}
                </Grid>
                <Grid item xs={3} sx={{color:"white", width:"200px"}}>
                    Notice Purpose: {notice.noticePurpose}
                </Grid>
                <Grid item xs={3} sx={{color:"white", width:"200px"}}>
                    Notice Purpose:{notice.noticePurpose}
                </Grid>                                 
            </Grid>
       <Like/>
            </Typography>
          
            </AccordionDetails>
        </Accordion>

    );

}


export default PackageSmallView;