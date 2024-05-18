
import { Box } from '@mui/material'
import Banner from './Banner'
import SeasonBanner from './SeasonBanner'
import ClothingBanner from './ClothingBanner'


const Main = () => {
    return (
        <Box paddingX={{
            base:0,
            lg:10
        }}>
            <Banner />
            <SeasonBanner />
            <ClothingBanner  type='b_baggy' />
            <ClothingBanner  type='b_relaxed'/>
            <ClothingBanner  type='t_women'/>
            <ClothingBanner  type='t_men'/>
            
        </Box>
        
    )
}

export default Main