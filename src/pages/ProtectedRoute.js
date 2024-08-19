import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("currentUser");

    if (!token) {
        // Nếu không có token, chuyển hướng đến trang login
        return <Navigate to="/login" />;
    }

    // Nếu có token, render component con (trang được bảo vệ)
    return children;
};

export default ProtectedRoute;
