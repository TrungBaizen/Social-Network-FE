import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getAllStatus = createAsyncThunk(
    "statuses/getAllStatus",
    async () => {
        let res = await getAxios().get("statuses")
        return res.data;
    }
)