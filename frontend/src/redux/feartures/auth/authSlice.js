import { createSlice } from '@reduxjs/toolkit';

let name;
try {
  name = JSON.parse(localStorage.getItem(name));
} catch (error) {
  console.error("Error parsing 'name' from localStorage:", error);
  name = null;
}



const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    Email: "",
    password: "",
    phone: "",
    NIC: "",
    Address: "",
    ActiveStatus: "",
    AccountID: "",
    city: "",
    district: "",
    lastMeter: "",
    amount: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      const newName = action.payload;
      localStorage.setItem("name", JSON.stringify(newName));
      return { ...state, name: newName };
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.Email = profile.Email;
      state.user.password = profile.password;
      state.user.phone = profile.phone;
      state.user.NIC = profile.NIC;
      state.user.Address = profile.Address;
      state.user.ActiveStatus = profile.ActiveStatus;
      state.user.AccountID = profile.AccountID;
      state.user.city = profile.city;
      state.user.district = profile.district;
      state.user.lastMeter = profile.lastMeter;
      state.user.amount = profile.amount;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
