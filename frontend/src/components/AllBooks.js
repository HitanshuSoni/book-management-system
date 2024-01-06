import React, { useState, useEffect } from 'react';
import  getAllBooks  from '../API/getAllBooks'; 

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5); // Adjust the number of books per page as needed

  useEffect(() => {
    // Fetch all books when the component mounts
    const fetchBooks = async () => {
      const booksData = await getAllBooks();
      console.log(booksData.data);
      setBooks(booksData);
    //   console.log(books)
    };

    fetchBooks();
  }, []);

  // Calculate pagination values
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentBooks.map((book) => (
        <div key={book._id} className="book-card">
          <h2>{book.title}</h2>
          <img src={book.bookImage} alt={book.title} />
          <p>{book.excerpt}</p>
          <p>User ID: {book.userId}</p>
          <a href={book.bookPurchaseLink} target="_blank" rel="noopener noreferrer">
            <button>Buy Now</button>
          </a>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
