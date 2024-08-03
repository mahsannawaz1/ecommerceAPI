import {  Box, Button, Stack } from '@mui/material'
import season from '../../public/spring.webp'
import { Link } from 'react-router-dom'

const SeasonBanner = () => {
    return (

        <Box  position={'relative'} marginX={10} marginY={2}>
            <img width="100%" src={season}  />
            <Stack position={'absolute'} top={'calc(43% - 16px)'} right='10%'  direction={'column'}   spacing={2}>
                <Link to='/shop-men'>
                    <Button sx={{
                        '&:hover': {
                            backgroundColor: 'var(--btn-color2)',
                    
                        },
                        borderRadius:'30px',
                        bgcolor:'var(--btn-color2)',
                        color:'var(--btn)'
                    }} disableRipple variant='contained'>Shop men</Button>
                </Link>
                <Link to='shop-women'>
                    <Button sx={{
                        '&:hover': {
                            backgroundColor: 'var(--btn-color2)',
                    
                        },
                        borderRadius:'30px',
                        bgcolor:'var(--btn-color2)',
                        color:'var(--btn)'
                    }} disableRipple variant='contained'>Shop women</Button>
                </Link>
                <Link to='shop-junior-boys'>
                    <Button sx={{
                        '&:hover': {
                            backgroundColor: 'var(--btn-color2)',
                    
                        },
                        borderRadius:'30px',
                        bgcolor:'var(--btn-color2)',
                        color:'var(--btn)'
                    }} disableRipple variant='contained'>Shop Juniors</Button>
                </Link>
            </Stack>
        </Box>
    )
}

export default SeasonBanner