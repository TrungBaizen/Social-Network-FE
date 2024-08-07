import {createSlice} from "@reduxjs/toolkit";
import {forgotPassword, login, logout} from "../services/userService";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser"))
}
const userSlice = createSlice({
        name: "users",
        initialState,
        extraReducers: builder => {
            builder.addCase(login.fulfilled,(state, {payload})=>{
                localStorage.setItem("currentUser",JSON.stringify(payload))
                state.currentUser = payload;
            })
            builder.addCase(logout.fulfilled,(state, {payload})=>{
                localStorage.removeItem("currentUser");
                state.currentUser = null;
            })
            builder.addCase(forgotPassword.fulfilled,(state, {payload})=>{
            })
        }
    }
)
export default userSlice.reducer;