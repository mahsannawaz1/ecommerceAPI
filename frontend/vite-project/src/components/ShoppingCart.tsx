import { Box, Typography } from '@mui/material'
import ShoppingCartItem from './ShoppingCartItem'

import { CartItem } from './Cart'
import { CartMessageInterface } from '../interfaces/CartMessageInterface'

interface Props{
    cartItems:CartItem[],
    onChangeMessage:(value:CartMessageInterface)=>void
}

const ShoppingCart = ({cartItems,onChangeMessage}:Props) => {
    
    return (
        <Box sx={{width:'50%'}} marginTop={2}>
        <Typography variant='h6' marginY={1}>My Shopping Bag (<Typography sx={{color:cartItems.length == 0 ? 'red' : 'green',fontSize:18}} component={'span'} fontWeight={'bold'}>{cartItems.length}</Typography> Items)</Typography>
        {cartItems?.map((cartItem,index)=><ShoppingCartItem key={index} item={cartItem} onChangeMessage={onChangeMessage} />)}
        </Box>
    )
}

export default ShoppingCart