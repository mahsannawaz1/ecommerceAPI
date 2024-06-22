import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { Link } from 'react-router-dom'


const Signup = () => {
    const onChangeCAPTCHA = ()=>{}
    const [showPass,setShowPass] = useState('Show')
    const [showConfirmPass,setShowConfirmPass] = useState('Show')
    return (
        <Container fixed sx={{marginY:5}}>
            <Typography variant='h5' paddingY={0.5} borderBottom={'1px solid var(--heading-line)'}>Create An Account</Typography>
            <Stack direction='row' spacing={10}>
                <Box width={'50%'} paddingRight={'60%'}>
                    <Typography textTransform={'uppercase'}>SIGN UP WITH EMAIL ADDRESS</Typography>
                    <form >
                        <Stack spacing={2}>
                            <Stack spacing={1.5}>
                                <TextField variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="First Name" size='small' />
                                <TextField variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Last Name" size='small' />
                                <TextField variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Email Address" size='small' />
                                <TextField type={showPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Password" size='small' InputProps={{
                                    endAdornment: <InputAdornment position='end'> <Box onClick={()=>setShowPass(showPass == 'Show' ? 'Hide' : 'Show')}>{showPass}</Box> </InputAdornment>
                                }} />
                                <TextField type={showConfirmPass=='Show' ? 'password' : 'text'} variant="standard" className='textfield' InputLabelProps={{className:'textfield__label'}} label="Confirm Password" size='small' InputProps={{
                                    endAdornment: <InputAdornment position='end'> <Box onClick={()=>setShowConfirmPass(showConfirmPass == 'Show' ? 'Hide' : 'Show')}>{showConfirmPass}</Box> </InputAdornment>
                                }}/>
                            </Stack>
                            <ReCAPTCHA
                                sitekey="6LdOH_8pAAAAAIBrS4mlmDSlcKkU5bv67hA6APxo"
                                onChange={onChangeCAPTCHA}
                            />
                            <FormGroup>
                            <FormControlLabel control={<Checkbox disableRipple />} label="I would like to receive exclusive deals from Dapperlane." />
                            </FormGroup>
                            <Typography fontSize={14} sx={{color:'var(--link)'}}>By registering you agreed to our <Link to='/'>Terms and Conditions.</Link> </Typography>
                            <Button 
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
                <Box>

                </Box>
            </Stack>
        </Container>
    )
}

export default Signup