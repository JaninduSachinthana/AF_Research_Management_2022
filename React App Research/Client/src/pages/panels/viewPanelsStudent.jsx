import React from 'react';
import axios from 'axios';
import Navbar from './../student/nav-bar'
import './../../component/css/Page.css'

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

export default class ViewPanelsStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            panels:[],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8088/panels/view")
        .then((res)=> {this.setState({
            panels: res.data
        }); console.log(res.data)})
        .catch((err) => console.error(err));
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
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                        </Accordion>
                    ))}
                </div>
            
            </>
        )
    }
}