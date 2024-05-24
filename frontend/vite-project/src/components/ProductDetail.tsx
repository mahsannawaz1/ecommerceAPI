import { Box, Container,Stack } from '@mui/material'
import React, { useState } from 'react'
import Carousal from "@itseasy21/react-elastic-carousel";
import CustomCarousalPagination from './CustomCarousalPagination';
import CustomCarouselArrow from './CustomCarouselArrow';
import { ArrowProps } from './ShopCarousel';
import productImages from '../services/productImages';
const breakpoints = [
    { width:250, itemsToShow:4, itemsToScroll:1 },
]


const ProductDetail = () => {
    const [selectedImage,setSelectedImage] = useState<string>(productImages[0])
    return (
        <Container fixed sx={{marginY:5}}>
            <Stack direction={'row'} position={'relative'} spacing={5}>

            <Box position={'absolute'} top={0} left={0} width={600} className='vertical-carousel-container' >
                <Carousal   
                breakPoints={breakpoints}     
                isRTL={false}
                pagination={false}
                renderArrow={({type, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small'  />} 
            
                >
                { productImages.slice(0,6).map((img,index)=> 
                    <Box  className='carousel-item'>
                        <img onClick={()=>setSelectedImage(img)} style={{borderBottom:selectedImage == img ? '2px solid black' : '2px solid white'}} key={index} width={'100px'} height={'90%'} src={img} />
                    </Box> 
                )}
                </Carousal>
            </Box>
            <Box>
                <img width={500} height={600} src={selectedImage} />
            </Box>
            </Stack>
        </Container>
    )
}

export default ProductDetail

const images = [
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    },
    {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    },
    {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    },
    {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        },
        {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        },
];