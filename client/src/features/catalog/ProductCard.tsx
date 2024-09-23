
import { LoadingButton } from "../../../node_modules/@mui/lab/index";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "../../../node_modules/@mui/material/index";
import { Link } from "../../../node_modules/react-router-dom/dist/index";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { Product } from "../../models/Product";
import { addBasketItemAsync } from "../basket/BasketSlice";
interface props {
  product: Product;
}
export default function ProductCard({ product }: props) {
  const{status}=useAppSelector((state:any)=>state.basket);
  const dispatch=useAppDispatch();
  
  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{bgColor:'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'secondary' }
        }
        }
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain',bgColor:'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes('pendingAddItem'+product.id)} onClick={()=>dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}


