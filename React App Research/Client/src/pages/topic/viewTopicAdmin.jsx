import React from 'react';
import "./Topic.css";
import axios from 'axios';
import Navbar from './../admin/nav-bar';
import {Alert} from './../alert/message';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class TopicViewAdmin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topic:[],
      stdID:"",
      grpID:"",
      title:"",
      email:"",
      status:"",
      itemID:"",
      group:[]
    }
  }

  componentDidMount () {
    axios.get("http://localhost:8088/topic/view")
    .then((res)=> {this.setState({
        topic : res.data
    }); console.log(res.data)}  )
    .catch((err) => console.error(err));    
  }

   onDeleteHandlle = (id) => {
    axios.delete(`http://localhost:8088/topic/delete/${id}`)
    .then((res)=> Alert("success", "Deleted", res.data))
    .catch((err) => Alert("error", "Error", err.message))
   }

  render() {
    return (
      <>
        <div className='topic_page'>
        <Navbar/>

         <Box sx={{
                 position: 'absolute',
                 marginTop: '100px',
                 marginLeft: 10,
                 width: 1200,
                 bgcolor: 'background.paper',
                 border: '5px solid black',
                 //boxShadow: 24,
                 backgroundColor:"white",
                 p: 0.5
             }}>

                 <TableContainer component={Paper}>
                   <Table size="small" sx={{ minWidth: 1000, maxWidth: 1200, border: '2px solid black'}} aria-label="customized table">
                       <TableHead>
                       <TableRow sx={{backgroundColor:"gray", height:"60px",color:"white"}}>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Leader ID</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Group ID</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Topic</TableCell>
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Leader Email</TableCell>                           
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Status</TableCell>                          
                           <TableCell align="center" sx={{fontSize:"20px", fontWeight:"bold",color:"white"}}>Action</TableCell>
                       </TableRow>
                       </TableHead>
                       <TableBody>
                       {this.state.topic.map((view) => (
                           <TableRow hover={true} sx={{height:"10px"}}>
                           <TableCell align="center" sx={{fontSize:"20px"}}> {view.stdID} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px"}}> {view.grpID} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px"}}> {view.title} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px"}}> {view.email} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px"}}> {view.status} </TableCell>
                           <TableCell align="center" sx={{fontSize:"20px"}}>
                                <IconButton aria-label="delete" onClick={() => this.onDeleteHandlle(view._id)}> 
                                   <DeleteIcon color={'secondary'} />   
                                </IconButton>  
                           </TableCell>
                           </TableRow>
                       ))}
                       </TableBody>
                   </Table>
               </TableContainer>
             </Box>
        </div>
      </>
    )
  }
}