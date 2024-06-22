import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from './Cart';
import useEditCartQty from '../hooks/useEditCartQty';
import CartItemDeleteModal from './CartItemDeleteModal';
import { CartMessageInterface } from '../interfaces/CartMessageInterface';

interface Props{
    item:CartItem,
    onChangeMessage:(value:CartMessageInterface)=>void
}
const ShoppingCartItem = ({ item,onChangeMessage }:Props) => {
    const [qty, setQty] = useState(item.qty);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Stack  direction={'row'}  justifyContent={'space-between'} marginBottom={2}  sx={{border:'1px solid var(--link)',padding:2}} >
            <Stack direction={'row'} gap={1.6}>
                <img src={item.product.image} width={'87px'} height={'111px'}  />
                <Box>
                    <Link to={`/dapperlane/${item.product.id}`}>
                        <Typography whiteSpace={'wrap'}>{item.product.name}</Typography>
                    </Link>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Typography sx={{ textDecoration: 'line-through' }}>PKR {item.unit_price.toLocaleString()}</Typography>
                        <Typography color='error'>PKR {item.unit_price.toLocaleString()}</Typography>
                    </Stack>
                    <Box display={'inline-flex'} alignItems={'center'} padding={0.3} sx={{ background: '#d32f2f', color: 'var(--white)', fontSize: 11 }} component={'span'}>(SAVE 40%)</Box>
                    <Box marginTop={2}>
                        <Typography sx={{ color: 'var(--link)', fontSize: 12 }}>Item code: {item.product.sku}</Typography>
                        <Typography sx={{ color: 'var(--link)', fontSize: 12 }}>Color: {item.product.color}</Typography>
                        <Typography sx={{ color: 'var(--link)', fontSize: 12 }}>Size:{ item.product.size}</Typography>
                    </Box>
                    <Link style={{textDecoration:'underline',fontSize:12}} to='/'>Move to favorites</Link>
                </Box>
            </Stack>
            <Stack justifyContent={'space-between'} alignItems={'flex-end'}>
                <IconButton onClick={handleOpen} sx={{
                    '&:hover':{
                        color:'var(--black)',
                        transition:'color 0.5s'
                    }
                }} disableRipple>
                    <DeleteIcon />
                </IconButton>
                <FormControl sx={{ width: 80 }} size="small" variant='outlined'>
                <InputLabel id="demo-select-small-label">Qty</InputLabel>
                <Select
                    sx={{ borderRadius: 0, border: 0 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={qty}
                    label="Qty"
                    onChange={async(e) => {
                        const product = {
                            id:item.product.id,
                            sku:item.product.sku,
                            name:item.product.name,
                            size:item.product.size,
                            image:item.product.image,
                            color:item.product.color,
                        }
                        try{
                            const cartItem = await useEditCartQty(product,parseInt(e.target.value as string),item.unit_price)
                            console.log(cartItem)
                            setQty(cartItem.qty)
                            onChangeMessage({msg:`Product ${cartItem.product.name} has been updated successfully.`,msgType:'update'})
                        }
                        catch(error){
                            onChangeMessage({msg:'Product is OUT OF STOCK',msgType:'error'})
                        }
                        
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
                </Select>
                </FormControl>

            </Stack>
        </Stack>
            <CartItemDeleteModal open={open} handleClose={handleClose} cartItem={item} onChangeMessage={onChangeMessage} />
        </>
    )
}

export default ShoppingCartItem
