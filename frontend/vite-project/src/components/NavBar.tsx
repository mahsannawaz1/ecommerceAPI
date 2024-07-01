
import {  Badge, Button, IconButton, Stack, TextField, Typography,InputAdornment } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search';
import icon from '../../public/icon.png'
import Dilevery from './Dilevery'
import { Link } from 'react-router-dom';
import userAuth from '../hooks/userAuth';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';


const NavBar = () => {
    const token = userAuth()
    const [isUser,setIsUser] = useState('')
    const onLogout = ()=>{
        if(token){
            localStorage.removeItem('Authorization')
            setIsUser('')
        }     
    }
    useEffect(()=>{ 
        const token = userAuth()
        if(token)
            setIsUser(token)
    },[isUser])
    return (
        <>
        <Stack paddingBottom={1} direction='row' justifyContent={'space-around'} alignItems='center' borderBottom={'1px solid lightgrey'}>
            <TextField sx={{
                
                '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    
                },
            }} label="What are you looking for" size='small'  color='success' InputProps={{
                endAdornment: <InputAdornment position='end'> <SearchIcon /> </InputAdornment>
            }} />
            <Stack direction='row'  alignItems='center'>
                <img  src={icon} width={'100px'} height='80px' />
                <Typography textTransform={'uppercase'} variant='h6'>DAPPERLANE</Typography>  
            </Stack> 
            
            <Stack direction='row' paddingRight={4} spacing={1}>

                    
                    { !isUser && <Fragment>
                        <Link to='/signup'>
                            <Button disableRipple
                            sx={{
                        
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:4,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                            }
                            }}>Create an account
                            </Button>
                        </Link>
                        <Link to='/signin'>
                            <Button disableRipple
                            sx={{
                        
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:4,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                            }
                            }}>Login
                            </Button>
                        </Link>
                    </Fragment> }
                    { isUser && <Fragment>
                        <Link to='/profile'>
                            <Button disableRipple
                            sx={{
                        
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:4,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                            }
                            }}>Profile
                            </Button>
                        </Link>
                        <Link to='/signin'>
                            <Button onClick={onLogout} disableRipple
                            sx={{
                        
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:4,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                            }
                            }}>Logout
                            </Button>
                        </Link>
                    </Fragment> }
                <IconButton>
                    <FavoriteIcon style={{color:'#000'}} />
                </IconButton>
                <Link to="/cart">
                    <IconButton >
                    <Badge badgeContent={1} color="success">
                        <ShoppingCartIcon style={{color:'#000'}} />
                    </Badge>
                    </IconButton>
                </Link>
                
            </Stack>
        </Stack>
        <Stack direction='row' spacing={4} marginY={2} justifyContent='center' >
            
                <Typography variant='body2' sx={{
                    '&:hover':{
                        borderBottom:'1px solid black',
                        cursor:'pointer'

                    },
                    
                }}>Spring Refresh</Typography>
                <Typography variant='body2' sx={{
                    '&:hover':{
                        borderBottom:'1px solid black',

                    },
                    cursor:'pointer'
                }}>Men</Typography>
                <Typography variant='body2' sx={{
                    '&:hover':{
                        borderBottom:'1px solid black',

                    },
                    cursor:'pointer'
                }}>Women</Typography>
                <Typography variant='body2' sx={{
                    '&:hover':{
                        borderBottom:'1px solid black',

                    },
                    cursor:'pointer'
                }}>Boys</Typography>
                <Typography variant='body2' sx={{
                    borderBottom: '1px solid transparent',
                    fontWeight:'normal',
                    '&:hover':{
                        borderBottom:'1px solid black',
                        cursor:'pointer'
                    },

                }}>Girls</Typography>
                <Typography  variant='body2' sx={{
                    
                    borderBottom: '1px solid transparent',
                    fontWeight:'normal',
                    '&:hover':{
                        borderBottom:'1px solid black',
                        cursor:'pointer'
                    },

                }}>Accessories</Typography>
                
                <Typography color='error' variant='body2' sx={{
                    
                    borderBottom: '1px solid transparent',
                    fontWeight:'normal',
                    '&:hover':{
                        borderBottom:'1px solid #f44336',
                        cursor:'pointer'
                    },

                }}>Clearance</Typography>
                
            </Stack> 
            <Dilevery />
            
        </>
    )
}

export default NavBar