import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../../models/basket";

interface StoreContextValue{
    basket:Basket|null;
    setBasket:(basket:Basket)=>void;
    removeItem:(productId:number,quantity:number)=>void;
}
export const StoreContext=createContext<StoreContextValue | undefined>(undefined);
export function useStoreContext(){
    const context=useContext(StoreContext);
    if(context==undefined){
        throw Error('Oops - we do not seem to be inside the provider')
    }
    return context;
}
export function StoreProvider({children}:PropsWithChildren<unknown>){
    const [basket,setBasket]=useState<Basket|null>(null);
    function removeItem(productId:number,quantity:number){
        if(!basket) return;
        const items=[...basket.items];
        const itemInde=items.findIndex(i=>i.productId===productId);
        if(itemInde>=0){
            items[itemInde].quantity-=quantity;
            if(items[itemInde].quantity===0){
                items.splice(itemInde,1);
            }
            setBasket(prevState=>{
                return {...prevState!,items}
            })
        }
    }
    return(
        <StoreContext.Provider value={{basket,setBasket,removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}