import { useState } from "react";
import { TextField,debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch(){
    const{productParams}=useAppSelector((state:any)=>state.catalog);
    const [searchTerm,setSearchTerm]=useState(productParams.searchTerm);
    const dispatch=useAppDispatch();
    const debouncedSearch=debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    },1000)
    return(
        <TextField label='Search-products' variant='outlined' fullWidth value={searchTerm||''} onChange={(event:any)=>{
            setSearchTerm(event.target.value);
            debouncedSearch(event);
        }}
        />
    )
}