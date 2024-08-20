import Login from "./pages/users/Login/Login";
import {Route, Routes} from "react-router-dom";
import RegisterForm from "./pages/users/Login/RegisterForm";
import ForgotPassword from "./pages/users/Login/ForgotPassword";
import NotFound from "./pages/404/404";
import RegisterSuccess from "./pages/users/Login/RegisterSuccess";
import PostPage from "./pages/posts/PostPage";
import ForgotSuccess from "./pages/users/Login/ForgotSuccess";
import ChangePassword from "./pages/users/Login/ChangePassword";
import SuccessNotification from "./pages/users/Notification/SuccessNotification";
import Profile from "./pages/profiles/Profile";
import Home from "./pages/home/Home";
import FriendsProfile from "./pages/profiles/FriendsProfile";
import ProtectedRoute from "./pages/ProtectedRoute";
<<<<<<< HEAD
import SearchListFriends from "./pages/search/SearchListFriends";
=======
import SearchLayout from "./components/search/SearchLayOut/SearchLayOut";
>>>>>>> master

function App() {
    return (
        <>
            <Routes>
                {/*<Route path="/" element={<HomeS/>}/>*/}
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/forgot-success" element={<ForgotSuccess/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/register-success" element={<RegisterSuccess/>}/>
                <Route path="/changepassword" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/friendsprofile" element={<ProtectedRoute><FriendsProfile/></ProtectedRoute>}/>
                <Route path="/post" element={<ProtectedRoute><PostPage/></ProtectedRoute>}/>
                <Route path="/successnotification" element={<SuccessNotification/>}/>
<<<<<<< HEAD
                <Route path="/search" element={<ProtectedRoute><SearchListFriends /></ProtectedRoute>} />
=======
                <Route path="/search-results" element={<SearchLayout />} />
>>>>>>> master
                <Route path="*" element={<NotFound/>}/>
             </Routes>
        </>
    );
}

export default App;