export interface Product{
    _id:string,
    sku:string,
    name:string,
    description:string,
    price:number,
    qtyInStck:number,
    images:string[],
    fit:string,
    type:string,
    sizeColorNames:{name:string,colors:{ name:string,qty:number }[]}[]
}