import { Box, Button,  Container, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import facebookLogo from '../../public/facebook-login-logo.svg'
import googleLogo from '../../public/google-login-logo.svg'
import userLogo from '../../public/profile-icon.svg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm }from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import CancelIcon from '@mui/icons-material/Cancel';
import axios, { AxiosHeaders } from 'axios'

interface LoginResponse{
    customer:{
        firstName:string,
        lastName:string,
    },
    token:string
}
interface LoginInputs{
    email:string,
    password:string
}

const schema = Joi.object({
    email:Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email Address is required.',
        'string.email': 'Email Address must be a valid email.'
    }),
    password:Joi.string().required().messages({
        'string.empty': 'Password is required.',
    })
})

const SignIn = () => {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const {register,handleSubmit,formState:{errors}} = useForm<LoginInputs>({resolver:joiResolver(schema)})

    const [showPass,setShowPass] = useState('Show')
    const onHandleSubmit = ({email,password}:LoginInputs)=>{
        axios.post<LoginResponse>(`http://localhost:3000/api/login`,{email,password}).then(res=>{
            const token = res.data.token
            localStorage.setItem('x-auth-token',token)
            navigate('/')
        })
        .catch(error=>setError(error.response.data.error))
    }
    return (
        <Container fixed sx={{marginY:5}}>
            {  error &&   
            <Box display={'inline-flex'}  sx={{
            width:'100%',
            bgcolor:'red',
            padding:'5px 10px',
            color:'var(--white)',
            alignItems:'center',
            textTransform:'capitalize',
            gap:1,
            marginY:5
            }} >
            {error && <CancelIcon sx={{color:'white',width:30,height:30}} />
            }
            
            <Typography>{error}</Typography>
            </Box>
            }
            <Typography variant='h5' paddingY={0.5} borderBottom={'1px solid var(--border)'}>Sign In</Typography>
            <Stack direction='row' spacing={10} marginTop={5}>
                <Box width={'50%'}  >
                    <Typography marginBottom={2} variant='h6' textTransform={'uppercase'}>SIGN in WITH EMAIL ADDRESS</Typography>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Stack spacing={2}>
                            <Stack spacing={1.5} >
                                <TextField {...register('email')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
                                {errors.email && <Typography color='error' fontSize={12}>{errors.email.message}</Typography>}
                                <TextField {...register('password')} type={showPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Password" size='small' InputProps={{
                                    endAdornment: <InputAdornment position='end'> <Box sx={{cursor:'pointer'}} onClick={()=>setShowPass(showPass == 'Show' ? 'Hide' : 'Show')}>{showPass}</Box> </InputAdornment>
                                }} />
                                {errors.password && <Typography color='error' fontSize={12}>{errors.password.message}</Typography>}
                            </Stack>
                            
                            <Box sx={{direction:'row',paddingTop:2,alignItems:'center'}} display={'flex'}    columnGap={5}>
                                <Button
                                type='submit' 
                                sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:7,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                                }
                                }}>Sign in</Button>
                                <Link style={{fontWeight:500,textDecoration:'none'}} to='/signin/forgotPassword'>Forgot password?</Link>
                            </Box>
                        </Stack>
                    </form>
                </Box>
                <Box sx={{Height:'100%',width:'1px',background:'var(--border)'}}></Box>
                <Box width={'50%'} >
                    <Typography marginBottom={2} variant='h6' textTransform={'uppercase'}>SIGN IN WITH SOCIAL MEDIA</Typography>
                    <Stack marginBottom={5} spacing={3}>
                        <Button
                            sx={{
                            background: 'var(--white)',
                            color:'var(--black)',
                            border:'1px solid black',
                            borderRadius:0,
                            textTransform:"capitalize",
                            width:"50%",
                            justifyContent:'flex-start',
                            gap:1,
                            '&:hover': {
                                background: 'var(--white)',
                                color:'var(--black)',
                            }
                            }}>
                                <img width={35} height={35} src={facebookLogo} />
                                Sign in with facebook
                        </Button>
                        <Link to='http://localhost:3000/api/auth/google'>
                            <Button
                                sx={{
                                background: 'var(--white)',
                                color:'var(--black)',
                                border:'1px solid black',
                                borderRadius:0,
                                textTransform:"capitalize",
                                width:"50%",
                                justifyContent:'flex-start',
                                gap:1,
                                '&:hover': {
                                    background: 'var(--white)',
                                    color:'var(--black)',
                                }
                                }}>
                                    <img width={35} height={35} src={googleLogo} />
                                    Sign in with Google
                            </Button>
                        </Link>
                    </Stack>
                    <Typography>DON'T HAVE AN ACCOUNT YET?</Typography>
                    <Link to='/signup'>
                        <Button
                                sx={{
                                background: 'var(--white)',
                                color:'var(--black)',
                                border:'1px solid black',
                                borderRadius:0,
                                textTransform:"capitalize",
                                marginTop:2,
                                '&:hover': {
                                    background: 'var(--white)',
                                    color:'var(--black)',
                                }
                                }}>
                                    <img width={35} height={35} src={userLogo} />
                                    Sign up here
                            </Button>
                    </Link>
                </Box>
            </Stack>
        </Container>
    )
}

export default SignIn