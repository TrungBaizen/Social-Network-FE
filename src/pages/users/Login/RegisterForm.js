import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../../../redux/services/userService";
import { getAllGender } from "../../../redux/services/genderService";

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
    firstName: Yup.string().required('Bắt buộc'),
    lastName: Yup.string().required('Bắt buộc'),
    email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Bắt buộc'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp').required('Bắt buộc'),
    gender: Yup.string().required('Bắt buộc'),
    day: Yup.number().required('Bắt buộc').min(1, 'Ngày không hợp lệ').max(31, 'Ngày không hợp lệ'),
    month: Yup.number().required('Bắt buộc').min(1, 'Tháng không hợp lệ').max(12, 'Tháng không hợp lệ'),
    year: Yup.number().required('Bắt buộc').min(1900, 'Năm không hợp lệ').max(new Date().getFullYear(), 'Năm không hợp lệ'),
});

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genders = useSelector(({ genders }) => genders.list);

    useEffect(() => {
        dispatch(getAllGender());
    }, [dispatch]);

    const handleSubmit = async (values, { setSubmitting }) => {
        const birthDate = `${values.year}-${String(values.month).padStart(2, '0')}-${String(values.day).padStart(2, '0')}`;
        const user = {
            gender: values.gender,
            firstName: values.firstName,
            lastName: values.lastName,
            birthDate: birthDate,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        };
        try {
            await dispatch(signup(user)).unwrap();
            navigate('/register-success');
        } catch (error) {
            toast.error('Đăng ký không thành công');
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
                        Đăng ký
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
                                            label="Tên"
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
                                            label="Họ"
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
                                            label="Địa chỉ Email"
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
                                            label="Mật khẩu"
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
                                            label="Xác nhận mật khẩu"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                            helperText={<ErrorMessage name="confirmPassword" />}
                                            error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth required error={Boolean(errors.gender && touched.gender)}>
                                            <InputLabel id="gender-label">Giới tính</InputLabel>
                                            <Field as={Select} labelId="gender-label" id="gender" name="gender" label="Giới tính">
                                                {genders.map((gender, index) => (
                                                    <MenuItem key={index} value={gender}>{gender}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.day && touched.day)}>
                                            <InputLabel id="day-label">Ngày</InputLabel>
                                            <Field as={Select} labelId="day-label" id="day" name="day" label="Ngày">
                                                {[...Array(31).keys()].map(day => (
                                                    <MenuItem key={day + 1} value={day + 1}>{day + 1}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="day" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.month && touched.month)}>
                                            <InputLabel id="month-label">Tháng</InputLabel>
                                            <Field as={Select} labelId="month-label" id="month" name="month" label="Tháng">
                                                {['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'].map((month, index) => (
                                                    <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="month" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth required error={Boolean(errors.year && touched.year)}>
                                            <InputLabel id="year-label">Năm</InputLabel>
                                            <Field as={Select} labelId="year-label" id="year" name="year" label="Năm">
                                                {generateYears().map(year => (
                                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="year" component="div" style={{ color: 'red' }} />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Đăng ký
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2" component={RouterLink}>
                                            Đã có tài khoản? Đăng nhập
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
