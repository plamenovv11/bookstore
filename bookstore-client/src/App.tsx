import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { SnackbarProvider } from './components/SnackbarContext';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from './redux/store';

const AppContainer: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {isAuthenticated ? (
        <>
          <SideNavigation />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/available-books" replace />} />
              <Route path="/available-books" element={<BookList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Box>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      )}
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
