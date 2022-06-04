import React from 'react'
import { useNavigate } from "react-router-dom";
// import {  FaStar } from 'react-icons/fa';
import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";


import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Card } from '@mui/material';
import { color } from '@mui/system';

const PackageSmallView = (props) => {

    const user = props.user;
    const count = props.count;

    const history = useNavigate();
    const handleClick = (path) => {
        history.push(path);
    }

    return (
      <div>
   {/* <Card
   sx={{backgroundColor:"black",
  color:"white",
  padding:"10px",
  margin_left:"10px",
  
 
   }}>
      <CardContent
      sx={{backgroundColor:"black",
      color:"white",
      padding:"10px",

      }}>
        <Typography
          >
          {user.groupid}
        </Typography>

        <Typography  
        >
          {user.department}
        </Typography>
        <br/>
        <Typography>
          {user.memberLeader}
        </Typography>
        <Typography>
          {user.memberLeader}
        </Typography>
     
      </CardContent> 
    </Card>
<br/> */}
   <div class="main-container">
  <div class="heading">
    <h1 class="heading__title">Gradient Banner Cards</h1>
    <p class="heading__credits"><a class="heading__link" target="_blank" href="https://dribbble.com/sl">Design by Simon Lurwer on Dribbble</a></p>
  </div>
  <div class="cards">
    <div class="card card-1">
      <div class="card__icon"><i class="fas fa-bolt"></i></div>
      <p class="card__exit"><i class="fas fa-times"></i></p>
      <h2 class="card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      <p class="card__apply">
        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
    
   
    
  </div>
</div>
    </div>
  


    );
}

export default PackageSmallView;


