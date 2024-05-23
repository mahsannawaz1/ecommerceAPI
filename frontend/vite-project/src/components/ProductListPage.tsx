import { Stack,Grid,Box, Typography, Button, IconButton } from '@mui/material'
import newArrivals from '../../public/newArrivals.png'
import tees from '../../public/teesAvatar.png'
import hoodies from '../../public/hoodiesAvatar.png'
import joggers from '../../public/joggerAvatar.png'
import shirts from '../../public/shirtAvatar.png'
import jeans from '../../public/jeansAvatar.png'
import under from '../../public/underAvatar.png'
import polos from '../../public/polosAvatar.png'
import { useState } from 'react'
import CategoryComponent from './CategoryComponent'
import SizeComponent from './SizeComponent'
import ProductListGrid from './ProductListGrid'
import SizeFilter from './SizeFilter'
import { colors,prices,sortBy,sizes } from '../services/filter';
import Filter from './Filter'
import ClearIcon from '@mui/icons-material/Clear';


const ProductListPage = () => {
    const [type,setType] = useState<string>('men')
    const [activeFilter,setActiveFilter] = useState<string | null>(null)
    const [filters,setFilters] = useState<{label:string,value:string}[]>([])
    console.log(filters)
    const handleChangeFilters = (obj:{label:string,value:string})=>{
        console.log(obj)
        const foundFilter = filters.find(filter=>filter.value == obj.value)
        if(foundFilter){
            setFilters(filters.filter(filter=> filter.value != obj.value ))
            return
        }
        setFilters([...filters,obj])
    }
    return (
        <Stack>
        <Stack direction='row'  spacing={2}>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={newArrivals} alt="New Arrivals" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>New Arrivals</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={tees} alt="Graphic tees" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Graphic tees</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={polos} alt="Polos" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Polos</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={shirts} alt="Shirts & Flannels" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Shirts & Flannels</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={hoodies} alt="Hoodies & SweatShirts" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Hoodies & SweatShirts</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={jeans} alt="Jeans" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Jeans</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={joggers} alt="Joggers & Sweatpants" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Joggers & Sweatpants</Typography>
            </Box>
            <Box  sx={{ cursor:'pointer' }}>
                <img width={'120px'}  src={under} alt="Underwear" />
                <Typography textAlign={'center'} width='100px' whiteSpace={'wrap'} lineHeight={1.2} variant='body2'>Underwear</Typography>
            </Box>
        </Stack>
        <Stack spacing={1} direction='row' justifyContent={'flex-start'} alignItems={'center'}>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>Home </Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>&gt;</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>American Eagle</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>&gt;</Typography>
            <Typography variant='caption' sx={{
                    color:'var(--link)',
                    '&:hover':{
                        
                        textDecoration:'underline'

                    },
                    cursor:'pointer'
                }}>Men</Typography>
        </Stack>
        <Grid container>
                <Grid item md={2}>
                    <Box>
                        <CategoryComponent type={type} />
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <Box>
                        <Typography variant='h4' textTransform={'uppercase'}>{type}</Typography>
                        <SizeComponent type={type} />
                        <Stack direction={'row'} spacing={4} marginY={2}>
                            <SizeFilter filter={sortBy} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                            <Filter filterType='color' onHandleFilters={handleChangeFilters} filter={colors} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                            <Filter filterType='size' onHandleFilters={handleChangeFilters} filter={sizes} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                            <Filter filterType='price' onHandleFilters={handleChangeFilters} filter={prices} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                        </Stack>
                        {
                            filters.length > 0 && 
                            <Stack marginY={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <Stack direction={'row'} spacing={1}>
                                    <Typography>Selected Filters </Typography>
                                    <Stack direction={'row'} spacing={1}>
                                    {filters.map((filter,index)=>
                                        <Button 
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
                                        
                                            <ClearIcon onClick={()=>handleChangeFilters(filter)} sx={{color:'var(--black)',fontSize:'12px'}}  />
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
                                        '&:hover': { 
                                            background: 'none',
                                            textDecoration:'underline',
                                        } 
                                    }}
                                    >Clear Filters</Button>
                            
                        </Stack>
                        }
                        
                    </Box>
                    <ProductListGrid />
                </Grid>
        </Grid>
        </Stack>
    )
}

export default ProductListPage