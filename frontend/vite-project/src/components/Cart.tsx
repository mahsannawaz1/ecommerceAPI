import { Box, Container, Stack } from '@mui/material'
import  { useState } from 'react'
import CartPhase from './CartPhase'
import CartDeliveryOption from './CartDeliveryOption'
import ShoppingCart from './ShoppingCart'
import CartCheckout from './CartCheckout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CartMessage from './CartMessage'
import { CartMessageInterface } from '../interfaces/CartMessageInterface'



export interface CartItem{
    cart_id:string,
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
    const [message,setMessage] = useState<CartMessageInterface> ({} as CartMessageInterface)
    
    const [phase,setPhase] = useState(1)
    const handleChangePhase = (phase:number)=>{
        setPhase(phase)
    }
    const handleChangeMessage = (msgObj:CartMessageInterface)=>{
        setMessage(msgObj)
    }
    const cart = localStorage.getItem('cart')
    let cartID = ''
    if(cart){
        cartID = JSON.parse(cart)._id
    }
    const {data:cartItems} = useQuery({
        queryKey:['cart',message],
        queryFn: ()=> axios.get<CartItem[]>(`http://localhost:3000/api/cart/${cartID}`).then(res=>res.data)
    })
    const total = cartItems?.reduce((accumulator,item)=>accumulator + (item.qty * item.unit_price),0)
    return (
        <Container fixed sx={{marginY:5}}>
            <CartPhase phase={phase} />
            <Box marginTop={10}>
            {message.msg && <Box>
                            <CartMessage message={message} onChangeMessage={handleChangeMessage}  />
                        </Box> 
            }
            <CartDeliveryOption totalAmount={total || 0} />
            </Box>
            
            
            <Stack direction={'row'} spacing={10} marginY={3}>
                <ShoppingCart cartItems={cartItems ?? []} onChangeMessage={handleChangeMessage}  />
                <CartCheckout totalAmount={total || 0} />
            </Stack>
            
        </Container>
    )
}
