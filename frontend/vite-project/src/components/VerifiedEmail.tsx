import { Box, Container, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const VerifiedEmail = () => {
    const [searchParams] = useSearchParams()
    
    const [token,setToken] = useState("")

    const verifyUserEmail = ()=>{
        console.log(token)
        return axios.post(`http://localhost:3000/api/verifyEmail`,{token})
    }
    useEffect(()=>{
        const token = searchParams.get('token')
        setToken(token || "")
    },[])
    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return (
        <Container fixed sx={{marginY:5}}>
        <Box display={'inline-flex'}   sx={{
        width:'100%',
        background:'green',
        padding:'5px 10px',
        color:'var(--white)',
        alignItems:'center',
        textTransform:'capitalize',
        gap:1,
        marginY:5
        }} >
        
            <CheckCircleOutlineIcon sx={{color:'white',width:30,height:30}} />
            <Typography>Welcome to Dapperlane Outfitters PAK.</Typography>
        </Box>
        <Box paddingX={8}>
            <Typography variant='h5' marginBottom={2} paddingY={0.5} borderBottom={'1px solid var(--border)'}>Email Verification Done</Typography>
            <Stack spacing={2} sx={{color:'var(--link)'}}>
                <Typography>You're done.</Typography>
                <Typography><a style={{color:'rgb(168, 168, 168) !important'}} href="/signin">Sign In</a> to purchase and view exciting products.</Typography>
            </Stack>
        </Box>
        </Container>
    
    )
}

export default VerifiedEmail