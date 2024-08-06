import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "../../../node_modules/@mui/material/index";
import { Product } from "../../models/Product";
interface props {
  product: Product;
}
export default function ProductCard({ product }: props) {
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
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}