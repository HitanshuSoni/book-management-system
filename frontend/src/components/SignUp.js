import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import signUp from '../API/signUp';

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // You can adjust the height as needed
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px', // Adjust the gap/space between fields as needed
    },
  };

function SignUp() {
  const [formData, setFormData] = useState({
    title: 'Mr',
    name: '',
    phone: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      pincode: '',
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'street' || name === 'city' || name === 'pincode') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async () => {
    try {
      // Send the formData to the backend API for signup using Axios
      const response = await signUp(formData);
        console.log(response);
      if (response) {
        // Successful signup or other successful action
        // Clear the error state
        setError('');
        setSuccess(true)
        // Redirect or show success message
        window.location.href = '/login';
      } else {
        setError('An error occurred. Please try again later.');
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
    <h2>Sign Up</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && !error && <p style={{ color: 'green' }}>User Successfully Created</p>}

    <form style={styles.form}>
    
        <Select
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        style={{ height: '40px', width: '100%', fontSize: '16px' }}
        >
        <MenuItem disabled value="">
            <em>Select Title</em>
        </MenuItem>
        <MenuItem value="Mr">Mr</MenuItem>
        <MenuItem value="Mrs">Mrs</MenuItem>
        <MenuItem value="Miss">Miss</MenuItem>
      </Select>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
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
      <TextField
        label="Street"
        name="street"
        value={formData.address.street}
        onChange={handleChange}
      />
      <TextField
        label="City"
        name="city"
        value={formData.address.city}
        onChange={handleChange}
      />
      <TextField
        label="Pincode"
        name="pincode"
        value={formData.address.pincode}
        onChange={handleChange}
      />
      <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleSubmit}>
        Signup
      </Button>
    </form>
  </div>
  );
}

export default SignUp;
