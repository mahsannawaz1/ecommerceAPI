import { Box, Container, Stack } from '@mui/material'
import  { useState } from 'react'
import CartPhase from './CartPhase'
import CartDeliveryOption from './CartDeliveryOption'
import ShoppingCart from './ShoppingCart'
import CartCheckout from './CartCheckout'

export const Cart = () => {
    const [phase,setPhase] = useState(1)
    const handleChangePhase = (phase:number)=>{
        setPhase(phase)
    }
    return (
        <Container fixed sx={{marginY:5}}>
            <CartPhase phase={phase} />
            <CartDeliveryOption />
            <Stack direction={'row'} spacing={10} marginY={3}>
                <ShoppingCart />
                <CartCheckout />
            </Stack>
            
        </Container>
    )
}
