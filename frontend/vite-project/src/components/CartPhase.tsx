import { Box, Stack, Typography } from '@mui/material'

import DoneIcon from '@mui/icons-material/Done';
import userAuth from '../hooks/userAuth';

interface Props{
    phase:number,
    onHandlePhaseChange:(value:number)=>void
}

const CartPhase = ({ phase, onHandlePhaseChange }:Props) => {
    const width = phase == 1 ? '0' : phase==2 ? '33.33%' : phase==3 ? '66.66%' : '100%'
    const token = userAuth()
    return (
        <Box display={'flex'} position={'relative'} justifyContent={'space-between'} >
            <Box position={'absolute'} sx={{width:'100%',background:'#ccc',height:'1px',marginTop:'16px',zIndex:'-9999999'}}>
                <Box sx={{width,background:'var(--black)',height:'1px'}}></Box>
            </Box>
            <Stack 
            onClick={()=>{
                if(phase>1)
                    onHandlePhaseChange(1)
            }} 
            position={'relative'} alignItems={'center'} spacing={1}> 
                <Box className={phase > 1 ? "cursor-pointer" : ""} sx={{width:30,background:'var(--black)',color:'var(--white)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>{phase>1 ? <DoneIcon /> : 1}</Box> 
                <Typography position={'absolute'}  top={30} whiteSpace={'nowrap'}>Cart</Typography>
            </Stack>
            <Stack 
            onClick={()=>{
                if(token)
                    onHandlePhaseChange(3)
                else if(!token)
                    onHandlePhaseChange(2)

            }} 
            position={'relative'} alignItems={'center'} spacing={1}>
                <Box className={!token || phase!=2 ? "cursor-pointer" : ""} sx={{width:30,background:phase>=2 ? 'var(--black)' : 'var(--white)',color:phase>=2 ? 'var(--white)' : 'var(--black)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>{phase>2 ? <DoneIcon /> : 2}</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}>Sign in</Typography>
            </Stack>
            <Stack
            onClick={()=>{
                if(token && phase < 3)
                    onHandlePhaseChange(3)

            }} 
            position={'relative'} alignItems={'center'} spacing={1}>
                <Box className={token && phase!=3 ? "cursor-pointer" : ""} sx={{width:30,background:phase>=3 ? 'var(--black)' : 'var(--white)',color:phase>=3 ? 'var(--white)' : 'var(--black)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>{phase>3 ? <DoneIcon /> : 3}</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}>Delivery and Payment</Typography>
            </Stack>
            <Stack
            onClick={()=>{
                if(token && phase < 4)
                    onHandlePhaseChange(4)

            }} 
            position={'relative'} alignItems={'center'} spacing={1}> 
                <Box className={token && phase!=3 ? "cursor-pointer" : ""} sx={{width:30,background:phase>=4 ? 'var(--black)' : 'var(--white)',color:phase>=4 ? 'var(--white)' : 'var(--black)',height:30,borderRadius:'100%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center'}}>{phase>4 ? <DoneIcon /> : 4}</Box> 
                <Typography position={'absolute'} top={30} whiteSpace={'nowrap'}> Confirmation</Typography>
            </Stack>
        </Box>
    )
}

export default CartPhase