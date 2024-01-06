import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllBooks from './components/AllBooks'; // Import the AllBooks component

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<AllBooks />} /> {/* Route for AllBooks component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
