import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated:false
}

console.log(initialAuthState)

const authSlice = createSlice({
    name:"authentication",
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    }

})
export const AuthActions = authSlice.actions

export default authSlice.reducer