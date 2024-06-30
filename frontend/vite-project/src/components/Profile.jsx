import React,{useEffect} from 'react'
import {Container, Grid,Stack,Typography,Box} from '@mui/material'
import ProfileLinks from '../components/ProfileLinks'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Profile = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const user = useAuth()
        if(!user){
            navigate('/signin')
        }
    },[])

    return (
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
    )
}

export default Profile