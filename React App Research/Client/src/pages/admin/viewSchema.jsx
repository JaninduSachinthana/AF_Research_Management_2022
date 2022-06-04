import React from "react";
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
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';

export default class AdminSchemaView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Assignment:[],
            Schema:[],
            Submission:[],
            schemaName:"",
            department:"",
            schema:null,
            fileName:"",
            viewSub: false,
            edit: false,
            id:"",
            message: "",
            type:"",
            open: true
        }
    }

    componentDidMount  () {

        axios.get("http://localhost:8088/marking/view")
        .then((res)=> {this.setState({
            Schema : res.data
        }); console.log(res.data)}  )
        .catch((err) => console.error(err));
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

    onViewSubmission = (id) => {
        this.viewSubOpen();
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

        await axios.get(`http://localhost:8088/marking/view/${id}`)
        .then((res)=> {this.setState({
            id : res.data._id,
            schemaName : res.data.schemaName,
            department : res.data.department,
            fileName : res.data.fileName
        }); console.log(res.data)} )
        .catch((err) => console.error(err));
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
        console.log(e.target.value);
    }

    onFileChange = (e) => {
        this.setState({
            schema:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
    }

    onSubmit = async (e) => {
        console.log(this.state.id);
        e.preventDefault();

        let formData = new FormData();
        formData.append("schemaName", this.state.schemaName);
        formData.append("department", this.state.department);
        formData.append("schema", this.state.schema);
        formData.append("fileName", this.state.fileName);

        await axios.put(`http://localhost:8088/marking/edit/${this.state.id}`, formData)
        .then((res)=> Alert("success", "Updated", res.data))
        .catch((err) => Alert("error", "error", err.message))
        //.finally(() => {window.location = `/Admin/viewSchema`;})

        this.handleOpen();
        
    }
    
    handleOpen = async () => {
        this.setState({
            open: true
        })
    }

    handleClose = async () => {
        this.setState({
            open: false
        })
    }

    onDelete = async (id) => {
        await axios.delete(`http://localhost:8088/marking/delete/${id}`)
        .then((res)=> Alert("success", "Deleted", res.data))
        .catch((err) => Alert("error", "error", err.message))

       // window.location.reload();
    }
    onSubViewClick = async (id) => {

        this.setState({
            itemID: id
        })

        this.viewSubOpen();
        console.log(id);

        await axios.get(`http://localhost:8088/results/view/${id}`)
        .then((res)=> {this.setState({
            Submission : res.data
        }); console.log(res.data)})
        .catch((err) => this.setState({
            message: err.message,
            type:"error",
            open: true
        }))

    }

    render() {
        return (
            <>
                <Navbar/>
                
                <div className="AllView">
                    <h1 style={{color: "white"}}> View Schema </h1>

                {this.state.Schema.map((item) => (
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
                            <Typography sx={{color:"white", fontSize:"25px", fontWeight:"bold"}}> {item.schemaName} </Typography>
                            </AccordionSummary>
                                <AccordionDetails>
                            <Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={2} sx={{color:"white", width:"200px", marginLeft:25}}>
                                    Department Name : {item.department}
                                </Grid>
                                
                                <Grid>
                                    <ListItemButton
                                        component="a" 
                                        href={`${item.schema}`}
                                        sx={{ 
                                            marginTop:"10px",
                                            border:"2px solid white",
                                            width:"250px",
                                            backgroundColor: "#616161",
                                            marginLeft:60
                                        }} >
                                        <ListItemIcon>
                                            <DownloadOutlinedIcon 
                                                fontSize="large"
                                                color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Schema Template" sx={{color:"white" , width:"200px"}} />
                                    </ListItemButton>  
                                </Grid>
                                                                     
                            </Grid>
                            </Typography>
                           
                                <Button 
                                    variant="outlined" 
                                    startIcon={<ModeEditOutlinedIcon />}
                                    color="warning"
                                    onClick={() => this.onEditClick(item._id)}
                                    sx={{ 
                                        marginLeft:10,
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
                                        marginLeft:19,
                                        marginTop:3,
                                        border:"2px solid white"
                                    }}  >
                                    Remove
                                </Button>
                                <Button 
                                    variant="outlined"  
                                    startIcon={<AssignmentRoundedIcon />}
                                    color="primary"
                                    onClick={() => this.onSubViewClick(item._id)}
                                    sx={{ 
                                        marginLeft:24,
                                        marginTop:3,
                                        border:"2px solid white"
                                    }} >
                                    View Results
                                </Button>
                      
                            </AccordionDetails>
                        </Accordion>
                 ))}

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

                                width: 1000,
                                backgroundColor: "black",
                                border: "2px solid white",
                                borderRadius:10,
                                p: 4,
                                marginLeft:10,
                                color:"white"

                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 700, border: '2px solid black',alignContent:"center"}} aria-label="customized table">
                                        <TableHead>

                                        <TableRow sx={{backgroundColor:"gray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px",color:"white",border:2, fontWeight:"bold"}}>Assignment Name </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px",color:"white",border:2, fontWeight:"bold"}}>Lecture Name</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px",color:"white",border:2, fontWeight:"bold"}}>Group ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px",color:"white",border:2, fontWeight:"bold"}}> Download Rusult </TableCell>

                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.Submission.map((item) => (
                                            <TableRow hover={true} sx={{height:"10px"}}>
                                            {/* <TableCell align="center" sx={{fontSize:"20px"}}> {item.schemaID} </TableCell> */}
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.LecName} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.desc} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.department} </TableCell>
                                            <TableCell align="center">
                                                <ListItemButton
                                                    // onClick={() => this.onDownload(item._id)}
                                                    component="a" 
                                                    href={item.results}
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

                        <Modal
                            open={this.state.edit}
                            onClose={this.signModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{border:"2px solid gray"}}
                        >
                        <Box sx={{
                            position: 'absolute',
                            width:450,
                            height:500,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            border: '2px solid white',
                            borderRadius:5,
                            boxShadow: "10px 10px 20px 10px black, 2px 2px 2px 0 #1b1b1b",                    
                            backgroundColor: "black"
                        }}>
                        <Typography 
                            id="modal-modal-title" 
                            variant="h6" 
                            component="h2"
                            sx={{ 
                                marginLeft:"100px",
                                marginTop:5,
                                color:"white",
                                fontSize:"25px",
                                fontWeight:"bold",
                             }}>
                            Edit Schema
                        </Typography>

                        <FormGroup sx={{marginTop:4, marginLeft:4, marginRight:4, borderRadius:3}}>
                            <ListItem sx={{backgroundColor:"whitesmoke"}}>
                            <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="medium" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                     
                            sx={{color:"white"}}
                            id="schemaName" 
                            label="Assignment Name" 
                            variant="standard"
                            defaultValue={this.state.schemaName}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                        
                    </FormGroup> <br/>

                    <FormGroup sx={{marginTop:4, marginLeft:4, marginRight:4, borderRadius:3}}>
                    <ListItem sx={{backgroundColor:"whitesmoke"}}>
                        <ListItemIcon >
                            <ApartmentRoundedIcon fontSize="medium" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select                                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="department"
                            defaultValue={this.state.department}
                            onChange={(e) => this.onChageSelected(e)}
                            label="Department"
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="SE">SE</MenuItem>
                            <MenuItem value="CS">CS</MenuItem>
                        </Select>
                        </ListItem>
                    </FormGroup> <br/>
                    
                    <FormGroup sx={{marginTop:4, marginLeft:4, marginRight:4, borderRadius:3}}>
                    <ListItem sx={{backgroundColor:"whitesmoke"}}>
                            <label htmlFor="icon-button-file">
                                <IconButton 
                                    color="primary"
                                    id="schema" 
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
                        sx={{border:"2px solid white", marginLeft:16,marginTop:3,width:160,height:50}} 
                        variant="outlined" 
                        size="medium"
                        onClick={(e) => this.onSubmit(e)}
                        color="warning" >
                        Update
                    </Button>  

                    </Box>                 
                    
                    </Modal>

                     <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        {/* <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                            {this.state.message}
                        </Alert> */}
                    </Snackbar> 

                </div>
            </>
        )
    }
}