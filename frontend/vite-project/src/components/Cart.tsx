import { Box, Container, Stack } from '@mui/material'
import  { Fragment, useState } from 'react'
import CartPhase from './CartPhase'
import CartDeliveryOption from './CartDeliveryOption'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CartMessage from './CartMessage'
import { CartMessageInterface } from '../interfaces/CartMessageInterface'
import Bag from './Bag'
import CartSignIn from './CartSignIn'
import CheckoutDelivery from './CheckoutDelivery'
import userAuth from '../hooks/userAuth'



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
    const token = userAuth()
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
            
            <CartPhase phase={phase} onHandlePhaseChange={handleChangePhase} />
            <Box marginTop={10}>
            {
            message.msg && <Box>
                <CartMessage message={message} onChangeMessage={handleChangeMessage}  />
            </Box> 
            }
            {phase===1 && <CartDeliveryOption totalAmount={total || 0} />}
            </Box>
            
            
            <Stack direction={'row'} spacing={10} marginY={3}>
                {phase ==1 && 
                <Fragment>
                    <Bag cartItems={cartItems ?? []} total={total || 0} onChangeMessage={handleChangeMessage} onHandlePhaseChange={handleChangePhase} />
                </Fragment>
                }
                
                {(phase===2 && !token) &&  <CartSignIn onHandlePhaseChange={handleChangePhase} />}
                {phase===3 && <CheckoutDelivery cartItems={cartItems ?? []} total={total || 0} onHandlePhaseChange={handleChangePhase} />}
            </Stack>
            
        </Container>
    )
}
