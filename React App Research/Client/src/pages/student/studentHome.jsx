import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Navbar from './nav-bar';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Grid } from "@material-ui/core";
import './student.css';
import { Button, CardContent } from "@mui/material";
import Image1 from "./hs1.jpg";
import Image2 from "./c1.jpg";
import Image3 from "./c2.jpg";
import Image4 from "./c3.jpg";
import Image5 from "./c4.jpg";
import { width } from "@mui/system";
 import Footer from './Footer.jsx';
 import SmallView from "../Notice/Notices_view";
 import { Box } from '@mui/system';
 import { Container } from '@mui/system';
 import { Typography } from '@mui/material';
 
 class StudentMain extends Component {
    
     constructor(props) {
         super(props);
         this.state = {
             notices: []
         }
     };
     
     // Get all packages from datasbase
     componentDidMount() {
         axios.get("http://localhost:8088/notice/viewNotice").then(res => {
             this.setState({ notices: res.data });
         }).catch(err => {
             console.log(err);
         });
     }
render () {
     return(


<div className="page">   

  <Navbar/>

     <Box elevation={5} sx={{backgroundColor:"white",
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

<br></br>
   
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
                                                                                fontStyle:"oblique",
                                                                                  fontSize:"27",
                                                                                    marginTop:23,
                                                                                    border:5,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="/Student/GroupStudentView">
                              Groups
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
                                                                                    border:5,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="/Student/Topic_view_std">
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
                                                                                    border:5,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="/Student/ViewAssignment">
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
                                                                                    border:5,
                                                                                    height:55,
                                                                                    width:120,
                                                                                    marginBottom:2,
                                                                                    borderColor:"white"}} 
                                                                               href="Student/ResultView">
                               Results
                          </Button >
                    </Container>
           
            </Box>
      </Grid>
      </Grid>
<br/>
<br/>
<Box sx={{  border: '4px dashed white', marginTop:"34px" }}>
<h1 style={{color: 'white'}}>NOTICES FOR ALL</h1>
</Box>

<React.Fragment>
                   
                   {
                       this.state.notices.map(notice=> {
                           return <SmallView notice={notice} count={3} />
                       })
                   }
               </React.Fragment><br/>
               <br/>


<Footer/>
   
</div>


      );
     }
   }

export default StudentMain;
