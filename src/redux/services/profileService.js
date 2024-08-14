import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "./customAxios";

 export const getProfile = createAsyncThunk(
    "profiles/getProfile", // Tên loại hành động cho thunk
    async (email) => {
        let res = await getAxios().get(`profiles?email=${email}`);
        return res.data;
    }
);

 export const updateAvatar = createAsyncThunk(
    "profiles/updateAvatar",
    async ({ image, id }) => {
        let res = await getAxios().post(`profiles/imageavatar/${id}`, image);
        return res.data();
    }
);

 export const updateCover = createAsyncThunk(
    "profiles/updateCover",
    async ({ image, id }) => { // Hàm thực hiện thao tác bất đồng bộ với các tham số được giải nén
        let res = await getAxios().post(`profiles/imagecover/${id}`, image); // Gửi yêu cầu POST đến endpoint với ảnh và ID người dùng
        return res.data(); // Trả về dữ liệu phản hồi từ yêu cầu
    }
);
