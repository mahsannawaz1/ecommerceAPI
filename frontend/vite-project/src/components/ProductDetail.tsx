import { Box, Button, Container,FormControl,InputLabel,MenuItem,Select,Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Carousal from "@itseasy21/react-elastic-carousel";
import CustomCarouselArrow from './CustomCarouselArrow';
import { ArrowProps } from './ShopCarousel';
import productImages from '../services/productImages';
import { colors,sizes } from '../services/filter';
import TrendingProductItem from './TrendingProductItem';
import CustomCarousalPagination from './CustomCarousalPagination';

const breakpoints =[
    { width:1, itemsToShow:1, itemsToScroll:1 },
    { width:400, itemsToShow:2, itemsToScroll:1},
    { width:700, itemsToShow:3, itemsToScroll:1 },
    { width:1000, itemsToShow:4, itemsToScroll:1 },
    { width:1536, itemsToShow:5, itemsToScroll:1 },
]

const ProductDetail = () => {
    
    const clrs = colors.map(color=>color.value).slice(0,colors.length)
    const szs = sizes.map(size=>size.value).slice(6)
    const [currentColor,setCurrentColor] = useState<string>(clrs[0])
    const [currentSize,setCurrentSize] = useState<string>(szs[0])
    const [qty,setQty] = useState(1)
    const [selectedImage,setSelectedImage] = useState<string>(productImages[0])
    

    return (
        <Container sx={{marginY:5}}>
            <Stack direction={'row'}  spacing={8}>
                <Box position={'relative'}>

                    <Box className='on-hover'  width={500} height={600} sx={{
                    }} >
                        <img width={'100%'} height={'100%'} className='on-hover-img'  src={selectedImage} />
                    </Box>
                    <Box  className='vertical-carousel-container' >
                        <Carousal
                        breakPoints={[
                            { width:250, itemsToShow:4, itemsToScroll:1 },
                        ]}
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
                </Box>
                <Box width={{lg:'31%',md:'auto'}}>
                    <Typography variant='h5' textAlign={'center'} marginBottom={2}>AE SUPER SOFT LOGO GRAPHIC T-SHIRT</Typography>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
                        <Typography sx={{textDecoration:'line-through'}}>AED 130</Typography>
                        <Typography color='error'>AED 78</Typography>
                        <Box display={'flex'} alignItems={'center'} padding={0.3}  sx={{background:'#d32f2f',color:'var(--white)',fontSize:11}} component={'span'}>(SAVE 40%)</Box>
                    </Stack>
                    <Typography textAlign={'center'} marginY={0.5}  sx={{color:'var(--link)',fontSize:10}}>Inclusive of VAT Item Code: 1161-3571-409</Typography>
                    <Box sx={{display:'flex',flexFlow:'row-wrap',flexWrap:'wrap',gap:0.5,marginX:5,marginTop:3}}>
                            {clrs.map(color=>
                            <Box onClick={()=>setCurrentColor(color)} borderRadius={'100%'} sx={{
                                
                                border: currentColor == color ? '1px solid black' : '1px solid white',
                                cursor:'pointer',
                                '&: hover':{
                                    border:'1px solid black'
                                }
                            }}>
                                <Box
                                width='35px'
                                height='35px'
                                sx={{
                                    border:'1px solid white',
                                    background:`${color}`,
                                }}
                                borderRadius={'100%'}
                                ></Box>
                            </Box>
                            )}
                            
                    </Box>
                    <Typography marginY={1} textAlign={'center'} marginLeft={0.5} variant='body2'>{currentColor}</Typography>

                    <Stack direction={'row'} spacing={2} marginTop={4} marginX={5}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='outlined'>
                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                        <Select
                            sx={{borderRadius:0,border:0}}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={currentSize}
                            label="Size"
                            onChange={(e)=>setCurrentSize(e.target.value)}
                        
                        
                        >
                            {szs.map(size=><MenuItem key={size} value={size}>{size}</MenuItem>)}
                        </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='outlined'>
                        <InputLabel id="demo-select-small-label">Qty</InputLabel>
                        <Select
                            sx={{borderRadius:0,border:0}}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={qty}
                            label="Qty"
                            onChange={(e)=> setQty(parseInt(String(e.target.value)) )}
                        >
                            <MenuItem  value={1}>{1}</MenuItem>
                            <MenuItem  value={2}>{2}</MenuItem>
                            <MenuItem  value={3}>{3}</MenuItem>
                            <MenuItem  value={4}>{4}</MenuItem>
                            <MenuItem  value={5}>{5}</MenuItem>
                            <MenuItem  value={6}>{6}</MenuItem>
                        </Select>
                        </FormControl>
                    </Stack>

                    <Stack marginX={5} marginY={2} justifyContent={'center'}>
                        <Button sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                '&:hover': {
                                    color:'var(--black)',
                                    background: 'var(--white)',
                                }
                            }}
                        >Add to CART</Button>
                    </Stack>

                    <Stack marginY={0.5} direction='row' >
                            <Typography variant='body2' >FIT: </Typography>
                            <Typography  marginLeft={0.5} sx={{color:'var(--link)'}} variant='body2' textTransform={'capitalize'}>Regular Fit</Typography>
                    </Stack>
                    
                    <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>THE NAME SAYS IT ALL THE RIGHT SIZE SLIGHTLY SNUGS THE BODY LEAVING ENOUGH ROOM FOR COMFORT IN THE SLEEVES AND WAIST. DOES NOT TAPER DOWN AND OFFERS A RELAXED SILHOUETTE FOR YOUR EVERYDAY LOOKS.</Typography>
                    <Stack marginY={1}>
                        <Typography variant='body2'>COMPOSITION & CARE</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>100% COTTON</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}> MACHINE WASH UP TO 30C/86F, GENTLE CYCLE</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>DO NOT BLEACH</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>IRON UP TO 110C/230F</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>DO NOT IRON DIRECTLY ON PRINTS/EMBROIDERY/EMBELLISHMENTS</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>DO NOT DRY CLEAN</Typography>
                        <Typography sx={{color:'var(--link)'}} variant='caption' textTransform={'capitalize'}>DO NOT TUMBLE DRY</Typography>
                    </Stack>

                </Box>
            </Stack>
            <Box>
                <Typography variant='h5' textAlign={'center'} marginY={3}>Customers Also Viewed</Typography>
                <Carousal 
                isRTL={false}
                renderPagination={({pages,activePage,onClick})=><CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
                renderArrow={({type, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small'  />} 
                breakPoints={breakpoints} 
                >
                    {productImages.map((img,index)=> <TrendingProductItem key={index} url={img} />)}
                </Carousal>
            </Box>
            <Box>
                <Typography variant='h5' textAlign={'center'} marginY={3}>People Also Bought</Typography>
                <Carousal 
                isRTL={false}
                renderPagination={({pages,activePage,onClick})=><CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
                renderArrow={({type, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small'  />} 
                breakPoints={breakpoints} 
                >
                    {productImages.map((img,index)=> <TrendingProductItem key={index} url={img} />)}
                </Carousal>
            </Box>
            <Box>
                <Typography variant='h5' textAlign={'center'} marginY={3}>Recently Viewed</Typography>
                <Carousal 
                isRTL={false}
                renderPagination={({pages,activePage,onClick})=><CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
                renderArrow={({type, onClick, isEdge}:ArrowProps)=><CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small'  />} 
                breakPoints={breakpoints} 
                >
                    {productImages.map((img,index)=> <TrendingProductItem key={index} url={img} />)}
                </Carousal>
            </Box>
        </Container>
    )
}

export default ProductDetail

