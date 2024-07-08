
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import { useEffect } from 'react'
import axios from 'axios'



const Layout = () => {

    useEffect(()=>{
        const cart = localStorage.getItem('cart')
        if(!cart){
            axios.post('http://localhost:3000/api/cart/create').then(res=>localStorage.setItem('cart', JSON.stringify(res.data)))
        }
    },[])
    return (
        <>
        <NavBar />
        <Outlet />
        </>
    )
}

export default Layout