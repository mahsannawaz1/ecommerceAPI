import { Box, Container, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const VerificationRequired = () => {
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
                <Typography>A welcome message with further instructions has been sent to your email address.</Typography>
            </Box>
            <Box paddingX={8}>
                <Typography variant='h5' marginBottom={2} paddingY={0.5} borderBottom={'1px solid var(--border)'}>Email Verification Required</Typography>
                <Stack spacing={2} sx={{color:'var(--link)'}}>
                    <Typography>You're almost done.</Typography>
                    <Typography>We've sent a verification email to <a style={{color:'rgb(168, 168, 168) !important'}} href="mailto:dada123@gmail.com">dada123@gmail.com.</a></Typography>
                    <Typography>Clicking on the email confirmation link, lets us know the email address is both valid and yours.</Typography>
                    <Typography>It is also your final step in the sign up process.</Typography>
                </Stack>
            </Box>
        </Container>
        
    )
}

export default VerificationRequired