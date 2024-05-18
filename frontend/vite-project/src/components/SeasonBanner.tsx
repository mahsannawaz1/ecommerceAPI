import {  Box, Button, Stack } from '@mui/material'
import season from '../../public/spring.webp'

const SeasonBanner = () => {
    return (

        <Box position={'relative'} marginY={2}>
            <img width="100%" src={season}  />
            <Stack position={'absolute'} top={'calc(43% - 16px)'} right='10%'  direction={'column'}   spacing={2}>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color2)',
                        
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color2)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>Shop men</Button>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color2)',
                        
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color2)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>Shop women</Button>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: 'var(--btn-color2)',
                        
                    },
                    borderRadius:'30px',
                    bgcolor:'var(--btn-color2)',
                    color:'var(--btn)'
                }} disableRipple variant='contained'>Shop Juniors</Button>
            </Stack>
        </Box>
    )
}

export default SeasonBanner