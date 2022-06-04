import React from "react";
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FormGroup from '@mui/material/FormGroup';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import "./main.scss";
export default class Header extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      sign: false,
      log: false,
      type:"Student",
      email:"",
      password:"",
      userEx:false,
      signIn:false
    }
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true
    })
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    })
  };

  profileItemOpen = () => {
    this.setState({
      sign: true
    })
  };

  profileItemclose = () => {
    this.setState({
      sign: false
    })
  };

  signModalOpen = () => {
    this.profileItemclose();

    this.setState({
      log: true
    })
    
  };

  signModalClose = () => {
    this.setState({
      log: false
    })
  };

  signUpMenuOpen = () => {
    this.profileItemclose();

    this.setState({
      signIn: true
    })
    
  };

  signUpMenuClose = () => {
    this.setState({
      signIn: false
    })
  };

  onChageSelected = (e) => {
    this.setState({type: e.target.value});
  }

  onSignIn = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user)

    // try {
		// 	const url = "http://localhost:8088/login/login";
		// 	const { data: res } = await axios.post(url, user);
		// 	localStorage.setItem("token", res.data.token);
    //         console.log(res);
		// 	window.location = "/best";
    //         if(res.data.type == "Student") {
    //             window.location = "/Student"
    //         }else if(res.data.type == "Panel Member") {
    //             window.location = "/Panel"
    //         }else if(res.data.type == "Supervisor") {
    //             window.location = "/Supervisor"
    //         }else if(res.data.type == "Admin") {
    //             window.location = "/Admin"
    //         }
		// } catch (error) {
		// 	if (
		// 		error.response &&
		// 		error.response.status >= 400 &&
		// 		error.response.status <= 500
		// 	) {
		// 		setError(error.response.data.message);
		// 	}
		// }

              if(this.state.type == "Student") {
                  window.location = "/Student"
              }else if(this.state.type == "Panel Member") {
                  window.location = "/Panel"
              }else if(this.state.type == "Supervisor") {
                  window.location = "/Supervisor"
              }else if(this.state.type == "Admin") {
                  window.location = "/Admin"
              }

  }

  onChange = (e) => {        
    this.setState({[e.target.id]: e.target.value});
  }

   handleUserOpen = () => {
    if(this.state.userEx != true) {
      this.setState({userEx:true})
    }else{
      this.setState({userEx:false})
    }
    
  };


    render() {
        return (
           <>
           {/* <h1>Header</h1> */}
           <Box>
            <AppBar  position="fixed" color="default" mode='dark' sx={{ backgroundColor: "black", color: "white"}}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={this.handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                </Typography>
              
                  <SearchIcon />
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }} 
                    sx={{marginLeft:2, color:"white"}}
                    />

                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.profileItemOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.sign}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.sign)}
                onClose={this.profileItemclose}
              >
                <MenuItem onClick={this.signModalOpen}>Sign In</MenuItem>
              </Menu>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.signUpMenuOpen}
                color="inherit"
              >
                <PersonAddAltRoundedIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.signIn}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.signIn)}
                onClose={this.signUpMenuClose}
              >
                <MenuItem 
                  component="a" 
                  href="/StudentReg" >
                    Register as a Student
                </MenuItem>
                <MenuItem 
                  component="a" 
                  href="/StaffRegister"
                >Register as a Staff</MenuItem>
              </Menu>
              </Toolbar>
            </AppBar>
          </Box>

          <Drawer
            sx={{
              width: 200,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 250,
                boxSizing: 'border-box',
                marginTop:8,
                backgroundColor: "black", 
                color: "white",
                borderRight: "2px solid white",
                boxShadow:"0 0 10px 0 black, 2px 2px 2px 0 #1b1b1b"
              },
            }}
            variant="persistent"
            anchor="left"
            open={this.state.open}
      >
          <ListItemIcon>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon sx={{  color: "white"}}/>
            </IconButton>
          </ListItemIcon>
        <Divider />

        <List sx={{marginTop:2}}>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                      <HomeRoundedIcon fontSize="small"  sx={{  color: "white"}} />
                </ListItemIcon>
                Home
                <ListItemText />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />

        <List sx={{  color: "white"}}>          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleRoundedIcon fontSize="small"  sx={{ color: "white"}}/>
          
              </ListItemIcon>
              Research 
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List sx={{  color: "white"}}>          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <ArticleRoundedIcon fontSize="small"  sx={{ color: "white"}}/>
          
              </ListItemIcon>
              About Us
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <div class="untitled">
	<div class="untitled__slides">
		<div class="untitled__slide">
			<div class="untitled__slideBg"></div>
			<div class="untitled__slideContent">
				<span>Computing</span> 
				<span>Faculty</span>
				<a class="button" href="https://unsplash.com/@scoutthecity" target="/black">Unsplash Profile</a>
			</div>
		</div>
		<div class="untitled__slide">
			<div class="untitled__slideBg"></div>
			<div class="untitled__slideContent">
				
				<span>Vladimir</span> 
				<span>Kudinov</span>
				<a class="button" href="https://unsplash.com/@madbyte" target="/black">Unsplash Profile</a>
			</div>
		</div>
		<div class="untitled__slide">
			<div class="untitled__slideBg"></div>
			<div class="untitled__slideContent">
				<span>Macio</span> 
				<span>Amorim</span>
				<a class="button" href="https://unsplash.com/@maicoamorim" target="/black">Unsplash Profile</a>
			</div>
		</div>
		<div class="untitled__slide">
			<div class="untitled__slideBg"></div>
			<div class="untitled__slideContent">
				<span>Mario</span> 
				<span>Calvo</span>
				<a class="button" href="https://unsplash.com/@mariocalvo" target="/black">Unsplash Profile</a>
			</div>
		</div>
	</div>
	<div class="untitled__shutters"></div>
