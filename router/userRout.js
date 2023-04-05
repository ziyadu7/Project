const express = require('express')
const multer = require('multer')
const user_route = express()

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

const path = require('path')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
    callback(null,path.join(__dirname,'../public/userProfileIMG'))
    },
    filename:(req,file,callback)=>{
        const name = Date.now()+'-'+file.originalname;
        callback(null,name)
    }
});

const upload = multer({storage:storage})

user_route.set('view engine','ejs')
user_route.set('views','./views/users')

user_route.get('/signup',auth.loginSession,userController.userSignup)

user_route.post('/signup',userController.insertUser)

user_route.get('/login',auth.loginSession,userController.loginUser)

user_route.get('/verify',userController.verifyMail)

user_route.post('/login',userController.verifyLogin)

user_route.get('/',userController.loadHome)

user_route.get('/logout',auth.logOutSession,userController.logOut)

user_route.get('/logoutIn',userController.logOutIn)

user_route.get('/otp-login',auth.loginSession,userController.otpLogin)

user_route.get('/otpVerifyMail',auth.loginSession,userController.verifyotpMail)

user_route.post('/otpVerifyMail',userController.verifyotpMail)

user_route.get('/otp-page',auth.loginSession,userController.otppage)

user_route.get('/otpSubmit',auth.loginSession,userController.otpVerify)

user_route.post('/otpSubmit',userController.otpVerify)

user_route.get('/singleProduct',userController.productDetails)

user_route.get('/userProfile',userController.userProfile)

user_route.get('/editProfile',auth.logOutSession,userController.loadEditProfile)

user_route.post('/editProfile',upload.single('image'),userController.editProfile)

user_route.get('/changePassword',auth.logOutSession,userController.loadChangePassword)

user_route.post('/changePassword',userController.changePassword)

user_route.get('/cart',auth.logOutSession,userController.loadCart)

user_route.get('/addToCart',auth.logOutSession,userController.addToCart)

user_route.get('/incrementcart',userController.incrementCart)

user_route.get('/decrementcart',userController.decrementCart)

user_route.get('/removeCart',userController.removeCart)

user_route.get('/checkOut',auth.logOutSession,userController.loadChekOut)

user_route.get('/addAddress',auth.logOutSession,userController.addAddress)

user_route.post('/addAddress',userController.addNewAddress)

user_route.get('/placeOrder',auth.logOutSession,userController.loadPlaceOrder)

user_route.get('/orderConfirm',auth.logOutSession,userController.orderConfirm)

user_route.post('/orderConfirm',auth.logOutSession,userController.orderConfirm)

user_route.get('/orders',auth.logOutSession,userController.showOrders)

user_route.get('/cancelOrder',auth.logOutSession,userController.cancelOrder)

user_route.get('/selectAddress',auth.logOutSession,userController.loadSelectAddress)

user_route.get('/moreAddress',auth.logOutSession,userController.loadMoreAddress)

user_route.get('/shopPage',userController.loadShopPage)

user_route.get('/wishlist',auth.logOutSession,userController.loadWishList)

user_route.get('/addToWishlist',auth.logOutSession,userController.addToWishlist)

user_route.get('/removeWishlist',auth.logOutSession,userController.removeWishlist)

user_route.get('/contactPage',auth.logOutSession,userController.loadContactPage)

user_route.get("/create-payment",userController.createPayment)

user_route.post('/checkCoupon',userController.addCoupon)

user_route.get('/success',auth.logOutSession,userController.confirmPayment)

user_route.post('/shopFilter',userController.productFilter)


module.exports = user_route