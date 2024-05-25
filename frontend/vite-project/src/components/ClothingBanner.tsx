import { Box, Button, Stack, Typography } from "@mui/material"
import baggyJeans from '../../public/baggy_jeans.webp'
import relaxedJeans from '../../public/relaxed_jeans.webp'
import womenDress from '../../public/women_dress.webp'
import menPolos from '../../public/polos.webp'
interface Props{
    type: 'b_baggy' | 'b_relaxed' | 't_women' | 't_men';

}

const ClothingBanner = ({ type }:Props) => {
    const bannerMap = {
        'b_baggy':{
            heading:'Baggy & wide Leg jeans',
            text:'The On-trend fit you need',
            btnText1:'Shop Baggy Jeans',
            btnText2:`Shop All Jeans`,
            img:baggyJeans,
            btnColor:'var(--btn-color2)'
        },
        'b_relaxed':{
            heading:'Relaxed Fit Jeans',
            text:'Laidback styles for ultimate comfort',
            btnText1:'Shop Relaxed Fit',
            btnText2:`Shop All Jeans`,
            img:relaxedJeans,
            btnColor:'var(--btn-color2)'
        },
        't_women':{
            heading:'Oh soooo Pretty Dresses',
            text:'',
            btnText1:`Shop Women's dresses`,
            btnText2:``,
            img:womenDress,
            btnColor:'var(--btn-color3)'
        },
        't_men':{
            heading:'The Polo Shop',
            text:'',
            btnText1:`Shop Men's Polos`,
            btnText2:``,
            img:menPolos,
            btnColor:'var(--btn-color3)'
        }
    }
    const {heading,text,btnText1,btnText2,btnColor,img} = bannerMap[type]
    return (
        <Box marginX={10} position={'relative'} marginY={2}>
        <img width="100%" src={img} />
        <Stack position={'absolute'} top={'calc(43% - 16px)'} left='5%'  direction={'column'}   spacing={2}>
            <Box>
                <Typography sx={{
                    fontWeight:800,
                    color:'var(--white)'
                }} variant='h2'>{ heading }</Typography>
                <Typography sx={{
                    color:'var(--white)'
                }} variant="h6">{ text }</Typography>
            </Box>
            <Stack direction='row' spacing={2}>
                <Button sx={{
                    '&:hover': {
                        backgroundColor: btnColor,
                
                    },
                    borderRadius:'30px',
                    bgcolor:btnColor,
                    color:'var(--btn)'
                }} disableRipple variant='contained'>{ btnText1}</Button>
                {btnText2 && <Button sx={{
                    '&:hover': {
                        backgroundColor: btnColor,

                    },
                    borderRadius:'30px',
                    bgcolor:btnColor,
                    color:'var(--btn)'
                }} disableRipple variant='contained'>{btnText2}</Button>}
                
            </Stack>
        </Stack>
    </Box>
    )
}

export default ClothingBanner