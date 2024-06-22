import { Box, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { CartMessageInterface } from '../interfaces/CartMessageInterface';

interface Props{
    message:CartMessageInterface,
    onChangeMessage:(value:CartMessageInterface) => void,
}
const CartMessage = ({message,onChangeMessage}:Props) => {
    const resetMessage = () => {
        setTimeout(()=>{
            onChangeMessage({} as CartMessageInterface)
        },1000)
    }
    resetMessage()
    return (
        <Box display={'inline-flex'}   sx={{
            width:'100%',
            background:message.msgType == 'error' ? 'var(--error-msg)' : 'var(--success-msg)',
            padding:'5px 10px',
            color:'var(--white)',
            alignItems:'center',
            textTransform:'capitalize',
            gap:1
            }} >
            {
            message.msgType == 'update' ? <DoneIcon sx={{color:'white',width:30,height:30}} /> :
            message.msgType == 'delete' ? <DeleteForeverIcon sx={{color:'white',width:30,height:30}} /> :
            <CancelIcon sx={{color:'white',width:30,height:30}} />
        }
            <Typography>{message.msg}</Typography>
        </Box>
    )
}

export default CartMessage