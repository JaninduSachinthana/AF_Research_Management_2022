import './../../component/css/Page.css';
import { Grid, Typography } from "@mui/material";
import { border, borderRadius, Box, Container } from "@mui/system";
import React from "react";
import Navbar from './nav-bar';
import './../../component/css/Page.css';
import image from "./3.jpg";
import "./admin.css";
import axios from 'axios';

export default class StudentMain extends React.Component {
constructor(props) {
  super(props);

  this.state = {
        student:"",
        staff:"",
        supervisor:"",
        panelmembers:"",
        groups:"",
        assignments:""
  }
}

componentDidMount() {

        axios.get("http://localhost:8088/register/view/std")
        .then((res)=> this.setState({
                student : res.data.length
        }))
        .catch((err) => console.error(err));

        axios.get("http://localhost:8088/register/view/sup")
        .then((res)=> this.setState({
                supervisor : res.data.length
        }))
        .catch((err) => console.error(err));

        axios.get("http://localhost:8088/register/view/pmem")
        .then((res)=> this.setState({
                panelmembers : res.data.length
        }))
        .catch((err) => console.error(err));

        const total = this.state.supervisor + this.state.panelmembers;

        this.setState({
                staff : total
        })

        axios.get("http://localhost:8088/group/viewgroup")
        .then((res)=> this.setState({
                groups : res.data.length
        }))
        .catch((err) => console.error(err));

        axios.get("http://localhost:8088/assignment/view")
        .then((res)=> this.setState({
                assignments : res.data.length
        }))
        .catch((err) => console.error(err));

}

render() {
return (
  <>

  <Navbar/>

<div className="AllView">


                
<div>
                 
        <Box sx={{minWidth:800,
                  maxHeight:405,
                  marginLeft:4,
                  marginTop:4,
                  marginRight:20,
                  border:2,
                  borderColor:"white",
                  borderRadius:4,
                  backgroundColor:"black",}}>

          <Grid container>    
          <Grid item>     
            <Container sx={{width:460,
                            height:400,
                            backgroundColor:"black",
                            marginLeft:0,
                            borderLeft:2,
                            borderRight:2,
                            borderRadius:4,
                            borderColor:"white"}}>

     <Typography sx={{fontSize:29, color:"white", marginLeft:6,marginBottom:5}}>
          Research Management
     </Typography>
                  

                   <Typography sx={{FontSize:14,color:"white",}}>
                           The Lats year of the  Sri  Lankan  Institute of<br/> 
                           Information and  technology university students<br/>
                           must complete a research project  realated   to<br/>
                           thier perticular degree.  This web site is  for <br/>
                           the students and management to manage thier work<br/>
                           in a  proper manner.  With the  facilities  like<br/>
                           publish  assignments,  marking schema, templete,<br/>
                           and notices the  manageing  is  easier  for the<br/> 
                           admin and  supervisors.  Also the can  eveluate<br/>
                           students   submited   assignments.  This system<br/> 
                           provied  a   better  intraction  between   the <br/>
                           supervisors and students.
                     </Typography>
            </Container>
            </Grid> 
            <Grid item>
            <Container sx={{width:530,
                            height:400,
                            backgroundColor:"black",
                            marginLeft:0,      
                            borderLeft:2,
                            
                            borderRadius:4,
                            borderColor:"white"}}
                            >

                        <img className='image02' src={image} />
                            </Container>
     

         
            </Grid>
            </Grid> 
        </Box>

     <Grid container spacing={6} sx={{marginTop:4}}>
         <Grid item>
                 <Box sx={{width:250,
                           height:100,
                           backgroundColor:"black",
                           color:"white",
                           border:4,
                           borderColor:"#FF8000",
                           borderRadius:4
                    }}>
           
           <Typography sx={{fontSize:20, color:"white", marginLeft:6,marginTop:2}}>
              Total Students
            </Typography>

            <Typography sx={{fontSize:25, fontWeight:"bold", color:"white", marginLeft:12,marginTop:0}}>
                {this.state.student}
            </Typography>
                    
                 </Box>
         </Grid>
         <Grid item>
                 <Box sx={{width:250,
                           height:100,
                           backgroundColor:"black",
                           color:"white",
                           border:4,
                           borderColor:"#7FFF00",
                           borderRadius:4
                    }}>
                         <Typography sx={{fontSize:20, color:"white", marginLeft:6,marginTop:2}}>
                                Total Supervisors
                        </Typography>

                        <Typography sx={{fontSize:25, fontWeight:"bold", color:"white", marginLeft:12,marginTop:0}}>
                                {this.state.supervisor}
                        </Typography>
                 </Box>
         </Grid>

         <Grid item>
                 <Box sx={{width:250,
                           height:100,
                           backgroundColor:"black",
                           color:"white",
                           border:4,
                           borderColor:"#8000FF",
                           borderRadius:4
                    }}>
                         <Typography sx={{fontSize:20, color:"white", marginLeft:6,marginTop:2}}>
                                Total Groups
                         </Typography>
                         
                        <Typography sx={{fontSize:25, fontWeight:"bold", color:"white", marginLeft:12,marginTop:0}}>
                                {this.state.groups}
                        </Typography>
                 </Box>
         </Grid>
         <Grid item>
                 <Box sx={{width:250,
                           height:100,
                           backgroundColor:"black",
                           color:"white",
                           border:4,
                           borderColor:"#E6E500",
                           borderRadius:4
                    }}>
                         <Typography sx={{fontSize:20, color:"white", marginLeft:6,marginTop:2}}>
                                Total Assignments
                        </Typography>
                        
                        <Typography sx={{fontSize:25, fontWeight:"bold", color:"white", marginLeft:12,marginTop:0}}>
                                {this.state.assignments}
                        </Typography>
                 </Box>
         </Grid>
     </Grid>

</div>
</div>
 </> );}}
