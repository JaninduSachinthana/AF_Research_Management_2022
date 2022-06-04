import React from 'react';
import axios from 'axios';

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
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ListItemText from '@mui/material/ListItemText';

export default class ViewAssignmentSubmission extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Assignment:[],
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

    onViewSubmission = async (id) => {
        this.viewSubOpen();

        console.log(id);
        await axios.get(`http://localhost:8088/research/view/${id}`)
        .then((res) => {this.setState({
            researches : res.data
        }); console.log(res.data)})
        .catch((err) => this.setState({
            
        }))
    }

    handleClose = () => {
        this.setState({
            open: false
        })
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
                    <h1> View Assignment </h1>

                    {this.state.Assignment.map((item) => (

                        <Accordion sx={{
                            marginTop:"20px",
                            backgroundColor: "lightgray"
                            }}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>{item.asgName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    Department : {item.department}
                                </Grid>
                                <Grid item xs={3}>
                                    End Date: {item.endDate}
                                </Grid>
                                <Grid item xs={3}>
                                    End Time: {item.endTime}
                                </Grid>
                                    <ListItemButton
                                        component="a" 
                                        href={`${item.template}`}
                                        sx={{ 
                                            marginTop:"10px"
                                        }} >
                                        <ListItemIcon>
                                            <DownloadOutlinedIcon 
                                                fontSize="large"
                                                color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Download Template" />
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
                                    startIcon={<AssignmentRoundedIcon />}
                                    color="primary"
                                    onClick={() => this.onViewSubmission(item._id)}
                                    sx={{ 
                                        marginLeft:"200px"
                                    }} >
                                    View Submissions
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
                                width: 900,
                                bgcolor: 'background.paper',
                                border: '5px solid black',
                                boxShadow: 24,
                                backgroundColor:"lightgray",
                                p: 4
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 700, border: '2px solid black', }} aria-label="customized table">
                                        <TableHead>
                                        <TableRow sx={{backgroundColor:"gray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Assignment Name </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Student ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Group ID</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold"}}>Download Research</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.researches.map((item) => (
                                            <TableRow hover={true} sx={{height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.asgName} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.stdID} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px"}}> {item.grpID} </TableCell>
                                            <TableCell align="center">
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