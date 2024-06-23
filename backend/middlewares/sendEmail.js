// require('dotenv').config()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const Customer = require('../models/Customer')
const sendEmail = async(email,emailType,userId)=>{
    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASSWORD)
    try{
        const hashedToken = await bcrypt.hash(userId.toString(),10)
        let name = ""
        if(emailType=='VERIFY'){
            const user = await User.findByIdAndUpdate(userId,
                {
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000
                },
            )
            const customer = await Customer.findOne({userId:user._id})
            name = `${customer.firstName} ${customer.lastName}`
        } else if(emailType=='RESET'){
            await User.findByIdAndUpdate(userId,
                {
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000
                },
            )
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: 'bd4780176ac097',
                pass: 'eaface2a35b52a'
            }
        })
        const mailOptions = {
            from:'bd4780176ac097',
            to:email,
            subject: emailType=='VERIFY' ? 
            `Account details for ${email} at Dapperlane Outfitters PAK` :
            `Reset Password for ${email} at Dapperlane Outfitters PAK`,
            html:`
        <html>
        <head>
            <style>
                body {
                    font-family: 'Sen', sans-serif;
                    
                }
                .container{
                    padding:5px 20px;
                }
                .imageDiv,{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    
                }
                .imageDiv img{
                    object-fit:contain;
                }
                .line{
                    height:1px;
                    background:rgb(136, 136, 136,0.2);
                    margin: 10px 0px;
                }
                span{
                    color:rgb(168, 168, 168);
                }
                button{
                    border:0;
                    outline:0;
                    background:black;
                    color:white;
                    text-transform:uppercase;
                    padding:5px 10px;
                    border-radius:0px;
                }
                a{
                    color:rgb(168, 168, 168);
                    text-decoration:none;
                }
                h3{
                    text-transform:uppercase;
                }

            </style>
        </head>
        <body>
            <div class="container">
                <div class='imageDiv'>
                    <img src='../../frontend/vite-project/public/icon.png'/>
                </div>
                
                <div class='line'></div>
                <h3>HELLO ${name},</h3>
                <div class='line'></div>
                <p>Thank you for registering with Dapperlane Outfitters UAE and welcome.</p>
                <p>You have registered with the following e-mail address: <span> nawazehsen@gmail.com </span> </p>
                <strong>Please verify your email address and activate your account by clicking the link below</strong>
                <div>
                    <a href='localhost:3000/verifyEmail?${hashedToken}'   <button>Verify your email </button> </a> 
                </div>
                <p>Or verify using this link: <span>localhost:3000/verifyEmail?${hashedToken}</span></p>
                <p>If you have any questions, check our <a href=${'http://localhost:5173'}><span>FAQs</span></a>, or contact our Customer Service team.</p>
                <p>Best Wishes,</p>
                <p>Dapperlane Outfitters PAK Team</p>
                <p>To contact us, click <a href=${'http://localhost:5173'}><span>contact us.</span></a></p>
                <p>Thank you for registering with Dapperlane Outfitters UAE and welcome.</p>
                <a href=${'http://localhost:5173'}>${'http://localhost:5173'}</a>
            </div>
        </body>
        </html>
    `
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
        
    }
    catch(error){
        console.log('Error while sending EMAIL')
        console.log(error)
    }
}
module.exports = sendEmail