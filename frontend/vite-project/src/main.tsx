import ReactDOM from 'react-dom/client'
import { ThemeProvider,createTheme } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.tsx'
import './App.css'
import React from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const theme = createTheme({
  typography:{
    fontFamily: ['Sen', 'sans-serif'].join(','),

  }
})
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      
      <RouterProvider router={routes}></RouterProvider>
      <ReactQueryDevtools />
    </ThemeProvider>
    </QueryClientProvider>

    
  </React.StrictMode>,
)
