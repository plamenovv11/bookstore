import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { SnackbarProvider } from './components/SnackbarContext';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from './redux/store';
import LogoutButton from './components/LogoutButton';

const AppContainer: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box className="App">
      {isAuthenticated && (
        <>
          <LogoutButton />
          <SideNavigation />
        </>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/available-books" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/available-books" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Box>
  );
};

const App: React.FC = () => (
  <SnackbarProvider>
    <Router>
      <AppContainer />
    </Router>
  </SnackbarProvider>
);

export default App;
