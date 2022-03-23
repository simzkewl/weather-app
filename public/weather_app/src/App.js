import './App.css';
import TextField from "@mui/material/TextField";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function App() {
    console.log('Weather app v1.0.3')
    const [city, setCityState] = useState('');
    
    const navigate = useNavigate();
    let handleSearch = () => {
        navigate(`/weather?city=${city}`);
    }
    
  return (
      <div className="App">
      <header className="App-header">
        <h2>Enter City</h2>
        <div className="search">
            <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="City"
            value={city} 
            onChange={(e) => setCityState(e.target.value)}
            />
        </div>
        <Button onClick={handleSearch}>
            Search
        </Button>
      </header>
    </div>
    
  );
}

export default App;
