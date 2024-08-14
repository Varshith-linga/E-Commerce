
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
import { useState } from 'react';
import { Outlet } from '../../../node_modules/react-router-dom/dist/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function App() {
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
