import {createSlice} from "@reduxjs/toolkit";
import {
    commentPost,
    createPost, deleteCommentPost,
    deletePost,
    getAllPostByFollowing,
    getPostByUserId, likePost,
    searchPost, unLikePost,
    updatePost
} from "../services/postService";

const initialState = {
    list: [],
    listSearch: [],
    listPostHome: []
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
        builder.addCase(searchPost.fulfilled, (state, {payload}) => {
            state.listSearch = payload;
        })
        builder.addCase(getAllPostByFollowing.fulfilled, (state, {payload}) => {
            state.listPostHome = payload;
        })
        builder.addCase(likePost.fulfilled, (state, {payload}) => {
            const index = state.list.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                if (!state.list[index].likes) {
                    state.list[index].likes = [];
                }
                state.list[index].likes.push(payload);
            }
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.postId);
            if (indexHome !== -1) {
                if (!state.listPostHome[indexHome].likes) {
                    state.listPostHome[indexHome].likes = [];
                }
                state.listPostHome[indexHome].likes.push(payload);
            }
            const indexSearch = state.listSearch.findIndex(post => post.id === payload.postId);
            if (indexSearch !== -1) {
                if (!state.listSearch[indexSearch].likes) {
                    state.listSearch[indexSearch].likes = [];
                }
                state.listSearch[indexSearch].likes.push(payload);
            }
        });
        builder.addCase(unLikePost.fulfilled, (state, {payload}) => {
            const index = state.list.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                state.list[index].likes = state.list[index].likes.filter(like => like.id !== payload.id);
            }
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.postId);
            if (indexHome !== -1) {
                state.listPostHome[indexHome].likes = state.listPostHome[indexHome].likes.filter(like => like.userId !== payload.userId);
            }
            const indexSearch = state.listSearch.findIndex(post => post.id === payload.postId);
            if (indexSearch !== -1) {
                state.listSearch[indexSearch].likes = state.listSearch[indexSearch].likes.filter(like => like.userId !== payload.userId);
            }
        });
        builder.addCase(commentPost.fulfilled, (state, { payload }) => {
            const index = state.list.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                if (!state.list[index].comments) {
                    state.list[index].comments = [];
                }

                if (payload.parentCommentId === null) {
                    state.list[index].comments.push(payload);
                } else {
                    const parentComment = state.list[index].comments.find(
                        comment => comment.id === payload.parentCommentId
                    );
                    if (parentComment) {
                        if (!parentComment.commentChildren) {
                            parentComment.commentChildren = [];
                        }
                        parentComment.commentChildren.push(payload);
                    }
                }
            }
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.postId);
            if (indexHome !== -1) {
                if (!state.listPostHome[indexHome].comments) {
                    state.listPostHome[indexHome].comments = [];
                }

                if (payload.parentCommentId === null) {
                    state.listPostHome[indexHome].comments.push(payload);
                } else {
                    const parentComment = state.listPostHome[indexHome].comments.find(
                        comment => comment.id === payload.parentCommentId
                    );
                    if (parentComment) {
                        if (!parentComment.commentChildren) {
                            parentComment.commentChildren = [];
                        }
                        parentComment.commentChildren.push(payload);
                    }
                }
            }
            const indexSearch = state.listSearch.findIndex(post => post.id === payload.postId);
            if (indexSearch !== -1) {
                if (!state.listSearch[indexSearch].comments) {
                    state.listSearch[indexSearch].comments = [];
                }
                if (payload.parentCommentId === null) {
                    state.listSearch[indexSearch].comments.push(payload);
                } else {
                    const parentComment = state.listSearch[indexSearch].comments.find(
                        comment => comment.id === payload.parentCommentId
                    );
                    if (parentComment) {
                        if (!parentComment.commentChildren) {
                            parentComment.commentChildren = [];
                        }
                        parentComment.commentChildren.push(payload);
                    }
                }
            }
        });
        builder.addCase(deleteCommentPost.fulfilled,(state,{payload})=>{
            const index = state.list.findIndex(post =>
                    post.comments && post.comments.some(comment =>
                        comment.id === payload ||
                        (comment.commentChildren && comment.commentChildren.some(child => child.id === payload))
                    )
            );
            if (index !== -1){
                const indexComment = state.list[index].comments.findIndex(comment => comment.id === payload)
                if (indexComment !== -1){
                    state.list[index].comments = state.list[index].comments.filter(comment => comment.id !== payload); // Xóa bài viết khỏi danh sách
                }else {
                    state.list[index].comments.commentChildren = state.list[index].comments.commentChildren.filter(comment => comment.id !== payload);
                }
            }
            const indexHome = state.listPostHome.findIndex(post =>
                    post.comments && post.comments.some(comment =>
                        comment.id === payload ||
                        (comment.commentChildren && comment.commentChildren.some(child => child.id === payload))
                    )
            );
            if (indexHome !== -1){
                const indexComment = state.listPostHome[indexHome].comments.findIndex(comment => comment.id === payload)
                if (indexComment !== -1){
                    state.listPostHome[indexHome].comments = state.listPostHome[indexHome].comments.filter(comment => comment.id !== payload); // Xóa bài viết khỏi danh sách
                }else {
                    state.listPostHome[indexHome].comments.commentChildren = state.listPostHome[indexHome].comments.commentChildren.filter(comment => comment.id !== payload);
                }
            }
            const indexSearch = state.listSearch.findIndex(post =>
                    post.comments && post.comments.some(comment =>
                        comment.id === payload ||
                        (comment.commentChildren && comment.commentChildren.some(child => child.id === payload))
                    )
            );
            if (indexSearch !== -1){
                const indexComment = state.listSearch[indexSearch].comments.findIndex(comment => comment.id === payload)
                if (indexComment !== -1){
                    state.listSearch[indexSearch].comments = state.listSearch[indexSearch].comments.filter(comment => comment.id !== payload); // Xóa bài viết khỏi danh sách
                }else {
                    state.listSearch[indexSearch].comments.commentChildren = state.listSearch[indexSearch].comments.commentChildren.filter(comment => comment.id !== payload);
                }
            }
        })
    }
});

export default postSlice.reducer;
