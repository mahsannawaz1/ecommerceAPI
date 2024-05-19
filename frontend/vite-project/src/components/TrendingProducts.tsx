import Carousal from "@itseasy21/react-elastic-carousel";
import { ArrowProps } from "./ShopCarousel";
import CustomCarouselArrow from "./CustomCarouselArrow";
import TrendingProductItem from "./TrendingProductItem";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomCarousalPagination from "./CustomCarousalPagination";
import images from '../services/productImages'
import { useState } from "react";

const breakpoints = [
    { width:1, itemsToShow:1, itemsToScroll:1 },
    { width:450, itemsToShow:2, itemsToScroll:1},
    { width:768, itemsToShow:3, itemsToScroll:1 },
    { width:992, itemsToShow:4, itemsToScroll:1 },
    { width:1200, itemsToShow:5, itemsToScroll:1 },
]


const TrendingProducts = () => {
    const [selectedBtn,setSelectedBtn] = useState<number>(3)
    
    return (
        <>
        <Box marginLeft='50px'>
            <Typography variant="h5">Trending</Typography>
            <Stack direction={'row'} spacing={2} marginY={2}>
                <Button value={0} onClick={()=>setSelectedBtn(0)} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 0 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 0 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 0 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>women's tops
                </Button>
                <Button value={1} onClick={()=>setSelectedBtn(1)} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 1 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 1 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 1 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>men's tops
                </Button>
                <Button value={2} onClick={()=>setSelectedBtn(2)} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 2 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 2 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 2 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>women's bottoms
                </Button>
                <Button value={3} onClick={()=>setSelectedBtn(3)} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 3 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 3 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 3 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>men's bottoms
                </Button>
                <Button value={4} onClick={()=>setSelectedBtn(4)} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 4 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 4 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 4 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>
                        juniors
                </Button>
            </Stack>
        </Box>
        <Box>
            
        <Carousal 
        isRTL={false}
        renderPagination={({pages,activePage,onClick})=><CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
        renderArrow={({type, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small'  />} 
        breakPoints={breakpoints} 
        >
            {images.map((img,index)=> <TrendingProductItem key={index} url={img} />)}
        </Carousal>
        </Box>
        </>
        
    )

}

export default TrendingProducts