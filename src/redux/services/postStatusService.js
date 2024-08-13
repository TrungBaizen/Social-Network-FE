import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getAllPostStatus = createAsyncThunk(
    "postStatuses/getAllStatus",
    async () => {
        let res = await getAxios().get("post_statuses")
        console.log(res.data)
        return res.data;
    }
)