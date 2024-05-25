import ReactDOM from 'react-dom/client'
import { ThemeProvider,createTheme } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.tsx'
import './App.css'
import React from 'react'
const theme = createTheme({
  typography:{
    fontFamily: ['Sen', 'sans-serif'].join(','),

  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
    
  </React.StrictMode>,
)
