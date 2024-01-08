import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Avatar, Popover, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  const menuItems = [
    { text: 'All Books', path: '/' },
    { text: 'My Books', path: '/my-books' },
    { text: 'Publish Book', path: '/publish-book' },
    { text: 'Sign Up', path: '/signup', showWhenLoggedOut: true },
    { text: 'Log In', path: '/login', showWhenLoggedOut: true }
  ];
  
  const drawer = (
    <div>
      <List>
        {menuItems.map(({ text, path, showWhenLoggedOut }) => {
        // Hide 'Log In' when the user is logged in
        if ((isLoggedIn && showWhenLoggedOut)) return null;

        return (
        <ListItem button key={text} component={Link} to={path}>
            <ListItemText primary={text} />
        </ListItem>
        );
         })}
            {isLoggedIn && (
                <ListItem button onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
                </ListItem>
            )}
        </List>

    </div>
  );

  return (
    <AppBar position="static">
        <Toolbar>
            {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
            </IconButton>
            )}
            <Typography variant="h6" style={{ flexGrow: 1 }}>
            BookApp
            </Typography>
            {!isMobile && (
            <>
                <Button color="inherit" component={Link} to="/" style={{ margin: '0 10px' }}>All Books</Button>
                <Button color="inherit" component={Link} to="/my-books" style={{ margin: '0 10px' }}>My Books</Button>
                <Button color="inherit" component={Link} to="/publish-book" style={{ margin: '0 10px' }}>Publish Book</Button>
                {!isLoggedIn? (<Button color="inherit" component={Link} to="/signup" style={{ margin: '0 10px' }}>Sign Up</Button>):<></>}
                {isLoggedIn ? (
                <Button style={{ backgroundColor: 'red', color: 'white', margin: '0 10px' }} onClick={handleSignOut}>Sign Out</Button>
                ) : (
                <Button style={{ backgroundColor: 'green', color: 'white', margin: '0 10px' }} component={Link} to="/login">Log In</Button>
                )}
            </>
            )}{isLoggedIn && (
                <IconButton onClick={handleUserIconClick} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              )}
          </Toolbar>
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            {drawer}
          </Drawer>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography variant="h6">User Info</Typography>
              {userData && (
                <>
                  <Typography variant="body1">Name: {userData.name}</Typography>
                  <Typography variant="body1">Email: {userData.email}</Typography>
                  
                </>
              )}
              <Button onClick={handleClose} color="primary">Close</Button>
            </Box>
          </Popover>
</AppBar>

  );
};

export default NavigationBar;
