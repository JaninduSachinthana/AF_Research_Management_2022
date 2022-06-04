import React from 'react';
import './../../component/css/Page.css'
import axios from 'axios';
import Navbar from './nav-bar';
import AlertMsg from '../alert/message'; 

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Button from '@mui/material/Button';
import { Box, ListItem, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default class ViewSupervisors extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user:[],
            userID:"",
            edit: false,
            fname: "",
            lname: "",
            email: "",
            password: "",
            contact:"",
            type:"",
            open:false,
        }
    }

    componentDidMount  () {
        axios.get("http://localhost:8088/register/view/sup")
        .then((res)=> {this.setState({
            user : res.data
        }); console.log(res.data)}  )
        .catch((err) => console.error(err));
    }

    onDeleteHandlle = async (id) => {
        await axios.delete(`http://localhost:8088/register/${id}`)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        .finally(() => window.location.reload());
    }

    updategroupNavigate = async (id) => {
        this.setState({
            userID: id
        });

        this.editModalOpen();

        await axios.get(`http://localhost:8088/register/user/${id}`)
        .then((res)=> this.setState({
            fname: res.data.firstName,
            lname:res.data.lastName,
            email:res.data.email,
            password: res.data.password,
            contact: res.data.contact,
            type: res.data.type,
        })  )
        .catch((err) => console.error(err));
    }

    editModalOpen = () => {    
        this.setState({
            edit: true
        })
        
    };
    
    editModalClose = () => {
        this.setState({
            edit: false
        })
    };

    onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
        //console.log(e.target.id);
    }

    onSubmit = async () => {
        this.editModalClose();

        const supervisor = {
            firstName: this.state.fname,
            lastName: this.state.lname,
            email: this.state.email,
            password: this.state.password,            
            contact: this.state.contact,
            type: this.state.type
        }
        console.log(supervisor);

        try {
		 await axios.put(`http://localhost:8088/register/edit/${this.state.userID}`, supervisor)
         .then((res)=> AlertMsg("success", "success", res.data))
         .catch((err) => AlertMsg("error", "error", err.message))
        .finally(() => window.location.reload())

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
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

    render() {
        return (
            <>
                <Navbar/>

                <div className="AllView">
                    

                    <Box sx={{
                        position: 'absolute',
                        marginTop: '0px',
                        marginLeft: '50px',
                        width: "auto",
                        bgcolor: 'background.paper',
                        border: "2px solid white",
                        borderRadius:4,
                        //boxShadow: 24,
                        backgroundColor:"black",
                        p: 4
                    }}>
                        <h1 style={{color: 'white', marginTop: '-25px'}}>View Supervisors</h1>

                 <TableContainer component={Paper}>
                   <Table size="small" sx={{ minWidth: 1000, maxWidth: 1000, border: '2px solid black'}} aria-label="customized table">
                       <TableHead>
                       <TableRow sx={{backgroundColor:"gray", height:"10px"}}>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", borderColor:"black",border:3}}>User Name</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", borderColor:"black",border:3}}>Email</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", borderColor:"black",border:3}}>Contact</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold", borderColor:"black",border:3}}>Action</TableCell>
                       </TableRow>
                       </TableHead>
                       <TableBody>
                       {this.state.user.map((view) => (
                           <TableRow hover={true} sx={{height:"10px"}}>
                           <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {view.firstName} {view.lastName}</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {view.email} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", borderColor:"black",border:3}}> {view.contact} </TableCell>
                           <TableCell align="left" sx={{fontSize:"20px", borderColor:"black",border:3}}>
                            <ButtonGroup>
                              <ListItemButton
                                  onClick={() => this.onDeleteHandlle(view._id)}
                                  sx={{ 
                                      marginTop:"10px",
                                      width:"60px"
                                  }} >
                                  <ListItemIcon>
                                    <DeleteIcon color={'secondary'} align="left"/>
                                  </ListItemIcon>
                                  <ListItemText primary="" />
                              </ListItemButton> 
                              <Divider />
                              <ListItemButton
                                  onClick={() => this.updategroupNavigate(view._id)}
                                  sx={{ 
                                      marginLeft:"10px",
                                      marginTop:"10px",
                                      width:"50px"
                                  }} >
                                  <ListItemIcon>
                                  <CreateIcon color={'primary'}/>
                                  </ListItemIcon>
                                  <ListItemText primary="" />
                              </ListItemButton> 
                              </ButtonGroup> 
                           </TableCell>
                           </TableRow>
                       ))}
                       </TableBody>
                   </Table>
               </TableContainer>
             </Box>

             <Modal
                open={this.state.edit}
                onClose={this.editModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{border:"2px solid gray"}}
                >
                <Box sx={{
                    position: 'absolute',
                    width:450,
                    height:"auto",
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
                            marginLeft:"120px",
                            marginTop:2,
                            color:"white",
                            fontSize:"25px",
                            fontWeight:"bold",
                            }}>
                            Edit User
                        </Typography>
                        <FormGroup sx={{ 
                            backgroundColor:"white",                       
                            marginLeft:4,
                            marginBottom:5, 
                            marginTop:3,
                            marginRight:4                       
                        }}>
                            <ListItem>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="medium" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="fname" 
                            label="First Name" 
                            variant="standard"
                            defaultValue={this.state.fname}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                        backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5, 
                        marginRight:4                         
                        }}>
                        <ListItem>     
                        <ListItemIcon>
                            <AccountCircleRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="lname" 
                            label="Last Name" 
                            variant="standard"
                            defaultValue={this.state.lname}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                             </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                      backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5,
                        marginRight:4                          
                        }}>
                     <ListItem>
                        <ListItemIcon>
                            <MailRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            fullWidth
                            id="email" 
                            label="User Email" 
                            variant="standard"
                            defaultValue={this.state.email}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <FormGroup sx={{ 
                        backgroundColor:"white",
                        marginLeft:4,
                        marginBottom:5,
                        marginRight:4                          
                        }}>
                              <ListItem>
                        <ListItemIcon>
                            <CallRoundedIcon fontSize="small" sx={{color:"black"}}/>
                        </ListItemIcon>
                        <TextField 
                            id="contact" 
                            label="Contact No" 
                            variant="standard"
                            defaultValue={this.state.contact}
                            onChange={(e) => this.onChange(e)}
                            size="medium" required/>
                            </ListItem>
                    </FormGroup>

                    <Button                        
                        variant="outlined" 
                        size="small"
                        sx={{
                            border:2,
                            borderColor:"white",  
                            width:180,
                            marginLeft:17, 
                            fontSize:16
                        }}                        
                        onClick={() => this.onSubmit()}
                        color="success" >
                        Submit
                    </Button> <br/>
                    
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