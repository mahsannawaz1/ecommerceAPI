import { Stack,Grid,Box, Typography, Button, Container} from '@mui/material'
import newArrivals from '../../public/newArrivals.png'
import tees from '../../public/teesAvatar.png'
import hoodies from '../../public/hoodiesAvatar.png'
import joggers from '../../public/joggerAvatar.png'
import shirts from '../../public/shirtAvatar.png'
import jeans from '../../public/jeansAvatar.png'
import under from '../../public/underAvatar.png'
import polos from '../../public/polosAvatar.png'
import { useEffect, useState } from 'react'
import CategoryComponent from './CategoryComponent'
import SizeComponent from './SizeComponent'
import ProductListGrid from './ProductListGrid'
import SizeFilter from './SizeFilter'
import { colors,prices,sortByFilters,sizes } from '../services/filter';
import Filter from './Filter'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import { Product } from '../interfaces/Product'
import { Link } from 'react-router-dom'

interface Props{
    category: 'men' | 'women' | 'junior boys' | 'junior girls' | 'toddler boys' | 'toddler girls'
}

const ProductListPage = ({ category }:Props) => {
    const [productType,setProductType] = useState<string[]>()
    const [open, setOpen] =  useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [type,setType] = useState<string>(category)
    useEffect(()=>{
        setType(category)
    },[category])
    const [activeFilter,setActiveFilter] = useState<string | null>(null)
    const [filters,setFilters] = useState<{label:string,value:string}[]>([])
    const [products,setProducts] = useState<Product[]>()
    const sizeFilters = filters.map(filter=>sizes.map(size=>size.value).includes(filter.value) ? filter.value : null)
    const colorFilters = filters.map(filter=>colors.map(color=>color.value).includes(filter.value) ? filter.value : null)
    const priceFilters = filters.map(filter=>prices.map(price=>price.value).includes(filter.value) ? filter.value : null)
    .join('-')
    .split('-')
    .map(value=> value=='' ? NaN : value == 'Infinity' ? Infinity : parseFloat(value) )
    .filter(value=>!Number.isNaN(value))
    
    const [currentSortBy,setCurrentSortBy] = useState<string>('')

    const handleChangeFilters = (obj:{label:string,value:string})=>{
        console.log(obj)
        const foundFilter = filters.find(filter=>filter.value == obj.value)
        if(foundFilter){
            setFilters(filters.filter(filter=> filter.value != obj.value ))
            return
        }
        setFilters([...filters,obj])
    }
    const handleChangeSort = (value:string)=>{
        setCurrentSortBy(value)
    }

    useEffect(()=>{
        axios.get<Product[]>('http://localhost:3000/api/products',{ params:{ category,types:productType,sort_by:currentSortBy,sizeFilters,colorFilters,priceFilters } }).then(res=>setProducts(res.data))
    },[currentSortBy,filters,category,productType])


    return (
        <>
        <Container fixed sx={{marginY:5}}>
            <Stack direction='row' spacing={2} overflow={'auto'}>
                <Box onClick={()=>setCurrentSortBy('-createdAt')}  sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={newArrivals} alt="New Arrivals" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>New Arrivals</Typography>
                </Box>
                <Box onClick={()=>setProductType(['graphic-tees'])}  sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={tees} alt="Graphic tees" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Graphic tees</Typography>
                </Box>
                <Box onClick={()=>setProductType(['polos'])} sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={polos} alt="Polos" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Polos</Typography>
                </Box>
                <Box onClick={()=>setProductType(['shirts','flannels'])} sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={shirts} alt="Shirts & Flannels" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Shirts & Flannels</Typography>
                </Box>
                <Box onClick={()=>setProductType(['hoodies','sweatshirts'])} sx={{ cursor:'pointer' }}> 
                    <img width={'120px'}  src={hoodies} alt="Hoodies & SweatShirts" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Hoodies & SweatShirts</Typography>
                </Box>
                <Box onClick={()=>setProductType(['jeans'])} sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={jeans} alt="Jeans" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Jeans</Typography>
                </Box>
                <Box onClick={()=>setProductType(['joggers','sweatpants'])} sx={{ cursor:'pointer' }}> 
                    <img width={'120px'}  src={joggers} alt="Joggers & Sweatpants" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Joggers & Sweatpants</Typography>
                </Box>
                <Box onClick={()=>setProductType(['underwear'])} sx={{ cursor:'pointer' }}>
                    <img width={'120px'}  src={under} alt="Underwear" />
                    <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Underwear</Typography>
                </Box>
            </Stack>
            <Stack spacing={1} marginY={1} direction='row' justifyContent={'flex-start'} alignItems={'center'}>
                <Link to='/'>
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            '&:hover':{
                                textDecoration:'underline'
                            },
                            cursor:'pointer'
                        }}>Home
                    </Typography>
                </Link>
                <Typography variant='caption' sx={{
                        color:'var(--link)',
                        '&:hover':{
                            
                            textDecoration:'underline'

                        },
                        cursor:'pointer'
                    }}>&gt;</Typography>
                <Link to='/'>
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            '&:hover':{
                    
                                textDecoration:'underline'
                            },
                            cursor:'pointer'
                        }}>Dapperlane
                        </Typography>
                </Link>
                <Typography variant='caption' sx={{
                        color:'var(--link)',
                        '&:hover':{
                            
                            textDecoration:'underline'

                        },
                        cursor:'pointer'
                    }}>&gt;</Typography>
                
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            textTransform:'capitalize',
                        }}>{category}</Typography>
                
            </Stack>
            <Grid columnSpacing={7} container>
                    <Grid item md={3} display={{xs:'none',md:'block'}} >
                        <Box>
                            <CategoryComponent 
                            type={type} 
                            handleChangeProducts={setProducts} 
                            sort_by={currentSortBy} 
                            sizeFilters={sizeFilters}
                            colorFilters={colorFilters}
                            priceFilters={priceFilters}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={12}>
                        <Box>
                            <Typography variant='h4' textTransform={'uppercase'}>{type}</Typography>
                            <SizeComponent filters={filters} type={type} onHandleFilters={handleChangeFilters} />
                            <Stack direction={'row'} spacing={4} marginY={2}>
                                <SizeFilter selectedSortBy={currentSortBy} changeSelectedSort={handleChangeSort} filter={sortByFilters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                <Filter filterType='color' onHandleFilters={handleChangeFilters} filter={colors} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                <Filter filterType='size' onHandleFilters={handleChangeFilters} filter={sizes} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                <Filter filterType='price' onHandleFilters={handleChangeFilters} filter={prices} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                            </Stack>
                            {
                                filters.length > 0 && 
                                <Stack marginY={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                    <Stack direction={'row'} spacing={2}>
                                        <Typography whiteSpace={'nowrap'}>Selected Filters </Typography>
                                        <Stack direction={'row'} flexWrap={'wrap'} rowGap={1} spacing={1}>
                                        {filters.map((filter,index)=>
                                            <Button 
                                                onClick={()=>handleChangeFilters(filter)}
                                                key={index}
                                                disableRipple 
                                                sx={
                                                    {   
                                                        border:'1px solid var(--border)',
                                                        fontSize:'12px',
                                                        borderRadius:0,
                                                        color:'var(--black)', 
                                                        paddingY: 0,
                                                        paddingX:0.5,
                                                        justifyContent:'space-evenly',
                                                        '&:hover': { 
                                                            background: 'none'
                                                        } 
                                                    }
                                                }
                                            >
                                                <Typography marginRight={0.2} fontSize='12px'>{filter.label} </Typography>
                                            
                                                <ClearIcon sx={{color:'var(--black)',fontSize:'12px'}}  />
                                            </Button>
                                        )}
                                        </Stack>
                                    </Stack>
                                    <Button 
                                        
                                        onClick={()=>setFilters([])}
                                        sx={{
                                            textDecoration:'underline',
                                            cursor:'pointer',
                                            color:'var(--link)',
                                            whiteSpace:'nowrap',
                                            '&:hover': { 
                                                background: 'none',
                                                textDecoration:'underline',
                                            } 
                                        }}
                                        >Clear Filters</Button>
                                
                                </Stack>
                            }
                            
                        </Box>
                        <ProductListGrid products={products} category={category} handleOpen={handleOpen} handleClose={handleClose} open={open} />
                    </Grid>
            </Grid>
        </Container>
        
        </>
    )
}

export default ProductListPage