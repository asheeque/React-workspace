import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  token: "",
  id: null,
  roles: [],
  isLoggedIn:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {

        
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.isLoggedIn = true;
    },
    logout(state) {
        
      state.email = "";
      state.username = "";
      state.token = "";
      state.id = null;
      state.roles = [];
      state.isLoggedIn = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
