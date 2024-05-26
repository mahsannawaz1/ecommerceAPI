import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import productImages from '../services/productImages'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';
interface Props{
    products:Product[] | undefined,
    category:String,
    handleOpen:()=>void
}
const ProductListGrid = ({handleOpen,category,products}:Props) => {

    const [favourites,setFavourites] = useState<number[]>([])

    const handleChangeFavourites = (value:number)=>{
        if(foundFavourite(value)>=0){
            setFavourites(favourites?.filter(fav=> fav!=value ))
            return;
        }
        setFavourites([...favourites,value])
    }
    const foundFavourite = (value:number) => {
        return favourites.find(fav=>value == fav) == undefined ? -1 : value
    }

    return (
        <Grid container spacing={2}>
            {products?.map((product,index)=>
                <Grid key={index} item lg={3} md={4} sm={6} xs={12} >
                    <Link to={`/dapperlane/${product._id}`}>
                        <Box position='relative' sx={{cursor:'pointer'}}>
                            <img  src={product.images[0]} height='100%' width='100%'  />
                            <IconButton onClick={()=>handleChangeFavourites(index)} sx={{position:'absolute',right:'0px',color:'var(--black)'}} disableRipple> {foundFavourite(index) == index ? <FavoriteIcon sx={{fontWeight:400}}  /> : <FavoriteBorderIcon sx={{fontWeight:400}} /> }  </IconButton>
                        </Box>
                    </Link>
                    
                    <Box>
                        <Link to={`/dapperlane/${product._id}`}>
                            <Typography fontSize={'var(--pro-title-font)'} variant='body2'>{product.name}</Typography>
                        </Link>
                        <Box>
                            <Typography variant='body2' sx={{ textDecoration:'line-through' }} component={'span'}>{product.price}</Typography>
                            <Typography variant='body2' color='error' marginLeft={'5px'} component={'span'}>{product.price}</Typography>
                        </Box>
                        
                        <Typography variant='caption' color='error'>(Save 40%)</Typography>
                    </Box>
                    <Stack>
                        <Button  onClick={handleOpen} sx={{
                                        background: 'var(--black)',
                                        color:'var(--white)',
                                        border:'1px solid black',
                                        borderRadius:0,
                                        margin:1.5,
                                        '&:hover': { 
                                            color:'var(--black)',
                                            background: 'var(--white)',
                                        } 
                                    }}>View Options</Button>
                    </Stack>
                </Grid>)
            }
            
        </Grid>
    )
}

export default ProductListGrid