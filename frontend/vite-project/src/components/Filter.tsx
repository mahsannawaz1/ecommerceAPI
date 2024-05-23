import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";

interface Props{
    filterType:'Size' | 'Color' | 'Price'
    filter:{label:string,value:string}[]
}

const Filter = ({ filterType,filter } : Props) => {
    const [active,setActive] = useState<boolean>(false)

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
                <Typography>{filterType}</Typography>
                <ArrowDropDownIcon  
                fontSize='small'
                
                sx = {{
                    transform: active ? 'rotate(180deg)' : '',
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
            }} className={active ? 'height-auto' : 'height-none'}  >
            <Stack sx={{padding:'5px 10px 5px 5px'}} >
            
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
                        {obj.label}
                    </Button>)
                }
            </Stack>
            </Box>
        </Box>
        );
}

export default Filter