import { Box, Stack, Typography } from "@mui/material"
import { Product } from "../interfaces/Product"

interface Props{
    url:string,
    product:Product | undefined
}

const TrendingProductItem = ({ url,product }:Props) => {
    return (
        <Stack marginX={1} sx={{cursor:'pointer'}}>
        <Box >
            <img  src={product?.images[0]} width='100%'  />
        </Box>

        <Box>
            <Typography variant='body2'>{product?.name}</Typography>
            <Typography variant='subtitle2'  color='error'>{product?.price}
                <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>{product?.price} </Typography>
            </Typography>
            <Typography variant='caption'  color='error'>Save 60%</Typography>
        </Box>
        </Stack>
        
    )
}

export default TrendingProductItem