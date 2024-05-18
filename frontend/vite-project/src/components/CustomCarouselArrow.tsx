import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Props } from './ShopCarousel'
const CustomCarouselArrow = ({type, onClick, isEdge}:Props) => {
    return (
        type=='PREV' ? 
        <IconButton 
        disabled={isEdge} 
        disableRipple 
        sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} 
        onClick={onClick}> <ArrowBackIosNewIcon  /> 
        </IconButton> 
        :
        <IconButton 
        disabled={isEdge} 
        sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} 
        disableRipple onClick={onClick}> <ArrowForwardIosIcon />
        </IconButton>
    )
}

export default CustomCarouselArrow