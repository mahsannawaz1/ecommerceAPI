import { Box, Typography } from '@mui/material'
import React from 'react'
import { clothingCategoriesMen,clothingCategoriesWomen,clothingCategoriesJuniors } from '../services/clothingCategories'
interface Props{
    type: string
}
type clothingCategories = typeof clothingCategoriesMen | typeof clothingCategoriesWomen | typeof clothingCategoriesJuniors
const CategoryComponent = ({type}:Props) => {
    let category : clothingCategories ;
    let keys= []
    if(type=='men')
        category = clothingCategoriesMen
    else if(type=='women')
        category = clothingCategoriesWomen
    else 
        category = clothingCategoriesJuniors
    keys = Object.keys(category)
    return (
        <>
            {keys.map(key=>{
                return (
                    <React.Fragment key={key}>
                        <Box paddingBottom={1} marginBottom={1} sx={{ borderBottom:'1px solid var(--border)'}}>
                    <Typography>{key}</Typography>
                        </Box>
                        <Box marginBottom={4}>
                            { category[key as keyof typeof category].map((category,index)=> 
                                <Box key={index} marginBottom={1}>
                                    <Typography 
                                    sx={{ color:'var(--link)',cursor:'pointer',textTransform:'capitalize' }} 
                                    variant='body2' 
                                    component={'span'}
                                    >{category}</Typography>
                                </Box>
                            )}
                        </Box>
                        
                    </React.Fragment>
                )
            }
            )}
        </>
    )
}

export default CategoryComponent