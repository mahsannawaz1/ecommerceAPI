import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Tooltip, Typography } from '@mui/material'

import { CartItem } from './Cart'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Fragment, useEffect, useReducer, useState } from 'react';
import AddressBookModal from './AddressBookModal';
import axios from 'axios';
import User from '../interfaces/User';
import userReducer from '../reducers/userReducer';
import UserContext from '../contexts/userContext';
import stripeIcon from '../../public/stripe.svg'
import cashIcon from '../../public/cash.svg'
import paypalIcon from '../../public/paypal.svg'
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
    const [deliveryMethod,setDeliveryMethod] = useState<'home' | 'pickup'>('home')
    const [paymentMethod,setPaymentMethod] = useState<'stripe' | 'paypal' | 'cod'>('stripe')
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
    },[userWithAddress])

    return (
        <UserContext.Provider value={{user,dispatch}}>
            <Container fixed sx={{marginY:5}} >
                <Stack direction={'row'} spacing={10}>
                    <Stack sx={{width:'50%'}} spacing={2}>
                        <Stack>
                            <Typography marginY={1} variant='h6'>Delivery Method</Typography>
                            <Stack sx={{width:'100%'}} >
                                <Box >
                                    <FormControl sx={{width:'100%'}} >
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="home"
                                            name="radio-buttons-group"
                                        >
                                            <Stack direction={'row'} sx={{background:'var(--border)',padding:'5px 15px',marginBottom:0.5}} >
                                                <FormControlLabel value="home" control={<Radio disableRipple onClick={()=>setDeliveryMethod('home')} color='success' />} label="" />
                                                <Stack direction={'row'} spacing={2}>
                                                    <LocalShippingOutlinedIcon sx={{fontSize:40}} />
                                                    <Box>
                                                    <Typography sx={{fontSize:14}}>Home Delivery</Typography>
                                                    <Typography sx={{color:'var(--link)',fontSize:14}}>Free Delivery On Orders Above Rs 2990/-</Typography>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                            <Stack direction={'row'} sx={{background:'var(--border)',padding:'5px 15px'}}>
                                                <FormControlLabel value="pickup" control={<Radio disableRipple onClick={()=>setDeliveryMethod('pickup')} color='success' />} label="" />
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
                            </Stack>
                        </Stack>
                        {deliveryMethod=='home' ?
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
                        :
                        <Stack>
                            <Typography marginY={1} variant='h6'>Collection Store</Typography>
                                <Button
                                disableRipple
                                sx={{
                                    color:'var(--black)',
                                    border:'1px solid black',
                                    borderRadius:0,
                                    width:'100%',
                                    justifyContent:'space-around',
                                }}>
                                    select your preferred collection store
                                    <ArrowForwardIcon className='animate-forward-arrow' />
                                </Button>
                        </Stack>
                        }
                        <Stack>
                            <Typography marginY={1} variant='h6'>Payment Methods</Typography>
                            <FormControl sx={{width:'100%'}} >
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="stripe"
                                    name="radio-buttons-group"
                                >
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{background:'var(--border)',padding:'5px 15px',marginBottom:0.5}} >
                                        <Stack direction={'row'}>
                                            <FormControlLabel value="stripe" control={<Radio disableRipple onClick={()=>setPaymentMethod('stripe')} color='success' />} label="" />
                                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                                <Typography sx={{fontSize:14}}>Checkout with Stripe</Typography>
                                            </Stack>
                                        </Stack>
                                        <Box sx={{transform:'translateX(10px)'}}>
                                            <img src={stripeIcon} height={40} />
                                        </Box>  
                                    </Stack>
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{background:'var(--border)',padding:'5px 15px',marginBottom:0.5}}>
                                        <Stack direction={'row'}>
                                            <FormControlLabel value="paypal" control={<Radio disableRipple onClick={()=>setPaymentMethod('paypal')} color='success' />} label="" />
                                            <Stack direction={'row'}  alignItems={'center'}  spacing={2}>
                                                <Typography sx={{fontSize:14}}>Pay with Paypal</Typography>
                                            </Stack>
                                        </Stack>
                                        <Box>
                                            <img src={paypalIcon} height={40} />   
                                        </Box>
                                    </Stack>
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{background:'var(--border)',padding:'5px 15px'}}>
                                        <Stack direction={'row'}>
                                            <FormControlLabel value="cod" control={<Radio disableRipple onClick={()=>setPaymentMethod('cod')} color='success' />} label="" />
                                            <Stack direction={'row'}  alignItems={'center'}  spacing={2}>
                                                <Typography sx={{fontSize:14}}>Cash on Delivery (COD)</Typography>
                                            </Stack>
                                        </Stack>
                                        <Box>
                                            <img src={cashIcon} height={40} />  
                                        </Box>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <Typography>I confirm that I have read and accept the 
                                <Link className='bold-link' to='/'> privacy policy</Link> and 
                                <Link className='bold-link' to='/'> terms & conditions</Link> of purchase,
                                read our <Link className='bold-link' to='/'> returns & refunds</Link> Page.
                            </Typography>
                            <Button
                                type='submit' 
                                sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                marginY:2,
                                paddingX:7,
                                width:location.href == 'http://localhost:5173/cart' ? '100%' : 'initial',
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                                }
                                }}
                            >Complete purchase</Button>
                        </Stack>
                    </Stack>
                    <Box sx={{width:'50%'}} paddingX={5} marginTop={2}>
                        <Typography variant='h6' marginY={1}>Order Summary 
                            (<Typography sx={{color:cartItems.length == 0 ? 'red' : 'green',fontSize:18}} component={'span'} fontWeight={'bold'}>{cartItems.length}</Typography> Items)
                        </Typography>
                        <Stack spacing={2} sx={{background:'var(--border)',maxHeight:300,overflowY:'auto',padding:2}}>
                        {cartItems.map((cartItem)=>
                        
                            <Box display='flex' gap={2} sx={{background:'var(--white)',padding:2,paddingBottom:3}}>
                                <Box>
                                    <img src={cartItem.product.image} width={'87px'} height={'111px'}  />
                                </Box>
                                <Box>
                                    <Link to={`/dapperlane/${cartItem.product.id}`}>
                                        <Typography textTransform={'lowercase'} fontSize={14} whiteSpace={'wrap'}>{cartItem.product.name}</Typography>
                                    </Link>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                        <Typography fontSize={14} sx={{ textDecoration: 'line-through' }}>PKR {cartItem.unit_price.toLocaleString()}</Typography>
                                        <Typography fontSize={14} color='error'>PKR {cartItem.unit_price.toLocaleString()}</Typography>
                                    </Stack>
                                    <Box display={'inline-flex'} alignItems={'center'} padding={0.3} sx={{ background: '#d32f2f', color: 'var(--white)', fontSize: 11 }} component={'span'}>(SAVE 40%)</Box>
                                    <Box marginTop={1}>
                                        <Typography sx={{ color: 'var(--link)', fontSize: 12 }}>Color: {cartItem.product.color}</Typography>
                                        <Typography sx={{ color: 'var(--link)', fontSize: 12 }}>Size:{ cartItem.product.size}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        </Stack>
                        <Stack >
                            <Box padding={2}>
                                <Stack direction='row' justifyContent={'space-between'}>
                                    <Typography>Subtotal</Typography>
                                    <Typography>PKR {total.toLocaleString()}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'} >
                                    <Typography >Delivery</Typography>
                                    <Typography >FREE</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'} >
                                { paymentMethod=='cod' && 
                                <Fragment>
                                    <Stack className="cod-tooltip" direction='row' alignItems={'cen'} spacing={0.5}>
                                        <Typography >Cash on delivery service charge </Typography>
                                        <Tooltip arrow title='The cash on delivery option is subject to
                                        an additional service charge of PKR 500 per order.'>
                                            <InfoOutlinedIcon color='info' className='cursor-pointer' />
                                        </Tooltip>
                                    </Stack>
                                    <Typography >PKR 500</Typography>
                                </Fragment>
                                    }
                                    
                                
                            </Stack>
                        
                            <Box sx={{background:'var(--link)',height:'1px',marginTop:1,marginBottom:2}}></Box>
                            <Stack direction='row' justifyContent={'space-between'} >
                                    <Typography variant="h6">Order Total</Typography>
                                    <Typography variant="h6">PKR {total.toLocaleString()}</Typography>
                            </Stack>
                            <Typography variant="body2">Inclusive of VAT</Typography>
                            
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
                <AddressBookModal user={userWithAddress} onChangeUser={changeUserWithAddress}  open={open} handleClose={handleClose} />
            </Container>
        </UserContext.Provider>
    )
}

export default CheckoutDelivery