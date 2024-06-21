import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const CartDeliveryOption = () => {
    return (
        <Box display={'inline-flex'}  sx={{background:'var(--black)',padding:'5px 10px',color:'var(--white)',alignItems:'center',gap:1}} marginTop={10}>
            <LocalShippingIcon sx={{color:'white',width:30,height:30}} />
            <Typography>You are AED 43.99 away from Free Delivery</Typography>
        </Box>
        
    )
}

export default CartDeliveryOption