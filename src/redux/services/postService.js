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

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({post,id}) => {
        let res = await getAxios().post(`posts/${id}`,post)
        return res.data;
    }
)

export const searchPost=createAsyncThunk(
    "posts/searchPost",
    async (content)=>{
        let res = await getAxios().get(`posts/search?content=${content}`)
        return res.data
    }
)

export const getAllPostByFollowing=createAsyncThunk(
    "posts/getAllPostByFollowing",
    async (id)=>{
        let res = await getAxios().get(`posts/${id}`);
        return res.data
    }
)

export const likePost=createAsyncThunk(
    "posts/likePost",
    async (like)=>{
        let res = await getAxios().post(`posts/likes`,like);
        return res.data
    }
)

export const unLikePost=createAsyncThunk(
    "posts/unLikePost",
    async (likeId)=>{
        let res = await getAxios().delete(`posts/likes/${likeId}`);
        return res.data
    }
)