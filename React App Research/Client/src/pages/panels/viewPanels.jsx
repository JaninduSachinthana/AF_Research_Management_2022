import React from 'react';
import axios from 'axios';
import Navbar from './../admin/nav-bar'
import './../../component/css/Page.css'
import AlertMsg from './../alert/message';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default class ViewPanels extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            panels:[],
            edit: false,
            panelmembers:[],
            groups:[],
            panelID: "",
            panelmember1: "",
            panelmember2: "",
            group1 : "",
            group2: "",
            group3: "",
            id:"",
            message:"",
            type:"",
            open: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8088/panels/view")
        .then((res)=> {this.setState({
            panels: res.data
        }); console.log(res.data)})
        .catch((err) => console.error(err));

        axios.get("http://localhost:8088/register/view/pmem")
        .then((res)=> this.setState({
            panelmembers : res.data
        }))
        .catch((err) => console.error(err));

        axios.get("http://localhost:8088/group/viewgroup")
        .then((res)=> this.setState({
            groups : res.data
        }))
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
        //console.log(id)

        await axios.get(`http://localhost:8088/panels/view/${id}`)
        .then((res)=>{this.setState({
            id: res.data._id,
            panelID:res.data.panelID,
            panelmember1:res.data.panelmember1,
            panelmember2:res.data.panelmember2,
            group1:res.data.group1,
            group2:res.data.group2,
            group3:res.data.group3
        }); console.log(res.data)} )
        .catch((err) => console.error(err));
    }

    onChageSelected = (e) => {
        //console.log(e)
        this.setState({[e.target.name]: e.target.value});
      }
      onChange = (e) => {        
        this.setState({[e.target.id]: e.target.value});
      }
    
      onSubmit = async () => {
        this.signModalClose();
    
        const panel = {
          panelID: this.state.panelID,
          panelmember1: this.state.panelmember1,
          panelmember2: this.state.panelmember2,
          group1 : this.state.group1,
          group2: this.state.group2,
          group3: this.state.group3,
        }
        console.log(panel);
    
        await axios.put(`http://localhost:8088/panels/edit/${this.state.id}`, panel)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))

        window.location.reload();
      }

      onDelete = async (id) => {
        console.log(id);
        
        await axios.delete(`http://localhost:8088/panels/delete/${id}`)
        .then((res)=> AlertMsg("success", "success", res.data))
        .catch((err) => AlertMsg("error", "error", err.message))
        
        window.location.reload();
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
                    <h1 style={{color:"white"}}> ViewPanels </h1>

                    {this.state.panels.map((panel) => (

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
                                <Typography sx={{color:"white", fontSize:"25px", fontWeight:"bold"}}> {panel.panelID} </Typography>
                                </AccordionSummary>

                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 700}} aria-label="customized table">
                                        <TableHead>
                                        <TableRow sx={{backgroundColor:"lightgray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#212121"}}>Member 01</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#212121"}}>Member 02</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#212121"}}>Groups</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#212121"}}>Action</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{backgroundColor:"lightgray", height:"10px"}}>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#616161"}}>{panel.panelmember1} </TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#616161"}}>{panel.panelmember2}</TableCell>
                                            <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#616161"}}>
                                                {panel.group1} <br/>
                                                {panel.group2} <br/>
                                                {panel.group3} <br/>
                                                </TableCell>
                                                <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white", borderColor:"black",border:3, backgroundColor:"#616161"}}>
                                                <ButtonGroup>
                                                    <ListItemButton
                                                        onClick={() => this.onDelete(panel._id)}
                                                        sx={{ 
                                                            marginTop:"10px",
                                                            width:"120px",
                                                            borderColor:"blue",
                                                            border:3
                                                        }}>
                                                        <ListItemIcon> Delete
                                                            <DeleteIcon color={'secondary'} align="left"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="" />
                                                    </ListItemButton> 
                                                    <Divider />
                                                    <ListItemButton
                                                        onClick={() => this.onEditClick(panel._id)}
                                                        sx={{ 
                                                            marginLeft:"60px",
                                                            marginTop:"10px",
                                                            width:"120px",
                                                            borderColor:"blue",
                                                            border:3,
                                                            color:"white"
                                                        }}>
                                                        <ListItemIcon>Edit 
                                                        <CreateIcon color={'primary'} align="center"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="" />
                                                    </ListItemButton> 
                                                    </ButtonGroup> 
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

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
                                marginLeft:"400px",
                                marginTop:"10px",
                                width: "auto",
                                height: "auto",
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
                                        color:"white",
                                        fontSize:"25px",
                                        fontWeight:"bold",
                                    }}>
                                    Edit Panels
                                </Typography>

                                <Container 
                                    sx={{ 
                                    color: "white",
                                    width:"auto",
                                    height:"auto",                       
                                    }}>

                                    <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                    <Typography>Panel ID</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <PermIdentityRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <TextField 
                                                fullWidth
                                                    id="panelID" 
                                                    label="Panel ID" 
                                                    variant="standard"
                                                    defaultValue={this.state.panelID}
                                                    onChange={(e) => this.onChange(e)}
                                                    size="small" required/>
                                                </ListItem>
                                            </FormGroup>

                                            <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                            <Typography>Panel Member 01</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <ApartmentRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                <Select  
                                                    fullWidth                         
                                                    variant="standard"
                                                    labelId="demo-simple-select-standard-label"                                                    
                                                    defaultValue={this.state.panelmember1}
                                                    id="panelmember1"
                                                    name="panelmember1"
                                                    //onChange={(e) => this.onChageSelected(e)}
                                                    lable="Department"
                                                    >
                                                    {this.state.panelmembers.map((member) => (
                                                        <MenuItem value={member.firstName + " " + member.lastName}> {member.firstName} {member.lastName} </MenuItem>
                                                    ))}
                                                </Select>
                                                </ListItem>
                                            </FormGroup>

                                            <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                            <Typography>Panel Member 02</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <ApartmentRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                <Select  
                                                    fullWidth                         
                                                    variant="standard"
                                                    labelId="demo-simple-select-standard-label"
                                                    defaultValue={this.state.panelmember2}
                                                    id="panelmember2"
                                                    name="panelmember2"
                                                    onChange={(e) => this.onChageSelected(e)}
                                                    lable="Department"
                                                    >
                                                    {this.state.panelmembers.map((member) => (
                                                        <MenuItem value={member.firstName + " " + member.lastName}> {member.firstName} {member.lastName} </MenuItem>
                                                    ))}
                                                </Select>
                                                </ListItem>
                                            </FormGroup>

                                            <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                            <Typography>Group  01</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <ApartmentRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                <Select  
                                                    fullWidth                         
                                                    variant="standard"
                                                    labelId="demo-simple-select-standard-label"
                                                    defaultValue={this.state.group1}
                                                    id="department"
                                                    name="group1"
                                                    onChange={(e) => this.onChageSelected(e)}
                                                    lable="Department"
                                                    >
                                                    {this.state.groups.map((group) => (
                                                        <MenuItem value={group.groupid}> {group.groupid} </MenuItem>
                                                    ))}
                                                </Select>
                                                </ListItem>
                                            </FormGroup>
                                            
                                            <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                            <Typography>Group  02</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <ApartmentRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                <Select  
                                                    fullWidth                         
                                                    variant="standard"
                                                    labelId="demo-simple-select-standard-label"
                                                    defaultValue={this.state.group2}
                                                    id="department"
                                                    name="group2"
                                                    onChange={(e) => this.onChageSelected(e)}
                                                    lable="Department"
                                                    >
                                                    {this.state.groups.map((group) => (
                                                        <MenuItem value={group.groupid}> {group.groupid} </MenuItem>
                                                    ))}
                                                </Select>
                                                </ListItem>
                                            </FormGroup>

                                            <FormGroup sx={{marginTop:1,marginLeft:4,width:350}}>
                                            <Typography>Group  03</Typography>
                                                <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                                                <ListItemIcon>
                                                    {/* <ApartmentRoundedIcon fontSize="medium" /> */}
                                                </ListItemIcon>
                                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                <Select  
                                                    fullWidth                         
                                                    variant="standard"
                                                    labelId="demo-simple-select-standard-label"
                                                    defaultValue={this.state.group3}
                                                    id="department"
                                                    name="group3"
                                                    onChange={(e) => this.onChageSelected(e)}
                                                    lable="Department"
                                                    >
                                                    {this.state.groups.map((group) => (
                                                        <MenuItem value={group.groupid}> {group.groupid} </MenuItem>
                                                    ))}
                                                </Select>
                                                </ListItem>
                                            </FormGroup>

                                            <Button                         
                                                sx={{marginTop:3, border:"2px solid white", marginBottom:2,width:160,marginLeft:12}} 
                                                variant="outlined" 
                                                size="medium"
                                                onClick={(e) => this.onSubmit(e)}
                                                color="success">
                                                Submit
                                            </Button>
                                </Container>
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