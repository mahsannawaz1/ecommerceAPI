import { Stack,Button } from '@mui/material'
import { useState } from 'react'
import { menWomenSizes,juniorSizes } from '../services/sizes'
interface Props{
    type:string
}

const SizeComponent = ({type}:Props) => {
    const [selectedSizes,setSelectedSizes] = useState<number[]>([])
    let sizes : typeof menWomenSizes | typeof juniorSizes = []
    if(type == 'juniors')
        sizes = juniorSizes
    else if( type == 'men' || 'women')
        sizes = menWomenSizes
    
    const handleChangeSize = ( value:number )=>{
        if(foundColor(value)>=0){
            setSelectedSizes(selectedSizes?.filter(size=> size!=value ))
            return;
        }
        setSelectedSizes([...selectedSizes,value])
    }
    const foundColor = (value:number) => {
        return selectedSizes.find(size=>value == size) == undefined ? -1 : value
    }
    return (
        <Stack marginY={1} direction='row' spacing={1}>
            {sizes.map((size,index)=> 
                <Button 
                    key={index}
                    value={index} 
                    onClick={()=>handleChangeSize(index)} 
                    sx={{
                        '&:hover': {
                            backgroundColor: 'var(--black)',
                            color:'var(--white)'
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid black',

                        padding:'5px 10px',
                        bgcolor: foundColor(index) == index ? 'var(--black)' : 'var(--btn-color4)',
                        color: foundColor(index) == index ? 'var(--white)' : 'var(--black)'
                        
                    }} 
                    disableRipple variant='contained'>
                {size}</Button>
            )}
        </Stack>
    )
}

export default SizeComponent