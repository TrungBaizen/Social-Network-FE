import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangePasswordSuccess() {
    return (
        <div className="main-content bg-white ps-0 pe-0">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-6 col-md-8 text-center d-flex flex-column align-items-center">
                        <div className="card border-0 text-center d-block p-0">
                            <h1 className="fw-700 text-grey-900 display3-size display4-md-size">
                                Đổi Mật Khẩu Thành Công!
                            </h1>
                            <p className="text-grey-500 font-xsss">
                                Mật khẩu của bạn đã được thay đổi thành công. Vui lòng đăng nhập bằng mật khẩu mới của bạn.
                            </p>
                            <Link to="/login" className="btn btn-primary mt-3">
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordSuccess;
