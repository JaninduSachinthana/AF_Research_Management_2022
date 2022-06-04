import React from 'react';
import axios from 'axios';
import AlertMsg from '../alert/message'; 

import Navbar from './nav-bar';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

import './../../component/css/Page.css';


export default class ResearchSubmit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stdID:"",
            grpID:"",
            file:null,
            message:"",
            type:"",
            open:false,
            fileName:"Insert File"
        }
    }

    componentDidMount() {
        //console.log(this.state.id);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("stdID", this.state.stdID);
        formData.append("grpID", this.state.grpID);
        formData.append("file", this.state.file);

        await axios.post("http://localhost:8088/research/add", formData)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onFileChange = (e) => {
        this.setState({
            file:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <>
                <Navbar/>

                <div className="AllView">
                    <h1>Research Submission</h1>

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
                            label="Student ID" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                    </FormGroup>

                    <FormGroup sx={{ 
                        width:400,
                        marginLeft:40,
                        marginBottom:5
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
                        marginBottom:5
                        }}>
                            <label htmlFor="icon-button-file">
                                <IconButton 
                                    color="primary"
                                    id="file" 
                                    aria-label="upload picture"
                                    component="span">
                                    <UploadFileRoundedIcon />                                                                  
                                </IconButton>
                                {this.state.fileName} 
                                <Input 
                                    sx={{
                                        display: 'none',
                                    }}
                                    id="icon-button-file"                                    
                                    onChange={(e) => this.onFileChange(e)}                                    
                                    type="file" />                                
                            </label>
                        </FormGroup>

                    <Button 
                        sx={{
                            width:400,
                            marginLeft:40
                        }} 
                        variant="contained" 
                        size="small"
                        onClick={(e) => this.onSubmit(e)}
                        color="success" >
                        Submit
                    </Button>

                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                            {this.state.message}
                        </Alert>
                    </Snackbar>
                    
                </div>
                
            </>
        )
    }
}