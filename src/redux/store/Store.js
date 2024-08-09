import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/postStatusReducer";

const store = configureStore({
    reducer: {
        users:userReducer,
        genders:genderReducer,
        postStatuses:statusReducer
    }
})
export default store;