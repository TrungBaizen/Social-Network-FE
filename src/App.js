import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { AuthContextProvider, AuthContext } from './context/authContext';
import { DarkModeContextProvider, DarkModeContext } from './context/darkModeContext';
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Login from "./pages/users/Login/Login";
import ForgotPassword from "./pages/users/Login/ForgotPassword";
import ForgotSuccess from "./pages/users/Login/ForgotSuccess";
import RegisterForm from "./pages/users/Login/RegisterForm";
import RegisterSuccess from "./pages/users/Login/RegisterSuccess";
import ChangePassword from "./pages/users/Login/ChangePassword";
import SuccessNotification from "./pages/users/Notification/SuccessNotification";
import NotFound from "./pages/404/404";
import { useContext } from "react";
import "./style.css";
import Profile from "./profile/Profile";

const Layout = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Outlet />
                </div>
                <RightBar />
            </div>
        </div>
    );
};

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/successnotification", element: <SuccessNotification /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/forgot-success", element: <ForgotSuccess /> },
    { path: "/register", element: <RegisterForm /> },
    { path: "/register-success", element: <RegisterSuccess /> },
    { path: "/changepassword", element: <ChangePassword /> },
    { path: "*", element: <NotFound /> },
]);

function App() {
    return (
        <AuthContextProvider>
            <DarkModeContextProvider>
                <RouterProvider router={router} />
            </DarkModeContextProvider>
        </AuthContextProvider>
    );
}

export default App;
