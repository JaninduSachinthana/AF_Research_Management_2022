import React, { Component } from 'react'
import axios from "axios";
import Navbar from '../student/nav-bar';
import SmallView from "./Groupsmaller"
import './Allgroup.scss'
import Box from '@mui/material/Box';
import Navbar from '../student/nav-bar';



class AllForUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           userm: []
        }
    };
    
    // Get all packages from datasbase
    componentDidMount() {
        axios.get("http://localhost:8088/group/viewgroup").then(res => {
            this.setState({userm: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
    
        return (
        
            <div>
                <Navbar/>
              

            <Box sx={{  border: '4px dashed black' }}>
            <h1 style={{color: 'white'}}>....RESEARCH GROUP DETAILS.....</h1>
            </Box>
            <br/>
            <br/>
            <br/>
            <hr/>
        
            <br/>
            <div>
     
      
      <br/>
      <hr />
      <br/>
      <br/>

                   
                        {
                            this.state.userm.map(userm => {
                                return <SmallView user={userm} count={3} />
                            })
                        }
    
               
                </div>
            </div>


        );
    }
}

export default AllForUser;