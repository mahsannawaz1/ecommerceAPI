import { Button, Stack, Typography,  } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface Props{
    onHandlePhaseChange:(value:number)=>void
}


const OrderFailPage = ({onHandlePhaseChange}:Props) => {
    const navigate = useNavigate()
    return (
        <Stack marginTop={10} alignItems={'center'} spacing={1}>
            <CancelOutlinedIcon sx={{color:'var(--error-msg)',fontSize:70}} />
            <Typography fontSize={40} component={'h1'} sx={{color:'var(--error-msg)'}}>Order Failure</Typography>
            <Typography paddingBottom={2}>We are unable to process your order at this time.</Typography>
            <Stack direction={'row'} spacing={2} >
            
                <Button 
                onClick={()=>{
                    onHandlePhaseChange(1)
                    navigate('/cart')
                }} 
                disableRipple
                sx={{
            
                    background: 'var(--error-msg)',
                    color:'var(--white)',
                    
                    borderRadius:0,
                    paddingX:4,
                    '&:hover': {
                        color:'var(--white)',
                        background: 'var(--error-msg)',
                }
                }}>Go To Your shopping Cart
                </Button>
            
            <Link to='/'>
                <Button disableRipple
                sx={{
            
                    background: 'var(--error-msg)',
                    color:'var(--white)',
                    
                    borderRadius:0,
                    paddingX:4,
                    '&:hover': {
                        color:'var(--white)',
                        background: 'var(--error-msg)',
                }
                }}>Go To home page
                </Button>
            </Link>
            </Stack>
        </Stack>
    )
}

export default OrderFailPage