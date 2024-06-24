
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';

import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface EmailInput{
    email:string
}

const schema = Joi.object({
    email:Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email Address is required.',
        'string.email': 'Email Address must be a valid email.'
    }),
})
const ForgotPasswordEmail = () => {
    const navigate =  useNavigate()
    const [error,setError] = useState("")
    const {register,handleSubmit,formState:{ errors }} = useForm<EmailInput>({resolver:joiResolver(schema)})
    const onhandleSubmit = (data:EmailInput)=>{
        axios.post(`http://localhost:3000/api/sendResetEmail`,{email:data.email})
        .then(res=>{
            console.log(res)
            navigate('/user/verify')
        })
        .catch(err=>setError(err.response.data.error))
    }
    return (
        <Container fixed sx={{marginY:5}}>
        
        <Box paddingX={8}>
            <Typography variant='h5' marginBottom={2} paddingY={0.5} borderBottom={'1px solid var(--border)'}>Forgot Password</Typography>
            <Stack>
                <Typography sx={{color:'var(--link)',fontSize:13}}>Please enter your email address.</Typography>
                <Typography sx={{color:'var(--link)',fontSize:13}} marginBottom={2}>We will send you an email with a password reminder.</Typography>
                <form onSubmit={handleSubmit(onhandleSubmit)}>
                <Box >
                    <Stack width={'50%'} spacing={1.5} marginBottom={5}>
                    <TextField {...register('email')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
                    {errors.email && <Typography color='error' fontSize={12}> {errors.email.message}</Typography>}
                    {error && <Typography color='error' fontSize={12}> {error}</Typography>}
                    </Stack>
                    <Button
                                type='submit'
                                sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                paddingX:3,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                                }
                    }}>Submit</Button>
                </Box>
                </form>
            </Stack>
        </Box>
        </Container>
    )
}

export default ForgotPasswordEmail


