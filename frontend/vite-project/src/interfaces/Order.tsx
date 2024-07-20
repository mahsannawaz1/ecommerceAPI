export default interface Order{
    orderId:string,
    status:string,
    customerId:string,
    orderItems:OrderItem[]

}
interface OrderItem{
    product:{
        id:string,
        sku:string,
        name:string,
        size:string,
        color:string,
        image:string,
        price:number
    },
    qty:number
}