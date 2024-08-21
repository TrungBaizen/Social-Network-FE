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
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/services/userService";

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Địa chỉ email không hợp lệ')
        .required('Bắt buộc'),
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const resultAction = await dispatch(forgotPassword(values.email));

            if (forgotPassword.fulfilled.match(resultAction)) {
                navigate('/login'); // Điều hướng đến trang đăng nhập
            } else {
                if (resultAction.payload) {
                    // Nếu lỗi đã được gửi từ API
                    throw new Error(resultAction.payload.message || 'Đã xảy ra lỗi');
                } else {
                    // Nếu lỗi là một đối tượng lỗi chung chung
                    throw new Error(resultAction.error.message || 'Đã xảy ra lỗi');
                }
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
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
                        Quên Mật Khẩu
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
                                    label="Địa chỉ Email"
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
                                    Gửi Hướng Dẫn Đặt Lại Mật Khẩu
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                            variant="body2"
                                        >
                                            {"Nhớ mật khẩu? Đăng nhập"}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            component={RouterLink}
                                            to="/register"
                                            variant="body2"
                                        >
                                            {"Chưa có tài khoản? Đăng ký"}
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
