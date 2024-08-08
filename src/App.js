import Login from "./pages/users/Login/Login";
import {Route, Routes} from "react-router-dom";
import RegisterForm from "./pages/users/Login/RegisterForm";
import ForgotPassword from "./pages/users/Login/ForgotPassword";
import NotFound from "./pages/404/404";
import HomeS from "./pages/home/HomeS";
import RegisterSuccess from "./pages/users/Login/RegisterSuccess";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostPage from "./pages/posts/PostPage";
import ForgotSuccess from "./pages/users/Login/ForgotSuccess";
import ChangePassword from "./pages/users/Login/ChangePassword";
import SuccessNotification from "./pages/users/Notification/SuccessNotification";
import Profile from "./pages/profiles/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeS/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/forgot-success" element={<ForgotSuccess/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/register-success" element={<RegisterSuccess/>}/>
                <Route path="/changepassword" element={<ChangePassword/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile1" element={<Profile/>}/>
                <Route path="/post" element={<PostPage/>}/>
                <Route path="/successnotification" element={<SuccessNotification/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;