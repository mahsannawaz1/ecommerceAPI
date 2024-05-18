import { Box, Button, Stack, Typography } from '@mui/material'
import fit from '../../public/fit.png'


const FitBanner = () => {
    return (
        <Box position={'relative'} marginY={2}>
                <img width="100%" src={fit}  />
                <Stack  position={'absolute'} top={' 50%'} left='50%' 
                sx={{
                    transform: 'translate(-50%, -50%)'
                }} 
            width='100%'  direction={'column'}   spacing={2}>
            <Box>
                <Typography textAlign={'center'} sx={{
                    fontWeight:800,
                    color:'var(--white)'
                }} variant='h2'>TAKE YOUR FIT PICK</Typography>
                <Typography textAlign={'center'} sx={{
                    color:'var(--white)'
                }} variant="h6">Discover our everyday jeans fits</Typography>
            </Box>
            <Stack  direction='row' justifyContent={'center'} spacing={2}>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color4)',
                
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color4)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>shop men's</Button>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color4)',
                
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color4)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>shop women's</Button>
                
            </Stack>
        </Stack>
            </Box>
    )
}

export default FitBanner