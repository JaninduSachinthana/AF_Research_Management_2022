import React from 'react';
import axios from 'axios';

import './../../component/css/Page.css'
import {Alert} from './../alert/message';
import Navbar from './nav-bar';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, fontSize } from '@mui/system';
import { ListItem } from '@mui/material';
import { Typography } from '@mui/material';

export default class StaffRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            open:false,
            type:""
        }
    }

    onChageSelectedPos = (e) => {
        this.setState({type: e.target.value});
    }    
    
    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = async () => {
        this.handleClose();

        const staff = {
            firstName: this.state.fname,
            lastName: this.state.lname,
            email: this.state.email,
            password: this.state.password,            
            contact: this.state.contact,
            type: this.state.type
        }
        console.log(staff);

        try {
			const url = "http://localhost:8088/register/add";
			const { data: res } = await axios.post(url, staff);
            //alert(res.message);
            Alert('success', 'Registered', res.message)
			//navigate("/login");
			console.log(res.message);

            // axios.post("http://localhost:8088/register/add", student)
            // .then((res)=> console.log(res))
            // .catch((err) => console.error(err));

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
           height:760,
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
                    Student Registration
               </Typography>
                    <FormGroup sx={{ 
                        backgroundColor:"white",                       
                        marginLeft:4,
                        marginBottom:5, 
                        marginTop:6,
                        marginRight:4                       
                        }}>
                            <ListItem>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="medium" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="fname" 
                            label="First Name" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                        backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5, 
                        marginRight:4                         
                        }}>
                        <ListItem>     
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="lname" 
                            label="Last Name" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                             </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                      backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5,
                        marginRight:4                          
                        }}>
                     <ListItem>
                        <ListItemIcon>
                            <MailRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="email" 
                            label="Student Email" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                        backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5,
                        marginRight:4                          
                        }}>
                              <ListItem>
                        <ListItemIcon>
                            <CallRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="contact" 
                            label="Contact No" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                       backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5,
                        marginRight:4                          
                        }}>
                              <ListItem>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="password" 
                            type="password"
                            label="password" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                        backgroundColor:"white",
                        marginLeft:4,
                       
                        marginRight:4                         
                        }}>
                              <ListItem>
                        <ListItemIcon>
                            <ManRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
                        <Select                            
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="department"
                            value={this.state.position}
                            onChange={(e) => this.onChageSelectedPos(e)}
                            lable="Department"
                            >
                            <MenuItem value="Panel Member">Panel Member</MenuItem>
                            <MenuItem value="Supervisor">Supervisor</MenuItem>
                        </Select>
                        </ListItem>
                    </FormGroup>

                    <Button 
                        sx={{
                            width:180,
                            marginLeft:20,
                            marginTop:3,
                            marginBottom:2,
                            fontSize:16,
                            borderColor:"white"
                        }} 
                        variant="outlined" 
                        size="medium"
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
                            <Button color="error" onClick={this.handleClose}>Cancel</Button>
                            <Button color="success" onClick={() => this.onSubmit()}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                
                </div>
            </>
        )
    }
}