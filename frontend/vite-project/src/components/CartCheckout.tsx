import { Box, Button,  Stack, Typography } from '@mui/material'

interface Props{
    totalAmount:number
}
const CartCheckout = ({totalAmount}:Props) => {
    return (
        <Box marginY={2}>
            <Typography marginY={1} variant='h6'>Do You Have A Promotional Code?</Typography>
            <Stack direction={'row'}>
                <input className="promo-input" type="text" placeholder='Promo Code' />
                <Button 
                    sx={{
                        
                        background: 'var(--black)',
                        color:'var(--white)',
                        border:'1px solid black',
                        borderRadius:0,
                        paddingX:4,
                        '&:hover': { 
                            color:'var(--white)',
                            background: 'var(--black)',
                    } 
                    }}>Apply</Button>
            </Stack>
            <Stack marginTop={4}>
                <Typography variant='h6'>Order Summary</Typography>
                <Box border={'1px solid var(--link)'} padding={2}>
                    <Stack direction='row' justifyContent={'space-between'} sx={{color:'var(--link)'}}>
                        <Typography>Subtotal</Typography>
                        <Typography>PKR {totalAmount.toLocaleString()}</Typography>
                    </Stack>
                <Box sx={{background:'var(--link)',height:'1px',marginTop:1,marginBottom:2}}></Box>
                <Stack direction='row' justifyContent={'space-between'} >
                        <Typography variant="h6">Subtotal</Typography>
                        <Typography variant="h6">PKR {totalAmount.toLocaleString()}</Typography>
                </Stack>
                <Stack direction='row' justifyContent={'space-between'} sx={{color:'var(--link)'}}>
                        <Typography variant="body2">Excluding delivery</Typography>
                        <Typography variant="body2">Inclusive of VAT</Typography>
                </Stack>
                <Button 
                    sx={{
                        
                        background: 'rgb(56, 90, 220)',
                        color:'var(--white)',
                        fontSize:16,
                        borderRadius:0,
                        width:'100%',
                        marginTop:1,
                        '&:hover': { 
                            color:'var(--white)',
                            background: 'rgb(56, 90, 220)',
                    } 
                    }}>CONTINUE TO CHECKOUT</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default CartCheckout