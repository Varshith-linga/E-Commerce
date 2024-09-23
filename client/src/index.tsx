import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import { router } from './app/router/Routes';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
