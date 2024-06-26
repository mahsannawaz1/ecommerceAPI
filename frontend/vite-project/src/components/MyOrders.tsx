import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const MyOrders = () => {
    const [filter, setFilter] = useState('All Orders');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };
    return (
        <Stack spacing={4}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2} paddingBottom={1.5} borderBottom={'1px solid var(--border)'}>
                    <Typography variant='h5' >My Orders</Typography>
                    <Box position={'relative'}>
                        <input type="text" className='order-input' placeholder='ID, name, SKU' />
                        <IconButton disableRipple  sx={{position:'absolute',top:0,right:0}}>
                        <SearchOutlinedIcon  />
                        </IconButton>
                    </Box>
                </Stack>
                <Box >
                    <Typography marginBottom={2}  variant='h6' borderBottom={'1px solid var(--border)'} paddingBottom={0.5}>Recent Orders</Typography>
                    <Stack>
                        <Typography textAlign='center' fontWeight={550}  fontSize={14} >You haven’t ordered anything recently.</Typography>
                        
                    </Stack>
            </Box>
        </Stack>
    )
}

export default MyOrders