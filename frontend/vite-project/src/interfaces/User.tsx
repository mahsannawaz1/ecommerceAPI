export default interface User{
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    shippingAddress:{
        city:string,
        area:string,
        address:string,
        country:string
    }
}