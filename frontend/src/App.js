import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AllBooks from './components/AllBooks';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import MyBooks from './components/MyBooks';
import PublishBookForm from './components/PublishBookForm';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BookApp
        </Typography>
        <Button color="inherit" component={Link} to="/">All Books</Button>
        <Button color="inherit" component={Link} to="/my-books">My Books</Button>
        <Button color="inherit" component={Link} to="/publish-book">Publish Book</Button>
        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
        <Button color="inherit" component={Link} to="/login">Log In</Button>
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/publish-book" element={<PublishBookForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
