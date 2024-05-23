import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props{
    filterType:'size' | 'color' | 'price'
    filter:{label:string,value:string}[],
    activeFilter:string | null ,
    setActiveFilter:(value:string | null)=>void
}

const Filter = ({ filterType,filter,activeFilter,setActiveFilter } : Props) => {

    const handleChangeHeight = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

        event.stopPropagation()
        if(activeFilter != filterType )
            setActiveFilter(filterType)
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
                <Typography>{filterType}</Typography>
                <ArrowDropDownIcon  
                fontSize='small'
                
                sx = {{
                    transform: activeFilter =='price' ? 'rotate(180deg)' : '',
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
            }} className={activeFilter =='price' ? 'height-auto' : 'height-none'}  >
            <Stack sx={{padding:'5px 10px 5px 5px'}} >
            
                {filter.map((obj,index)=>        
                    <Button key={index}
                        disableRipple 
                        sx={
                            { 
                                fontSize:'12px',
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