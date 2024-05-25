import React from 'react';
import { Box, Button, Radio, Stack, Typography, RadioGroup, FormControlLabel } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props{
    filter:{label:string,value:string}[],
    activeFilter:string | null ,
    setActiveFilter:(value:string | null)=>void,
    selectedSortBy:string,
    changeSelectedSort:(value:string)=>void
}

const SizeFilter = ( { filter,activeFilter,selectedSortBy,changeSelectedSort,setActiveFilter } : Props ) => {


const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
changeSelectedSort(event.target.value);
};
const handleChangeHeight = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.stopPropagation()
    if(activeFilter !='sort by')
        setActiveFilter('sort by')
    else
        setActiveFilter(null)
}
document.addEventListener('click',()=>{
    setActiveFilter(null)
})

return (
<Box position={'relative'}>
    <Box>
    <Button onClick={handleChangeHeight} sx={{ display: 'flex', alignItems: 'center', color: 'var(--black)', padding: 0 }} disableRipple>
        <Typography>Sort By</Typography>
        <ArrowDropDownIcon  
        fontSize='small'
        
        sx = {{
            transform: activeFilter =='sort by' ? 'rotate(180deg)' : '',
            transition:'transform 0.6s linear'
        }}
        /> 
        
    </Button>
    </Box>
    <Box  sx={{
        display:'inline-block',
        whiteSpace:'nowrap',
        position:'absolute', 
        zIndex:9,
        background:'var(--white)'
    }} className={activeFilter =='sort by' ? 'height-auto' : 'height-none'}  >
    <Stack>
    <RadioGroup  sx={{padding:'5px 10px 5px 5px'}}  value={selectedSortBy} onChange={handleChange}>
        {filter.map((obj,index)=>        
            <Button key={index}
                disableRipple 
                sx={
                    { 
                        color:'var(--black)', 
                        padding: 0,
                        paddingBottom:0.6, 
                        justifyContent: 'flex-start', 
                        '&:hover': { 
                            background: 'none'
                        } 
                    }
                }>
                <FormControlLabel
                value={obj.value}
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
                label={obj.label}
                labelPlacement="end"
                sx={{ margin: 0,'& .MuiTypography-root': { fontSize: '11px'} }}
                />
                
            </Button>)
        }
    </RadioGroup>
    </Stack>
    </Box>
</Box>
);
};

export default SizeFilter;
