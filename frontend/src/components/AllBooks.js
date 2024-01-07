import React, { useState, useEffect } from 'react';
import getAllBooks from '../API/getAllBooks';
import BookCard from './BookCard';
import SearchBox from './SearchBox';
import getBookByTitle from '../API/getBookByTitle';

function AllBooks() {
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const updateBooksBySearch = async (searchQuery) => {
    const searchedBooks = await getBookByTitle(searchQuery); // Implement this API call
    setBooks(searchedBooks);
  };
  
  return (
    <>
    <SearchBox onSearch={updateBooksBySearch} />
  <BookCard initialBooks={books} isHomePage={false}/> 
  </>
  );
}

export default AllBooks;
