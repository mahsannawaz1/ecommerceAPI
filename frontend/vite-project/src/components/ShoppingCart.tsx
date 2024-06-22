import { Box, Typography } from '@mui/material'
import ShoppingCartItem from './ShoppingCartItem'

import { CartItem } from './Cart'

interface Props{
    cartItems:CartItem[],
    onChangeMessage:(value:string)=>void
}

const ShoppingCart = ({cartItems,onChangeMessage}:Props) => {

    return (
        <Box sx={{width:'50%'}} marginTop={2}>
            <Typography variant='h6' marginY={1}>My Shopping Bag ({cartItems.length} Items)</Typography>
        {cartItems?.map((cartItem,index)=><ShoppingCartItem key={index} item={cartItem} onChangeMessage={onChangeMessage} />)}
        </Box>
    )
}

export default ShoppingCart