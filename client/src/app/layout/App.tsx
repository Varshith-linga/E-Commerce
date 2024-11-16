
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from '../../../node_modules/react-router-dom/dist/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Loading from './Loading';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/BasketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';

function App() {
  const dispatch=useAppDispatch();
  const [loading,setLoading]=useState(true);
  
  const intiApp=useCallback(async ()=>{
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }catch(error:any){
      console.log(error);
    }
  },[dispatch])

  useEffect(()=>{
    intiApp().then(()=>setLoading(false));
  },[intiApp])

  const [darkmode,setDarkmode]=useState(false);
  const paletteType=darkmode?'dark':'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background:{
        default:paletteType=='light'?'#eaeaea':'#121212'
      }
    }
  });

  function handleThemeChange(){
    setDarkmode(!darkmode);
  }

  if(loading) return <Loading message="Initialising App..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkmode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
