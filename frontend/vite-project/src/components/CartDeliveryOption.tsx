
import {Box, Typography} from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
interface Props{
    totalAmount:number
}
const CartDeliveryOption = ({totalAmount}:Props) => {
    return (
        <Box display={'inline-flex'}  sx={{background:'var(--black)',padding:'5px 10px',color:'var(--white)',alignItems:'center',gap:1}} marginTop={10}>
            <LocalShippingIcon sx={{color:'white',width:30,height:30}} />
            <Typography>{totalAmount < 2990 ? `You are AED ${2290-totalAmount} away from Free Delivery` : 'Your order qualifies for Free Delivery'}</Typography>
        </Box>
        
    )
}

export default CartDeliveryOption