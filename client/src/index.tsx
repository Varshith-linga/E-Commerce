import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import { router } from './app/router/Routes';
import { StoreProvider } from './app/context/StoreContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
    <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
)
