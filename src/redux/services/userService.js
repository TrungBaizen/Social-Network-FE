import getAxios from "./customAxios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "user/login",
    async (user) => {
        let res = await getAxios().post("login", user)
        return res.data;
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async (user) => {
        let res = await getAxios().post("users/logout", user)
        return res.data;
    }
)

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email) => {
        let res = await getAxios().post(`password-reset?email=${email}`)
        return res.data;
    }
)

export const signup = createAsyncThunk(
    "user/signup",
    async (user, { rejectWithValue }) => {
        try {
            const res = await getAxios().post('register', user);
            return res.data;
        } catch (error) {
            // Kiểm tra nếu có lỗi từ phản hồi API
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                // Nếu không có phản hồi từ API, ném ra lỗi chung
                throw error;
            }
        }
    }
);
