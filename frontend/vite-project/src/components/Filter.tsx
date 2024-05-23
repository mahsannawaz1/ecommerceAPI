import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props{
    filterType:'size' | 'color' | 'price'
    filter:{label:string,value:string}[],
    activeFilter:string | null ,
    setActiveFilter:(value:string | null)=>void,
    onHandleFilters:(value:{label:string,value:string})=>void
}

const Filter = ({ filterType,filter,activeFilter,setActiveFilter,onHandleFilters } : Props) => {
    const handleChangeHeight = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

        event.stopPropagation()
        if(activeFilter != filterType ){
            setActiveFilter(filterType)
        }
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
                    transform: activeFilter ==filterType ? 'rotate(180deg)' : '',
                    transition:'transform 0.6s linear'
                }}
                /> 
                
            </Button>
            </Box>
            <Box  sx={{
                // overflowY: 'auto !important',
                display:'inline-block',
                whiteSpace:'nowrap',
                position:'absolute', 
                zIndex:9,
                background:'var(--white)'
            }} className={activeFilter ==filterType ? 'height-auto' : 'height-none'}  >
            <Stack sx={{padding:3}} >
            
                {filter.map((obj,index)=>        
                    <Button onClick={()=>onHandleFilters(obj)} key={index}
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