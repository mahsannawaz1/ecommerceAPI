
import { Box } from '@mui/material'
import Banner from './Banner'
import Season from './Season'

const Main = () => {
    return (
        <Box paddingX={{
            base:0,
            lg:10
        }}>
            <Banner />
            <Season />
        </Box>
        
    )
}

export default Main