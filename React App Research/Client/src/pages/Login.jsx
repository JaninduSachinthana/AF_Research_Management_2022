import React from "react";
import axios from "axios";

import Navbar from './Main';

import './../component/css/Page.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import LockRoundedIcon from '@mui/icons-material/LockRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class LogIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            log: true,
            type:"Student",
            email:"",
            password:"",
           // data:""            
        }
    }

    signModalClose = () => {
        this.setState({
          log: false
        })
    };

    onChageSelected = (e) => {
        this.setState({type: e.target.value});
    }
    
    onSignIn = async () => {

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)

        try {
			const url = "http://localhost:8088/login/login";
			const { data: res } = await axios.post(url, user);
			localStorage.setItem("token", res.data.token);
            console.log(res);
			//window.location = "/best";
            if(res.data.type == "Student") {
                window.location = "/Student"
            }else if(res.data.type == "Panel Member") {
                window.location = "/Panel"
            }else if(res.data.type == "Supervisor") {
                window.location = "/Supervisor"
            }else if(res.data.type == "Admin") {
                window.location = "/Admin"
            }
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

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (   
            <>
                <Navbar/>

                <div className="AllView">
                  
                  <h1>Student</h1>

                  <Modal
                    open={this.state.log}
                    onClose={this.signModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sign In
                    </Typography>

                    <div>

                    <FormGroup>
                    <ListItem  disablePadding>
                        <ListItemIcon>
                        <EmailRoundedIcon fontSize="large" />             
                        </ListItemIcon>           
                        <TextField
                        fullWidth 
                        label="Email"
                        placeholder="Email"
                        id="email"
                        data-testid="email"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) => this.onChange(e)}
                        />
                    </ListItem>
                    </FormGroup> <br/>
                        
                    <FormGroup>
                        <ListItem  disablePadding>
                        <ListItemIcon>
                            <LockRoundedIcon fontSize="large" />
                        </ListItemIcon>
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            data-testid="password"
                            autoComplete="current-password"
                            variant="filled"
                            onChange={(e) => this.onChange(e)}
                        />
                        </ListItem>
                    </FormGroup> <br/>
                    <FormGroup>
                        <ListItem  disablePadding>
                            <ListItemIcon>
                                <ManRoundedIcon fontSize="large"/>
                            </ListItemIcon>
                            <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                            <Select
                                fullWidth                            
                                variant="filled"
                                labelId="demo-simple-select-standard-label"
                                id="department"
                                value={this.state.type}
                                onChange={(e) => this.onChageSelected(e)}
                                lable="Department"
                                >
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Panel Member">Panel Member</MenuItem>
                                <MenuItem value="Supervisor">Supervisor</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </ListItem>
                    </FormGroup> <br/>

                        <Button 
                        fullWidth
                        placeholder="Sign In"
                        onClick={this.onSignIn}
                        variant="contained" 
                        data-testid="submit"
                        color="success">
                        Sign In
                        </Button>
                        
                    </div>
                    
                    </Box>
                </Modal>
                </div>

            </>          
               
        );
    }
}