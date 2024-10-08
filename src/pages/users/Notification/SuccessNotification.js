import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch} from "react-redux";
import {successNotification} from "../../../redux/services/userService";

function SuccessNotification() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    useEffect(() => {
        console.log(token)
        dispatch(successNotification(token))
    }, [dispatch,token]);
    return (
        <div className="main-content bg-white ps-0 pe-0">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-6 col-md-8 text-center d-flex flex-column align-items-center">
                        <div className="card border-0 text-center d-block p-0">
                            <h1 className="fw-700 text-grey-900 display3-size display4-md-size">
                                Xác thực thành công!
                            </h1>
                            <p className="text-grey-500 font-xsss">
                                Tài khoản của bạn đã được xác thực thành công. Vui lòng quay lại trang chủ để tiếp tục sử dụng.
                            </p>
                            <Link to="/login" className="btn btn-primary mt-3">
                                Đăng Nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessNotification;
