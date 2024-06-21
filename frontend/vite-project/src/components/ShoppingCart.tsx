import { Box, Typography } from '@mui/material'

import ShoppingCartItem from './ShoppingCartItem'

const ShoppingCart = () => {
    return (
        <Box sx={{width:'50%'}} marginY={2}>
            <Typography variant='h6'>My Shopping Bag (2 Items)</Typography>
            <ShoppingCartItem />
            <ShoppingCartItem />
            <ShoppingCartItem />
        </Box>
    )
}

export default ShoppingCart