
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "../../../node_modules/@mui/material/index";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from 'react';
import agents from '../../app/api/agent';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import BasketSummary from './BasketSummary';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

export default function BasketPage() {
  const { basket, removeItem, setBasket } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agents.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(err => console.log(err))
      .finally(() => setStatus({ loading: false, name: '' }));
  }
  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agents.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(err => console.log(err))
      .finally(() => setStatus({ loading: false, name: '' }));
  }
  if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }}></img>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status.loading && status.name === 'rem' + item.productId} onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)} color="error">
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status.loading && status.name === 'add' + item.productId} onClick={() => handleAddItem(item.productId, 'add' + item.productId)} color="secondary">
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.name === 'del' + item.productId} onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)} color="error">
                    <DeleteIcon />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
          <Grid item xs={6}/>
          <Grid item xs={6}>
            <BasketSummary/>
            <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>Checkout</Button>
          </Grid>
      </Grid>
    </>
  )
}