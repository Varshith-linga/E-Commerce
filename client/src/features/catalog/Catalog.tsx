import { useState, useEffect } from "react";
import { Product } from "../../models/Product"
import ProductList from "./ProductList";
import agents from "../../app/api/agent";
import Loading from "../../app/layout/Loading";


export default function Catalog() {
    const[products,setProducts]=useState<Product[]>([]);
    const[loading,setLoading]=useState(true);


  useEffect(()=>{
    agents.Catalog.list()
    .then(products=>setProducts(products))
    .catch(err=>console.log(err))
    .finally(()=>setLoading(false));
  },[])
    if(loading) return <Loading message='Loading products...'/>
    return (
        <>
            <ProductList products={products}/>
        </>
    )
}