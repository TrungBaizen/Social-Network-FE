import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";
import axios from "axios";

export const getProfile = createAsyncThunk(
    "profiles/getProfile",
    async (email) => {
        let res = await getAxios().get(`profiles?email=${email}`)
        return res.data;
    }
)

export const updateAvatar = createAsyncThunk(
    "profiles/updateAvatar",
    async ({image, id}) => {
        let res = await getAxios().post(`profiles/imageavatar/${id}`, image)
        return res.data()
    }
)

export const updateCover = createAsyncThunk(
    "profiles/updateCover",
    async ({image, id}) => {
        let res = await getAxios().post(`profiles/imagecover/${id}`, image)
        return res.data()
    }
)

export const searchProfile=createAsyncThunk(
    "profiles/searchProfile",
    async(name)=>{
        let res = await getAxios().get(`profiles/search?name=${name}`)
        return res.data
    }
);

export const updateProfile = createAsyncThunk(
    "profiles/updateProfile",
    async ({profile, id}) => {
        let res = await getAxios().post(`profiles/${id}`, profile)
        return res.data
    }
);

