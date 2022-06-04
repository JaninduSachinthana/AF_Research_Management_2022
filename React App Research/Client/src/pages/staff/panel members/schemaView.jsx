import React from "react";
import axios from 'axios';
import AlertMsg from '../../alert/message'; 

import Navbar from './nav-bar';
import './../../../component/css/Page.css';

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
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
import Alert from '@mui/material/Alert';
import ListItem from '@mui/material/ListItem';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';

export default class StaffSchemaViewPan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Assignment:[],
            Schema:[],
            schemaName:"",
            department:"",
            schema:null,
            fileName:"",
            viewSub: false,
            edit: false,
            schemaID : "",
            LecName : "",
            desc : "",
            results : null,
            fileName:"Insert File",
            open: false,
            sub: false,
            Submission : [],
            id:"",
            itemID:"",
            edit: false,
            editID : "",
            editRes:[],
            ELecName : "",
            Edesc : "",
            Eresults : null,
            EfileName:"",
            Edepartment:"",
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

        console.log(id);

        this.setState({editID:id});

        await axios.get(`http://localhost:8088/results/views/${id}`)
        .then((res)=> 
            {this.setState({
                ELecName: res.data.LecName,
                Edepartment: res.data.department,
                Edesc: res.data.desc,
                Eresults: res.data.results,
                EfileName: res.data.fileName,
            }); console.log(res.data)}
        )
        .catch((err) => AlertMsg("error", "error", err.message))
    }

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
        //console.log(e.target.value);
    }

    onFileChange = (e) => {
        this.setState({
            results:e.target.files[0],
            fileName:e.target.files[0].name
        })
    }

    onChageSelected = (e) => {
        this.setState({department: e.target.value});
    }

    onSubClick = (id) => {
        this.onSubmit(id);
    }

    onSubmit = async () => {

        let formData = new FormData();
        
        formData.append("schemaID", this.state.id);
        formData.append("LecName", this.state.LecName);
        formData.append("department", this.state.department);
        formData.append("desc", this.state.desc);
        formData.append("results", this.state.results);
        formData.append("fileName", this.state.fileName);

        await axios.post("http://localhost:8088/results/add", formData)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        .finally(() => this.viewSubaddClose())
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    viewSubaddOpen = (ID) => {    
        this.setState({
            sub: true,
            id: ID
        })
        
    };
    
    viewSubaddClose = () => {
        this.setState({
            sub: false
        })
    };

    onSubViewClick = async (id) => {

        this.setState({
            itemID: id
        })

        this.viewSubOpen();
        console.log(id);

        await axios.get(`http://localhost:8088/results/view/${id}`)
        .then((res)=> {this.setState({
            Submission : res.data,
        }); console.log(res.data)})
        .catch((err) => this.setState({
            message: err.message,
            type:"error",
            open: true
        }))

    }

    onDelete = async (id) => {

        await axios.delete(`http://localhost:8088/results/delete/${id}`)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        .finally(() => this.onSubViewClick(this.state.itemID))

        //this.viewSubOpen();
    }

    onUpdate = async () => {

        let formData = new FormData();
        
        formData.append("schemaID", this.state.id);
        formData.append("LecName", this.state.ELecName);
        formData.append("department", this.state.Edepartment);
        formData.append("desc", this.state.Edesc);
        formData.append("results", this.state.Eresults);
        formData.append("fileName", this.state.EfileName);

        console.log(formData);

        await axios.put(`http://localhost:8088/results/edit/${this.state.editID}`, formData)
        .then((res)=> AlertMsg("success", "Updated", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        .finally(() => this.viewSubaddClose())
    }

    render() {
        return (
            <>
                <Navbar/>
                
                <div className="AllView">
                    <h1 style={{color: 'white'}}> View Schema </h1>

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
                                <Grid item xs={2} sx={{color:"white", width:"200px"}}>
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
                                            marginLeft:"100px"
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
                            <Stack 
                                direction="row" 
                                spacing={2}
                                sx={{ 
                                    marginTop:"10px"
                                }} >
                                
                                <Button 
                                    variant="contained" 
                                    startIcon={<AssignmentRoundedIcon />}
                                    color="primary"
                                    onClick={() => this.onSubViewClick(item._id)}
                                    sx={{ 
                                        marginRight:"100px",
                                        border:"2px solid white"
                                    }} >
                                    View Results
                                </Button>

                                <Button 
                                    variant="contained" 
                                    startIcon={<PostAddRoundedIcon />}
                                    color="primary"
                                    onClick={() => this.viewSubaddOpen(item._id)}
                                    sx={{ 
                                        marginRight:"100px",
                                        border:"2px solid white"
                                    }} >
                                    Submit Results
                                </Button>
                            </Stack>
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
                                width: 1100,
                                bgcolor: 'background.paper',
                                border: '5px solid black',
                                boxShadow: 24,
                                backgroundColor:"lightgray",
                                p: 4
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 700, border: '2px solid black'}} aria-label="customized table">
                                        <TableHead>
                                        <TableRow sx={{backgroundColor:"gray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Assignment Name </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Lecture Name</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Department</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}> Download Rusult </TableCell>
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
                                                    //onClick={() => this.onDownload(item._id)}
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
                                            <TableCell align="center">
                                                <ListItemButton
                                                    onClick={() => this.onEditClick(item._id)}
                                                    sx={{ 
                                                        marginTop:"10px"
                                                    }} >
                                                    <ListItemIcon>
                                                        <CreateIcon 
                                                            fontSize="large"
                                                            color="error" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Edit" />
                                                </ListItemButton>  
                                            </TableCell>
                                            <TableCell align="center">
                                                <ListItemButton
                                                    onClick={() => this.onDelete(item._id)}
                                                    sx={{ 
                                                        marginTop:"10px"
                                                    }} >
                                                    <ListItemIcon>
                                                        <DeleteForeverIcon 
                                                            fontSize="large"
                                                            color="error" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Delete" />
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
                            open={this.state.sub}
                            onClose={this.viewSubaddClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{border:"2px solid gray"}}
                        >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
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
                                marginLeft:"100px",
                                color:"white",
                                fontSize:"25px",
                                fontWeight:"bold",
                             }}>
                            Insert Result Sheet
                        </Typography>

                        <FormGroup>
                            <ListItem sx={{backgroundColor:"whitesmoke"}}>
                            <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        <TextField 
                            fullWidth
                            sx={{color:"white"}}
                            id="LecName" 
                            label="Lecturer Name" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                        
                            </FormGroup> <br/>

                            <FormGroup >
                            <ListItem sx={{backgroundColor:"whitesmoke"}}>
                                <ListItemIcon >
                                    <ApartmentRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                <Select 
                                    fullWidth                    
                                    variant="standard"
                                    labelId="demo-simple-select-standard-label"
                                    id="department"
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

                            <FormGroup>
                                <ListItem sx={{backgroundColor:"whitesmoke"}}>
                                <ListItemIcon>
                                <NoteAltIcon fontSize="medium" />
                                </ListItemIcon>
                                <TextField 
                                    fullWidth
                                    sx={{color:"white"}}
                                    id="desc" 
                                    label="Description" 
                                    variant="standard"
                                    onChange={(e) => this.onChange(e)}
                                    size="medium" required/>
                                </ListItem>
                            
                            </FormGroup> <br/>
                                
                                <FormGroup >
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
                                    fullWidth
                                    sx={{border:"2px solid white"}} 
                                    variant="contained" 
                                    size="small"
                                    onClick={() => this.onSubmit()}
                                    color="success" >
                                    Submit
                                </Button>  

                            </Box>                 
                            
                            </Modal>

                     <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                            {this.state.message}
                        </Alert>
                    </Snackbar> 

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
                            width: 400,
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
                                marginLeft:"100px",
                                color:"white",
                                fontSize:"25px",
                                fontWeight:"bold",
                             }}>
                            Edit Result Sheet
                        </Typography>

                        <FormGroup>
                            <ListItem sx={{backgroundColor:"whitesmoke"}}>
                            <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        <TextField 
                            fullWidth
                            sx={{color:"white"}}
                            id="ELecName" 
                            label="Lecturer Name" 
                            variant="standard"
                            defaultValue={this.state.ELecName}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                        
                            </FormGroup> <br/>

                            <FormGroup >
                            <ListItem sx={{backgroundColor:"whitesmoke"}}>
                                <ListItemIcon >
                                    <ApartmentRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                <Select 
                                    fullWidth                    
                                    variant="standard"
                                    labelId="demo-simple-select-standard-label"
                                    id="Edepartment"
                                    defaultValue={this.state.Edepartment}
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

                            <FormGroup>
                                <ListItem sx={{backgroundColor:"whitesmoke"}}>
                                <ListItemIcon>
                                <NoteAltIcon fontSize="medium" />
                                </ListItemIcon>
                                <TextField 
                                    fullWidth
                                    sx={{color:"white"}}
                                    id="Eesc" 
                                    defaultValue={this.state.Edesc}
                                    label="Description" 
                                    variant="standard"
                                    onChange={(e) => this.onChange(e)}
                                    size="medium" required/>
                                </ListItem>
                            
                            </FormGroup> <br/>
                                
                                <FormGroup >
                                <ListItem sx={{backgroundColor:"whitesmoke"}}>
                                        <label htmlFor="icon-button-file">
                                            <IconButton 
                                                color="primary"
                                                id="schema" 
                                                aria-label="upload picture"
                                                component="span">
                                                <UploadFileRoundedIcon />                                                                  
                                            </IconButton>
                                            {this.state.EfileName} 
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
                                    fullWidth
                                    sx={{border:"2px solid white"}} 
                                    variant="contained" 
                                    size="small"
                                    onClick={() => this.onUpdate()}
                                    color="success" >
                                    Update
                                </Button>  

                            </Box>                 
                            
                            </Modal>

                </div>
            </>
        )
    }
}