import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import video from '../../public/denim_vid.mp4'
import menWomen from '../../public/men_women.webp'

interface Props{
    open:boolean, 
    url:string,
    type:'video' | 'image',
    handleClose:()=>void
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const CarouselModal = ({open,type,url,handleClose}:Props) => {

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
            <Box  sx={{ ...style }}>
                <Stack direction='row'>
                {type=='video' ? 
                <>
                    <video muted controls autoPlay width='400px' style={{objectFit:'cover'}} src={url} />
                    <Box 
                    position={'absolute'} 
                    top='5px' right='5px'>
                        <IconButton disableRipple>
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </Box> 
                </>
                :
                <img width='400px' style={{objectFit:'cover'}} src={url} />
                }
                    <Box padding={2.5} maxWidth={230} maxHeight={'450px'} sx={{
                        overflowX:'hidden',
                        overflowY:'scroll',
                        lineHeight:'0.5'
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
    )
}

export default CarouselModal