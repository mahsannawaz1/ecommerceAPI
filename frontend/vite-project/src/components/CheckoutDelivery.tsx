import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'

import { CartItem } from './Cart'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useReducer, useState } from 'react';
import AddressBookModal from './AddressBookModal';
import axios from 'axios';
import User from '../interfaces/User';
import userReducer from '../reducers/userReducer';
import UserContext from '../contexts/userContext';

interface Props{
    cartItems:CartItem[],
    total:number,
    onHandlePhaseChange:(value:number)=>void
}
const CheckoutDelivery = ({cartItems,total,onHandlePhaseChange}:Props) => {
    const [user,dispatch] = useReducer(userReducer,{} as User)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userWithAddress,setUserWithAddress] = useState<User | null>(null)
    const changeUserWithAddress = (user:User | null) =>{
        setUserWithAddress(user)
    }
    useEffect(()=>{
        axios.get<User>('http://localhost:3000/api/userDetails',
            {
                headers:
                {
                'Authorization':`Bearer ${localStorage.getItem('Authorization')}`
                }
            }
        )
        .then(res=>
            {
                dispatch({type:'SET',user:{
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    phone:res.data.phone,
                    email:res.data.email,
                    shippingAddress:{
                        city:res.data.shippingAddress.city,
                        area:res.data.shippingAddress.area,
                        address:res.data.shippingAddress.address,
                        country:res.data.shippingAddress.country
                    }
                }})
        })
    },[])

    return (
        <UserContext.Provider value={{user,dispatch}}>
            <Container fixed sx={{marginY:5}} >
                <Stack direction={'row'} spacing={10} marginY={3}>
                    <Box sx={{width:'50%'}} marginTop={2}>
                        <Typography marginY={1} variant='h6'>Delivery Method</Typography>
                        <Stack sx={{width:'100%'}} >
                            <Box >
                                <FormControl sx={{width:'100%'}} >
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="delivery"
                                        name="radio-buttons-group"
                                    >
                                        <Stack direction={'row'} sx={{background:'var(--border)',padding:'5px 15px',marginBottom:0.5}} >
                                            <FormControlLabel value="delivery" control={<Radio disableRipple color='success' />} label="" />
                                            <Stack direction={'row'} spacing={2}>
                                                <LocalShippingOutlinedIcon sx={{fontSize:40}} />
                                                <Box>
                                                <Typography sx={{fontSize:14}}>Home Delivery</Typography>
                                                <Typography sx={{color:'var(--link)',fontSize:14}}>Free Delivery On Orders Above Rs 2990/-</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'} sx={{background:'var(--border)',padding:'5px 15px'}}>
                                            <FormControlLabel value="pickup" control={<Radio disableRipple color='success' />} label="" />
                                            <Stack direction={'row'} spacing={2}>
                                                <ShoppingBagOutlinedIcon sx={{fontSize:40}} />
                                                <Box>
                                                <Typography sx={{fontSize:14}}>Click & Collect</Typography>
                                                <Typography sx={{color:'var(--link)',fontSize:14}}>Click & Collect Is Currently Available</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box>
                            <FormControl>
            
            
                            </FormControl>
                            </Box>
                        </Stack>
                        <Stack>
                            <Typography marginY={1} variant='h6'>Delivery Information</Typography>
                            {user.shippingAddress == null ? 
                            <Button
                            disableRipple
                            onClick={handleOpen}
                            sx={{
                                color:'var(--black)',
                                border:'1px solid black',
                                borderRadius:0,
                                justifyContent:'space-around',
                            }}>
                                please add your contact details and address.
                                <ArrowForwardIcon className='animate-forward-arrow' />
                            </Button> :
                            <Stack sx={{background:'var(--border)',padding:'5px 15px'}} spacing={1} >
                                <Stack direction={'row'} spacing={2.5} justifyContent={'space-between'} alignItems={'center'} sx={{paddingBottom:0.5}} borderBottom={'1px solid var(--border)'}>
                                    <Box>
                                    <Typography sx={{fontSize:14}}>{user.firstName} {user.lastName}</Typography>
                                    <Typography sx={{color:'var(--link)',fontSize:14}}>+92{user.phone} </Typography>
                                    <Typography sx={{color:'var(--link)',fontSize:14}}>
                                        {user.shippingAddress.address},{user.shippingAddress.area},{user.shippingAddress.city},{user.shippingAddress.country} 54000
                                        </Typography>
                                    </Box>
                                    <Box>
                                    <Button
                                        disableRipple
                                        onClick={handleOpen}
                                        sx={{
                                            color:'var(--black)',
                                            border:'1px solid black',
                                            borderRadius:'5px',
                                            textTransform:'capitalize',
                                            justifyContent:'space-around',
                                            whiteSpace:'nowrap',
                                            paddingX:2,
                                        }}>
                                            Change
                                        </Button>
                                    </Box>
                                </Stack>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Box>
                                    <Typography sx={{fontSize:14}}>Standard Delivery</Typography>
                                    <Typography sx={{color:'var(--link)',fontSize:14}}>Delivered Within 1-3 Days</Typography>
                                    </Box>
                                    <Box>
                                    <Typography sx={{color:'var(--link)',fontSize:14}}>FREE</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            }
                            
                        </Stack>
                    </Box>
                    <Box sx={{width:'50%'}} marginTop={2}>
                    <Typography variant='h6' marginY={1}>Order Summary (<Typography sx={{color:cartItems.length == 0 ? 'red' : 'green',fontSize:18}} component={'span'} fontWeight={'bold'}>{cartItems.length}</Typography> Items)</Typography>
                    </Box>
                </Stack>
                <AddressBookModal user={userWithAddress} onChangeUser={changeUserWithAddress}  open={open} handleClose={handleClose} />
            </Container>
        </UserContext.Provider>
    )
}

export default CheckoutDelivery