import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    token: "",
  },
  reducers: {
    login: (state, action) => {
      const decodedData = jwtDecode(action.payload.access_token);
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", JSON.stringify(decodedData));
      // state.users(action.payload);
    },
    loadUser: (state, action) => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token) {
        state.token = token;
        state.data = user;
      }
    },
    logout: (state, action) => {
      state.token = "";
      state.data = {};
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, loadUser, logout } = userSlice.actions;
export default userSlice.reducer;
