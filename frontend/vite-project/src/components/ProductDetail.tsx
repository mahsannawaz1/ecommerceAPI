import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Carousal from "@itseasy21/react-elastic-carousel";
import CustomCarouselArrow from './CustomCarouselArrow';
import { ArrowProps } from './ShopCarousel';
import productImages from '../services/productImages';
import TrendingProductItem from './TrendingProductItem';
import CustomCarousalPagination from './CustomCarousalPagination';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../interfaces/Product';
import { Color } from '../interfaces/Colors';
import recentlyViewedProducts from '../services/recentlyViewedProducts';
import useAddToCart from '../hooks/useAddToCart';

const breakpoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 400, itemsToShow: 2, itemsToScroll: 1 },
    { width: 700, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1000, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1536, itemsToShow: 5, itemsToScroll: 1 },
];

    const ProductDetail = () => {
    const { id } = useParams();

    const { data: product, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => axios.get<Product>(`http://localhost:3000/api/products/${id}`).then(res => res.data),
    });
    const recentlyViewedPros = recentlyViewedProducts(product)

    const [currentSize, setCurrentSize] = useState<string>('');
    const [currentColor, setCurrentColor] = useState<Color>({} as Color);
    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const szs = product?.sizeColorNames?.map(size => size.name) ?? [];
    const clrs = product?.sizeColorNames?.find(size => size.name === currentSize)?.colors || [];
    const handleChangeCart = ()=>{
        if(product)
            useAddToCart(
            {id:product?._id,sku:product?.sku,name:product?.name,image:product?.images[0],color:currentColor.name,size:currentSize}
            ,qty,product?.price
            )
    }
    useEffect(() => {
        if (product) {
        const initialSize = product.sizeColorNames?.[0]?.name;
        setCurrentSize(initialSize);
        const initialColors = product.sizeColorNames?.find(size => size.name === initialSize)?.colors || [];
        setCurrentColor(initialColors[0] || {} as Color);
        setSelectedImage(product.images[0]);
        }
    }, [product]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }


    return (
        <Container sx={{ marginY: 5 }}>
        <Stack direction={'row'} spacing={8}>
            <Box position={'relative'}>
            <Box className='on-hover' width={500} height={600}>
                <img width={'100%'} height={'100%'} src={selectedImage || product?.images[0]} />
            </Box>
            <Box className='vertical-carousel-container'>
                <Carousal
                breakPoints={[{ width: 250, itemsToShow: 4, itemsToScroll: 1 }]}
                isRTL={false}
                pagination={false}
                renderArrow={({ type, onClick, isEdge }: ArrowProps) => <CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small' />}
                >
                {product?.images.map((img, index) =>
                    <Box key={index} className='carousel-item'>
                    <img onClick={() => setSelectedImage(img)} style={{ borderBottom: selectedImage === img ? '2px solid black' : '2px solid white' }} width={'100px'} height={'90%'} src={img} />
                    </Box>
                )}
                </Carousal>
            </Box>
            </Box>
            <Box width={{ lg: '31%', md: 'auto' }}>
            <Typography variant='h5' textAlign={'center'} marginBottom={2}>{product?.name}</Typography>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
                <Typography sx={{ textDecoration: 'line-through' }}>PKR {product?.price.toLocaleString()}</Typography>
                <Typography color='error'>{product?.price.toLocaleString()}</Typography>
                <Box display={'flex'} alignItems={'center'} padding={0.3} sx={{ background: '#d32f2f', color: 'var(--white)', fontSize: 11 }} component={'span'}>(SAVE 40%)</Box>
            </Stack>
            <Typography textAlign={'center'} marginY={0.5} sx={{ color: 'var(--link)', fontSize: 10 }}>Inclusive of VAT Item Code: 1161-3571-409</Typography>
            <Box sx={{ display: 'flex', flexFlow: 'row-wrap', flexWrap: 'wrap', gap: 0.5, marginX: 5, marginTop: 3 }}>
                {clrs.map((color, index) =>
                <Box key={index} onClick={() => setCurrentColor(color)} borderRadius={'100%'} sx={{
                    border: currentColor.name === color.name ? '1px solid black' : '1px solid white',
                    cursor: 'pointer',
                    '&: hover': {
                    border: '1px solid black'
                    }
                }}>
                    <Box
                    width='35px'
                    height='35px'
                    sx={{
                        border: '1px solid white',
                        background: `${color.name}`,
                    }}
                    borderRadius={'100%'}
                    ></Box>
                </Box>
                )}
            </Box>
            <Typography marginY={1} textAlign={'center'} marginLeft={0.5} variant='body2'>{currentColor.name}</Typography>

            <Stack direction={'row'} spacing={2} marginTop={4} marginX={5}>
                {szs.length > 0 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='outlined'>
                    <InputLabel id="demo-select-small-label">Size</InputLabel>
                    <Select
                    sx={{ borderRadius: 0, border: 0 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={currentSize}
                    label="Size"
                    onChange={(e) => {
                        setCurrentSize(e.target.value)
                        const initialColors = product?.sizeColorNames?.find(size => size.name === e.target.value)?.colors || [];
                        
                        setCurrentColor(initialColors[0] || {} as Color);
                    }}
                    >
                    {szs.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
                    </Select>
                </FormControl>
                )}

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='outlined'>
                <InputLabel id="demo-select-small-label">Qty</InputLabel>
                <Select
                    sx={{ borderRadius: 0, border: 0 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={qty}
                    label="Qty"
                    onChange={(e) => setQty(parseInt(e.target.value as string))}
                >
                    {[1, 2, 3, 4, 5, 6].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
                </Select>
                </FormControl>
            </Stack>

            <Stack marginX={5} marginY={2} justifyContent={'center'}>
                <Button onClick={handleChangeCart} disabled={currentColor.qty === 0}
                sx={
                    currentColor.qty !== 0 ? {
                    background: 'var(--black)',
                    color: 'var(--white)',
                    border: '1px solid black',
                    borderRadius: 0,
                    '&:hover': {
                        color: 'var(--black)',
                        background: 'var(--white)',
                    }
                    } : {}}
                >{currentColor.qty ===0 ? 'Out Of Stock' : 'Add to CART'}</Button>
            </Stack>

            <Stack marginY={0.5} direction='row'>
                <Typography variant='body2'>FIT: </Typography>
                <Typography marginLeft={0.5} sx={{ color: 'var(--link)' }} variant='body2' textTransform={'capitalize'}>{product?.fit}</Typography>
            </Stack>

            <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>{product?.description}</Typography>
            <Stack marginY={1}>
                <Typography variant='body2'>COMPOSITION & CARE</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>100% COTTON</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}> MACHINE WASH UP TO 30C/86F, GENTLE CYCLE</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>DO NOT BLEACH</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>IRON UP TO 110C/230F</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>DO NOT IRON DIRECTLY ON PRINTS/EMBROIDERY/EMBELLISHMENTS</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>DO NOT DRY CLEAN</Typography>
                <Typography sx={{ color: 'var(--link)' }} variant='caption' textTransform={'capitalize'}>DO NOT TUMBLE DRY</Typography>
            </Stack>
            </Box>
        </Stack>
        <Box>
            <Typography variant='h5' textAlign={'center'} marginY={3}>Customers Also Viewed</Typography>
            <Carousal
            isRTL={false}
            renderPagination={({ pages, activePage, onClick }) => <CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
            renderArrow={({ type, onClick, isEdge }: ArrowProps) => <CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small' />}
            breakPoints={breakpoints}
            >
            {productImages.map((img, index) => <TrendingProductItem key={index} url={img} product={product} />)}
            </Carousal>
        </Box>
        <Box>
            <Typography variant='h5' textAlign={'center'} marginY={3}>People Also Bought</Typography>
            <Carousal
            isRTL={false}
            renderPagination={({ pages, activePage, onClick }) => <CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
            renderArrow={({ type, onClick, isEdge }: ArrowProps) => <CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small' />}
            breakPoints={breakpoints}
            >
            {productImages.map((img, index) => <TrendingProductItem key={index} url={img} product={product} />)}
            </Carousal>
        </Box>
        <Box>
            <Typography variant='h5' textAlign={'center'} marginY={3}>Recently Viewed</Typography>
            <Carousal
            isRTL={false}
            renderPagination={({ pages, activePage, onClick }) => <CustomCarousalPagination pages={pages} active={activePage} onClick={onClick} />}
            renderArrow={({ type, onClick, isEdge }: ArrowProps) => <CustomCarouselArrow type={type} onClick={onClick} isEdge={isEdge} size='small' />}
            breakPoints={breakpoints}
            >
            {
                recentlyViewedPros.map((product) => 
                <Link key={product._id} to={`/dapperlane/${product._id}`}>
                        <TrendingProductItem url={product.images[0]} product={product} />
                </Link> 
            )}
            </Carousal>
        </Box>
        </Container>
    );
};

export default ProductDetail;
