import React from 'react';
import axios from 'axios';

import './../../component/css/Page.css';
import Navbar from './nav-bar';
import {Alert} from './../alert/message';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, ListItem, Typography } from '@mui/material';

export default class StudentAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            open:false,
            type:"Admin"
        }
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = async () => {
        this.handleClose();

        const student = {
            firstName: this.state.fname,
            lastName: this.state.lname,
            email: this.state.email,
            password: this.state.password,            
            contact: this.state.contact,
            type: this.state.type
        }
        console.log(student);

        try {

            axios.post("http://localhost:8088/register/add", student)
            .then((res)=> Alert('success', 'Registered', res.message))
            .catch((err) => Alert('error', 'Error', err.message));

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
    }

    handleClickOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };

    render() {
        return (
            <>
                <Navbar/>

                <div className="AllView">

        <Box sx={{
           position: 'absolute',
           width:500,
           height:750,
           marginTop:9,
           marginLeft:14,
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           border: '2px solid white',
           borderRadius:5,
           boxShadow: "10px 10px 20px 10px black, 2px 2px 2px 0 #1b1b1b",
           color:"white",                   
           backgroundColor: "black"
       }}>
            <Typography  sx={{marginLeft:17,marginTop:2,marginBottom:2,fontSize:29}}>
                Admin Registration
               </Typography>
            
                    <FormGroup sx={{          
                          backgroundColor:"white",                       
                          marginLeft:9,
                          marginBottom:5, 
                          marginTop:6,
                          width:350,
                          border:"black",
                         borderRadius:1                   
                        }}>
                   <ListItem>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="medium" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                              id="fname" 
                              type="text"
                            label ="Student Name" 
                            placeholder='First Name'
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                  </ListItem>
            </FormGroup>

                    <FormGroup sx={{ 
                       backgroundColor:"white",                       
                       marginLeft:9,
                       marginBottom:5, 
                       marginTop:6,
                       width:350,
                       borderRadius:1                          
                        }}>
                  <ListItem>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="medium" sx={{color:"black"}} />
                        </ListItemIcon>
                        <TextField 
                            id="lname" 
                            type="text"
                            label="Student Name" 
                            placeholder='Last Name'
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                  </ListItem>
              </FormGroup>

                    <FormGroup sx={{ 
                      backgroundColor:"white",                       
                      marginLeft:9,
                      marginBottom:5, 
                      marginTop:6,
                      width:350,
                      borderRadius:1                           
                        }}>
                   <ListItem>
                        <ListItemIcon>
                            <MailRoundedIcon fontSize="medium" sx={{color:"black"}} />
                        </ListItemIcon>
                        <TextField 
                              id="email"  
                            placeholder='Email'
                            label="Student Email" 
                            type="email"
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                     backgroundColor:"white",                       
                     marginLeft:9,
                     marginBottom:5, 
                     marginTop:6,
                     width:350,
                     borderRadius:1                    
                        }}>
                  <ListItem>
                        <ListItemIcon>
                            <CallRoundedIcon fontSize="medium" sx={{color:"black"}} />
                        </ListItemIcon>
                        <TextField 
                             id="contact" 
                            label="Contact No" 
                            placeholder='Contact No'
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                  </ListItem>
                    </FormGroup>

                    <FormGroup sx={{   
                       backgroundColor:"white",                       
                       marginLeft:9,
                       marginBottom:5, 
                       marginTop:6,
                       width:350,
                       borderRadius:1                          
                        }}>
                       <ListItem>
                         <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="medium" sx={{color:"black"}} />
                          </ListItemIcon>
                          <TextField 
                               id="password"  
                            type="password"
                            label="password" 
                            placeholder='Password'
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                          </ListItem>
                    </FormGroup>

                    <Button 
                       
                        variant="outlined" 
                        size="small"
                        sx={{border:2,borderColor:"white",  width:180,
                        marginLeft:17, fontSize:16}}
                        name = "submit"
                     
                        onClick={this.handleClickOpen}
                        color="success" >
                        Submit
                    </Button>
   </Box>
                    <Dialog
                        open={this.state.open}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle>{"Registration Confirmation"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-title">
                                click Confirm to register the user
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error"  onClick={this.handleClose}>Cancel</Button>
                            <Button color="success" data-testid="submit" onClick={() => this.onSubmit()}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
        )
    }
}