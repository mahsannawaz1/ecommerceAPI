import { Box, Button, IconButton, Input, Modal, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';
import { Color } from '../interfaces/Colors';

interface Props{
    open:boolean,
    product:Product,
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

const QuickView = ({open,handleClose,product}:Props) => {
    const [currentSize, setCurrentSize] = useState<string>('');
    const [currentColor, setCurrentColor] = useState<Color>({} as Color);
    const [qty, setQty] = useState(1);
    const szs = product.sizeColorNames?.map(size => size.name) ?? [];
    const clrs = product?.sizeColorNames?.find(size => size.name === currentSize)?.colors || [];
    const [colors,setColors] = useState<Color[]>(clrs)
    useEffect(() => {
        if (product) {
        
        const initialSize = product.sizeColorNames?.[0]?.name;
        setCurrentSize(initialSize);
        const initialColors = product.sizeColorNames?.find(size => size.name === initialSize)?.colors || [];
        setCurrentColor(initialColors[0] || {} as Color);
        }
    }, [product]);

    if(product._id){

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
                        <IconButton disableRipple
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
                    <img width='100%'  src={product.images[0]} />
                    </Box>
                    <Box padding={2}>
                        <Box >
                            <Typography >{product.name}</Typography>
                            <Box>
                                <Typography fontSize={20} sx={{ textDecoration:'line-through' }} component={'span'}>PKR {product.price}</Typography>
                                <Typography fontSize={20} color='error' marginLeft={'5px'} component={'span'}>PKR {product.price}</Typography>
                                <Typography  color='error'>(Save 40%)</Typography>
                            </Box>
                            
                            
                
                        </Box>
                        <Typography marginY={0.5} variant='caption' sx={{color:'var(--link)'}}>Inclusive of VAT Item Code: 1161-3571-409</Typography>
                        <Stack marginY={0.5} direction='row' >
                            <Typography variant='body2' sx={{color:'var(--link)'}}>Color: </Typography>
                            <Typography marginLeft={0.5} variant='body2'>{currentColor.name}</Typography>
                        </Stack>
                        <Box sx={{display:'flex',flexFlow:'row-wrap',flexWrap:'wrap',gap:0.5}}>
                            {colors.length>0 ? colors.map((color,index)=>
                            <Box key={index}  onClick={() => setCurrentColor(color)} borderRadius={'100%'} sx={{
                                
                                border: currentColor.name === color.name ? '1px solid black' : '1px solid white',
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
                                    background:`${color.name}`,
                                }}
                                borderRadius={'100%'}
                                ></Box>
                            </Box>
                            ): clrs.map((color,index)=>
                                <Box key={index}  onClick={() => setCurrentColor(color)} borderRadius={'100%'} sx={{
                                    
                                    border: currentColor.name === color.name ? '1px solid black' : '1px solid white',
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
                                        background:`${color.name}`,
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
                            onClick={(e) => {
                                if(e.currentTarget.textContent){ 
                                    const currSize = e.currentTarget.textContent.trim()
                                    setCurrentSize(e.currentTarget.textContent)
                                    const initialColors = product.sizeColorNames?.find(size => size.name == currSize)?.colors || [];
                                    console.log(initialColors)
                                    setColors(initialColors)
                                    setCurrentColor(initialColors[0]);
                                }
                            }}
                            key={size}
                            disableRipple 
                            sx={
                                {   
                                    border:'1px solid var(--border)',
                                    fontSize:'12px',
                                    borderRadius:0, 
                                    paddingY: 0,
                                    paddingX:0.5,
                                    background: currentSize === size ? 'var(--black)' : 'var(--white)',
                                    color: currentSize === size ? 'var(--white)' : 'var(--black)',
                                    justifyContent:'space-evenly',
                                    '&:hover': { 
                                        background: 'var(--black)',
                                        color:'var(--white)'
                                    } 
                                }}
                        >
                            <Typography marginRight={0.2} fontSize='12px'>{size}</Typography>
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
                                        <IconButton onClick={()=>setQty(qty+1)} disabled={qty==6} disableRipple sx={{height:15}}>
                                        <AddIcon  sx={{fontSize:15,cursor:'pointer'}} />
                                        </IconButton>
                                        <IconButton onClick={()=>setQty(qty-1)} disabled={qty==0} disableRipple sx={{height:15}}>
                                        <RemoveIcon   sx={{fontSize:15,cursor:'pointer'}} />
                                        </IconButton>
                                    
                                    
                                    </Stack>
                            </Stack>

                        </Box>
                        <Stack spacing={1}>
                                <Button disabled={currentColor.qty === 0} sx={{
                                            background: currentColor.qty === 0 ? 'var(--white)' : 'var(--black)',
                                            color:'var(--white)',
                                            border:'1px solid black',
                                            borderRadius:0,
                                            '&:hover': { 
                                                color:'var(--black)',
                                                background: 'var(--white)',
                                            } 
                                        }}
                                >{currentColor.qty ===0 ? 'Out Of Stock' : 'Add to CART'}</Button>
                                <Link to={`/dapperlane/${product._id}`}>
                                    <Button  sx={{
                                                color:'var(--black)',
                                                
                                                width:'100%',
                                                border:'1px solid black',
                                                borderRadius:0,
                                                justifyContent:'space-around',
                                    
                                            }}
                                    >
                                        View Full Product Details
                                        <ArrowForwardIcon className='animate-forward-arrow' />
                                        </Button>
                                </Link>
                        </Stack>
                    </Box>
                    
                </Box>
            </Modal>
        </div>
        )
    }
    
}

export default QuickView