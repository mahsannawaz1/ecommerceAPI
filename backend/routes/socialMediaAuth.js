const passport = require('passport')
const User = require('../models/User')
const Customer = require('../models/Customer')
const sendEmail = require('../middlewares/sendEmail')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id)
    done(null,user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = new User({
                email: profile.emails[0].value,
                password: null,
                isVerified: profile.emails[0].verified,
                verifyToken:null,
                forgotPasswordToken:null,
                verifyTokenExpiry:null,
                forgotPasswordTokenExpiry:null
            });

            await user.save();

            const [firstName, lastName] = profile.displayName.split(' ');
            const customer = new Customer({
                firstName,
                lastName,
                userId: user._id
            });
            await customer.save();
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
}));
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: process.env.FACEBOOK_URL,
    scope: ['email']
},async(accessToken, refreshToken, profile, done)=>{
    const user = await User.findOne({ email:profile.emails[0].value })
    if(!user){
        const user = new User({
            email:profile.emails[0].value 
        })
        await user.save()
        const customer = new Customer({
            firstName:value.firstName,
            lastName:value.lastName,
            userId:user._id
        })
        await customer.save()
        sendEmail(user.email,'VERIFY',user._id)
    }
    done(null,user)
}
))