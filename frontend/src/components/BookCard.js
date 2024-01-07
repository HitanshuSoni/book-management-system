import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Pagination } from '@mui/material';
import unPublishBook from '../API/unPublishBook'

function BookCard({ initialBooks, userId, isHomePage }) {
    const [books, setBooks] = useState(initialBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4);

  useEffect(() => {
    setBooks(initialBooks);
    console.log(books)
  }, [initialBooks]);

  useEffect(() => {
    // Ensure that currentPage is adjusted if there are fewer pages after books change
    const totalPages = Math.ceil(books.length / booksPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [books, currentPage, booksPerPage]);

  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const handleUnpublish = async (bookId) => {
    await unPublishBook(bookId, localStorage.getItem("token"));
    const updatedBooks = books.filter(book => book._id !== bookId);
    setBooks(updatedBooks);

    // Recalculate total number of pages after the book list is updated
    const newTotalPages = Math.ceil(updatedBooks.length / booksPerPage);

    // Adjust currentPage if it's now out of range
    if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1); // Ensures we don't set currentPage to 0
    }
};

useEffect(() => {
    // This effect will ensure that we don't have an empty page displayed
    // after books have been updated and the user is not currently on the first page.
    if (currentPage > 1 && currentBooks.length === 0) {
        setCurrentPage(currentPage - 1);
    }
}, [currentBooks, currentPage]);


  

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {currentBooks.filter((book) => !book.isDeleted).map((book) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={book._id}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  alt={book.title}
                  style={{ width: 'auto', aspectRatio: '9 / 16' }}
                  image={book.bookImage}
                />
              </div>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                <Typography variant="h4" gutterBottom>
                  {book.title}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}> {/* Adjusted variant and used sx prop */}
                    Excerpt: {book.excerpt}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}> {/* Adjusted variant */}
                    User ID: {book.userId}
                </Typography>

                <a href={book.bookPurchaseLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary">
                    Buy Now
                  </Button>
                </a>
                {(book.userId === userId && !isHomePage) && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUnpublish(book._id)}
                    style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
                  >
                    Unpublish Book
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(books.length / booksPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
}

export default BookCard;
