
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product'
import { Color } from '../interfaces/Colors';

const useSizeColors = (product:Product | undefined) => {
    const [currentSize, setCurrentSize] = useState<string>('');
    const [currentColor, setCurrentColor] = useState<Color>({} as Color);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [qty, setQty] = useState(1);
    const szs = product?.sizeColorNames?.map(size => size.name) ?? [];
    let clrs = product?.sizeColorNames?.find(size => size.name === currentSize)?.colors || [];
    useEffect(() => {
        if (product) {
        
        const initialSize = product.sizeColorNames?.[0]?.name || '';
        setCurrentSize(initialSize);
        const initialColors = product.sizeColorNames?.find(size => size.name === initialSize)?.colors || [];
        setCurrentColor(initialColors[0] || {} as Color);
        setSelectedImage(product.images[0]);
        }
    }, [currentSize,product]);
    return {currentSize,currentColor,selectedImage,szs,clrs,qty,setQty,setCurrentSize,setCurrentColor,setSelectedImage}
    
}

export default useSizeColors