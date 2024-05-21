import { Stack,Box, Typography } from '@mui/material'
import newArrivals from '../../public/newArrivals.png'
import tees from '../../public/teesAvatar.png'
import hoodies from '../../public/hoodiesAvatar.png'
import joggers from '../../public/hoodiesAvatar.png'
import shirts from '../../public/shirtAvatar.png'
import jeans from '../../public/jeansAvatar.png'
import under from '../../public/underAvatar.png'
import polos from '../../public/polosAvatar.png'

const ProductListPage = () => {
    return (
        <>
        <Stack direction='row'  flexWrap={'wrap'} spacing={2}>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={newArrivals} alt="New Arrivals" />
                <Typography variant='body2'>New Arrivals</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={tees} alt="Graphic tees" />
                <Typography variant='body2'>Graphic tees</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={polos} alt="Polos" />
                <Typography variant='body2'>Polos</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={shirts} alt="Shirts & Flannels" />
                <Typography variant='body2'>Shirts & Flannels</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={hoodies} alt="Hoodies & SweatShirts" />
                <Typography variant='body2'>Hoodies & SweatShirts</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={joggers} alt="Joggers & Sweatpants" />
                <Typography variant='body2'>Joggers & Sweatpants</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={jeans} alt="Jeans" />
                <Typography variant='body2'>Jeans</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ cursor:'pointer' }}>
                <img width={100} height={100} src={under} alt="Underwear" />
                <Typography variant='body2'>Underwear</Typography>
            </Stack>
        </Stack>
        <Stack spacing={1} direction='row' alignItems={'center'}>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>Home </Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>&gt;</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>American Eagle</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>&gt;</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>Men</Typography>
        </Stack>
        </>
    )
}

export default ProductListPage