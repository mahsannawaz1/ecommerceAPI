import { Box, Button, Stack, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link, useSearchParams } from 'react-router-dom';


const MyAccount = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    if(token){
        localStorage.setItem('Authorization',token)
    }
    
    return (
        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2} paddingBottom={1.5} borderBottom={'1px solid var(--border)'}>
                <Typography variant='h5' >My Account</Typography>
                <Button
                type='submit'
                sx={{
                background: 'var(--black)',
                color:'var(--white)',
                border:'1px solid black',
                borderRadius:0,
                textTransform:'capitalize',
                '&:hover': {
                    color:'var(--white)',
                    background: 'var(--black)',
                }
                }}>Edit Account Details</Button>
            </Stack>
            <Box borderBottom={'1px solid var(--border)'} paddingBottom={6}>
                <Typography  variant='h6' >Recent Orders</Typography>
                <Typography sx={{color:'var(--link)',fontSize:13,marginTop:3,marginBottom:1}}>You have no recent orders to display.</Typography>
                <Stack direction='row' justifyContent={'center'}>
                    <Button
                    type='submit'
                    sx={{
                    background: 'var(--black)',
                    color:'var(--white)',
                    border:'1px solid black',
                    borderRadius:0,
                    paddingX:4,
                    textTransform:'capitalize',
                    '&:hover': {
                        color:'var(--white)',
                        background: 'var(--black)',
                    }
                    }}>Go Shopping</Button>
                </Stack>
            </Box>
            <Stack direction='row' justifyContent={'space-around'} alignItems={'center'} paddingY={3} sx={{bgcolor:'var(--info-bg)',color:'var(--white)'}}>
                <Stack direction='row' spacing={0.5} alignItems={'center'}>
                    <InfoOutlinedIcon sx={{color:'var(--white)',fontSize:30}} />
                    <Typography variant='h6' fontSize={15} sx={{color:'var(--white) !important'}}>Need help with your order?</Typography>
                </Stack>
                <Link to='/' style={{color:'var(--white) !important' }}>
                    <Typography   fontSize={13}>Contact customer services</Typography>
                </Link>
                <Link to='/' style={{color:'var(--white) !important' }}>
                    <Typography  fontSize={13}>Returns & Refunds</Typography>
                </Link>
                <Link to='/' style={{color:'var(--white) !important' }}>
                    <Typography  fontSize={13}>Delivery Information</Typography>
                </Link>
                
            </Stack>
            <Box >
                <Typography marginBottom={2}  variant='h6' borderBottom={'1px solid var(--border)'} paddingBottom={0.5}>Account Details</Typography>
                <Stack>
                <Typography  fontSize={14} >Email Address</Typography>
                <Typography  variant='caption' sx={{color:'var(--link)'}}>nawazehsen@gmail.com</Typography>
                </Stack>
            </Box>
        </Stack>
    )
}

export default MyAccount