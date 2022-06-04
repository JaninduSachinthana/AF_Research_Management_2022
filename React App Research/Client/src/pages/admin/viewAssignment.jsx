import React from 'react';
import axios from 'axios';
import {Alert} from '../alert/message'; 

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
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

export default class ViewAssignment extends React.Component {

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
            fileName:"",
            id:"",
            message:"",
            type:"",
            open:false,
            viewSub: false,
            researches:[],
            url:""
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

    onEditClick = async (id) => {
        this.signModalOpen();

        await axios.get(`http://localhost:8088/assignment/view/${id}`)
        .then((res)=>{this.setState({
            id: res.data._id,
            asgName:res.data.asgName,
            endDate:res.data.endDate,
            endTime:res.data.endTime,
            template:res.data.template,
            department:res.data.department,
            fileName:res.data.fileName
        }); console.log(res.data)} )
        .catch((err) => console.error(err));
    }

    onUpdate = async () => {

        let formData = new FormData();
        formData.append("asgName", this.state.asgName);
        formData.append("endDate", this.state.endDate);
        formData.append("endTime", this.state.endTime);
        formData.append("department", this.state.department);
        formData.append("template", this.state.template);
        formData.append("fileName", this.state.fileName);
        
        console.log(this.state.id);

        await axios.put(`http://localhost:8088/assignment/edit/${this.state.id}`, formData)
        .then((res)=> Alert("success", "Updated", res.data))
        .catch((err) => Alert("error", "Error", err.message))
        //.finally(() => window.location = '/Admin/ViewAssignment');
        this.componentDidMount();
    }

