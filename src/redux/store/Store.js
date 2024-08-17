import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/postStatusReducer";
import notificationReducer from "../reducers/notificationReducer";
import profileReducer from "../reducers/profileReducer";
import postReducer from "../reducers/postReducer";

const store = configureStore({
    reducer: {
        users:userReducer,
        genders:genderReducer,
        postStatuses:statusReducer,
        notifications : notificationReducer,
        profiles: profileReducer,
        posts:postReducer,
    }
})
export default store;