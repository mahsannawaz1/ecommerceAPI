import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import img1 from '../../public/img2.jpg'
import { colors } from '../services/filter';

interface Props{
    open:boolean,
    handleClose:()=>void,
}
const style = {
    position: 'fixed' as 'fixed',
    top: '0',
    right: '0',
    width: 350,
    background:'var(--white)',
    height:'100vh',
    border:0
};

const QuickView = ({open,handleClose}:Props) => {
    const clrs = colors.map(color=>color.value).slice(0,10)
    console.log(clrs)
    const [currentColor,setCurrentColor] = useState<string>(clrs[0])
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box position='relative' padding={1}>
                    <Typography textAlign={'center'}>QuickView</Typography>
                    <IconButton
                    onClick={handleClose}
                    sx={
                        {
                            position:'absolute',
                            top:0,
                            right:0,
                            cursor:'pointer',
                            color:'var(--black)'
                        }
                    }>
                    <CloseIcon  />
                    </IconButton>
                </Box>
                <Box>
                <img width='100%'  src={img1} />
                </Box>
                <Box padding={2}>
                    <Box >
                                <Typography sx={
                                    {
                                        '&:hover':{
                                            textDecoration:'underline',
                                            cursor:'pointer',
                                            
                                        }
                                    }
                                    } >AE LOGO GRAPHIC TANK TOP</Typography>
                                <Box>
                                    <Typography  sx={{ textDecoration:'line-through' }} component={'span'}>PKR 1,200</Typography>
                                    <Typography  color='error' marginLeft={'5px'} component={'span'}>PKR 1,200</Typography>
                                </Box>
                                
                                <Typography variant='caption' color='error'>(Save 40%)</Typography>
            
                    </Box>
                    <Typography marginY={0.5} variant='caption' sx={{color:'var(--link)'}}>Inclusive of VAT Item Code: 1161-3571-409</Typography>
                    <Stack marginY={0.5} direction='row' >
                        <Typography variant='body2' sx={{color:'var(--link)'}}>Color: </Typography>
                        <Typography marginLeft={0.5} variant='body2'>{currentColor}</Typography>
                    </Stack>
                    <Box sx={{display:'flex',flexFlow:'row-wrap',flexWrap:'wrap',gap:0.5}}>
                        {clrs.map(color=>
                        <Box onClick={()=>setCurrentColor(color)} borderRadius={'100%'} sx={{
                            
                            border: currentColor == color ? '1px solid black' : '1px solid white',
                            cursor:'pointer',
                            '&: hover':{
                                border:'1px solid black'
                            }
                        }}>
                            <Box
                            width='50px'
                            height='50px'
                            sx={{
                                border:'1px solid white',
                                background:`${color}`,
                            }}
                            borderRadius={'100%'}
                            ></Box>
                        </Box>
                        )}
                        
                    </Box>
                </Box>
                
            </Box>
        </Modal>
    </div>
    )
}

export default QuickView