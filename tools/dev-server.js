"use strict";
/** Local MVP server. Zero dependencies; API route behavior matches Vercel Node handlers. */
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const root=path.resolve(__dirname,'..');const port=Number(process.env.PORT)||5174;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
function respond(res,status,obj){if(res.headersSent)return;res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj))}
const server=http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(u.pathname);
  if(pathname.startsWith('/api/')){
   if(!['/api/health','/api/discuss','/api/voice'].includes(pathname))return respond(res,404,{error:'Unknown endpoint'});
   let raw='';if(req.method==='POST'){for await(const chunk of req){raw+=chunk.toString();if(raw.length>32_000){respond(res,413,{error:'Request too large'});return;}}try{req.body=JSON.parse(raw)}catch{return respond(res,400,{error:'Invalid JSON'})}}
   const handler=require(path.join(root,pathname.slice(1)+'.js'));
   // Lightweight Vercel-compatible response helper for local testing.
   res.status=function(code){this.statusCode=code;return this};res.json=function(data){if(this.writable¶»§q«^