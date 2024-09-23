import { Grid } from "../../../node_modules/@mui/material/index";
import { useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
interface props{
    products:Product[];
}
export default function ProductList({products}:props) {
    const {productsLoaded}=useAppSelector((state:any)=>state.catalog);
    return(
        <Grid container spacing={4}>
                {products.map(e => (
                    <Grid item xs={4} key={e.id}>
                        {!productsLoaded?(
                            <ProductCardSkeleton/>
                        ):(
                            <ProductCard product={e}/>
                        )}
                    </Grid>
                ))}
        </Grid>
    )
}