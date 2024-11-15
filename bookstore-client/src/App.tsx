import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { SnackbarProvider, useSnackbar } from './components/SnackbarContext';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { RootState } from './store/store';
import { logout as logoutAction } from './store/authSlice';
import { store } from './store/store';
import { useLogoutMutation } from './services/authApi';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      store.dispatch(logoutAction());
      navigate('/auth');
      showSnackbar(`Logout successful!`, 'success');
    } catch (err) {
      showSnackbar(`Fail to logout!, ${JSON.stringify(err)}`, 'error');
    }
  };

  return (
    <Box className="App">
      {isAuthenticated && (
        <>
          <Button
            variant="contained"
            color="primary"
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <SideNavigation />
        </>
      )
      }
      <Routes>
        <Route path="/" element={<Navigate to="/available-books" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/available-books" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Box >
  );
};

const AppWithAuth = () => (
  <SnackbarProvider>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </SnackbarProvider>
);

export default AppWithAuth;
