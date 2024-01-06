import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import AllBooks from './components/AllBooks';

function App() {
  return (
  //   <Router>
  //   <Routes>
  //     <Route path="/all-books" exact component={AllBooks} />
  //   </Routes>
  // </Router>
  <AllBooks/>
  );
}

export default App;
