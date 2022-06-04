import React from "react";
import axios from "axios";
import Navbar from '../admin/nav-bar';
import AlertMsg from "../alert/message";

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
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default class PanelReg extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      panelID: "",
      panelmember1: "",
      panelmember2: "",
      group1 : "",
      group2: "",
      group3: "",
      panelmembers:[],
      groups:[]
    }
  }

  componentDidMount  () {
    
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

  onChageSelected = (e) => {
    //console.log(e)
    this.setState({[e.target.name]: e.target.value});
  }
  onChange = (e) => {        
    this.setState({[e.target.id]: e.target.value});
  }

  onSubmit = async () => {

    const panel = {
      panelID: this.state.panelID,
      panelmember1: this.state.panelmember1,
      panelmember2: this.state.panelmember2,
      group1 : this.state.group1,
      group2: this.state.group2,
      group3: this.state.group3,
    }
    console.log(panel);

    await axios.post("http://localhost:8088/panels/add", panel)
    .then((res)=> AlertMsg("success", "success", res.data))
    .catch((err) => AlertMsg("error", "error", err.message))
    
    window.location = "/Admin/ViewPanels";
  }

  render() {
    return (
      <>
        <Navbar/>

        <div>
        <Container 
            sx={{ 
              color: "white",
              border: '2px solid white',
              width:"450px",
              height:"auto",
              border: '2px solid white',
              borderRadius:5,                     
              backgroundColor: "black",  
              marginLeft:80,
              marginTop:19,   
              boxShadow: "10px 10px 20px 10px black, 2px 2px 2px 0 #1b1b1b",                        
            }}>
              <h1 style={{color: 'white'}}> Add Panels </h1>

              <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
              <Typography>Panel ID</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                            <PermIdentityIcon />
                        </ListItemIcon>
                        <TextField 
                          fullWidth
                            id="panelID" 
                            label="Panel ID" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="small" required/>
                        </ListItem>
                    </FormGroup>

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
                    <Typography>Panel Member 01</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                          <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                            fullWidth                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="panelmember1"
                            name="panelmember1"
                            onChange={(e) => this.onChageSelected(e)}
                            lable="Department"
                            >
                              {this.state.panelmembers.map((member) => (
                                <MenuItem value={member.firstName + " " + member.lastName}> {member.firstName} {member.lastName} </MenuItem>
                              ))}
                        </Select>
                        </ListItem>
                    </FormGroup>

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
                    <Typography>Panel Member 02</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                          <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                            fullWidth                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
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

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
                    <Typography>Group  01</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                          <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                            fullWidth                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
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
                    
                    <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
                    <Typography>Group  02</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                          <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                            fullWidth                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
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

                    <FormGroup sx={{marginTop:3,marginLeft:4,width:350}}>
                    <Typography>Group  03</Typography>
                        <ListItem sx={{backgroundColor:"whitesmoke",borderColor:"blue"}} >
                        <ListItemIcon>
                          <PersonAddAltRoundedIcon />
                        </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select  
                            fullWidth                         
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
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
        </div>
      </>
    )
  }

}

