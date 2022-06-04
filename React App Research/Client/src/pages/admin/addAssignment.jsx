import React from 'react';
import axios from 'axios';

import  {Alert} from '../alert/message';
import Navbar from './nav-bar';
import './../../component/css/Page.css';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import DateRangeIcon from '@mui/icons-material/DateRange';

import  AssgmentValidations from "./../validation/Addassigment";

export default class AddAssignment extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {            
            asgName:"",
            endDate:"",
            endTime:"",
            template:"",
            department:"",
            fileName:"Insert File",
            message:"",
            type:"",
            open:false
        }
    }
       // Function for Check Status code
       handleError = (err) => {
        if (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    Alert("error", "Something went wrong!", err.response.data)

                }
            } else {
                Alert("error", "Something went wrong.", err)

            }
        }
    }
    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onFileChange = (e) => {
        this.setState({
            template:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
    }

    onSubmit =  (e) => {
        e.preventDefault();

        const result = AssgmentValidations({
            asgName: this.state.asgName,
            endDate: this.state.endDate,
            endTime: this.state.endTime,
            department: this.state.department
        });
       
     if(result.status){
        const formData = new FormData();
        formData.append("asgName", this.state.asgName);
        formData.append("endDate", this.state.endDate);
        formData.append("endTime", this.state.endTime);
        formData.append("department", this.state.department);
        formData.append("template", this.state.template);
        formData.append("fileName", this.state.fileName);

      axios.post("http://localhost:8088/assignment/add", formData)
         
        .then(res => {
            Alert( "success", "Assignment Added Successfully");
            this.setState({
                asgName:"",
                endDate:"",
                endTime:"",
                template:"",
                department:"",
                fileName:"Insert File",
                message:"",
                type:"",
             
            })
            //window.location.reload("/Admin/ViewAssignment");                                                                       
        }).catch(err => {
            this.handleError(err);
        })
        }else{
            Alert("error", "Form Validation Error!", result.error)

        }
    }



    render() {
        return (
            <>
                <Navbar />

                <div className="AllView">
                    

                    <Container sx={{ 
                            color: "white",
                            border: '2px solid white',
                            width:"450px",
                            height:"auto",
                            border: '2px solid white',
                            borderRadius:5,                     
                            backgroundColor: "black",  
                            marginLeft:35,
                            marginTop:19,   
                            boxShadow: "10px 10px 20px 10px black, 2px 2px 2px 0 #1b1b1b",
                                    
                        }}>                    
                <h1 style={{color: 'white'}}> Add Assignment </h1>
                    <FormGroup sx={{marginTop:3,marginLeft:4,width:300,border:1,borderColor:"blue"}}>
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        <TextField 
                          
                            id="asgName" 
                            label="Assignment Name" 
                            placeholder='Assignment Name'
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="small" required/>
                        </ListItem>
                    </FormGroup>

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:300,border:1,borderColor:"blue"}}>
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <DateRangeIcon fontSize="medium" />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">End Date</InputLabel>
                        <TextField 
                           
                            type="date"
                            placeholder="End Date"
                            id="endDate" 
                            label="" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup>

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:300,border:1,borderColor:"blue"}}>
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <AccessTimeIcon fontSize="medium" />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">End Time  </InputLabel>
                        <TextField 
                           
                            type="time"
                            id="endTime" 
                            label="" 
                            placeholder="End Time"
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup>                    

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:300,border:1,borderColor:"blue"}}>
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <ApartmentRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                        <Select  
                                                     
                            variant="standard"
                            placeholder='Department'
                            labelId="demo-simple-select-standard-label"
                            id="department"
                            value={this.state.department}
                            onChange={(e) => this.onChageSelected(e)}
                            lable="Department"
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="SE">SE</MenuItem>
                            <MenuItem value="CS">CS</MenuItem>
                        </Select>
                        </ListItem>
                    </FormGroup>

                    <FormGroup sx={{marginTop:2,marginLeft:4,width:300,border:1,borderColor:"blue"}}>
                        <ListItem sx={{backgroundColor:"whitesmoke", color:"black"}} >
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
                            </ListItem>
                        </FormGroup>

                    <Button 
                        label="Submit"
                        sx={{marginTop:3, border:"2px solid white", marginBottom:2,width:160,marginLeft:12}} 
                        variant="outlined" 
                        size="medium"
                        onClick={(e) => this.onSubmit(e)}
                        color="success" >
                        Submit
                    </Button>

                    </Container>

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