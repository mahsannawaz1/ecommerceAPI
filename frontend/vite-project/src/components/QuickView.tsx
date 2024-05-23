import { Box, Button, IconButton, Input, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import img1 from '../../public/img2.jpg'
import { colors,sizes } from '../services/filter';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface Props{
    open:boolean,
    handleClose:()=>void,
}
const style = {
    position: 'fixed' as 'fixed',
    top: '0',
    right: '0',
    width: 350,
    background:'var(--white)',
    height:'100vh',
    border:0,
    overflowY:'scroll'
};

const QuickView = ({open,handleClose}:Props) => {
    const clrs = colors.map(color=>color.value).slice(0,3)
    const szs = sizes.map(size=>size.value).slice(6)
    const [currentColor,setCurrentColor] = useState<string>(clrs[0])
    const [currentSize,setCurrentSize] = useState<string>(szs[0])
    const [qty,setQty] = useState(0)
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={style}>
                <Box position='relative' padding={1}>
                    <Typography textAlign={'center'}>QuickView</Typography>
                    <IconButton
                    onClick={handleClose}
                    sx={
                        {
                            position:'absolute',
                            top:0,
                            right:0,
                            cursor:'pointer',
                            color:'var(--black)'
                        }
                    }>
                    <CloseIcon  />
                    </IconButton>
                </Box>
                <Box>
                <img width='100%'  src={img1} />
                </Box>
                <Box padding={2}>
                    <Box >
                        <Typography >AE LOGO GRAPHIC TANK TOP</Typography>
                        <Box>
                            <Typography fontSize={20} sx={{ textDecoration:'line-through' }} component={'span'}>PKR 1,200</Typography>
                            <Typography fontSize={20} color='error' marginLeft={'5px'} component={'span'}>PKR 1,200</Typography>
                            <Typography  color='error'>(Save 40%)</Typography>
                        </Box>
                        
                        
            
                    </Box>
                    <Typography marginY={0.5} variant='caption' sx={{color:'var(--link)'}}>Inclusive of VAT Item Code: 1161-3571-409</Typography>
                    <Stack marginY={0.5} direction='row' >
                        <Typography variant='body2' sx={{color:'var(--link)'}}>Color: </Typography>
                        <Typography marginLeft={0.5} variant='body2'>{currentColor}</Typography>
                    </Stack>
                    <Box sx={{display:'flex',flexFlow:'row-wrap',flexWrap:'wrap',gap:0.5}}>
                        {clrs.map(color=>
                        <Box onClick={()=>setCurrentColor(color)} borderRadius={'100%'} sx={{
                            
                            border: currentColor == color ? '1px solid black' : '1px solid white',
                            cursor:'pointer',
                            '&: hover':{
                                border:'1px solid black'
                            }
                        }}>
                            <Box
                            width='50px'
                            height='50px'
                            sx={{
                                border:'1px solid white',
                                background:`${color}`,
                            }}
                            borderRadius={'100%'}
                            ></Box>
                        </Box>
                        )}
                        
                    </Box>
                    <Stack marginY={0.5} direction='row' >
                        <Typography variant='body2' sx={{color:'var(--link)'}}>Size: </Typography>
                        <Typography marginLeft={0.5} variant='body2'>{currentSize}</Typography>
                    </Stack>
                    <Box sx={{display:'flex',flexFlow:'row-wrap',flexWrap:'wrap',gap:0.5}}>
                        {szs.map(size=>
                        <Button 
                        onClick={()=>setCurrentSize(size)}
                        key={size}
                        disableRipple 
                        sx={
                            {   
                                border:'1px solid var(--border)',
                                fontSize:'12px',
                                borderRadius:0, 
                                paddingY: 0,
                                paddingX:0.5,
                                background: currentSize == size ? 'var(--black)' : 'var(--white)',
                                color: currentSize == size ? 'var(--white)' : 'var(--black)',
                                justifyContent:'space-evenly',
                                '&:hover': { 
                                    background: 'var(--black)',
                                    color:'var(--white)'
                                } 
                            }
                        }
                    >
                        <Typography marginRight={0.2} fontSize='12px'>{size} </Typography>
                    </Button>
                        )}
                        
                    </Box>
                    <Box marginY={2}>
                    <Typography variant='body2' sx={{color:'var(--link)'}}>Quantity: </Typography>
                        <Stack height={30} direction={'row'}>
                            <Input value={qty} type='number' disableUnderline
                                sx={{
                                    border:'1px solid var(--border)',
                                    width:30,
                                    height:30,
                                    textAlign:'center',
                                    padding:0.5
                                    }}  
                                />
                                <Stack alignItems={'center'}>
                                    <IconButton disabled={qty==6} disableRipple sx={{height:15}}>
                                    <AddIcon onClick={()=>setQty(qty+1)} sx={{fontSize:15,cursor:'pointer'}} />
                                    </IconButton>
                                    <IconButton disabled={qty==0} disableRipple sx={{height:15}}>
                                    <RemoveIcon  onClick={()=>setQty(qty-1)} sx={{fontSize:15,cursor:'pointer'}} />
                                    </IconButton>
                                
                                
                                </Stack>
                        </Stack>

                    </Box>
                    <Stack spacing={1}>
                            <Button sx={{
                                        background: 'var(--black)',
                                        color:'var(--white)',
                                        border:'1px solid black',
                                        borderRadius:0,
                                        '&:hover': { 
                                            color:'var(--black)',
                                            background: 'var(--white)',
                                        } 
                                    }}
                            >Add to CART</Button>
                            <Button sx={{
                                        color:'var(--black)',
                                        background: 'var(--white)',
                                        border:'1px solid black',
                                        borderRadius:0,
                                        justifyContent:'space-around',
                                        '&:hover': { 
                                            background: 'var(--black)',
                                            color:'var(--white)',
                                        }
                                    }}
                            >
                                <Typography fontSize='14px'>View Full Product Details</Typography>
                                <ArrowForwardIcon className='animate-forward-arrow' />
                                </Button>
                    </Stack>
                </Box>
                
            </Box>
        </Modal>
    </div>
    )
}

export default QuickView