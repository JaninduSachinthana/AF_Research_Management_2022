import React from "react";
import axios from 'axios';

import Navbar from './nav-bar';
import './student.css';


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
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default class StudentSchemaView extends React.Component {

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
            itemID:""
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

    onEditClick = () => {
        this.signModalOpen();
    }

    handleClose = () => {
        this.setState({
            open: false
        })
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
                
                <div className="page">

                    <br/>
                    <br/>
                    <br/>
                    <br/>

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
                                top: '30%',
                                left: '57%',
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
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", color:"white"}}>Assignment Name </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", color:"white"}}>Lecture Name</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", color:"white"}}>Group ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", color:"white"}}> Download Rusult </TableCell>
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
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
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