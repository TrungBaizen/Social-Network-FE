import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {signup} from "../../../redux/services/userService";

const defaultTheme = createTheme();

const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
        years.push(i);
    }
    return years;
};

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    gender: Yup.string().required('Required'),
    day: Yup.number().required('Required').min(1, 'Invalid day').max(31, 'Invalid day'),
    month: Yup.number().required('Required').min(1, 'Invalid month').max(12, 'Invalid month'),
    year: Yup.number().required('Required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
});

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(signup())
            navigate('/register-success'); // Điều hướng đến trang đăng nhập
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            gender: '',
                            day: '',
                            month: '',
                            year: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            helperText={<ErrorMessage name="firstName" />}
                                            error={Boolean(errors.firstName && touched.firstName)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            helperText={<ErrorMessage name="lastName" />}
                                            error={Boolean(errors.lastName && touched.lastName)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            helperText={<ErrorMessage name="email" />}
                                            error={Boolean(errors.email && touched.email)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            helperText={<ErrorMessage name="password" />}
                                            error={Boolean(errors.password && touched.password)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                            helperText={<ErrorMessage name="confirmPassword" />}
                                            error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth required error={Boolean(errors.gender && touched.gender)}>
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Field as={Select} labelId="gender-label" id="gender" name="gender" label="Gender">
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.day && touched.day)}>
                                            <InputLabel id="day-label">Day</InputLabel>
                                            <Field as={Select} labelId="day-label" id="day" name="day" label="Day">
                                                {[...Array(31).keys()].map(day => (
                                                    <MenuItem key={day + 1} value={day + 1}>{day + 1}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="day" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.month && touched.month)}>
                                            <InputLabel id="month-label">Month</InputLabel>
                                            <Field as={Select} labelId="month-label" id="month" name="month" label="Month">
                                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                                    <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="month" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.year && touched.year)}>
                                            <InputLabel id="year-label">Year</InputLabel>
                                            <Field as={Select} labelId="year-label" id="year" name="year" label="Year">
                                                {generateYears().map(year => (
                                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="year" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Field as={Checkbox} name="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
