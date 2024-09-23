import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";


const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price-High to Low' },
  { value: 'price', label: 'Price-Low to High' },

]


export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, productParams, brands, types, metaData } = useAppSelector((state: any) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [productsLoaded, filtersLoaded])

  if (!filtersLoaded) return <Loading message='Loading products...' />
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup selectedValue={productParams.orderBy} options={sortOptions} onChange={(e: any) => dispatch(setProductParams({ orderBy: e.target.value }))} />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons items={brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons items={types} checked={productParams.types} onChange={(items: string[]) => dispatch(setProductParams({ types: items }))} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      {metaData &&
        <Grid item xs={9} sx={{ mb: 2 }}>
          <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />
        </Grid>
      }
    </Grid>
  )
}