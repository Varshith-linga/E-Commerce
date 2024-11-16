import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import agents from "../../app/api/agent";
import { User } from "../../models/user";
import {FieldValues} from "react-hook-form";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/BasketSlice";

interface AccountState{
    user:User|null;
}
const initialState:AccountState={
    user:null
}
export const signInUser=createAsyncThunk<User,FieldValues>(
    'account/signInUser',
    async(data:any,thunkAPI:any)=>{
        try{
            const userDto= await agents.Account.login(data);
            const {basket,...user}=userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)
export const fetchCurrentUser=createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async(_:any,thunkAPI:any)=>{
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try{
            const userDto= await agents.Account.currentUser();
            const {basket,...user}=userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    },{
        condition:()=>{
            if(!localStorage.getItem('user')) return false;
        }
    }
)
export const accountSlice=createSlice({
    name:'account',
    initialState,
    reducers:{
        signOut:(state:any)=>{
            state.user=null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser:((state:any,action:any)=>{
            state.user=action.payload;
        })
    },
    extraReducers:((builder:any)=>{
        builder.addCase(fetchCurrentUser.rejected,(state:any)=>{
            state.user=null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        builder.addCase(signInUser.rejected,(state:any,action:any)=>{
            throw action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state:any,action:any)=>{
            state.user=action.payload;
        });
        
    })
})

export const {signOut,setUser}=accountSlice.actions;