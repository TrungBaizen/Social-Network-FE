import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/postStatusReducer";
import notificationReducer from "../reducers/notificationReducer";

const store = configureStore({
    reducer: {
        users:userReducer,
        genders:genderReducer,
        postStatuses:statusReducer,
        notifications : notificationReducer // ô thông báo
    }
})
export default store;