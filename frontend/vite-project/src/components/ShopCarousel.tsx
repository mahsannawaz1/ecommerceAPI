import Carousel, { ReactElasticCarouselProps } from 'react-elastic-carousel'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import video from '../../public/denim_vid.mp4'
import girlsImg from '../../public/girls.webp'
import shirts from '../../public/shirts.webp'
import menWomen from '../../public/men_women.webp'
import americanEagle from '../../public/american_eagle.webp'
import { Box, Button, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'

interface Props {
    type: 'PREV' | 'NEXT';
    onClick: () => void;
    isEdge: boolean;
}

const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
};

const ShopCarousel = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const breakpoints :ReactElasticCarouselProps['breakPoints'] = [
        { width:1, itemsToShow:1, itemsToScroll:1 },
        { width:600, itemsToShow:2, itemsToScroll:1},
        { width:900, itemsToShow:3, itemsToScroll:1 },
        { width:1200, itemsToShow:4, itemsToScroll:1 },
        { width:1536, itemsToShow:5, itemsToScroll:1 },
    ]
        

    return (
        <Stack>
            <Typography fontWeight={600} variant='h5' textAlign={'center'}>Get Inspired!</Typography>
            <Typography variant='subtitle1' textAlign={'center'}>Shop your favorite look! Mention @ahsan&usama's and you could be featured right here!</Typography>
            <Box paddingX={1} marginY={4}>
                <Carousel pagination={false}
                    renderArrow={({type, onClick, isEdge}:Props)=>type=='PREV' ? <IconButton disabled={isEdge} disableRipple sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} onClick={onClick}><ArrowBackIosNewIcon  /> </IconButton> : <IconButton disabled={isEdge} sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} disableRipple onClick={onClick}> <ArrowForwardIosIcon /></IconButton> } 
                    breakPoints={breakpoints}>
                    <Box 
                    position={'relative'} width={{base:'300px',lg:'350px'}}>
                        <video width='100%'   height={'350px'} style={{objectFit:'cover'}} src={video} />
                        <Box position={'absolute'} top='5px' right='5px'>
                            <IconButton disableRipple>
                                <PlayCircleOutlineIcon />
                            </IconButton>
                        </Box>
                        <Stack onClick={handleOpen} position={'absolute'} top='0' direction={'column'} alignItems={'center'} justifyContent={'center'} width="100%" height='350px' maxHeight={"100%"} sx={{
                            bgcolor:'rgb(0,0,0,0.8)',
                            color:'var(--white)',
                            cursor:'pointer',
                            opacity:'0',
                            ':hover':{
                                opacity:'1', 
                                zIndex:99
                            }
                        }}>
                            <Typography variant="h5">Shop Now</Typography>
                            <IconButton sx={{
                                color:'var(--white)',
                                marginY:4
                            }}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                            <Typography variant="body2">@ahsan&usama</Typography>
                        </Stack>
                    </Box>
                    <Box position={'relative'} width={{base:'300px',lg:'350px'}}  marginX={2}>
                        <img width='100%'  height={'350px'} style={{objectFit:'cover'}} src={girlsImg} />
                        <Stack position={'absolute'} top='0' direction={'column'} alignItems={'center'} justifyContent={'center'} width="100%" height='350px' maxHeight={"100%"} sx={{
                            bgcolor:'rgb(0,0,0,0.8)',
                            color:'var(--white)',
                            cursor:'pointer',
                            opacity:'0',
                            ':hover':{
                                opacity:'1', 
                                zIndex:99
                            }
                        }}>
                            <Typography variant="h5">Shop Now</Typography>
                            <IconButton sx={{
                                color:'var(--white)',
                                marginY:4
                            }}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                            <Typography variant="body2">@ahsan&usama</Typography>
                        </Stack>
                    </Box>
                    <Box position={'relative'} width={{base:'300px',lg:'350px'}} >
                        <img width='100%' height={'350px'} style={{objectFit:'cover'}} src={shirts} />
                        <Stack position={'absolute'} top='0' direction={'column'} alignItems={'center'} justifyContent={'center'} width="100%" height='350px' maxHeight={"100%"} sx={{
                            bgcolor:'rgb(0,0,0,0.8)',
                            color:'var(--white)',
                            cursor:'pointer',
                            opacity:'0',
                            ':hover':{
                                opacity:'1', 
                                zIndex:99
                            }
                        }}>
                            <Typography variant="h5">Shop Now</Typography>
                            <IconButton sx={{
                                color:'var(--white)',
                                marginY:4
                            }}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                            <Typography variant="body2">@ahsan&usama</Typography>
                        </Stack>
                    </Box>
                    <Box position={'relative'} width={{base:'300px',lg:'350px'}}  marginX={2}>
                        <img width='100%'  height={'350px'} style={{objectFit:'cover'}} src={americanEagle} />
                        <Stack position={'absolute'} top='0' direction={'column'} alignItems={'center'} justifyContent={'center'} width="100%" height='350px' maxHeight={"100%"} sx={{
                            bgcolor:'rgb(0,0,0,0.8)',
                            color:'var(--white)',
                            cursor:'pointer',
                            opacity:'0',
                            ':hover':{
                                opacity:'1', 
                                zIndex:99
                            }
                        }}>
                            <Typography variant="h5">Shop Now</Typography>
                            <IconButton sx={{
                                color:'var(--white)',
                                marginY:4
                            }}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                            <Typography variant="body2">@ahsan&usama</Typography>
                        </Stack>
                    </Box>
                    <Box position={'relative'} width={{base:'300px',lg:'350px'}} >
                        <img width='100%' height={'350px'} style={{objectFit:'cover'}} src={menWomen} />
                        <Stack position={'absolute'} top='0' direction={'column'} alignItems={'center'} justifyContent={'center'} width="100%" height='350px' maxHeight={"100%"} sx={{
                            bgcolor:'rgb(0,0,0,0.8)',
                            color:'var(--white)',
                            cursor:'pointer',
                            opacity:'0',
                            ':hover':{
                                opacity:'1', 
                                zIndex:99
                            }
                        }}>
                            <Typography variant="h5">Shop Now</Typography>
                            <IconButton sx={{
                                color:'var(--white)',
                                marginY:4
                            }}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                            <Typography variant="body2">@ahsan&usama</Typography>
                        </Stack>
                    </Box>
                </Carousel>
            </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
        <Box  sx={{ ...style }}>
            
            <Stack direction='row'>
            <video muted controls autoPlay width='400px'  style={{objectFit:'cover'}} src={video} />
            <Box padding={2.5} maxWidth={230} maxHeight={'450px'} sx={{
                overflowX:'hidden',
                overflowY:'scroll'
            }}>
            
                <Stack direction='row'>
                    <Typography marginRight={3} alignSelf={'center'} variant='h5'>AU</Typography>
                    <Typography alignSelf={'center'}>@ahsan&usama</Typography>
                    <Box alignSelf={'flex-start'} sx={{
                        transform:'translate(42px,-20px)'
                    }}>
                        <IconButton onClick={handleClose} sx={{
                            color:'var(--black)',
                        }} disableRipple>
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Stack>
                <Typography alignSelf={'center'}>Get Inspired! (3 items)</Typography>
                <Grid container>
                        <Grid item xs={6}>
                            <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={6}>
                        <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                        <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft={'5px'} sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                        <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                        <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                        <Box width='100px' sx={{
                                ':hover':{
                                    textDecoration:'underline',
                                    cursor:'pointer'
                                }
                            }}>
                                <img src={menWomen}   height='100px' />
                                <Typography variant='caption'>American Eagle Super Soft Thermal Shirt</Typography>
                                <Typography variant='subtitle2'  color='error'>3500.00 
                                    <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                </Grid>
            </Box>
            </Stack>
        </Box>
        </Modal>
        </Stack>
            
    )
}

export default ShopCarousel