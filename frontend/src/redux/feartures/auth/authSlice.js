import { createSlice } from '@reduxjs/toolkit'

let name;
try {
  name = JSON.parse(localStorage.getItem("name"));
} catch (error) {
  // Handle the error, e.g., log it or provide a default value.
  console.error("Error parsing 'name' from localStorage:", error);
  name = null; // or set a default value
}


const initialState = {
    isLoggedIn:false,
    name:name ? name : "",
    user: {
      name:"",
      email:"",
      phone:"",
      photo:"",
    },

}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      SET_LOGIN(state, action){
        state.isLoggedIn = action.payload
      },
      SET_NAME(state, action){
        localStorage.setItem("name", JSON.stringify(action.payload))
        state.name = action.payload
      },
      SET_USER(state, action){
        const profile = action.payload
        state.user.name = profile.name
        state.user.email = profile.email
        state.user.phone = profile.phone
        state.user.UserRole = profile.UserRole
        state.user.ActiveStatus= profile.ActiveStatus
  
  
      },
  
    }
  });
  
  export const {SET_LOGIN, SET_NAME, SET_USER} = authSlice.actions
  
  export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
  export const selectName = (state) => state.auth.name
  export const selectUser = (state) => state.auth.user
  
  export default authSlice.reducer