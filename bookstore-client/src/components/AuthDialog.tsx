import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Tabs, Tab, Box, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation, useRegisterMutation } from '../services/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, registerSchema } from './validationSchemas';

interface AuthDialogProps {
    open: boolean;
    onClose: () => void;
}

interface AuthFormData {
    email: string;
    password: string;
    repeatPassword?: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AuthFormData>({
        resolver: yupResolver(tabIndex === 0 ? loginSchema : registerSchema),
        mode: 'onBlur',
    });

    const [login, { isLoading: isLoggingIn }] = useLoginMutation();
    const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        reset();
    };

    const handleAuth: SubmitHandler<AuthFormData> = async (data) => {
        try {
            if (tabIndex === 0) {
                const response = await login({ email: data.email, password: data.password }).unwrap();

                localStorage.setItem('sessionId', response.sessionId);

                console.log('Logged in successfully:', response.sessionId);
                onClose();
            } else {
                if (data.repeatPassword && data.password !== data.repeatPassword) {
                    setError('Passwords must match');
                    return;
                }

                const response = await registerUser({ email: data.email, password: data.password }).unwrap();
                console.log('Registered successfully:', response.message);
                onClose();
            }
        } catch (err) {
            console.error('Authentication failed:', err);
            setError('Authentication failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{tabIndex === 0 ? 'Login' : 'Register'}</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                <Box component="form" noValidate onSubmit={handleSubmit(handleAuth)} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        type="email"
                        {...register('email')}
                        error={Boolean(errors.email)}


                        helperText={errors.email?.message}
                        required
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        {...register('password')}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        required
                    />

                    {tabIndex === 1 && (
                        <TextField
                            label="Repeat Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            {...register('repeatPassword')}
                            error={Boolean(errors.repeatPassword)}
                            helperText={errors.repeatPassword?.message}
                            required
                        />
                    )}

                    {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit(handleAuth)}
                    color="primary"
                    disabled={isLoggingIn || isRegistering}
                >
                    {tabIndex === 0 ? (isLoggingIn ? 'Logging in...' : 'Login') : isRegistering ? 'Registering...' : 'Register'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthDialog;
