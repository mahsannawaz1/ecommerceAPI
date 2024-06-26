import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'

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
    const {register,handleSubmit,formState:{errors}} = useForm<ContactInputs>({resolver:joiResolver(schema)})
    const onHandleSubmit = (data:ContactInputs)=>{
        console.log(data)
    }
    return (
        <Stack spacing={4}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2} paddingBottom={1.5} borderBottom={'1px solid var(--border)'}>
                <Typography variant='h5' >Contact Details</Typography>
            </Stack>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
            <Stack spacing={2} width={'50%'}>
                <TextField defaultValue={'Muhammad Ahsan'} {...register('firstName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="First Name" size='small' />
                {errors.firstName && <Typography color='error' fontSize={12}>{errors.firstName.message}</Typography>}
                <TextField defaultValue={'Nawaz'} {...register('lastName')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Last Name" size='small' />
                {errors.lastName && <Typography color='error' fontSize={12}>{errors.lastName.message}</Typography>}
                <TextField  {...register('phone')} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Mobile Number" size='small' InputProps={{
                    startAdornment: <InputAdornment position='end' disableTypography  sx={{marginRight:1,paddingBottom:0.5}}>+92</InputAdornment>
                }} />
                {errors.phone && <Typography color='error' fontSize={12}>{errors.phone.message}</Typography>}
                <TextField value='nawazehsen@gmail.com' aria-readonly variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
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
                                }}>Sign in</Button>
            </form>
        </Stack>
    )
}

export default ContactDetails