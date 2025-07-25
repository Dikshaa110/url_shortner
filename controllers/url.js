const shortid= require("shortid");
const url= require('../models/url');
async function handleGenerateNewShortUrl(req,res)
{const body= req.body;
    if(!body.url) return res.status(400).json("url is required");
 const shortId= shortid();
 await url.create({
    shortId: shortId,
    redirectURL:body.url,
    visitedhistory:[],// object;
 })
 return res.render('home', { id: shortId });;
}
// async function handleGetAnalytics(req,res)
// {
//     const shortId= req.param.shortId;
//     const result= await url.findOneAndUpdate({shortId})
// }
module.exports={
    handleGenerateNewShortUrl,
}