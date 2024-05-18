
import {  Badge, Button, IconButton, Stack, TextField, Typography,InputAdornment } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search';
import icon from '../../public/icon.png'
import { Link } from 'react-router-dom'


const NavBar = () => {
    return (
        <>
        <Stack paddingBottom={1} direction='row' justifyContent={'space-around'} alignItems='center' borderBottom={'1px solid lightgrey'}>
            <TextField sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                },
            }} label="What are you looking for" size='small' color='secondary' InputProps={{
                endAdornment: <InputAdornment position='end'> <SearchIcon /> </InputAdornment>
            }} />
            <Stack direction='row'  alignItems='center'>
                <img  src={icon} width={'100px'} height='80px' />
                <Typography variant='h6'>AHSAN & USAMA's</Typography>  
            </Stack> 
            
            <Stack direction='row' paddingRight={4}>
                <Button color='secondary'>Login</Button>
                <IconButton>
                    <FavoriteIcon style={{color:'#000'}} />
                </IconButton>
                <IconButton>
                <Badge badgeContent={1} color="secondary">
                    <ShoppingCartIcon style={{color:'#000'}} />
                </Badge>
                </IconButton>
                
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
                
            </Stack> 
        </>
    )
}

export default NavBar