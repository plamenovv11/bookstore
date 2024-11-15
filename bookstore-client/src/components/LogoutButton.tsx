import React from 'react';
import { Button } from '@mui/material';
import { useLogoutMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { store } from '../redux/store';
import { logout as logoutAction } from '../redux/authSlice';
import { useSnackbar } from './SnackbarContext';

const LogoutButton: React.FC = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            store.dispatch(logoutAction());
            navigate('/auth');
            showSnackbar(`Logout successful!`, 'success');
        } catch (err) {
            showSnackbar(`Failed to logout! ${JSON.stringify(err)}`, 'error');
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
