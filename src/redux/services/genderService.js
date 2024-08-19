import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getAllGender = createAsyncThunk(
    "genders/getAllGender",
    async () => {
        let res = await getAxios().get("genders")
        return res.data;
    }
)