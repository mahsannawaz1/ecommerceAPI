import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ArrowProps } from './ShopCarousel'
const CustomCarouselArrow = ({type, onClick, isEdge}:ArrowProps) => {
    return (
        type=='PREV' ? 
        <IconButton 
        disabled={isEdge} 
        disableRipple 
        sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible',color:'var(--black)'}} 
        onClick={onClick}> <ArrowBackIosNewIcon fontSize="large"  /> 
        </IconButton> 
        :
        <IconButton 
        disabled={isEdge} 
        sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible',color:'var(--black)'}} 
        disableRipple onClick={onClick}> <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
    )
}

export default CustomCarouselArrow