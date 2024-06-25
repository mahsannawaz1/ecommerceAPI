import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { Link } from 'react-router-dom'
import facebookLogo from '../../public/facebook-login-logo.svg'
import googleLogo from '../../public/google-login-logo.svg'
import userLogo from '../../public/profile-icon.svg'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
interface SignUpInputs{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}
const schema = Joi.object({
    firstName: Joi.string().required().min(3).messages({
        'string.empty': 'Firstname should not be empty.',
        'string.min': 'FirstName must be at least 3 characters.'
    }),
    lastName: Joi.string().required().min(3).messages({
        'string.empty': 'Lastname should not be empty.',
        'string.min': 'LastName must be at least 3 characters.'
    }),
    email:Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email Address is required.',
        'string.email': 'Email Address must be a valid email.'
    }),
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

const Signup = () => {
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const {  register,handleSubmit,formState: { errors }} = useForm<SignUpInputs>({resolver:joiResolver(schema)})
    const [token,setToken] = useState< string | null> (null)
    const [showPass,setShowPass] = useState('Show')
    const [showConfirmPass,setShowConfirmPass] = useState('Show')
    const onChangeCAPTCHA = (token:string | null)=>{
        setToken(token)
    }
    const onDataSubmit = (data:SignUpInputs)=>{
        if(token){
            axios.post('http://localhost:3000/api/register',{...data})
            .then(res=>{
                console.log(res)
                navigate('/signup/verify')
            })
            .catch(err=>setError(err.response.data.error))
        }
        
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
            {error && <CancelIcon sx={{color:'white',width:30,height:30}} />}
            
            <Typography>{error}</Typography>
            </Box>
            }
            <Typography variant='h5' paddingY={0.5} borderBottom={'1px solid var(--border)'}>Create An Account</Typography>
            <Stack direction='row' spacing={10} marginTop={5}>
                <Box width={'50%'}  >
                    <Typography marginBottom={2} variant='h6' textTransform={'uppercase'}>SIGN UP WITH EMAIL ADDRESS</Typography>
                    <form onSubmit={handleSubmit(onDataSubmit)}>
                        <Stack spacing={2}>
                            <Stack spacing={1.5} >
                                <TextField {...register('firstName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="First Name" size='small' />
                                {errors.firstName && <Typography color='error' fontSize={12}>{errors.firstName.message}</Typography>}
                                <TextField {...register('lastName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Last Name" size='small' />
                                {errors.lastName && <Typography color='error' fontSize={12}>{errors.lastName.message}</Typography>}
                                <TextField {...register('email')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
                                {errors.email && <Typography color='error' fontSize={12}> {errors.email.message}</Typography>}
                                
                                <TextField {...register('password')} type={showPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Password" size='small' InputProps={{
                                    endAdornment: <InputAdornment position='end'> <Box sx={{cursor:'pointer'}}  onClick={()=>setShowPass(showPass == 'Show' ? 'Hide' : 'Show')}>{showPass}</Box> </InputAdornment>
                                }} />
                                {errors.password && <Typography color='error' fontSize={12}>{errors.password.message}</Typography>}
                                <TextField {...register('confirmPassword')} type={showConfirmPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Confirm Password" size='small' InputProps={{
                                    endAdornment: <InputAdornment position='end'> <Box sx={{cursor:'pointer'}}  onClick={()=>setShowConfirmPass(showConfirmPass == 'Show' ? 'Hide' : 'Show')}>{showConfirmPass}</Box> </InputAdornment>
                                }}/>
                                {errors.confirmPassword && <Typography color='error' fontSize={12}>{errors.confirmPassword.message}</Typography>}
                            </Stack>
                            <ReCAPTCHA
                            
                                sitekey="6LdOH_8pAAAAAIBrS4mlmDSlcKkU5bv67hA6APxo"
                                onChange={onChangeCAPTCHA}
                            />
                            {token==null && <Typography color='error' fontSize={12}>Please check the CAPTCHA checkbox.</Typography>}
                            
                            <FormGroup >
                            <FormControlLabel control={<Checkbox disableRipple />} label="I would like to receive exclusive deals from Dapperlane." />
                            </FormGroup>
                            <Typography fontSize={14} sx={{color:'var(--link)'}}>By registering you agreed to our <Link to='/'>Terms and Conditions.</Link> </Typography>
                            <Button 
                            type='submit'
                            sx={{
                            background: 'var(--black)',
                            color:'var(--white)',
                            border:'1px solid black',
                            borderRadius:0,
                            
                            width:"50%",
                            '&:hover': {
                                color:'var(--white)',
                                background: 'var(--black)',
                            } 
                            }}>Create an Account</Button>
                        </Stack>
                    </form>
                </Box>
                <Box sx={{Height:'100%',width:'1px',background:'var(--border)'}}></Box>
                <Box width={'50%'} >
                    <Typography marginBottom={2} variant='h6' textTransform={'uppercase'}>SIGN UP WITH SOCIAL MEDIA</Typography>
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
                                Sign up with facebook
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
                                    Sign up with Google
                            </Button>
                        </Link>
                    </Stack>
                    <Typography>ALREADY HAVE AN ACCOUNT?</Typography>
                    <Link to='/signin'>
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
                                    Sign in here
                            </Button>
                    </Link>
                </Box>
            </Stack>
        </Container>
    )
}

export default Signup