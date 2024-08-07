import getAxios from "./customAxios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "user/login",
    async (user)=>{
        let res =await getAxios().post("login",user)
        return res.data;
    }
)