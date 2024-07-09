import {  Autocomplete, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useForm} from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import cities from '../services/cities'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../contexts/userContext'
import User from '../interfaces/User'

interface AddressInputs{
    firstName:string,
    lastName:string,
    phone:string,
    address:string
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
    address:Joi.string().required().messages({
        'string.empty': 'Shipping Address should not be empty.',
    }),
})

interface Props{
    handleClose?:()=>void,
    onChangeUserWithAddress?:(user:User | null) => void
}
const AddressBook = ({handleClose,onChangeUserWithAddress}:Props) => {
    const { user } = useContext(UserContext)
    const [selectedCity,setSelectedCity] = useState('')
    const [selectedArea,setSelectedArea] = useState('')
    const [cityError,setCityError] = useState('')
    const [areaError,setAreaError] = useState('')
    
    const {register,handleSubmit,formState:{errors},setValue} = useForm<AddressInputs>({resolver:joiResolver(schema)})
    const onHandleSubmit = ({firstName,lastName,phone,address}:AddressInputs)=>{
        if(selectedArea && selectedCity){
            axios.post<User>('http://localhost:3000/api/profile',
                { 
                firstName,
                lastName,
                phone,
                shippingAddress:{
                    city:selectedCity,
                    area:selectedArea,
                    address,
                    country:'Pakistan'
                }
            
                },
                {
                    headers:
                    {
                    'Authorization':`Bearer ${localStorage.getItem('Authorization')}`
                    }
                }
            ).then(res=>{
                const {firstName,lastName,email,phone,shippingAddress} = res.data
                if(onChangeUserWithAddress){
                    onChangeUserWithAddress({
                        firstName,
                        lastName,
                        email,
                        phone,
                        shippingAddress
                    })
                }
                    
            })
            .finally(()=>{
                if(location.href == 'http://localhost:5173/cart' && handleClose){
                    handleClose()
                }
            })

        }
    }
    const checkError = ()=>{
        if(!selectedArea)
            setAreaError('Area should not be empty.')
        if(!selectedCity)
            setCityError('City should not be empty.')
    }
    const onCityChange = (value:string)=>{
        
        if(value!='')
            setCityError('')
        else
            setCityError('City should not be empty.')
        setSelectedCity(value)
        setSelectedArea('')
        
    }
    const onAreaChange = (value:string)=>{
        
        if(value!='')
            setAreaError('')
        else
        setAreaError('Area should not be empty.')
        if(selectedCity)
            setSelectedArea(value)
        else
            setSelectedArea('')

    }
    useEffect(()=>{
        if(Object.keys(user).length !== 0){
            setValue('firstName',user.firstName)
            setValue('lastName',user.lastName)
            setValue('phone',user.phone)
            setValue('address',user.shippingAddress.address)
            setSelectedCity(user.shippingAddress.city)
            setSelectedArea(user.shippingAddress.area)
        }
    },[user])
    return (
        <Stack spacing={4}>
            {location.href != 'http://localhost:5173/cart' && <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2} paddingBottom={1.5} borderBottom={'1px solid var(--border)'}>
                
                <Typography variant='h5' >Address Book</Typography>
            </Stack>}
            <form onSubmit={handleSubmit(onHandleSubmit)}>
            <Stack spacing={2} width={ location.href == 'http://localhost:5173/cart' ? '100%' : '50%'}>
                <TextField  {...register('firstName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="First Name" size='small' />
                {errors.firstName && <Typography color='error' fontSize={12}>{errors.firstName.message}</Typography>}
                <TextField  {...register('lastName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Last Name" size='small' />
                {errors.lastName && <Typography color='error' fontSize={12}>{errors.lastName.message}</Typography>}
                <TextField  {...register('phone')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Mobile Number" size='small' InputProps={{
                    startAdornment: <InputAdornment position='end' disableTypography  sx={{marginRight:1,color:'var(--link)'}}>+92</InputAdornment>
                }} />
                {errors.phone && <Typography color='error' fontSize={12}>{errors.phone.message}</Typography>}
                <Stack>
                    <Typography sx={{color:'var(--link)'}} variant='caption'>Country</Typography>
                    <Typography sx={{color:'var(--link)'}}>Pakistan</Typography>
                </Stack>
                <Stack spacing={0.5}>
                    <Typography sx={{ color: 'var(--link)' }} marginY={1} variant='caption'>City</Typography>
                    <Autocomplete
                        
                        value={selectedCity}
                        onChange={(e,value) => onCityChange(value || '')}
                        
                        id="combo-box-demo-1"
                        options={cities.map((city) => city.city)}
                        renderInput={(params) => <TextField  {...params} className='textfield' InputLabelProps={{className:'textfield__label'}} label="Select City" />}
                    />
                </Stack>
                {cityError && <Typography color='error' fontSize={12}>{cityError}</Typography>}
            <Stack spacing={0.5}>
                    <Typography sx={{ color: 'var(--link)' }} marginY={1} variant='caption'>Area</Typography>
                    <Autocomplete
                        
                        value={selectedArea}
                        
                        onChange={(e,value) => onAreaChange(value || '')}
                        id="combo-box-demo-2"
                        options={cities.map((city) => city.city === selectedCity ? city.areas : []).flat()}
                        renderInput={(params) => <TextField {...params} className='textfield' InputLabelProps={{className:'textfield__label'}} label="Select Area" />}
                    />
            </Stack>
            {areaError && <Typography color='error' fontSize={12}>{areaError}</Typography>}
                
                <TextField {...register('address')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Shipping Address" size='small' />
                {errors.address && <Typography color='error' fontSize={12}>{errors.address.message}</Typography>}

            </Stack>
            
                <Button
                onClick={checkError}
                type='submit' 
                sx={{
                background: 'var(--black)',
                color:'var(--white)',
                border:'1px solid black',
                borderRadius:0,
                marginY:2,
                paddingX:7,
                width:location.href == 'http://localhost:5173/cart' ? '100%' : 'initial',
                '&:hover': {
                    color:'var(--white)',
                    background: 'var(--black)',
                }
                }}>Save</Button>
            </form>
        </Stack>
    )
}

export default AddressBook