import React, { useState, useEffect } from 'react';
import getBooksByCurrentUser from '../API/getBooksByCurrentUser'; // Import your API function
import BookCard from './BookCard';

function MyBooks() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(''); // Declare userId outside of useEffect

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userId = userData._id; // Set userId using setUserId
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>My Books</h1>
      <BookCard initialBooks={books} userId={userId} isHomePage={false} />
    </div>
  );
}

export default MyBooks;
