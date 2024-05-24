import { Box, Stack } from "@mui/material"

interface Props{
    pages:number[],
    active:number,
    onClick:(indicatorId:string)=>void
}
const CustomCarousalPagination = ({pages,active,onClick}:Props) => {
    
    return (
        <Stack marginY={1} direction='row' spacing={0.5}>
            {pages.map((page,index)=> <Box  key={index} width={5} height={5} onClick={()=>onClick(String(index))}
            sx={
                
                {   

                    bgcolor:`${active == index ? 'grey' : 'var(--white)'}`,
                    borderRadius:'100%',
                    border:'1px solid grey',
                    cursor:'pointer'
                }
            }
            ></Box>)}
        </Stack>
    )
}

export default CustomCarousalPagination