    onFileChange = (e) => {
        this.setState({
            template:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
    }

    onDelete = async (id) => {
        console.log(id);
        
        await axios.delete(`http://localhost:8088/assignment/delete/${id}`)
        .then((res)=> Alert("success", "Deleted", res.data))
        .catch((err) => Alert("error", "Error", err.message))
        //.finally(() => window.location = '/Admin/ViewAssignment');
        this.componentDidMount();
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    viewSubOpen = () => {    
        this.setState({
            viewSub: true
        })
        
    };
    
    viewSubClose = () => {
        this.setState({
            viewSub: false
        })
    };

    onViewSubmission = async (id) => {
        this.viewSubOpen();

        console.log(id);
        await axios.get(`http://localhost:8088/research/view/${id}`)
        .then((res) => {this.setState({
            researches : res.data
        }); console.log(res.data)})
        .catch((err) => console.error(err.message))
    }

    onDownload = async  (id) => {
        await axios.get(`http://localhost:8088/research/download/${id}`)
        .then((res) => {this.setState({
            url : res.data
        }); console.log(res.data)})
        .catch((err) => console.error(err.message))
        .finally(() => {window.location = `${this.state.url}`})
    }

    render() {
        return (
            <>
                <Navbar/>

                <div className="AllView">
                    <h1 style={{color: 'white'}}> View Assignment </h1>

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
                                    End Date: {item.endDate}
                                </Grid>
                                <Grid item xs={3} sx={{color:"white", width:"200px"}}>
                                    End Time: {item.endTime}
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
                         
                                <Button 
                                    variant="outlined" 
                                    startIcon={<ModeEditOutlinedIcon />}
                                    color="warning"
                                    onClick={() => this.onEditClick(item._id)}
                                    sx={{ 
                                        marginLeft:12,
                                        marginTop:3,
                                        border:"2px solid white"
                                    }} >
                                    Edit
                                </Button>
                                <Button 
                                   variant="outlined"  
                                   startIcon={<DeleteIcon />}
                                    onClick={() => this.onDelete(item._id)}                                    
                                    color="error"
                                    sx={{ 
                                        marginLeft:12,
                                        marginTop:3,
                                        border:"2px solid white"
                                    }}  >
                                    Remove
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    startIcon={<AssignmentRoundedIcon />}
                                    color="primary"
                                    onClick={() => this.onViewSubmission(item._id)}
                                    sx={{ 
                                        marginLeft:12,
                                        marginTop:3,
                                        border:"2px solid white"
                                    }} >
                                    View Submissions
                                </Button>
                     
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
                            width: 450,
                            backgroundColor: "black",
                            border: "2px solid white",
                            borderRadius:4,
                            boxShadow:"0 0 20px 0 black, 2px 2px 2px 0 #1b1b1b"  
                        }}>
                        <Typography 
                            id="modal-modal-title" 
                            variant="h6" 
                            component="h2"
                            sx={{ 
                                marginLeft:"100px",
                                marginTop:4,
                                color:"white",
                                fontSize:"25px",
                                fontWeight:"bold",
                             }}>
                            Edit Assignment
                        </Typography>

                            <div>                            
                                
         <FormGroup sx={{marginTop: "20px"}}>
            <ListItem sx={{backgroundColor:"whitesmoke",
                            width:320,
                            height:50,
                            marginLeft:8,
                            borderRadius:3,
                            marginTop:2}} disablePadding>
                        <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="large" sx={{color:"black"}}/>
                        </ListItemIcon>
             
                        <TextField 
                            
                            id="asgName" 
                            //label="Assignment Name" 
                            variant="standard"
                            defaultValue={this.state.asgName}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup>    <br/> 

                    <FormGroup>
                        <ListItem sx={{backgroundColor:"whitesmoke",
                            width:320,
                            height:50,
                            marginLeft:8,
                            borderRadius:3,
                            marginTop:2}} disablePadding>
                        <ListItemIcon>
                            <AccessTimeIcon fontSize="large" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                         
                            type="date"
                            id="endDate" 
                            //label="" 
                            variant="standard"
                            defaultValue={this.state.endDate}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup>    <br/> 

                    <FormGroup>
                    <ListItem sx={{backgroundColor:"whitesmoke",
                            width:320,
                            height:50,
                            marginLeft:8,
                            borderRadius:3,
                            marginTop:2}} disablePadding>
                        <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="large" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                           
                            type="time"
                            id="endTime" 
                            //label="" 
                            variant="standard"
                            defaultValue={this.state.endTime}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                        </ListItem>
                    </FormGroup>      <br/>                

                    <FormGroup>
                        <ListItem sx={{backgroundColor:"whitesmoke",
                            width:320,
                            height:50,
                            marginLeft:8,
                            borderRadius:3,
                            marginTop:2}}  disablePadding>
                        <ListItemIcon>
                            <ApartmentRoundedIcon fontSize="large" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                                                 
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="department"
                            //placeholder={this.state.department}
                            defaultValue={this.state.department}
                            onChange={(e) => this.onChageSelected(e)}
                            //lable="Department"
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="SE">SE</MenuItem>
                            <MenuItem value="CS">CS</MenuItem>
                        </Select>
                        </ListItem>
                    </FormGroup>  <br/> 

                    <FormGroup>
                    <ListItem sx={{backgroundColor:"whitesmoke",
                            width:320,
                            height:50,
                            marginLeft:8,
                            borderRadius:3,
                            marginTop:2}}  disablePadding>
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
                            </FormGroup>  <br/> 

                                <Button 
                                   
                                    sx={{border:"2px solid blue",
                                         width:130,
                                         marginLeft:20,
                                         marginTop:3,
                                         marginBottom:3
                                      }}
                                    onClick={this.onUpdate}
                                    variant="outlined"
                                    color="primary">
                                    Update
                                </Button>
                                
                            </div>
                            
                            </Box>
                        </Modal>

                        <Modal 
                            open={this.state.viewSub}
                            onClose={this.viewSubClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">

                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 900,
                                marginLeft:21,
                                border: "2px solid white",
                                borderRadius:4,
                                boxShadow: "10px 10px 20px 10px black, 2px 2px 2px 0 #1b1b1b",
                                 backgroundColor:"black",
                                p: 4
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 700, border: '3px solid white'}} aria-label="customized table">
                                        <TableHead>
                                        <TableRow sx={{backgroundColor:"gray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3}}>Assignment Name </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3}}>Student ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3}}>Group ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3}}>Download Research</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.researches.map((item) => (
                                            <TableRow hover={true} sx={{height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {item.asgName} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {item.stdID} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {item.grpID} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}>
                                                <ListItemButton
                                                    onClick={() => this.onDownload(item._id)}
                                                    sx={{ 
                                                        marginTop:"10px"
                                                    }} >
                                                    <ListItemIcon>
                                                        <DownloadOutlinedIcon 
                                                            fontSize="large"
                                                            color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Download" />
                                                </ListItemButton>  
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                            </Box>
                        </Modal>

                        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                                {this.state.message}
                            </Alert>
                        </Snackbar>
                </div>
            </>
        )
    }
}