import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { SnackbarProvider } from './components/SnackbarContext';
import AuthDialog from './components/AuthDialog';
import { Button } from '@mui/material';

const App: React.FC = () => {
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  return (
    <div className="App">
      <SnackbarProvider>
        <Router>
          <Button variant="contained" color="primary" onClick={handleOpenAuthDialog} style={{ position: 'absolute', top: 10, right: 10 }}>
            Login / Register
          </Button>
          <SideNavigation />

          <Routes>
            <Route path="/" element={<Navigate to="/available-books" replace />} />
            <Route path="/available-books" element={<BookList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          <AuthDialog open={isAuthDialogOpen} onClose={handleCloseAuthDialog} />
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
