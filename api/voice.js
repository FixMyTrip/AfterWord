'use strict';
/** ElevenLabs time-aligned voice synthesis. Runs on the server. No credentials leave this endpoint. */
const HOSTS=['Eleanor','Max','Sophie'];
const PER_HOUR=18, hits=new Map();
function validate(body){
 if(!body||typeof body!=='object'||Array.isArray(body))return 'Invalid request';
 if(!HOSTS.includes(body.speaker))return 'Unknown club member';
 if(typeof body.text!=='string'||!body.text.trim()||body.text.length>480)return 'Please send 1â€“480 characters';
 if(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]/u.test(body.text))return 'Unsupported characters';
 return null;
}
function voiceConfig(){
 const voices={Eleanor:process.env.ELEVENLABS_VOICE_ELEANOR,Max:process.env.ELEVENLABS_VOICE_MAX,Sophie:process.env.ELEVENLABS_VOICE_SOPHIE};
 return {key:process.env.ELEVENLABS_API_KEY,voices,available:!!(process.env.ELEVENLABS_API_KEY&&Object.values(voices).every(x=>x&&/^[\w-]{8,80}$/.test(x)))};
}
async function handler(req,res){
 res.setHeader('Cache-Control','private, no-store');
 res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const err=validate(req.body);
 if(err)return res.status(400).json({error:err});
 const config=voiceConfig();
 if(!config.available)return res.status(503).json({error:'Premium voice is not configured; use the browser voice instead.'});
 const ip=String(req.headers?.['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].slice(0,90);
 const now=Dat¶»§q«^