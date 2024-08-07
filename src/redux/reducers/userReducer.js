import {createSlice} from "@reduxjs/toolkit";
import {login} from "../services/userService";

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
        }
    }
)
export default userSlice.reducer;