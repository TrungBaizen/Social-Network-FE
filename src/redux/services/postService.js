import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (post) => {
        let res = await getAxios().post(`posts`,post)
        return res.data;
    }
)

export const getPostByUserId = createAsyncThunk(
    "posts/getPostByUserId",
    async (id) => {
        let res = await getAxios().get(`posts/users/${id}`)
        return res.data;
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id) => {
        let res = await getAxios().delete(`posts/${id}`)
        return res.data;
    }
)