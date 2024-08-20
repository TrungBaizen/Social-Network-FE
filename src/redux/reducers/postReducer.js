import {createSlice} from "@reduxjs/toolkit";
import {
    createPost,
    deletePost,
    getAllPostByFollowing,
    getPostByUserId, likePost,
    searchPost, unLikePost,
    updatePost
} from "../services/postService";

const initialState = {
    list: [],
    listSearch:[],
    listPostHome : []
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createPost.fulfilled, (state, {payload}) => {
            state.list.unshift(payload); // Thêm bài viết mới vào đầu danh sách
            state.listPostHome.unshift(payload);
        });
        builder.addCase(getPostByUserId.fulfilled, (state, {payload}) => {
            state.list = payload; // Cập nhật danh sách bài viết
        });
        builder.addCase(deletePost.fulfilled, (state, {payload}) => {
            state.list = state.list.filter(post => post.id !== payload.id); // Xóa bài viết khỏi danh sách
            state.listPostHome = state.listPostHome.filter(post => post.id !== payload.id); // Xóa bài viết khỏi danh sách
        });
        builder.addCase(updatePost.fulfilled, (state, {payload}) => {
            const index = state.list.findIndex(post => post.id === payload.id);
            if (index !== -1) {
                state.list[index] = payload; // Thay thế bài viết cũ bằng bài viết mới
            }
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.id);
            if (indexHome !== -1) {
                state.listPostHome[indexHome] = payload; // Thay thế bài viết cũ bằng bài viết mới
            }
            const indexSearch = state.listSearch.findIndex(post => post.id === payload.id);
            if (indexSearch !== -1) {
                state.listSearch[indexSearch] = payload; // Thay thế bài viết cũ bằng bài viết mới
            }
        })
        builder.addCase(searchPost.fulfilled,(state,{payload})=>{
            state.listSearch = payload;
        })
        builder.addCase(getAllPostByFollowing.fulfilled,(state,{payload})=>{
            state.listPostHome = payload;
        })
        builder.addCase(likePost.fulfilled, (state, { payload }) => {
            // Tìm bài viết trong state.list
            const index = state.list.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                // Nếu likes là null hoặc không được khởi tạo, khởi tạo nó như một mảng trống
                if (!state.list[index].likes) {
                    state.list[index].likes = [];
                }
                // Đẩy payload vào mảng likes
                state.list[index].likes.push(payload);
            }

            // Tìm bài viết trong state.listPostHome
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.postId);
            if (indexHome !== -1) {
                // Nếu likes là null hoặc không được khởi tạo, khởi tạo nó như một mảng trống
                if (!state.listPostHome[indexHome].likes) {
                    state.listPostHome[indexHome].likes = [];
                }
                // Đẩy payload vào mảng likes
                state.listPostHome[indexHome].likes.push(payload);
            }

            const indexSearch = state.listSearch.findIndex(post => post.id === payload.postId);
            if (indexSearch !== -1) {
                // Nếu likes là null hoặc không được khởi tạo, khởi tạo nó như một mảng trống
                if (!state.listSearch[indexSearch].likes) {
                    state.listSearch[indexSearch].likes = [];
                }
                // Đẩy payload vào mảng likes
                state.listSearch[indexSearch].likes.push(payload);
            }
        });
        builder.addCase(unLikePost.fulfilled, (state, { payload }) => {
            // Xử lý danh sách post
            const index = state.list.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                state.list[index].likes = state.list[index].likes.filter(like => like.id !== payload.id);
            }

            // Xử lý danh sách bài viết trên trang chủ
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.postId);
            if (indexHome !== -1) {
                state.listPostHome[indexHome].likes = state.listPostHome[indexHome].likes.filter(like => like.userId !== payload.userId);
            }

            const indexSearch = state.listSearch.findIndex(post => post.id === payload.postId);
            if (indexSearch !== -1) {
                state.listSearch[indexSearch].likes = state.listSearch[indexSearch].likes.filter(like => like.userId !== payload.userId);
            }
        });

    }
});

export default postSlice.reducer;
