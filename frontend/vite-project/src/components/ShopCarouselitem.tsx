import { Box, IconButton, Stack, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { useState } from 'react'
import CarouselModal from './CarouselModal'

interface Props{
    url:string,
    type:'video' | 'image',
    index:number
}

const ShopCarouselItem = ({url,type,index}:Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Box position='relative' width={{base:'300px',lg:'350px'}}  marginX={2}>
            {type=='video' ? 
            <>
                <video width='100%'  height='350px' style={{objectFit:'cover'}} src={url} />
                <Box 
                position={'absolute'} 
                top='5px' right='5px'>
                    <IconButton disableRipple>
                        <PlayCircleOutlineIcon />
                    </IconButton>
                </Box> 
            </>
            :
            <img width='100%'  height={'350px'} style={{objectFit:'cover'}} src={url} />
            }

            <Stack direction={'column'} alignItems='center' justifyContent='center'
            position={'absolute'} top='0'
            width="100%" height='350px' maxHeight="100%" 
            sx={{
                bgcolor:'rgb(0,0,0,0.8)',
                color:'var(--white)',
                cursor:'pointer',
                opacity:'0',
                ':hover':{
                    opacity:'1', 
                    zIndex:99
                }
            }}
            onClick={handleOpen}
            >
                <Typography variant="h5">Shop Now</Typography>
                <IconButton sx={{
                    color:'var(--white)',
                    marginY:4
                }}>
                    <AddCircleOutlineIcon fontSize='large' />
                </IconButton>
                <Typography variant="body2">@ahsan&usama</Typography>
            </Stack>
            <CarouselModal open={open} handleClose={handleClose} type={type} url={url} currentItem={index} />
        </Box>
    )
}

export default ShopCarouselItem