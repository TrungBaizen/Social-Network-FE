import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/postStatusReducer";
import notificationReducer from "../reducers/notificationReducer";
import postPageReducer from "../reducers/postPageReducer";
import {thunk} from "redux-thunk";
import profileReducer from "../reducers/profileReducer";
import createPostReducer from '../reducers/createPostReducer';

const store = configureStore({
    reducer: {
        users: userReducer,
        genders: genderReducer,
        postStatuses: statusReducer,
        notifications: notificationReducer, // ô thông báo
        posts: postPageReducer,
        profiles: profileReducer,
        createPost: createPostReducer
     },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});
export default store;