import { Avatar, Button, CardContent, Grid, List, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "./nav-bar";
import './supervisor.css';
import image01 from './con01.jpg';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function ContactUSSupervisor() {


    const navigateChat =()=>{
        window.location='/chat';
    };

return(
    <>
    
     <Navbar/>
     <div className="pageccon">
           
           <Box sx={{ width:1000,
                      height:500,

           }}>
            <CardContent sx={{margin:2,minHeight:450,minWidth:1300}}  style={{ backgroundImage: `url(${image01})`,   
                 backgroundSize:"cover"
               }}>
                    <Typography sx={{marginLeft:67, marginTop:15, fontSize:50, color:"white"}}>
                         Get in Touch
                    </Typography>
               </CardContent>
           
              

    <Grid container sx={{marginLeft:30,marginTop:-12}} >
        <Grid item>

            <Box sx={{ backgroundColor:"white",
                    width:400,
                    height:300,
                    backgroundColor:"#C9F5DA",
                    color:"black",
                    border:6,
                    borderRadius:2,
                    borderColor:"black",
                    boxShadow:"8px 8px 8px 8px #014045"
            }}>
                <Container>  
                         <Avatar sx={{marginLeft:17, backgroundColor:"#C9F5DA"}}>
                               <AddIcCallIcon htmlColor="#024146" backgroundColor="#C9F5DA" fontSize="large" />
                         </Avatar>    

                     <Typography sx={{marginLeft:9,marginTop:1, fontSize:30,fontWeight:"bold", color:"black"}}>
                         Talk to SLIIT
                     </Typography>
                </Container>

                <Container>
                     <Typography sx={{marginLeft:2,marginTop:1, fontSize:18,fontWeight:"italic", color:"black"}}>
                         You can contacat for more informations to SLIIT and Supervisors.
                     </Typography>
                </Container>
              
                <Container sx={{marginLeft:10}}>
                               <List></List>
                         <List> +94 9823923</List>  
                         <List> +94 9823567</List> 
                         <List> +94 9823523</List>       
                </Container>
            </Box>

         </Grid>

         <Grid item sx={{marginLeft:20}}>

            <Box sx={{ backgroundColor:"white",
                    width:400,
                    height:300,
                    backgroundColor:"#C9F5DA",
                    color:"black",
                    border:6,
                    borderRadius:2,
                    borderColor:"black",
                    boxShadow:"8px 8px 8px 8px #014045"
            }}
            >

              <Container>  
                         <Avatar sx={{marginLeft:17, backgroundColor:"#C9F5DA"}}>
                               <ChatBubbleOutlineIcon htmlColor="#024146" backgroundColor="#C9F5DA" fontSize="large" />
                         </Avatar>    

                     <Typography sx={{marginLeft:10,marginTop:1, fontSize:30,fontWeight:"bold", color:"black"}}>
                         Live Chat
                     </Typography>
                </Container>

                <Container>
                     <Typography sx={{marginLeft:2,marginTop:1, fontSize:18,fontWeight:"italic", color:"black"}}>
                         You can chat with your Supervisors via               online chat section.
                     </Typography>
                </Container>

                <Container>
                    <Button sx={{ marginLeft:10,
                                  marginTop:4,
                                  fontWeight:"bold",
                                  fontSize:24,
                                  border:4,
                                  borderRadius:2,
                                  borderColor:"#015C5F"
                               }
                               }
                            //    fontSize="large" 
                                variant="outlined"
                               onClick={navigateChat}>
                          Live Chat
                    </Button>
                </Container>

            </Box>

         </Grid>

       </Grid>
             
   </Box>
        
     </div>
    </>
)
}

export default ContactUSSupervisor;