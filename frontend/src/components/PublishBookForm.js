import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import  publishBook  from '../API/publishBook'; // Import your publishBook API function

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
  },
};

function PublishBookForm() {
  let userData = localStorage.getItem("userData");
  const token = localStorage.getItem("token");

  userData = JSON.parse(userData)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    userId: userData._id,
    bookImage: '',
    bookPurchaseLink: '',
    isDeleted: false,
    releasedAt: getCurrentDate(),
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await publishBook({ formData, token }); // Call the publishBook API function
      if (response) {
        setSuccess(true);
        setError('');
        window.location.href = '/my-books';
      }else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error('Error:', error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <h2>Publish a Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && !error && (
        <p style={{ color: 'green' }}>Book Added Successfully</p>
      )}
      <form style={styles.form}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Book Image"
          name="bookImage"
          value={formData.bookImage}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Book Purchase Link"
          name="bookPurchaseLink"
          value={formData.bookPurchaseLink}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={styles.button}
        >
          Publish
        </Button>
      </form>
    </Container>
  );
}

export default PublishBookForm;
