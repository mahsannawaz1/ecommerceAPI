import { Box, Container, Stack } from '@mui/material'
import  { Fragment, useEffect, useState } from 'react'
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
import { useSearchParams } from 'react-router-dom'
import OrderFailPage from './OrderFailPage'
import OrderSuccessPage from './OrderSuccessPage'



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
    let paymentFailed = false
    const [params] = useSearchParams()
    const successOnOrder = params.get('success')
    useEffect(()=>{
        if(successOnOrder){
            parseInt(successOnOrder)==1 ? setPhase(4) : paymentFailed = true
        }
    },[])
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

            <CartPhase phase={phase} onHandlePhaseChange={handleChangePhase} paymentFailed={paymentFailed} />
            {   phase == 4 
                    ? 
                paymentFailed
                    ?

                <OrderFailPage onHandlePhaseChange={handleChangePhase} /> 
                    :
                <OrderSuccessPage />
                    :        
                <Fragment>
                    <Box marginTop={10}>
                    {
                        message.msg && 
                        <Box>
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
                </Fragment>
            }
        </Container>
    )
}
