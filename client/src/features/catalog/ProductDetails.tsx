import { useEffect, useState } from "react";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "../../../node_modules/@mui/material/index";
import axios from "../../../node_modules/axios/index";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import { Product } from "../../models/Product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product,setProduct]=useState<Product | null>(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Products/${id}`)
        .then(res=>setProduct(res.data))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false));
    },[id])

    if(loading) return <h3>Loading....</h3>
    if(!product) return <h3>Product not found</h3>
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alr={product.name} style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}