import React from 'react';
import ReactDOM from 'react-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import axios from 'axios';
import { AppBar, Toolbar, Drawer, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Redirect, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleDrawer() {
    if (this.state.drawerOpen) {
      this.setState({ drawerOpen: !this.state.drawerOpen }, 
        this.props.history.push('/feed'));
    } else {
      this.setState({ drawerOpen: !this.state.drawerOpen });
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Drawer open={this.state.drawerOpen} variant='temporary' color='primary' >
              <List >
                <ListItem button divider onClick={this.toggleDrawer}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button divider onClick={() => this.props.history.push('/createpost')}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create New Post"/>
                </ListItem>
                <ListItem button divider>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Account" />
                </ListItem>
                <ListItem button divider>
                  <ListItemIcon>
                    <RemoveIcon />
                  </ListItemIcon>
                  <ListItemText primary="Remove Account" />
                </ListItem>
                <ListItem button onClick={this.handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Drawer>
            <IconButton color='inherit' onClick={this.toggleDrawer} >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" >
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        
      </div>
    );
  }
}

export default withRouter(NavBar);