import * as React from 'react';
import {useEffect} from 'react';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "@mui/material/Link";
import {useDispatch} from "react-redux";
import {login, loginOAuth} from "../../../redux/services/userService";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Địa chỉ email không hợp lệ')
        .required('Yêu cầu nhập email'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    // .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    // .matches(/[a-z]/, 'Password must contain a lowercase letter')
    // .matches(/[0-9]/, 'Password must contain a number')
    // .required('Required'),
});


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const succesOAuth = async (credentialResponse) => {
        try {
            const credentialDecode = jwtDecode(credentialResponse.credential);
            const user = {
                firstName:credentialDecode.family_name,
                lastName:credentialDecode.given_name,
                email:credentialDecode.email,
                identifier:credentialDecode.sub
            }
            console.log(user)
            const action = await dispatch(loginOAuth(user));

            if (loginOAuth.fulfilled.match(action)) {
                // Điều hướng sau khi đăng nhập thành công
                navigate("/");
            } else {
                // Nếu yêu cầu không thành công, lỗi sẽ được lưu trong action.payload
                const errorMessage = action.payload?.message || 'Đăng nhập thất bại, vui lòng thử lại.';
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại, vui lòng thử lại.");
        }

    }
    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const action = await dispatch(login(values));

            if (login.fulfilled.match(action)) {
                // Điều hướng sau khi đăng nhập thành công
                navigate("/");
            } else {
                // Nếu yêu cầu không thành công, lỗi sẽ được lưu trong action.payload
                const errorMessage = action.payload?.message || 'Đăng nhập thất bại, vui lòng thử lại.';
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại, vui lòng thử lại.");
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
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
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
                        {({isSubmitting}) => (
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
                                />
                                <ErrorMessage name="email" component="div" style={{color: 'red'}}/>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <ErrorMessage name="password" component="div" style={{color: 'red'}}/>
                                <FormControlLabel
                                    control={<Field as={Checkbox} name="remember" color="primary"/>}
                                    label="Nhớ mật khẩu"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    disabled={isSubmitting}
                                >
                                    Đăng Nhập
                                </Button>
                                <GoogleLogin
                                    onSuccess={succesOAuth}
                                    onError={() => {
                                        console.log('Đăng nhập thất bại!');
                                    }}
                                    auto_select={false}
                                />
                                <Grid container>
                                    <Grid item xs>
                                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                                            Quên mật khẩu?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link component={RouterLink} to="/register" variant="body2">
                                            {"Chưa có tài khoản? Đăng ký"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <ToastContainer/>
            </Container>
        </ThemeProvider>
    );
}
