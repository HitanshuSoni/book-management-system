import React, { useState, useEffect } from 'react';
import getBooksByCurrentUser from '../API/getBooksByCurrentUser'; // Import your API function
import BookCard from './BookCard';
import SearchBox from './SearchBox';
import getBookByTitle from '../API/getBookByTitle';

function MyBooks() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userId = userData._id;
    setUserId(userId);

    const fetchData = async () => {
      try {
        const response = await getBooksByCurrentUser(token);
        setBooks(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateBooksBySearch = async (searchQuery) => {
    const searchedBooks = await getBookByTitle(searchQuery); // Implement this API call
    setBooks(searchedBooks);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <h1 style={{textAlign: 'center'}}>Error: {error.response.data.message}</h1>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', textAlign: 'center' }}>My Books</h1>
     </div>

      <SearchBox onSearch={updateBooksBySearch} />
      <BookCard initialBooks={books} userId={userId} isHomePage={false} />
    </div>
  );
}

export default MyBooks;
