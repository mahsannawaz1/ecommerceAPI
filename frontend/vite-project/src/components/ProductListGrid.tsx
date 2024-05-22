import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import productImages from '../services/productImages'
const ProductListGrid = () => {

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
            {productImages.map((image,index)=><Grid key={index} item>
                <Box position='relative' width={250} height={300} sx={{cursor:'pointer'}}>
                    <img  src={image} height='100%' width='100%'  />
                    <IconButton  onClick={()=>handleChangeFavourites(index)} sx={{position:'absolute',right:'0px',color:'var(--black)'}} disableRipple> {foundFavourite(index) == index ? <FavoriteIcon /> : <FavoriteBorderIcon /> }  </IconButton>
                </Box>
                
                <Box>
                    <Typography fontSize={'var(--pro-title-font)'} sx={
                        {
                            '&:hover':{
                                textDecoration:'underline',
                                cursor:'pointer'
                            }
                        }
                        } variant='body2'>AE LOGO GRAPHIC TANK TOP</Typography>
                    <Box>
                        <Typography variant='body2' sx={{ textDecoration:'line-through' }} component={'span'}>PKR 1,200</Typography>
                        <Typography variant='body2' color='error' marginLeft={'5px'} component={'span'}>PKR 1,200</Typography>
                    </Box>
                    
                    <Typography variant='caption' color='error'>(Save 40%)</Typography>
                </Box>
                <Stack >
                    <Button color='secondary'>View Options</Button>
                </Stack>
            </Grid>)}
            
        </Grid>
    )
}

export default ProductListGrid