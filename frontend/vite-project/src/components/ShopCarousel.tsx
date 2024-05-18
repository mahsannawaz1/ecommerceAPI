import Carousel, { ReactElasticCarouselProps } from 'react-elastic-carousel'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import video from '../../public/denim_vid.mp4'
import girlsImg from '../../public/girls.webp'
import shirts from '../../public/shirts.webp'
import menWomen from '../../public/men_women.webp'
import americanEagle from '../../public/american_eagle.webp'
import { Box, IconButton, Stack, Typography } from '@mui/material'
interface Props {
    type: 'PREV' | 'NEXT';
    onClick: () => void;
    isEdge: boolean;
    }


const ShopCarousel = () => {
    const breakpoints :ReactElasticCarouselProps['breakPoints'] = [
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
                <Carousel pagination={false}
                renderArrow={({type, onClick, isEdge}:Props)=>type=='PREV' ? <IconButton disabled={isEdge} disableRipple sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} onClick={onClick}><ArrowBackIosNewIcon  /> </IconButton> : <IconButton disabled={isEdge} sx={{cursor:'pointer',visibility:isEdge ? 'hidden' : 'visible'}} disableRipple onClick={onClick}> <ArrowForwardIosIcon /></IconButton> } 
                breakPoints={breakpoints}>
                <Box 
                
                position={'relative'} width={{base:'300px',lg:'350px'}}>
                    <video width='100%'   height={'350px'} style={{objectFit:'cover'}} src={video} />
                    <Box position={'absolute'} top='5px' right='5px'>
                        <IconButton disableRipple>
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box width={{base:'300px',lg:'350px'}}  marginX={2}>
                    <img width='100%'  height={'350px'} style={{objectFit:'cover'}} src={girlsImg} />
                </Box>
                <Box width={{base:'300px',lg:'350px'}} >
                    <img width='100%' height={'350px'} style={{objectFit:'cover'}} src={shirts} />
                </Box>
                <Box width={{base:'300px',lg:'350px'}}  marginX={2}>
                    <img width='100%'  height={'350px'} style={{objectFit:'cover'}} src={americanEagle} />
                </Box>
                <Box width={{base:'300px',lg:'350px'}} >
                    <img width='100%' height={'350px'} style={{objectFit:'cover'}} src={menWomen} />
                </Box>
                        </Carousel>
            </Box>
        </Stack>
            
    )
}

export default ShopCarousel