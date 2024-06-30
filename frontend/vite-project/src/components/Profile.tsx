import {useEffect, useReducer} from 'react'
import {Container, Grid,Stack,Typography,Box} from '@mui/material'
import ProfileLinks from './ProfileLinks'
import { Outlet } from 'react-router-dom'
import userReducer from '../reducers/userReducer'
import User from '../interfaces/User'
import UserContext from '../contexts/userContext'
import axios from 'axios'

const Profile = () => {
    
    const [user,dispatch] = useReducer(userReducer,{} as User)
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
        <UserContext.Provider value={{user}}>
            <Container fixed sx={{marginY:5}}>
                <Stack spacing={1} marginTop={1} marginBottom={6} direction='row' justifyContent={'flex-start'} alignItems={'center'}>
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            '&:hover':{
            
                                textDecoration:'underline'
                            },
                            cursor:'pointer'
                        }}>Home </Typography>
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            '&:hover':{
            
                                textDecoration:'underline'
                            },
                            cursor:'pointer'
                        }}>&gt;</Typography>
                    <Typography variant='caption' sx={{
                            color:'var(--link)',
                            '&:hover':{
            
                                textDecoration:'underline'
                            },
                            cursor:'pointer'
                        }}>My Account</Typography>
                </Stack>
                <Grid container>
                    <Grid item md={3} display={{xs:'none',md:'block'}} >
                        <Box>
                            <ProfileLinks />
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={12}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        </UserContext.Provider>
    )
}

export default Profile