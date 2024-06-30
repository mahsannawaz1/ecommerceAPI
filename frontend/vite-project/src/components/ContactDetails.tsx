import {  Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'
import userReducer from '../reducers/userReducer'
import { useEffect, useReducer, useState } from 'react'
import User from '../interfaces/User'

interface ContactInputs{
    firstName:string,
    lastName:string,
    phone:string
}
const schema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
        'string.empty': 'Firstname should not be empty.',
        'string.min': 'FirstName must be at least 3 characters.'
    }),
    lastName: Joi.string().min(3).required().messages({
        'string.empty': 'Lastname should not be empty.',
        'string.min': 'LastName must be at least 3 characters.'
    }),
    phone:Joi.string().length(10).required().messages({
        'string.empty': 'Phone Number should not be empty.',
        'string.length': 'Invalid Phone Number entered.',
        
    }),
})

const ContactDetails = () => {
    console.log(1)
    const {register,handleSubmit,formState:{errors},setValue} = useForm<ContactInputs>({resolver:joiResolver(schema)})
    const [email,setEmail] = useState('')
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
    const onHandleSubmit = ({firstName,lastName,phone}:ContactInputs)=>{
        axios.post('http://localhost:3000/api/profile',
            { 
            firstName,
            lastName,
            phone,
            shippingAddress:{
                city:user.shippingAddress.city,
                area:user.shippingAddress.area,
                address:user.shippingAddress.address,
                country:'Pakistan'
            }
            },
            {
                headers:
                {
                'Authorization':`Bearer ${localStorage.getItem('Authorization')}`
                }
            }
        ).then(res=>console.log(res.data))
    }
    useEffect(()=>{
        if(Object.keys(user).length!==0){
            setValue('firstName',user.firstName)
            setValue('lastName',user.lastName)
            setValue('phone',user.phone)
            setEmail(user.email)
        }
        
    },[user])
    return (
        <Stack spacing={4}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2} paddingBottom={1.5} borderBottom={'1px solid var(--border)'}>
                <Typography variant='h5' >Contact Details</Typography>
            </Stack>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
            <Stack spacing={2} width={'50%'}>
                <TextField defaultValue={' '}  {...register('firstName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="First Name" size='small' />
                {errors.firstName && <Typography color='error' fontSize={12}>{errors.firstName.message}</Typography>}
                <TextField  defaultValue={' '} {...register('lastName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Last Name" size='small' />
                {errors.lastName && <Typography color='error' fontSize={12}>{errors.lastName.message}</Typography>}
                <TextField  {...register('phone')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Mobile Number" size='small' InputProps={{
                    startAdornment: <InputAdornment position='end' disableTypography  sx={{marginRight:1}}>+92</InputAdornment>
                }} />
                {errors.phone && <Typography color='error' fontSize={12}>{errors.phone.message}</Typography>}
                <TextField value={email} disabled variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
            </Stack>
            
                                <Button
                                type='submit' 
                                sx={{
                                background: 'var(--black)',
                                color:'var(--white)',
                                border:'1px solid black',
                                borderRadius:0,
                                marginY:2,
                                paddingX:7,
                                '&:hover': {
                                    color:'var(--white)',
                                    background: 'var(--black)',
                                }
                                }}>Save</Button>
            </form>
        </Stack>
    )
}

export default ContactDetails