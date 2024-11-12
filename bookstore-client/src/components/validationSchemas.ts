import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Repeat Password is required'),

});
