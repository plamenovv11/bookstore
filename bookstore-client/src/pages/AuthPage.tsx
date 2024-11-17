import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthDialog from '../components/AuthDialog';

const AuthPage: React.FC = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/available-books');
        }
    }, [isAuthenticated, navigate]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AuthDialog open={open} onClose={handleClose} />
    );
};

export default AuthPage;
