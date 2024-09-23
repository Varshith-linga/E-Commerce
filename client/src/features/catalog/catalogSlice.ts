import { createAsyncThunk, createEntityAdapter,createSlice } from "@reduxjs/toolkit";
import agents from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../models/pagination";
import { Product, ProductParams } from "../../models/Product";


interface CatalogState{
    productsLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    brands:string[];
    types:string[];
    productParams:ProductParams;
    metaData:MetaData | null;
}
const productsAdapter=createEntityAdapter<Product>();

function getAxiosParams(productParams:ProductParams){
    const params=new URLSearchParams();
    params.append('pageNumber',productParams.pageNumber.toString());
    params.append('pageSize',productParams.pageSize.toString());
    params.append('orderBy',productParams.orderBy);
    if(productParams.searchTerm)  params.append('searchTerm',productParams.searchTerm);
    if(productParams.brands.length>0)  params.append('brands',productParams.brands.toString());
    if(productParams.types.length>0)  params.append('types',productParams.types.toString());
    return params;
}
export const fetchProductsAsync=createAsyncThunk<Product[],void,{state:RootState}>(
    'catalog/fetchProductsAsync',
    async(_:any,thunkAPI:any)=>{
        const params=getAxiosParams(thunkAPI.getState().catalog.productParams);
        try{
             const response=await agents.Catalog.list(params);
             thunkAPI.dispatch(setMetaData(response.metaData));
             return response.items;
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
);

export const fetchProductAsync=createAsyncThunk<Product,number>(
    'catalog/fetchProductAsync',
    async(productId:any,thunkAPI:any)=>{
        try{
            return await agents.Catalog.details(productId);
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
);

export const fetchFilters=createAsyncThunk(
    'catalog/fetchFilters',
    async(_:any,thunkAPI:any)=>{
        try{
            return agents.Catalog.fetchFilters();
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands:[],
        types:[]
    };
}


export const catalogSlice=createSlice({
    name:'catalog',
    initialState:productsAdapter.getInitialState<CatalogState>({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        brands:[],
        types:[],
        productParams:initParams(),
        metaData:null
    }),
    reducers:{
        setProductParams:(state:any,action:any)=>{
            state.productsLoaded=false;
            state.productParams={...state.productParams,...action.payload,pageNumber:1};
        },
        setPageNumber:(state:any,action:any)=>{
            state.productsLoaded=false;
            state.productParams={...state.productParams,...action.payload};
        },
        setMetaData:(state:any,action:any)=>{
            state.metaData=action.payload;
        },
        resetProductParams:(state:any)=>{
            state.productParams=initParams();
        }
    },
    extraReducers:((builder:any)=>{
        builder.addCase(fetchProductsAsync.pending,(state:any)=>{
            state.status='pendingFetchProducts';
        })
        builder.addCase(fetchProductsAsync.fulfilled,(state:any,action:any)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state:any, action:any) => {
            console.error('Fetch Products Error:', action.payload);
            state.status = 'idle';
        });        
        builder.addCase(fetchProductAsync.pending,(state:any)=>{
            state.status='pendingFetchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled,(state:any,action:any)=>{
            productsAdapter.upsertOne(state,action.payload);
            state.status='idle';
        })
        builder.addCase(fetchProductAsync.rejected,(state:any,action:any)=>{
            console.log(action);
            state.status='idle';
        })
        builder.addCase(fetchFilters.pending,(state:any)=>{
            state.status='pendingFetchFilters';
        })
        builder.addCase(fetchFilters.fulfilled,(state:any,action:any)=>{
            state.brands=action.payload.brands;
            state.types=action.payload.types;
            state.filtersLoaded=true;
            state.status='idle';
        })
        builder.addCase(fetchFilters.rejected,(state:any,action:any)=>{
            console.log(action.payload);
            state.status='idle';
        })
    })
})

export const productSelectors=productsAdapter.getSelectors((state:RootState)=>state.catalog)

export const {setProductParams,resetProductParams,setMetaData,setPageNumber}=catalogSlice.actions;