
import { Box } from '@mui/material'
import SeasonBanner from './SeasonBanner'
import ClothingBanner from './ClothingBanner'
import FitBanner from './FitBanner'
import ShopCarousel from './ShopCarousel'
import TrendingProducts from './TrendingProducts'


const Main = () => {
    return (
        <Box>
            <SeasonBanner />
            <TrendingProducts />
            <ClothingBanner  type='b_baggy' />
            <ClothingBanner  type='b_relaxed'/>
            <ClothingBanner  type='t_women'/>
            <ClothingBanner  type='t_men'/>
            <FitBanner />
            <ShopCarousel />
        </Box>
        
    )
}

export default Main