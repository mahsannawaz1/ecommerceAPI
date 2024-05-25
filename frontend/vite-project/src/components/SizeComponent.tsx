import { Stack,Button } from '@mui/material'
import { useState } from 'react'
import { menWomenSizes,juniorSizes } from '../services/sizes'
interface Props{
    type:string,
    filters:{label:string,value:string}[],
    onHandleFilters:(value:{label:string,value:string})=>void
}

const SizeComponent = ({type,onHandleFilters,filters}:Props) => {
    const [selectedSizes,setSelectedSizes] = useState<number[]>([])
    let sizes : typeof menWomenSizes | typeof juniorSizes = []
    if(type == 'juniors')
        sizes = juniorSizes
    else if( type == 'men' || 'women')
        sizes = menWomenSizes
    const handleChangeSize = ( value:number,size:string )=>{
        onHandleFilters({value:size,label:size})
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
                    onClick={()=>handleChangeSize(index,size)} 
                    sx={{
                        '&:hover': {
                            backgroundColor: 'var(--black)',
                            color:'var(--white)'
                            
                    
                        },
                        borderRadius:'30px',
                        fontSize:10,
                        border:'1px solid var(--border)',

                        padding:'5px 10px',
                        bgcolor: filters.find(filter=>filter.value == size) ? 'var(--black)' : 'var(--btn-color4)',
                        color: filters.find(filter=>filter.value == size) ? 'var(--white)' : 'var(--black)'
                        
                    }} 
                    disableRipple>
                {size}</Button>
            )}
        </Stack>
    )
}

export default SizeComponent