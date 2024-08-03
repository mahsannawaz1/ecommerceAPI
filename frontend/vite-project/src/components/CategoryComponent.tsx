import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { clothingCategoriesMen,clothingCategoriesWomen,clothingCategoriesJuniors } from '../services/clothingCategories'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Product } from '../interfaces/Product'
interface Props{
    type: string,
    handleChangeProducts:(products:Product[]) => void
}
type clothingCategories = typeof clothingCategoriesMen | typeof clothingCategoriesWomen | typeof clothingCategoriesJuniors
const CategoryComponent = ({type,handleChangeProducts}:Props) => {
    const [productType,setProductType] = useState<string[]>()
    let category : clothingCategories ;
    let keys= []
    if(type=='men')
        category = clothingCategoriesMen
    else if(type=='women')
        category = clothingCategoriesWomen
    else 
        category = clothingCategoriesJuniors
    keys = Object.keys(category)
    useEffect(()=>{
        if(productType && productType?.length>0){
            axios.get<Product[]>('http://localhost:3000/api/products',{ params:{ category:type,types:productType } }).then(res=>handleChangeProducts(res.data))
        }
    },[productType])
    
    

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
                                    <Typography onClick={()=>setProductType(category.value)}
                                    sx={{ color:'var(--link)',cursor:'pointer',textTransform:'capitalize' }} 
                                    variant='body2' 
                                    component={'span'}
                                    >{category.type}</Typography>
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