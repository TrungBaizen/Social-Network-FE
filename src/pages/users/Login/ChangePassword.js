import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Mật khẩu cũ là bắt buộc'),
    newPassword: Yup.string()
        .required('Mật khẩu mới là bắt buộc')
        .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
});

function ChangePassword() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Đổi Mật Khẩu
                </Typography>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={values => {
                        // Xử lý thay đổi mật khẩu ở đây
                        console.log(values);
                    }}
                >
                    {() => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className="mb-3">
                                        <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                                        <Field
                                            type="password"
                                            id="oldPassword"
                                            name="oldPassword"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                        <Field
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                        <Field
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đổi mật khẩu
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Quay lại đăng nhập
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default ChangePassword;
