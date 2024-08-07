import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import {forgotPassword} from "../../../redux/services/userService";

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(forgotPassword(values.email))
            navigate('/login'); // Điều hướng đến trang đăng nhập
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
                        Forgot Password
                    </Typography>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={<ErrorMessage name="email" />}
                                    error={Boolean(errors.email && touched.email)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Send Reset Instructions
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                            variant="body2"
                                        >
                                            {"Remember your password? Sign In"}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            component={RouterLink}
                                            to="/register"
                                            variant="body2"
                                        >
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
}
