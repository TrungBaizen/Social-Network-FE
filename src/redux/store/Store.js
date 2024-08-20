import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/postStatusReducer";
import notificationReducer from "../reducers/notificationReducer";
import postPageReducer from "../reducers/postPageReducer";
import {thunk} from "redux-thunk";
import profileReducer from "../reducers/profileReducer";
<<<<<<< HEAD
import createPostReducer from '../reducers/createPostReducer';
import searchReducer from "../reducers/searchReducer";

const store = configureStore({
    reducer: {
        users: userReducer,
        genders: genderReducer,
        postStatuses: statusReducer,
        notifications: notificationReducer, // ô thông báo
        posts: postPageReducer,
        profiles: profileReducer,
        createPost: createPostReducer,
        search: searchReducer
     },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});
=======
import postReducer from "../reducers/postReducer";

const store = configureStore({
    reducer: {
        users:userReducer,
        genders:genderReducer,
        postStatuses:statusReducer,
        notifications : notificationReducer,
        profiles: profileReducer,
        posts:postReducer
    }
})
>>>>>>> master
export default store;