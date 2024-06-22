
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack } from '@mui/material';
import { CartItem } from './Cart';
import CloseIcon from '@mui/icons-material/Close';
import useDeleteCartItem from '../hooks/useDeleteCartItem';
import { CartMessageInterface } from '../interfaces/CartMessageInterface';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    
    boxShadow: 24,
    p: 4,
};
interface Props{
    open:boolean,
    onChangeMessage:(value:CartMessageInterface)=>void,
    handleClose:()=>void,
    cartItem:CartItem
}

const CartItemDeleteModal = ({open,handleClose,cartItem,onChangeMessage}:Props) => {


    return (
        <Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack position={'relative'} sx={style} spacing={2}>
                <Box sx={{position:'absolute',top:0,right:0,background:'var(--black)'}}>
                <IconButton onClick={handleClose}  disableRipple sx={{color:'var(--white)'}}>
                    <CloseIcon />
                </IconButton>
                </Box>
            
            <Stack direction={'row'} spacing={2} >
                <img src={cartItem.product.image} width={'87px'} height={'111px'}  />

                <Typography id="modal-modal-description" >
                Do you want to move this item to favorites?
                </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1}>
            <Button 
                    
                    sx={{
                        width:'50%',
                        background: 'var(--black)',
                        color:'var(--white)',
                        border:'1px solid black',
                        fontSize:12,
                        textTransform:'capitalize',
                        borderRadius:0,
                        
                        '&:hover': { 
                            color:'var(--white)',
                            background: 'var(--black)',
                    } 
                    }}>Yes, move to favourites</Button>
                    <Button 
                    onClick={async()=>{
                        try{
                            const deletedProduct = await useDeleteCartItem(cartItem.product.id,cartItem.product.color,cartItem.product.size)
                            console.log(deletedProduct)
                            handleClose()
                            onChangeMessage({msg:`Product ${cartItem.product.name} has been removed successfully.`,msgType:'delete'})
                        }
                        catch(err){
                            console.log(err)
                        }
                        

                    }}
                    sx={{
                        width:'50%',
                        fontSize:12,
                        textTransform:'capitalize',
                        background: 'var(--white)',
                        color:'var(--black)',
                        border:'1px solid black',
                        borderRadius:0,
                        
                        '&:hover': { 
                            background: 'var(--white)',
                            color:'var(--black)',
                    } 
                    }}>No, remove it</Button>
            </Stack>
            </Stack>
        </Modal>
        </Box>
    );

}

export default CartItemDeleteModal