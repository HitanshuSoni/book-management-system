import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const drawer = (
    <div>
      <List>
        {['All Books', 'My Books', 'Publish Book', 'Sign Up', 'Log In'].map((text, index) => {
          if (text === 'Log In' && isLoggedIn) return null;
          return (
            <ListItem button key={text} component={Link} to={'/' + text.replace(/\s/g, '-').toLowerCase()}>
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
        <Button color="inherit" component={Link} to="/signup" style={{ margin: '0 10px' }}>Sign Up</Button>
        {isLoggedIn ? (
          <Button style={{ backgroundColor: 'red', color: 'white', margin: '0 10px' }} onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button style={{ backgroundColor: 'green', color: 'white', margin: '0 10px' }} component={Link} to="/login">Log In</Button>
        )}
      </>
    )}
  </Toolbar>
  <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
    {drawer}
  </Drawer>
</AppBar>

  );
};

export default NavigationBar;
