import Navbar from './nav-bar';
import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import "./../Supervisors/supervisor.css";
import Image1 from "./hs1.jpg";
import Image2 from "./box1.png";
import Image3 from "./box2.png";
import Image4 from "./box3.png";
import Image5 from "./box4.png";

import {/* Button,*/ Grid } from "@material-ui/core";

import { Button, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Container } from '@mui/system';


function SuperMain() {
  return(

<div className='sup-page'>   

<Navbar/>

       <Box  elevation={5} sx={{backgroundColor:"white",
                                      border:5,
                                      borderColor:"Black",
                                      borderRadius:3,
                                      boxShadow:"8px 8px 8px 8px black, 2px 2px 2px 0 #1b1b1b"}}>
      
     
           <h1>SPM Reasearch</h1>
             
         
            <CardContent sx={{margin:2, minHeight:400,minWidth:600}}  style={{ backgroundImage: `url(${Image1})`,   
                 backgroundSize:"cover"
               }}>
             
       
            </CardContent>
   </Box>


   <br/>
  <Grid container marginTop={9} spacing={4}>
        <Grid item xs={12} md={3} >
            <Box elevation={12} sx={{                             
                                      boxShadow:"8px 8px 8px 8px black, 2px 2px 2px 0 #1b1b1b"}}>

                    <Container sx={{backgroundColor:"red",marginTop:0,height:50}}>                           
                           <Typography sx={{color:"white", fontSize:24,marginLeft:8,alignContent:"center"}}>Panels</Typography>
                    </Container>   
              
                    <Container sx={{height:250,width:278 
                                   }}  
                                    style={{ backgroundImage: `url(${Image2})`,   
                                    backgroundSize:"cover"
               }}>
                        <Button  variant="outlined" size="large" sx={{marginLeft:7, color:"white",
                                                                                fontStyle:"bold",
                                                                                  fontSize:"27",
                                                                                    marginTop:23,
                                                                                    border:3,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="Supervisor/researchView">
                              Panels
                          </Button >
                    </Container>     
            </Box>
      </Grid>      
   
   
      
     
      <Grid item xs={12} md={3} >
            <Box elevation={12} sx={{ 
                                      boxShadow:"8px 8px 8px 8px black, 2px 2px 2px 0 #1b1b1b"}}>

                    <Container sx={{backgroundColor:"purple",marginTop:0,height:50}}>                           
                           <Typography sx={{color:"white", fontSize:24,marginLeft:8,alignContent:"center"}}>Topic</Typography>
              
                    </Container>   
              
                    <Container sx={{height:250,width:278 
                                   }}  
                                    style={{ backgroundImage: `url(${Image3})`,   
                                    backgroundSize:"cover"
               }}>
                        <Button  variant="outlined" size="large" sx={{marginLeft:7, color:"white",
                                                                                fontStyle:"bold",
                                                                                  fontSize:"27",
                                                                                    marginTop:23,
                                                                                    border:3,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="Supervisor/researchView">
                              Topic
                          </Button >
                    </Container>
           
            </Box>
      </Grid>      

      <Grid item xs={12} md={3} >
            <Box elevation={12} sx={{ 
                                      boxShadow:"8px 8px 8px 8px black, 2px 2px 2px 0 #1b1b1b"}}>

                    <Container sx={{backgroundColor:"orange",marginTop:0,height:50}}>                           
                           <Typography sx={{color:"white", fontSize:24,marginLeft:8,alignContent:"center"}}>Submission</Typography>
              
                    </Container>   
              
                    <Container sx={{height:250,width:278 
                                   }}  
                                    style={{ backgroundImage: `url(${Image4})`,   
                                    backgroundSize:"cover"
               }}>
                        <Button  variant="outlined" size="large" sx={{marginLeft:7, color:"white",
                                                                                fontStyle:"bold",
                                                                                  fontSize:"27",
                                                                                    marginTop:23,
                                                                                    border:3,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="Supervisor/researchView">
                              Submission
                          </Button >
                    </Container>
           
            </Box>
      </Grid>

      <Grid item xs={12} md={3} >
            <Box elevation={12} sx={{ 
                                      boxShadow:"8px 8px 8px 8px black, 2px 2px 2px 0 #1b1b1b"}}>

                    <Container sx={{backgroundColor:"blue",marginTop:0,height:50}}>                           
                           <Typography sx={{color:"white", fontSize:24,marginLeft:8,alignContent:"center"}}>Evalution</Typography>
              
                    </Container>   
              
                    <Container sx={{height:250,width:278 
                                   }}  
                                    style={{ backgroundImage: `url(${Image5})`,   
                                    backgroundSize:"cover"
               }}>
                        <Button  variant="outlined" size="large" sx={{marginLeft:7, color:"white",
                                                                                fontStyle:"bold",
                                                                                  fontSize:"27",
                                                                                    marginTop:23,
                                                                                    border:3,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="Supervisor/researchView">
                              Evalution
                          </Button >
                    </Container>
           
            </Box>
      </Grid>


</Grid>


 
   



</div>
  );
}

export default SuperMain;


