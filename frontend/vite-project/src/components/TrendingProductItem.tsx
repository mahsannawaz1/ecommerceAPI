import { Box, Stack, Typography } from "@mui/material"

interface Props{
    url:string
}

const TrendingProductItem = ({ url }:Props) => {
    return (
        <Stack marginX={1} sx={{cursor:'pointer'}}>
        <Box >
            <img  src={url} width='100%'  />
        </Box>

        <Box>
            <Typography variant='body2'>AE AirFlex+ Temp Tech Athletic Straight Jean</Typography>
            <Typography variant='subtitle2'  color='error'>3500.00 
                <Typography variant='subtitle2' component='span' marginLeft='5px' sx={{textDecoration:'line-through',color:'var(--black)'}}>5000.00 </Typography>
            </Typography>
            <Typography variant='caption'  color='error'>Save 60%</Typography>
        </Box>
        </Stack>
        
    )
}

export default TrendingProductItem