import React from 'react';
import axios from 'axios';
import Navbar from './nav-bar';
import './../../component/css/Page.css';
import  {Alert} from '../alert/message';

import  ShemaValidations from "../validation/AddShechema";
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
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';

export default class AddSchema extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schemaName:"",
            department:"",
            schema:null,
            fileName:"Insert File",
            message: "",
            type:"",
            open: true
        }
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
    onSubmit =  (e) => {
        e.preventDefault();
        const result = ShemaValidations({
            schemaName: this.state.schemaName,
            department: this.state.department

        });
        if (result.status) {
        const  formData = new FormData();
        formData.append("schemaName", this.state.schemaName);
        formData.append("department", this.state.department);
        formData.append("schema", this.state.schema);
        formData.append("fileName", this.state.fileName);

      axios.post("http://localhost:8088/marking/add", formData)
            .then((res) => {
                 Alert("success", "Created", res.data);             
            })
            .catch(err => {
                this.handleError(err);
            })
        } else {
           Alert("error", "Something went wrong!", result.error)
        }
    }





    render() {
        return (
            <>     
                <div className="AllView">
                    <Navbar/>
                    
                 <Container sx={{ 
                            backgroundColor: "black", 
                            color: "white",
                            border: '2px solid white',
                            width:"500px",
                            height:"470px",
                            marginTop:"170px",   
                            border: "2px solid white",
                            borderRadius:4,
                            boxShadow:"0 0 20px 0 black, 2px 2px 2px 0 #1b1b1b"                 
                        }}>


              <h1 style={{color: 'white'}}> Add Schema </h1>
                    <FormGroup sx={{marginTop: "20px"}}>
                   
             <ListItem sx={{backgroundColor:"whitesmoke",
                            width:350,
                            marginLeft:6,
                            borderRadius:3,
                            marginTop:2
                            }} >
                  <ListItemIcon>
                            <PermIdentityRoundedIcon fontSize="medium" />
                  </ListItemIcon>
                  
                        <TextField 
                            fullWidth
                            id="schemaName" 
                            label="Marking Name" 
                            variant="standard"
                            onChange={(e) => this.onChange(e)}
                            size="small" required/>
                       
                        </ListItem>
                    </FormGroup>

                 <FormGroup sx={{marginTop: "20px",
                                 }}>
                        <ListItem sx={{backgroundColor:"whitesmoke",
                            width:350,
                            height:65,
                            marginLeft:6,
                            borderRadius:3,
                            marginTop:2
                            }} >          
                           <ListItemIcon>
                               <ApartmentRoundedIcon fontSize="medium" />
                           </ListItemIcon>
                        <InputLabel id="demo-simple-select-standard-label">Department  </InputLabel>
                        <br/>
                    
                     <Select 
                                width="100%"                     
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="department"
                
                            value={this.state.asgDep}
                            onChange={(e) => this.onChageSelected(e)}
                       
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="SE">SE</MenuItem>
                            <MenuItem value="CS">CS</MenuItem>
                        </Select>
                        </ListItem>
                    </FormGroup>
                    
                    <FormGroup sx={{marginTop: "20px"}}>
                    <ListItem sx={{backgroundColor:"whitesmoke",
                            width:350,
                            marginLeft:6,
                            borderRadius:3,
                            color:"black",
                            marginTop:2
                            }} >
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
                                    fullWidth
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
                        sx={{marginTop: "40px", 
                              border:"2px solid", 
                              marginBottom:"20px",
                              width:160,
                              height:40,
                              marginLeft:18}}
                        variant="outlined" 
                        size="small"
                        onClick={(e) => this.onSubmit(e)}
                        color="primary" >
                        Submit
                    </Button>

                    </Container>

                </div>
            </>
        )
    }
}