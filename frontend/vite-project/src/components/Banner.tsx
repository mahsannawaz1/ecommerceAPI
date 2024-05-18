import { Button, Stack, Typography } from '@mui/material'
import banner from '../../public/promo.webp'

const Banner = () => {
    return (

        <Stack justifyContent={'center'} paddingY={5}  height={350} sx={{
            background:`url(${banner})`
        }}>
            <Typography textAlign={'center'} fontWeight={700}  variant='h1' color='var(--banner-color)'>40% OFF Everything</Typography>
            <Stack marginY={1} direction='row' justifyContent={'center'} spacing={2}>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color1)',
                        
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color1)',
                    color:'var(--btn)'
                }} disableRipple variant='contained' color='primary'>Shop tops</Button>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color1)',
                        
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color1)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>Shop bottoms</Button>
            </Stack>
            <Typography variant='body2'  textAlign={'center'}>
            Online & In-store
            </Typography>
        </Stack>
    )
}

export default Banner