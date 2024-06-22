import { Box, Container, Stack } from '@mui/material'
import  { useState } from 'react'
import CartPhase from './CartPhase'
import CartDeliveryOption from './CartDeliveryOption'
import ShoppingCart from './ShoppingCart'
import CartCheckout from './CartCheckout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface CartItem{
    product:{
        id:string,
        sku:string,
        name:string
        image:string,
        color:string,
        size:string
    },
    qty:number,
    unit_price:number
}

export const Cart = () => {
    const [phase,setPhase] = useState(1)
    const handleChangePhase = (phase:number)=>{
        setPhase(phase)
    }
    const cart = localStorage.getItem('cart')
    let cartID = ''
    if(cart){
        cartID = JSON.parse(cart)._id
    }
    const {data:cartItems} = useQuery({
        queryKey:['cart'],
        queryFn: ()=> axios.get<CartItem[]>(`http://localhost:3000/api/cart/${cartID}`).then(res=>res.data)
    })
    const total = cartItems?.reduce((accumulator,item)=>accumulator + (item.qty * item.unit_price),0)
    return (
        <Container fixed sx={{marginY:5}}>
            <CartPhase phase={phase} />
            <CartDeliveryOption totalAmount={total || 0} />
            <Stack direction={'row'} spacing={10} marginY={3}>
                <ShoppingCart cartItems={cartItems ?? []} />
                <CartCheckout totalAmount={total || 0} />
            </Stack>
            
        </Container>
    )
}
