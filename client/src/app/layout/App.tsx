
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { useState } from 'react';

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
      <CssBaseline />
      <Header darkMode={darkmode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
