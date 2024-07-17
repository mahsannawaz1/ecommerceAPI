import { Box, IconButton, Stack, Typography } from '@mui/material'
import  { ChangeEvent, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyOrders = () => {
    const [filter, setFilter] = useState('All Orders');
    const [selectedOption, setSelectedOption] = useState('');


    const handleSelectChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const { data:orders } = useQuery({
        queryKey:['orders'],
        queryFn:()=> axios.get('http://localhost:3000/api/orders',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
            }
        }).then(res=>res.data)
    })
    console.log(orders)

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