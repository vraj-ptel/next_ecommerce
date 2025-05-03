import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userState{
    user:null |{
        name:string,
        email:string,
        created_at:string
    }
}

const initialState:userState={
    user:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
       setUser:(state,action)=>{
        state.user=action.payload
       }
    }
})

export const {setUser}=userSlice.actions;
export default userSlice;
export const getUser=(state:RootState)=>state.user.user;