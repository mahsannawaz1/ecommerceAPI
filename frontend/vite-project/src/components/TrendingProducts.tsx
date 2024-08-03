import Carousal from "@itseasy21/react-elastic-carousel";
import { ArrowProps } from "./ShopCarousel";
import CustomCarouselArrow from "./CustomCarouselArrow";
import TrendingProductItem from "./TrendingProductItem";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomCarousalPagination from "./CustomCarousalPagination";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../interfaces/Product";

const breakpoints = [
    { width:1, itemsToShow:1, itemsToScroll:1 },
    { width:450, itemsToShow:2, itemsToScroll:1},
    { width:768, itemsToShow:3, itemsToScroll:1 },
    { width:992, itemsToShow:4, itemsToScroll:1 },
    { width:1200, itemsToShow:5, itemsToScroll:1 },
]


const TrendingProducts = () => {
    const [selectedBtn,setSelectedBtn] = useState<number>(3)
    const [category,setCategory] = useState<string>()
    const [productType,setProductType] = useState<string[]>()
    useEffect(()=>{
        if(!category){
            setCategory('women')
            setSelectedBtn(0)
            setProductType(['shirts','polos','t-shirts'])
        }
    },[])
    const { data } = useQuery({
        queryKey:['trendingProducts',category,productType],
        queryFn:()=>axios.get<Product[]>('http://localhost:3000/api/products/trending',{ params:{ category,types:productType }}).then(res=>res.data)
    })
    
    return (
        <>
        <Box marginLeft='50px'>
            <Typography variant="h5">Trending</Typography>
            <Stack direction={'row'} spacing={2} marginY={2}>
                <Button disableElevation value={0} onClick={()=>{
                    setSelectedBtn(0)
                    setCategory('women')
                    setProductType(['shirts','polos','t-shirts'])
                }} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 0 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 0 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 0 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>women's top
                </Button>
                <Button disableElevation value={1} onClick={()=>{
                    setSelectedBtn(1)
                    setCategory('men')
                    setProductType(['shirts','polos','t-shirts'])
                }} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 1 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 1 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 1 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>men's top
                </Button>
                <Button disableElevation value={2} onClick={()=>{
                    setSelectedBtn(2)
                    setCategory('men')
                    setProductType(['trousers','jeans'])
                }} sx={{
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
                <Button disableElevation value={3} onClick={()=>{
                    setSelectedBtn(3)
                    setCategory('men')
                    setProductType(['trousers','jeans'])
                    
                }} sx={{
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
                <Button disableElevation value={4} onClick={()=>{
                    setSelectedBtn(4)
                    setCategory('junior boys')
                    setProductType(['shirts','polos','t-shirts','trousers','jeans'])
                }} sx={{
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
                        junior boys
                </Button>
                <Button disableElevation value={5} onClick={()=>{
                    setSelectedBtn(5)
                    setCategory('junior girls')
                    setProductType(['shirts','polos','t-shirts','trousers','jeans'])
                }} sx={{
                        '&:hover': {
                            backgroundColor: selectedBtn == 5 ? 'var(--black)' : 'var(--btn-color4)',
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: selectedBtn == 5 ? 'var(--black)' : 'var(--btn-color4)',
                        color:selectedBtn == 5 ? 'var(--white)' : 'var(--black)'
                        
                    }} disableRipple variant='contained'>
                        junior girls
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
            {data?.map((product,index)=> <TrendingProductItem key={index} url={product.images[0]} product={product} />)}
        </Carousal>
        </Box>
        </>
        
    )

}

export default TrendingProducts