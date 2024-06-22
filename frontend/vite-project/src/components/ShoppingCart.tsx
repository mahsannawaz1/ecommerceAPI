import { Box, Typography } from '@mui/material'
import axios from 'axios'
import ShoppingCartItem from './ShoppingCartItem'
import { useQuery } from '@tanstack/react-query'
import { CartItem } from './Cart'

interface Props{
    cartItems:CartItem[]
}

const ShoppingCart = ({cartItems}:Props) => {

    return (
        <Box sx={{width:'50%'}} marginTop={2}>
            <Typography variant='h6' marginY={1}>My Shopping Bag ({cartItems.length} Items)</Typography>
        {cartItems?.map((cartItem,index)=><ShoppingCartItem key={index} item={cartItem} />)}
        </Box>
    )
}

export default ShoppingCart