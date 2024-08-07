import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { login } from "../../../redux/services/userService";
import { useEffect } from 'react';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        // .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        // .matches(/[a-z]/, 'Password must contain a lowercase letter')
        // .matches(/[0-9]/, 'Password must contain a number')
        // .required('Required'),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const action = await dispatch(login(values));

            if (login.fulfilled.match(action)) {
                // Điều hướng sau khi đăng nhập thành công
                navigate("/");
            } else {
                // Nếu yêu cầu không thành công, lỗi sẽ được lưu trong action.payload
                toast.error(action.payload || 'Login failed, please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error("Login failed, please try again.");
        } finally {
            setSubmitting(false);
        }
    };



    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            // Nếu có thông tin người dùng, điều hướng đến trang chủ
            navigate("/");
        }
    }, [navigate]);


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
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            remember: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
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
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                <FormControlLabel
                                    control={<Field as={Checkbox} name="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link component={RouterLink} to="/register" variant="body2">
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
