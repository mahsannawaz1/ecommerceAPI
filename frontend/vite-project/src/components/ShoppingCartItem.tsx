import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from './Cart';

interface Props{
    item:CartItem
}
const ShoppingCartItem = ({ item }:Props) => {
    const [qty, setQty] = useState(1);
    return (
        <Stack direction={'row'} marginBottom={2} justifyContent={'space-between'} sx={{border:'1px solid var(--link)',padding:2}}>
            <Stack direction={'row'} gap={1.6}>
                <img src={item.product.image} width={'87px'} height={'111px'}  />
                <Box>
                    <Link to={`/dapperlane/${item.product.id}`}>
                        <Typography >{item.product.name}</Typography>
                    </Link>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Typography sx={{ textDecoration: 'line-through' }}>PKR {item.unit_price}</Typography>
                        <Typography color='error'>PKR {item.unit_price}</Typography>
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
                <DeleteIcon />
                <FormControl sx={{ width: 80 }} size="small" variant='outlined'>
                <InputLabel id="demo-select-small-label">Qty</InputLabel>
                <Select
                    sx={{ borderRadius: 0, border: 0 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={item.qty}
                    label="Qty"
                    onChange={(e) => setQty(parseInt(e.target.value as string))}
                >
                    {[1, 2, 3, 4, 5, 6].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
                </Select>
                </FormControl>

            </Stack>
        </Stack>
    )
}

export default ShoppingCartItem
