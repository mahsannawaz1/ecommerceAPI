import { Container, Typography } from '@mui/material'


const SignIn = () => {
    return (
        <Container fixed sx={{marginY:5}}>
            <Typography variant='h5' paddingY={0.5} borderBottom={'1px solid var(--heading-line)'}>Sign in</Typography>
        </Container>
    )
}

export default SignIn