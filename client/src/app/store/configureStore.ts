
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { basketSlice } from "../../features/basket/BasketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

// export function configureStore(){
//     return createStore(counterReducer);
// }
export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket:basketSlice.reducer,
        catalog:catalogSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;