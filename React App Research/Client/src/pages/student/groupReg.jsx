import React from 'react';

import './../../component/css/Page.css';
import Navbar from './nav-bar';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default class GroupAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groupid:"",
            department: "",
            memberLeader: "",
            memberone: "",
            membertwo:"",
            mamberthree:"",
            open:false
        }
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
    }

    onSubmit = () => {
        this.handleClose();

        const group = {
            groupid: this.state.groupid,
            department: this.state.department,
            memberLeader: this.state.memberLeader,
            memberone: this.state.memberone,
            membertwo:this.state.membertwo,
            mamberthree: this.state.mamberthree
        }

        console.log(group);
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
                    <h1>Group Registration</h1>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <GroupsRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="groupid" 
                            label="Group ID"  
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <ApartmentRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                        <Select                            
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="department"
                            //value={this.state.department}
                            onChange={(e) => this.onChageSelected(e)}
                            lable="Department"
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="SE">SE</MenuItem>
                            <MenuItem value="CS">CS</MenuItem>
                        </Select>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="memberLeader" 
                            label="Student 1(Leader)" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="memberone" 
                            label="Student 2" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="membertwo" 
                            label="Student 3" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="mamberthree" 
                            label="Student 4" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <Button 
                        sx={{
                            width:400,
                            marginLeft:40
                        }} 
                        variant="contained" 
                        size="small"
                        onClick={this.handleClickOpen}
                        color="success" >
                        Submit
                    </Button>

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
                                click Confirm to register the group
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