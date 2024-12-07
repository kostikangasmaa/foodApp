// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/Login';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';
import SavedRecipes from './components/SavedRecipes';
import Unauthorized from './components/Unauthorized';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Food App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/myrecipes">My Recipes</Button>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/myrecipes" element={user ? <SavedRecipes/> : <Unauthorized/>} />
      </Routes>
    </Router>
  );
}

export default App;