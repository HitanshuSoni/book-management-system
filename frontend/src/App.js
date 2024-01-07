import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllBooks from './components/AllBooks';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import MyBooks from './components/MyBooks';
import PublishBookForm from './components/PublishBookForm';

function App() {
  return (
    <Router>
      <div>

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
}

export default App;
