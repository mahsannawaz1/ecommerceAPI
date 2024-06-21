import { Box, Stack, Typography } from '@mui/material'

import DoneIcon from '@mui/icons-material/Done';

interface Props{
    phase:number
}

const CartPhase = ({ phase }:Props) => {
    return (
        <Box display={'flex'} position={'relative'} justifyContent={'space-between'} sx={{zIndex:99999}}>
            <Box position={'absolute'} sx={{width:'100%',background:'#ccc',height:'1px',marginTop:'16px',zIndex:'-9999999'}}></Box>
            <Stack position={'relative'} alignItems={'center'} spacing={1}> 
                <Box sx={{width:30,background:'var(--white)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>{phase==1 ? <DoneIcon /> : '1'}</Box> 
                <Typography position={'absolute'}  top={30} whiteSpace={'nowrap'}>Cart</Typography>
            </Stack>
            <Stack position={'relative'} alignItems={'center'} spacing={1}>
                <Box sx={{width:30,background:'var(--white)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>2</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}>Sign in</Typography>
            </Stack>
            <Stack  position={'relative'} alignItems={'center'} spacing={1}>
                <Box sx={{width:30,background:'var(--white)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>3</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}>Delivery and Payment</Typography>
            </Stack>
            <Stack position={'relative'} alignItems={'center'} spacing={1}> 
                <Box sx={{width:30,background:'var(--white)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>4</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}> Confirmation</Typography>
            </Stack>
        </Box>
    )
}

export default CartPhase