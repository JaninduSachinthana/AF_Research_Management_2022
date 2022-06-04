import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TopicRoundedIcon from '@mui/icons-material/TopicRounded';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PublishIcon from '@mui/icons-material/Publish';
import PercentIcon from '@mui/icons-material/Percent';
import TocIcon from '@mui/icons-material/Toc';
import { palette } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logo:false,
      open: true,
      group: false,
      topic: false,
    }
  }

  profileItemOpen = () => {
    this.setState({
      logo: true
    })
  };

  profileItemclose = () => {
    this.setState({
      logo: false
    })
  };

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

  onSignOut = () => {
    this.profileItemclose();

    window.location = "/"
  }

  handleGroupOpen = () => {
    if(this.state.group != true) {
      this.setState({group:true})
    }else{
      this.setState({group:false})
    }
    
  };

  handleTopicOpen = () => {
    if(this.state.topic != true) {
      this.setState({topic:true})
    }else{
      this.setState({topic:false})
    }
    
  };

    render() {
        return (
            <>
          <Box >
            <AppBar position="fixed" color="default" mode='dark' sx={{ backgroundColor: "black", color: "white"}}>
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
                    sx={{marginLeft:1, color:"white"}}
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
                sx={{
                  marginTop:"-40px"
                }}
                anchorEl={this.state.logo}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                  open={Boolean(this.state.logo)}
                  onClose={this.profileItemclose}
              >
                <MenuItem onClick={this.profileItemclose}>                  
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small"/>
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={this.onSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>

              </Toolbar>
            </AppBar>
          </Box>



          <Drawer
        
            sx={{
              width: 200,
              flexShrink:0,
             
              '& .MuiDrawer-paper': {
                width: 280,
                fontSize:20,
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
              <ListItemButton 
                component="a" 
                href="/Student"
              >
                <ListItemIcon>
                  <HomeRoundedIcon fontSize="small"  sx={{  color: "white"}} />
                </ListItemIcon>
                <ListItemText sx={{ color: "white"}} >Home</ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        
        <List sx={{marginTop:1,}} >        
          <ListItem disablePadding>
            <ListItemButton
              onClick={this.handleTopicOpen}
                >
              <ListItemIcon > 
                <TocIcon fontSize="medium"  sx={{  color: "white"}}/>              
              </ListItemIcon >              
              <ListItemText sx={{ color: "white"}} >Research Topics</ListItemText>
              {this.state.topic == true ? <ExpandLess sx={{  color: "white"}}/> : <ExpandMore sx={{  color: "white"}}/>}
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={this.state.topic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/TopicRegister"
              sx={{ pl: 4 }}>
              <ListItemIcon>
                <GroupAddIcon sx={{  color: "white"}}/>
              </ListItemIcon>
                <ListItemText sx={{ color: "white",fontSize:"small"}} >Topic Registration</ListItemText>
            </ListItemButton>
          </List>
          <Divider />
          <List component="div" disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/Topic_view_std"
              sx={{ pl: 4 }}>
              <ListItemIcon>
                <GroupIcon sx={{  color: "white"}}/>
              </ListItemIcon>
                <ListItemText sx={{ color: "white",fontSize:"small"}} >View Topics</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        <List sx={{marginTop:1}}>          
          <ListItem disablePadding>
            <ListItemButton
              onClick={this.handleGroupOpen}
                >
              <ListItemIcon>
                <GroupsRoundedIcon fontSize="small"  sx={{ color: "white"}}/>
              </ListItemIcon>               
              <ListItemText sx={{ color: "white",fontSize:"small"}} >Research Groups</ListItemText>
              {this.state.group == true ? <ExpandLess sx={{  color: "white"}}/> : <ExpandMore sx={{  color: "white"}}/>}
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={this.state.group} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/GroupAdd"
              sx={{ pl: 4 }}>
              <ListItemIcon>
                <GroupAddIcon sx={{  color: "white"}}/>
              </ListItemIcon>
                <ListItemText sx={{ color: "white",fontSize:"small"}} >Group Registration</ListItemText>
            </ListItemButton>
          </List>
          <Divider />
          <List component="div" disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/GroupStudentView"
              sx={{ pl: 4 }}>
              <ListItemIcon>
                <GroupIcon sx={{  color: "white"}}/>
              </ListItemIcon>
                <ListItemText sx={{ color: "white",fontSize:"small"}} >View Group</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        <List sx={{marginTop:1}}>          
          <ListItem disablePadding>
            <ListItemButton component="a" 
                href="/Student/ViewPanelsStudent">
              <ListItemIcon>
              <ArticleRoundedIcon fontSize="small" sx={{ color: "white"}}/>  
           
              </ListItemIcon>
              
              <ListItemText sx={{ color: "white"}} >View Panels</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />


        <List sx={{marginTop:1}}>          
          <ListItem disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/ViewAssignment">
              <ListItemIcon>
                <PublishIcon fontSize="small"  sx={{  color: "white"}}/>
              </ListItemIcon>
              <ListItemText sx={{ color: "white"}} >Research Submission</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>        
        <Divider />


  
        <List sx={{marginTop:1}}>          
          <ListItem disablePadding>
            <ListItemButton 
              component="a" 
              href="/Student/ResultView">
              <ListItemIcon>
                <PercentIcon fontSize="medium"  sx={{  color: "white"}}/>
              </ListItemIcon>
              <ListItemText sx={{ color: "white"}} >Result View</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>        
        <Divider />

  

        <List sx={{marginTop:1}}>          
          <ListItem disablePadding>
            <ListItemButton   
              component="a" 
              href="/Student/Contact">
              <ListItemIcon>
                 <ConnectWithoutContactIcon fontSize="medium"  sx={{  color: "white"}}/>
              </ListItemIcon>
              <ListItemText sx={{ color: "white"}} >Contacat Us</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
            </>
        )
    }
}