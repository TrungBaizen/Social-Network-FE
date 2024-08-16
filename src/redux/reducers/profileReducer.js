import {createSlice} from "@reduxjs/toolkit";
import {getProfile, searchProfile, updateAvatar, updateCover, updateProfile} from "../services/profileService";

const initialState = {
    profile: "",
    list: [],
    listSearch:[]
}
const profileSlice = createSlice({
    name: 'profiles',
    initialState,
    extraReducers: builder => {
        builder.addCase(getProfile.fulfilled, (state, {payload}) => {
            state.profile = payload;
        })
        builder.addCase(updateAvatar.fulfilled, (state, {payload}) => {
        })
        builder.addCase(updateCover.fulfilled, (state, {payload}) => {
        })
        builder.addCase(updateProfile.fulfilled, (state, {payload}) => {
            state.profile = payload;
        })
        builder.addCase(searchProfile.fulfilled,(state,{payload})=>{
            state.listSearch = payload;
        })
    }
});
export default profileSlice.reducer;