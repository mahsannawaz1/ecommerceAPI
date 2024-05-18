
import { Box } from '@mui/material'
import Banner from './Banner'
import SeasonBanner from './SeasonBanner'
import ClothingBanner from './ClothingBanner'
import FitBanner from './FitBanner'
import ShopCarousel from './ShopCarousel'


const Main = () => {
    return (
        <Box>
            <Banner />
            <SeasonBanner />
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