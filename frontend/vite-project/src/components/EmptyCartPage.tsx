import { Box, Button, Stack, Typography } from '@mui/material'
import svg3 from '../../public/shopping.png'
import { Link } from 'react-router-dom'

const EmptyCartPage = () => {
    return (
        <Stack alignItems={'center'}>
            <img width={200} height={200} src={svg3} />
            <Typography fontSize={40} component={'h1'} >Your Cart is <Typography fontSize={40} component={'span'} sx={{color:'var(--error-msg)'}}>Empty!</Typography></Typography>
            <Typography paddingBottom={2}>Looks like you haven't added anything to your cart. Go ahead and explore top categories.</Typography>
            <Stack direction={'row'} spacing={2} >
            
                <Link to='/shop-men'>
                    <Button
                    disableRipple
                    sx={{
                        background: 'var(--error-msg)',
                        color:'var(--white)',
                    
                        borderRadius:0,
                        paddingX:4,
                        '&:hover': {
                            color:'var(--white)',
                            background: 'var(--error-msg)',
                    }
                    }}>Continue Shopping
                    </Button>
                </Link>
            
            <Link to='/'>
                <Button disableRipple
                sx={{
            
                    background: 'var(--error-msg)',
                    color:'var(--white)',
                    
                    borderRadius:0,
                    paddingX:4,
                    '&:hover': {
                        color:'var(--white)',
                        background: 'var(--error-msg)',
                }
                }}>Go To home page
                </Button>
            </Link>
            </Stack>
        </Stack>
    )
}

export default EmptyCartPage