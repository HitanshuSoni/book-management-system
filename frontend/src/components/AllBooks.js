import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Pagination } from '@mui/material';
import getAllBooks from '../API/getAllBooks';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4);

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

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div style={{ padding: '20px' }}>
        <Grid container spacing={2}>
            {currentBooks.map((book) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={book._id}>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        alt={book.title}
                        style={{ width: 'auto', aspectRatio: '9 / 16' }} // Adjust the width to your desired size
                        image={book.bookImage}
                    />
                    </div>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {book.excerpt}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        User ID: {book.userId}
                    </Typography>
                    <a href={book.bookPurchaseLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" color="primary">
                        Buy Now
                        </Button>
                    </a>
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
  );
}

export default AllBooks;
