
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
import { useEffect, useState } from 'react';
import { Outlet } from '../../../node_modules/react-router-dom/dist/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { getCookie } from '../util/util';
import agents from '../api/agent';
import Loading from './Loading';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/BasketSlice';

function App() {
  const dispatch=useAppDispatch();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agents.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(err=>console.log(err))
      .finally(()=>setLoading(false));
    }else{
      setLoading(false);
    }
  },[dispatch])
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
