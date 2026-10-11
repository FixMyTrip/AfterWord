'use strict';
const voice=require('./voice');
module.exports=function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 res.status(200).json({status:'ok',ai:(process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN)?'configured':'demo',voices:voice._test.voiceConfig().available?'premium':'browser',storage:'browser-local',version:'0.6.0'});
};