</div>
     <Modal
        open={this.state.log}
        onClose={this.signModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'text.primary',
          color:'white',
          borderRadius:12,
          border: "2px solid white",
          boxShadow:"0 0 10px 0 black, 2px 2px 2px 0 #1b1b1b",
          p: 4
        }}>
          <Typography id="modal-modal-title" variant="h6" sx={{marginLeft:18, fontSize:30}}>
            Sign In
          </Typography>

          <div>

          <FormGroup sx={{marginTop:6}}>
          <ListItem   disablePadding>
            <ListItemIcon>
              <EmailRoundedIcon fontSize="large" sx={{ color: "white"}}/>             
            </ListItemIcon>           
            <TextField
            sx={{backgroundColor:"white",borderRadius:9,height:55}}
              fullWidth 
              label="Email"
              id="email"
              defaultValue=""
              variant="filled"
              onChange={(e) => this.onChange(e)}
            />
          </ListItem>
          </FormGroup> <br/>
            
          <FormGroup>
            <ListItem 
             disablePadding>
              <ListItemIcon>
                <LockRoundedIcon fontSize="large" sx={{ color: "white"}}/>
              </ListItemIcon>
              <TextField
               sx={{backgroundColor:"white",borderRadius:9}}
                fullWidth
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                onChange={(e) => this.onChange(e)}
              />
            </ListItem>
          </FormGroup> 
          
          <br/>

          <FormGroup>
            <ListItem  disablePadding>
                <ListItemIcon>
                    <ManRoundedIcon fontSize="large" sx={{ color: "white"}}/>
                </ListItemIcon>
                <InputLabel  id="demo-simple-select-standard-label"></InputLabel>
                <Select
                 sx={{backgroundColor:"white",borderRadius:9}}
                    fullWidth                            
                    variant="filled"
                    labelId="demo-simple-select-standard-label"
                    id="department"
                    value={this.state.type}
                    onChange={(e) => this.onChageSelected(e)}
                    lable="Department"
                    >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Panel Member">Panel Member</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
            </ListItem>
          </FormGroup> <br/>

            <Button 
              onClick={this.onSignIn}
              variant="outlined" 
              sx={{width:220,border:3,borderRadius:10 ,height:60 ,marginLeft:12,marginTop:3}}
              >
              SignIn
            </Button>
            
          </div>
          
        </Box>
      </Modal>

      
          </>
        )
    }
}