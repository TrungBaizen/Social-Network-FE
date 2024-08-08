import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import genderReducer from "../reducers/genderReducer";
import statusReducer from "../reducers/statusReducer";

const store = configureStore({
    reducer: {
        users:userReducer,
        genders:genderReducer,
        statuses:statusReducer
    }
})
export default store;