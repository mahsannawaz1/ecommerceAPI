import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AddressBook from './AddressBook';
import User from '../interfaces/User';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { IconButton } from '@mui/material';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    
    boxShadow: 24,
    p:1,
    
};

interface Props{
    handleClose:()=>void,
    open:boolean,
    user:User | null,
    onChangeUser:(user:User| null)=>void
}



const AddressBookModal = ({handleClose,open,user,onChangeUser}:Props) => {
    useEffect(()=>{
        if(user==null){
            axios.get<User>('http://localhost:3000/api/userDetails',
                {
                    headers:
                    {
                    'Authorization':`Bearer ${localStorage.getItem('Authorization')}`
                    }
                }
            )
            .then(res=>
                {
                    const {firstName,lastName,email,phone,shippingAddress} = res.data
                    console.log(res.data)
                    onChangeUser({
                        firstName,
                        lastName,
                        email,
                        phone,
                        shippingAddress
                    })  
                })
        }

    },[])

    return (
        <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
            timeout: 500,
            },
        }}
        >
        <Fade in={open}>
            <Box sx={style}>
            <Box position='relative' padding={1}>
                        <Typography textAlign={'center'}>QuickView</Typography>
                        <IconButton disableRipple
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
            <Typography textAlign={'center'} id="transition-modal-title" variant="h6" component="h2">
                Delivery Information
            </Typography>
            <Box sx={{padding:"5px 20px"}}>
            <AddressBook onChangeUserWithAddress={onChangeUser} handleClose={handleClose} />
            </Box>
            
            </Box>
        </Fade>
        </Modal>
    </div>
    );
}

export default AddressBookModal