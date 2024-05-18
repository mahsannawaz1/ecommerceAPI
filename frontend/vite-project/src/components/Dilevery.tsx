import { Stack, Typography } from '@mui/material'


const Dilevery = () => {
    return (
        <Stack paddingX={6} paddingY={0.5} sx={{
            background:'rgb(70, 70, 70)',
            color:'#FFF'
        }} direction={'row'} justifyContent={'space-evenly'}>
            <Typography variant='body2'><Typography component={'span'} sx={{
                fontWeight:600
            }}>Spend 2,990 Rs/-</Typography> for free delivery</Typography>
            <Typography variant='body2'><Typography component={'span'} sx={{
                fontWeight:600
            }}>Cash on delivery</Typography> is now available</Typography>
            <Typography variant='body2'><Typography component={'span'} sx={{
                fontWeight:600
            }}>eGift</Typography> Card</Typography>
        </Stack>
    )
}

export default Dilevery