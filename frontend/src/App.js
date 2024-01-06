import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import AllBooks from './components/AllBooks';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" exact component={AllBooks} />
    </Routes>
  </Router>
  );
}

export default App;
