const express= require("express");
const router= express.Router();
router.get('/', (req, res) => {
    return res.render("home", { id: null });

});
router.get('/signup',(req,res)=>
{
    res.render("signup");
});
router.get('/user/login',(req,res)=>
{
    res.render("login");
});
module.exports=router;