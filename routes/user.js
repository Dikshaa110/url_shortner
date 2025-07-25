const express= require('express');
const {handleUserSignup,handleUserlogin}= require('../controllers/user')
const router = express.Router();
router.post('/', handleUserSignup)//slash user ke upar ek post route hoga jiske upar hum user ko create kr skte hei
router.post('/login', handleUserlogin) 
module.exports=router;