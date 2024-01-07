import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logIn from '../API/logIn'; // Replace with your login API function
import { loginSuccess } from '../actions/authAction';

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
};

function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
        console.log(formData)
      // Send the formData to the backend API for login using Axios
      const response = await logIn(formData); // Replace with your login API function
      if (response) {
        // Successful login or other successful action
        // Clear the error state
        // console.log(response.userData)
        setError('');
        setSuccess(true);
        dispatch(loginSuccess(response.token, response.userData));
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.userData))
        // Redirect or show success message
        window.location.href = '/my-books';
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        setError(error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && !error && <p style={{ color: 'green' }}>Login Successful</p>}

      <form style={styles.form}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleLogin}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
