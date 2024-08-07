import Login from "./pages/users/Login/Login";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/users/Login/RegisterForm";
import ForgotPassword from "./pages/users/Login/ForgotPassword";
import NotFound from "./pages/404/404";
import HomeS from "./pages/home/HomeS";
import RegisterSuccess from "./pages/users/Login/RegisterSuccess";
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeS />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/register-success" element={<RegisterSuccess />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;