import { Button, Stack, Typography,  } from "@mui/material"
import { Link } from "react-router-dom"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const OrderSuccessPage = () => {
    return (
        <Stack marginTop={10} alignItems={'center'} spacing={1}>
            
            <CheckCircleOutlineOutlinedIcon sx={{color:'green',fontSize:70}} />
            <Typography fontSize={40} color='green' component={'h1'}>Your Order is Confirmed!</Typography>
            <Typography paddingBottom={2} >We will send you a shipping confirmation email as soon as your order ships.</Typography>
            <Stack direction={'row'} spacing={2} >
            
                <Link to='/profile/orders'>
                    <Button
                    onClick={()=>{
                        // onHandlePhaseChange(1)
                        // navigate('/cart')
                    }}
                    disableRipple
                    sx={{
                        background: 'green',
                        color:'var(--white)',
                        borderRadius:0,
                        paddingX:4,
                        '&:hover': {
                            background: 'green',
                            color:'var(--white)',
                    }
                    }}>View Orders
                    </Button>
                </Link>
            
            <Link to='/'>
                <Button disableRipple
                sx={{
            
                    background: 'green',
                    color:'var(--white)',
                    borderRadius:0,
                    paddingX:4,
                    '&:hover': {
                        background: 'green',
                        color:'var(--white)',
                }
                }}>Continue Shopping
                </Button>
            </Link>
            </Stack>
        </Stack>
    )
}

export default OrderSuccessPage