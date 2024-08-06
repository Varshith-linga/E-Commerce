import { Grid } from "../../../node_modules/@mui/material/index";
import { Product } from "../../models/Product";
import ProductCard from "./ProductCard";
interface props{
    products:Product[];
}
export default function ProductList({products}:props) {
    return(
        <Grid container spacing={4}>
                {products.map(e => (
                    <Grid item xs={3} key={e.id}>
                        <ProductCard product={e}/>
                    </Grid>
                ))}
        </Grid>
    )
}