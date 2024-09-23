import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import agents from "../../app/api/agent";
import { Basket } from "../../models/basket";

interface BasketState{
    basket:Basket|null,
    status:string
}
const initialState:BasketState={
    basket:null,
    status:'idle'
}

export const addBasketItemAsync=createAsyncThunk<Basket,{productId:number,quantity?:number}>(
'basket/addBasketItemAsync',
async({productId,quantity=1},thunkAPI:any)=>{
    try{
        return await agents.Basket.addItem(productId,quantity);
    }catch(error:any){
        return thunkAPI.rejectWithValue({error:error.data})
    }
}
)

export const removeBasketItemAsync=createAsyncThunk<void,{productId:number,quantity:number,name?:string}>(
    'basket/removeBasketItemAsync',
    async({productId,quantity},thunkAPI:any)=>{
        try{
            return await agents.Basket.removeItem(productId,quantity);
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
    )

export const basketSlice=createSlice({
    name:'basket',
    initialState,
    reducers:{
        setBasket:(state:any,action:any)=>{
            state.basket=action.payload
        }
    },
    extraReducers:((builder:any)=>{
        builder.addCase(addBasketItemAsync.pending,(state:any,action:any)=>{
            console.log(action);
            state.status='pendingAddItem'+action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state:any,action:any)=>{
            state.basket=action.payload;
            state.status='idle';
        });
        builder.addCase(addBasketItemAsync.rejected,(state:any,action:any)=>{
            state.status='idle';
            console.log(action.payload);
        });
        builder.addCase(removeBasketItemAsync.pending,(state:any,action:any)=>{
            state.status='pendingRemovingItem'+action.meta.arg.productId+action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state:any,action:any)=>{
            const {productId,quantity}=action.meta.arg;
            const itemIndex=state.basket.items.findIndex((i:any)=>i.productId===productId);
            if(itemIndex===-1 || itemIndex===undefined) return;
            state.basket.items[itemIndex].quantity-=quantity;
            if(state.basket.items[itemIndex].quantity===0)
            state.basket.items.splice(itemIndex,1);
            state.status='idle';
        });
        builder.addCase(removeBasketItemAsync.rejected,(state:any,action:any)=>{
            state.status='idle';
            console.log(action.payload);
        });
    })
})

export const {setBasket}=basketSlice.actions;