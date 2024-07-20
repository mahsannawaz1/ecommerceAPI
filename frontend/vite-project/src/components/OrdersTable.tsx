import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Order from '../interfaces/Order'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment } from 'react';

interface Props{
    limit?:number;
    
}

const OrdersTable = ({limit}:Props) => {
    const { data:orders } = useQuery({
        queryKey:['orders'],
        queryFn:()=> axios.get<Order[]>('http://localhost:3000/api/orders',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
            },
            params:{
                limit
            }
        }).then(res=>res.data)
    })
    return (
        <Fragment>
            <Stack>
                { orders?.length == 0 && <Typography textAlign='center' fontWeight={550}  fontSize={14} >You haven’t ordered anything recently.</Typography>}
                <TableContainer sx={{padding:2}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                    <TableCell align="center">Order#</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Products</TableCell>
                    <TableCell align="center">Qty Bought</TableCell>
                    <TableCell align="center">Total (PKR)</TableCell>
                    <TableCell align="center"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { orders?.map(({orderId,status,orderItems},index) => (
                        <TableRow
                        key={orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{status}</TableCell>
                            <TableCell align="center">{orderItems.length}</TableCell>
                            <TableCell align="center">{orderItems.reduce((acc,item)=>acc + item.qty,0)}</TableCell>
                            <TableCell align="center">Rs { Intl.NumberFormat().format(orderItems.reduce((acc,item)=>acc + item.product.price,0)) }/-</TableCell>
                            <TableCell align="center">
                                <Button
                                    sx={{
                                    background: 'var(--white)',
                                    color:'var(--black)',
                                    border:'1px solid black',
                                    borderRadius:0,
                                    textTransform:"capitalize",
            
                                    justifyContent:'flex-start',
                                    gap:1,
                                    '&:hover': {
                                        background: 'var(--white)',
                                        color:'var(--black)',
                                    }
                                    }}
                                >More Info</Button>
                            </TableCell>
            
            
                        </TableRow>
                    )) }
                    </TableBody>
                </Table>
                </TableContainer>
            </Stack>
            {orders?.length == 0 && <Stack direction='row' justifyContent={'center'}>
            <Button
            type='submit'
            sx={{
            background: 'var(--black)',
            color:'var(--white)',
            border:'1px solid black',
            borderRadius:0,
            paddingX:4,
            textTransform:'capitalize',
            '&:hover': {
                color:'var(--white)',
                background: 'var(--black)',
            }
            }}>Go Shopping</Button>
                </Stack>}
        </Fragment>
    )
}

export default OrdersTable