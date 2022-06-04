import React from 'react';
import axios from 'axios';
import AlertMsg from '../alert/message'; 

import Navbar from './nav-bar';
import './../../component/css/Page.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ListItem from '@mui/material/ListItem';

export default class StudentViewAssignment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Assignment:[],
            edit: false,
            asgName:"",
            endDate:"",
            endTime:"",
            template:"",
            department:"",
            TfileName:"",
            id:"",
            message:"",
            type:"",
            open:false,
            stdID:"",
            grpID:"",
            file:null,
            message:"",
            type:"",
            fileName:"Insert File"
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8088/assignment/view")
        .then((res)=> {this.setState({
            Assignment : res.data
        }); console.log(res.data)}  )
        .catch((err) => console.error(err));
    }

    signModalOpen = () => {    
        this.setState({
            edit: true
        })
        
    };
    
    signModalClose = () => {
        this.setState({
            edit: false
        })
    };

    onSubmissionClick = async (id) => {
        this.signModalOpen();

        await axios.get(`http://localhost:8088/assignment/view/${id}`)
        .then((res)=>{this.setState({
            id: res.data._id,
            asgName:res.data.asgName,
            endDate:res.data.endDate,
            endTime:res.data.endTime,
            template:res.data.template,
            department:res.data.department,
            TfileName:res.data.fileName
        }); console.log(res.data)} )
        .catch((err) => console.error(err));
    }

    onSubmit = async () => {
        //e.preventDefault();

        let formData = new FormData();
        formData.append("AsgID", this.state.id);
        formData.append("asgName", this.state.asgName);
        formData.append("stdID", this.state.stdID);
        formData.append("grpID", this.state.grpID);
        formData.append("file", this.state.file);

        await axios.post("http://localhost:8088/research/add", formData)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        .finally();

        this.signModalClose();
    }

    onFileChange = (e) => {
        this.setState({
            file:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
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
                    <h1 style={{color:"white"}}> View Assignment </h1>

                    {this.state.Assignment.map((item) => (

                        <Accordion sx={{
                            marginTop:"20px",
                            backgroundColor: "black",
                            border: "2px solid white",
                            radius: 10,
                            }}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color:"white"}}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{color:"white", fontSize:"25px", fontWeight:"bold"}}>{item.asgName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={2} sx={{color:"white", width:"200px"}}>
                                    Department : {item.department}
                                </Grid>
                                <Grid item xs={3} sx={{color:"white", width:"200px"}}>
                                    End Date : {item.endDate}
                                </Grid>
                                <Grid item xs={3} sx={{color:"white", width:"200px"}}>
                                    End Time : {item.endTime}
                                </Grid>
                                    <ListItemButton
                                        component="a" 
                                        href={`${item.template}`}
                                        sx={{ 
                                            marginTop:"10px",
                                            border:"2px solid white",
                                            width:"250px",
                                            backgroundColor: "#616161",
                                            marginLeft:"100px"
                                        }} >
                                        <ListItemIcon>
                                            <DownloadOutlinedIcon 
                                                fontSize="large"
                                                color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Download Template" sx={{color:"white" , width:"200px"}}/>
                                    </ListItemButton>                                   
                            </Grid>
                            </Typography>
                            <Stack 
                                direction="row" 
                                spacing={2}
                                sx={{ 
                                    marginTop:"10px"
                                }} >
                                <Button 
                                    variant="contained" 
                                    startIcon={<ModeEditOutlinedIcon />}
                                    color="primary"
                                    onClick={() => this.onSubmissionClick(item._id)}
                                    sx={{ 
                                        marginRight:"100px",
                                        border:"2px solid white"
                                    }} >
                                    Submission
                                </Button>
                            </Stack>
                            </AccordionDetails>
                        </Accordion>

                    ))}

                    <Modal
                        open={this.state.edit}
                        onClose={this.signModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{border:"2px solid gray"}}
                        >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '2px solid white',
                            boxShadow: 24,
                            p: 4,
                            backgroundColor: "black"
                        }}>
                        <Typography 
                            id="modal-modal-title" 
                            variant="h6" 
                            component="h2"
                            sx={{ 
                                marginLeft:"50px",
                                color:"white",
                                fontSize:"25px",
                                fontWeight:"bold",
                                marginTop:"20px"
                             }}>
                            Research Assignment Submission
                        </Typography> <br/>

                            <div>                            
                        <FormGroup >
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField
                            fullWidth 
                            id="stdID" 
                            label="Student ID" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup> <br/>

                    <FormGroup>
                    <ListItem sx={{backgroundColor:"whitesmoke"}} >
                        <ListItemIcon>
                            <GroupsRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <TextField
                            fullWidth 
                            id="grpID" 
                            label="Group ID" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup> <br/>
                    
                    <FormGroup>
                        <ListItem sx={{backgroundColor:"whitesmoke"}} >
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
                        </FormGroup> <br/>

                    <Button 
                        fullWidth
                        sx={{border:"2px solid white"}}
                        variant="contained" 
                        size="small"
                        onClick={() => this.onSubmit()}
                        color="success" >
                        Submit
                    </Button> <br/>

                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                            {this.state.message}
                        </Alert>
                    </Snackbar>
                         
                                
                            </div>
                            
                            </Box>
                        </Modal>
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
