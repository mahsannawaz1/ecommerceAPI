// require('dotenv').config()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const Customer = require('../models/Customer')
const sendEmail = async(email,emailType,userId)=>{

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
            
            const user = await User.findOneAndUpdate({email},
                {
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000
                },
            )
            const customer = await Customer.findOne({userId:user._id})
            name = `${customer.firstName} ${customer.lastName}`
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure:false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const msg = emailType == 'RESET' ? 
        `
        <div class='imageDiv'>
            <img src='../../frontend/vite-project/public/icon.png'/>
        </div>
        <div class='line'></div>
        <h3>HELLO ${name},</h3>
        <div class='line'></div>
        <p>We received a request to reset your password for your Dapperlane Outfitters PAK account.</p>
        <p>You have registered with the following e-mail address: <span> nawazehsen@gmail.com </span> </p>
        <p>Simply click on the button to set a new password:</p>
        <a class="btn" href='http://localhost:5173/signin/reset?token=${hashedToken}'>Reset Your Password </a> 
        <p >If you didn't ask to change your password, please ignore this email.</p>
        <p>Best Wishes,</p>
        <p>Dapperlane Outfitters PAK Team.</p>
        <p>To contact us, click <a href=${'http://localhost:5173'}><span>contact us.</span></a></p>
        <a href=${'http://localhost:5173'}>www.dapperlane.com.pk</a>
        ` 
        : emailType=='VERIFY' ? 
        `
        <div class='imageDiv'>
            <img src='../../frontend/vite-project/public/icon.png'/>
        </div>
                
        <div class='line'></div>
        <h3>HELLO ${name},</h3>
        <div class='line'></div>
        <p>Thank you for registering with Dapperlane Outfitters PAK and welcome.</p>
        <p>You have registered with the following e-mail address: <span> nawazehsen@gmail.com </span> </p>
        <p>Please verify your email address and activate your account by clicking the link below</p>
        <a class="btn" href='http://localhost:5173/user/complete?token=${hashedToken}'>Verify your email </a>
        <p>Or verify using this link: <a href='http://localhost:5173/user/complete?token=${hashedToken}'>http://localhost:5173/user/complete?token=${hashedToken}</a></p>
        <p>If you have any questions, check our <a href='http://localhost:5173'><span>FAQs</span></a>, or contact our Customer Service team.</p>
        <p>Best Wishes,</p>
        <p>Dapperlane Outfitters PAK Team.</p>
        <p>To contact us, click <a href=${'http://localhost:5173'}><span>contact us.</span></a></p>
        <p>Thank you for registering with Dapperlane Outfitters PAK and welcome.</p>
        <a href=${'http://localhost:5173'}>www.dapperlane.com.pk</a>
        ` : ''
        const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject: emailType=='VERIFY' ? 
            `Email Verification for ${email} at Dapperlane Outfitters PAK` :
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
                
                .btn{
                    border:0;
                    outline:0;
                    background:black;
                    color:white;
                    text-transform:uppercase;
                    padding:10px 20px;
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
                ${msg}
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