import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity';
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
const complexityOptions = {
    min: 7,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};
interface PasswordInputs{
    password:string,
    confirmPassword:string
}

const schema = Joi.object({
    password:PasswordComplexity(complexityOptions).required().messages({
        'string.empty': 'Password is required.',
        'passwordComplexity.tooShort': 'Your password must have at least 7 characters.',
        'passwordComplexity.tooLong': 'Your password must have no more than 30 characters.',
        'passwordComplexity.lowercase': 'Your password must contain at least 1 lowercase letter.',
        'passwordComplexity.uppercase': 'Your password must contain at least 1 uppercase letter.',
        'passwordComplexity.numeric': 'Your password must contain at least 1 numeric character.',
        'passwordComplexity.symbol': 'Your password must contain at least 1 special character.',
        'passwordComplexity.requirementCount': 'Your password must meet at least 4 of the complexity requirements.',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Confirm password is required'
    })
})
const ResetPassword = () => {
    const navigate =  useNavigate()
    const [searchParams] = useSearchParams()
    const [showPass,setShowPass] = useState('Show')
    const [showConfirmPass,setShowConfirmPass] = useState('Show')
    const {register,handleSubmit,formState:{ errors }} = useForm<PasswordInputs>({resolver:joiResolver(schema)})
    const [token,setToken] = useState("")
    const [error,setError] = useState("")
    useEffect(()=>{
        const token = searchParams.get('token')
        console.log(token)
        setToken(token || "")
    },[])
    const onHandleSubmit = ({password,confirmPassword}:PasswordInputs) =>{
        if(token.length > 0){
            axios.post('http://localhost:3000/api/changePassword',{password,confirmPassword,token})
            .then(res=>{
                console.log(res)
                navigate('/signin')
            })
            .catch(()=>setError("Your Login link is expired. Please go to Login page to generate another."))
        }
    }
    return (
        <Container fixed sx={{marginY:5}}>
                    <Box display={'inline-flex'}  sx={{
        width:'100%',
        bgcolor:error ? 'red' : 'green',
        padding:'5px 10px',
        color:'var(--white)',
        alignItems:'center',
        textTransform:'capitalize',
        gap:1,
        marginY:5
        }} >
            {error ? <CancelIcon sx={{color:'white',width:30,height:30}} /> : <CheckCircleOutlineIcon sx={{color:'white',width:30,height:30}} />}
            
            <Typography>{error ? error : 'You have just used your one-time login link. Please change your password.'}</Typography>
        </Box>
        <Box paddingX={8}>
            <Typography variant='h5' marginBottom={2} paddingY={0.5} borderBottom={'1px solid var(--border)'}>Change Password</Typography>
            <Stack spacing={2}>
                <Typography sx={{color:'var(--link)'}}>This is a one-time login and will expire after 1 hour.</Typography>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                <Box >
                    <Stack spacing={1.5} width={'50%'} marginBottom={5}>
                        <TextField {...register('password')} type={showPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="New Password" size='small' InputProps={{
                            endAdornment: <InputAdornment position='end'> <Box sx={{cursor:'pointer'}}  onClick={()=>setShowPass(showPass == 'Show' ? 'Hide' : 'Show')}>{showPass}</Box> </InputAdornment>
                        }} />
                        {errors.password && <Typography color='error' fontSize={12}>{errors.password.message}</Typography>}
                        <TextField {...register('confirmPassword')} type={showConfirmPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Confirm New Password" size='small' InputProps={{
                            endAdornment: <InputAdornment position='end'> <Box sx={{cursor:'pointer'}}  onClick={()=>setShowConfirmPass(showConfirmPass == 'Show' ? 'Hide' : 'Show')}>{showConfirmPass}</Box> </InputAdornment>
                        }}/>
                        {errors.confirmPassword && <Typography color='error' fontSize={12}>{errors.confirmPassword.message}</Typography>}
                    </Stack>
                    {   error ? 
                            <Link to='/signin'>
                                <Button
                                sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                                }
                                }}>Sign in</Button>
                            </Link> :
                            <Button
                            type='submit'
                            sx={{
                            background: 'var(--black)',
                            color:'var(--white)',
                            border:'1px solid black',
                            borderRadius:0,
                            '&:hover': {
                                color:'var(--white)',
                                background: 'var(--black)',
                            }
                            }}>Change Password</Button>
                    }
                    
                    
                </Box>
                </form>
            </Stack>
        </Box>
        </Container>
    )
}

export default ResetPassword

