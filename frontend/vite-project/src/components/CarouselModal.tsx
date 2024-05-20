import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import video from '../../public/denim_vid.mp4'
import girlsImg from '../../public/girls.webp'
import shirts from '../../public/shirts.webp'
import menWomen from '../../public/men_women.webp'
import americanEagle from '../../public/american_eagle.webp'
import Carousal from "@itseasy21/react-elastic-carousel";
import CustomCarouselArrow from './CustomCarouselArrow'
import { breakpoints } from './ShopCarousel'
import { ArrowProps } from './ShopCarousel'

interface Props{
    open:boolean, 
    url:string,
    type:'video' | 'image',
    currentItem:number,
    handleClose:()=>void
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height:'504px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const CarouselModal = ({open,currentItem,handleClose}:Props) => {
    const items= [
            <video muted controls autoPlay width='400px' height={'504px'} style={{objectFit:'cover'}} src={video} />,
            <img width='400px' height={'504px'} style={{objectFit:'cover'}} src={girlsImg} />,
            <img width='400px' height={'504px'} style={{objectFit:'cover'}} src={shirts} />,
            <img width='400px' height={'504px'} style={{objectFit:'cover'}} src={americanEagle} />,
            <img width='400px' height={'504px'} style={{objectFit:'cover'}} src={menWomen} />,
    ]
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
            <Box  sx={{ ...style }}>
                <Stack direction='row'>
                <Box width="500px">
                <Carousal isRTL={false} pagination={false} className='height-100'
                    initialActiveIndex={currentItem !== null ? currentItem : 0}
                    renderArrow={({type:t, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={t} onClick={onClick} isEdge={isEdge}  />} 
                    breakPoints={breakpoints}>
                        {items.map(item=><Box position='relative' width={{base:'300px',lg:'350px'}}  marginX={2}>{item}</Box>)}
                </Carousal>
                </Box>
                    <Box padding={2.5} maxWidth={230} maxHeight={'450px'} sx={{
                        overflowX:'hidden',
                        overflowY:'scroll',
                        lineHeight:'0.5'
                    }}>
                    
                        <Stack direction='row'>
                            <Typography marginRight={3} alignSelf={'center'} variant='h5'>AU</Typography>
                            <Typography alignSelf={'center'}>@ahsan&usama</Typography>
                            <Box alignSelf={'flex-start'} sx={{
                                transform:'translate(20px,-20px)'
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
    )
}

export default CarouselModal