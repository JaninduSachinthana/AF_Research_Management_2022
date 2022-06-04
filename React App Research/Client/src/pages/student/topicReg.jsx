import React from 'react';

import Navbar from './nav-bar';
import './../../component/css/Page.css';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class TopicRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stdID:"",
            grpID:"",
            title:"",
            email:"",
            open:false
        }
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = () => {
        this.handleClose();

        const group = {
            stdID: this.state.stdID,
            grpID: this.state.grpID,
            title: this.state.title,
            email: this.state.email
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
                    <h1> TopicRegister </h1>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5,                        
                        }}>
                        <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="stdID" 
                            label="Leader ID"  
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
                            <GroupsRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="grpID" 
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
                            <GroupsRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="title" 
                            label="Research Topic"  
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
                            <MailRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField 
                            id="email" 
                            label="Leader Email"  
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
                                click Confirm to register the topic
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