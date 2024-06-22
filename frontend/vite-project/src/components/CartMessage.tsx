import { Box, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';

interface Props{
    message:string,
    onChangeMessage:(value:string)=>void,
}
const CartMessage = ({message,onChangeMessage}:Props) => {
    const resetMessage = () => {
        setTimeout(()=>{
            onChangeMessage('')
        },1000)
    }
    resetMessage()
    return (
        <Box display={'inline-flex'}   sx={{width:'100%',background:'var(--message)',padding:'5px 10px',color:'var(--white)',alignItems:'center',textTransform:'capitalize',gap:1}} >
            <DoneIcon sx={{color:'white',width:30,height:30}} />
            <Typography>{message}</Typography>
        </Box>
    )
}

export default CartMessage