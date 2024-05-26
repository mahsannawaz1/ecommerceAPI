import { Product } from "../interfaces/Product";


const recentlyViewedProducts = (product:Product | undefined) => {
    const storedProductsJSON = localStorage.getItem('products');
    const storedProducts: Product[] = storedProductsJSON ? JSON.parse(storedProductsJSON) : [];
    const recently_viewed = storedProducts || [];
    
    if (product && recently_viewed && recently_viewed.findIndex(p=>product._id === p._id)==-1) {
        recently_viewed.push(product);
    }

    const productsJSON = JSON.stringify(recently_viewed);
    localStorage.setItem('products', productsJSON);
    return recently_viewed
}

export default recentlyViewedProducts