import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBox = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '10px', marginTop: '10px' }}>
      <TextField 
        label="Search" 
        variant="outlined" 
        value={searchQuery} 
        onChange={handleInputChange}
        fullWidth
        sx={{ marginRight: '10px', marginTop:'auto' }} // Adding some space between the TextField and Button
      />
      <Button 
        variant="contained"
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#045d03' } }} // Custom green color
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
