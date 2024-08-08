import getAxios from "./customAxios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "user/login",
    async (user, { rejectWithValue }) => {
        try {
            let res = await getAxios().post("login", user);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (user) => {
        let res = await getAxios().post("users/logout", user)
        return res.data;
    }
)

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const res = await getAxios().post(`password-reset?email=${email}`);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

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

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (user, { rejectWithValue }) => {
        try {
            const response = await getAxios().post('users/change-password', user);
            return response.data;
        } catch (error) {
            // Trả về thông tin lỗi nếu có
            return rejectWithValue(error.response.data.message || 'Đã xảy ra lỗi.');
        }
    }
);

export const successNotification = createAsyncThunk(
    'user/successNotification',
    async (token, { rejectWithValue }) => {
        try {
            const response = await getAxios().get(`/verify?token=${token}`);
            return response.data;
        } catch (error) {
            // Trả về thông tin lỗi nếu có
            return rejectWithValue(error.response.data.message || 'Đã xảy ra lỗi.');
        }
    }
);
