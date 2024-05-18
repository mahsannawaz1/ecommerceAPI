import video from '../../public/denim_vid.mp4'
import girlsImg from '../../public/girls.webp'
import shirts from '../../public/shirts.webp'
import menWomen from '../../public/men_women.webp'
import americanEagle from '../../public/american_eagle.webp'
import { Box, Stack, Typography } from '@mui/material'
import ShopCarouselItem from './ShopCarouselitem'
import CustomCarouselArrow from './CustomCarouselArrow'
import Carousal from "@itseasy21/react-elastic-carousel";



export interface Props {
    type: 'PREV' | 'NEXT';
    onClick: () => void;
    isEdge: boolean;
}

const ShopCarousel = () => {
    const breakpoints = [
        { width:1, itemsToShow:1, itemsToScroll:1 },
        { width:600, itemsToShow:2, itemsToScroll:1},
        { width:900, itemsToShow:3, itemsToScroll:1 },
        { width:1200, itemsToShow:4, itemsToScroll:1 },
        { width:1536, itemsToShow:5, itemsToScroll:1 },
    ]
        

    return (
        <Stack>
            <Typography fontWeight={600} variant='h5' textAlign={'center'}>Get Inspired!</Typography>
            <Typography variant='subtitle1' textAlign={'center'}>Shop your favorite look! Mention @ahsan&usama's and you could be featured right here!</Typography>
            <Box paddingX={1} marginY={4}>
                <Carousal isRTL={false} pagination={false}
                    renderArrow={({type, onClick, isEdge}:Props)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge}  />} 
                    breakPoints={breakpoints}>
                        <ShopCarouselItem type='video' url={video} />
                        <ShopCarouselItem type='image' url={girlsImg} />
                        <ShopCarouselItem type='image' url={shirts} />
                        <ShopCarouselItem type='image' url={americanEagle} />
                        <ShopCarouselItem type='image' url={menWomen} />
                </Carousal>
            </Box>
        </Stack>
    )
}

export default ShopCarousel