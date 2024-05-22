import React, { useRef, useState } from 'react';
import { Box, Button, Radio, Stack, Typography, RadioGroup, FormControlLabel } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const FilterComponent = () => {
const ref = useRef<HTMLDivElement>(null)
const [selectedValue, setSelectedValue] = useState('');
const [active,setActive] = useState<boolean>(false)

const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
setSelectedValue(event.target.value);
};
const handleChangeHeight = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.stopPropagation()
    setActive(!active)
}
document.addEventListener('click',()=>{
    setActive(false)
})

return (
<Box position={'relative'}>
    <Box>
    <Button onClick={handleChangeHeight} sx={{ display: 'flex', alignItems: 'center', color: 'var(--black)', padding: 0 }} disableRipple>
        <Typography>Sort by</Typography>
        <ArrowDropDownIcon  
        fontSize='small' 
        sx = {{
            transform: active ? 'rotate(180deg)' : 'rotate(0)',
            transition:'transform 0.6s ease-in'
        }}
        /> 
        
    </Button>
    </Box>
    <Box ref={ref} sx={{
        display:'inline-block',
        position:'absolute', 
        zIndex:9,
        background:'var(--white)'
    }} className={active ? 'height-auto' : 'height-none'}  >
    <Stack>
    <RadioGroup  sx={{padding:'5px 10px 5px 5px'}}  value={selectedValue} onChange={handleChange}>
        
        <Button disableRipple sx={{ color: 'var(--black)', padding: 0,paddingBottom:0.6, justifyContent: 'flex-start', '&:hover': { background: 'none' } }}>
            <FormControlLabel
            value="recommended"
            control={
                <Radio
                disableRipple
                size='small'
                sx={{
                    width: '10px',
                    height: '10px',
                    marginRight: 0.5,
                    color: 'var(--black)',
                    '&.Mui-checked': {
                    color: 'var(--black)',
                    },
                }}
                />
            }
            label="Recommended"
            
            labelPlacement="end"
            sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
            />
            
        </Button>
        <Button disableRipple sx={{ color: 'var(--black)', padding: 0,paddingBottom:0.6, justifyContent: 'flex-start', '&:hover': { background: 'none' } }}>
            <FormControlLabel
            value="priceHighToLow"
            control={
                <Radio
                disableRipple
                size='small'
                sx={{
                    width: '10px',
                    height: '10px',
                    marginRight: 0.5,
                    color: 'var(--black)',
                    '&.Mui-checked': {
                    color: 'var(--black)',
                    },
                }}
                />
            }
            label="Price High To Low"
            labelPlacement="end"
            sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
            />
        </Button>
        <Button disableRipple sx={{ color: 'var(--black)', padding: 0,paddingBottom:0.6, justifyContent: 'flex-start', '&:hover': { background: 'none' } }}>
            <FormControlLabel
            value="priceLowToHigh"
            control={
                <Radio
                disableRipple
                size='small'
                sx={{
                    width: '10px',
                    height: '10px',
                    marginRight: 0.5,
                    color: 'var(--black)',
                    '&.Mui-checked': {
                    color: 'var(--black)',
                    },
                }}
                />
            }
            label="Price Low To High"
            labelPlacement="end"
            sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
            />
        </Button>
        <Button disableRipple sx={{ color: 'var(--black)', padding: 0,paddingBottom:0.6, justifyContent: 'flex-start', '&:hover': { background: 'none' } }}>
            <FormControlLabel
            value="newIn"
            control={
                <Radio
                disableRipple
                size='small'
                sx={{
                    width: '10px',
                    height: '10px',
                    marginRight: 0.5,
                    color: 'var(--black)',
                    '&.Mui-checked': {
                    color: 'var(--black)',
                    },
                }}
                />
            }
            label="New In"
            labelPlacement="end"
            sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
            />
        </Button>
        <Button disableRipple sx={{ color: 'var(--black)', padding: 0,paddingBottom:0.6, justifyContent: 'flex-start', '&:hover': { background: 'none' } }}>
            <FormControlLabel
            value="topRated"
            control={
                <Radio
                disableRipple
                size='small'
                sx={{
                    width: '10px',
                    height: '10px',
                    marginRight: 0.5,
                    color: 'var(--black)',
                    '&.Mui-checked': {
                    color: 'var(--black)',
                    },
                }}
                />
            }
            label="Top Rated"
            labelPlacement="end"
            sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
            />
        </Button>
        
    </RadioGroup>
    </Stack>
    </Box>
</Box>
);
};

export default FilterComponent;
