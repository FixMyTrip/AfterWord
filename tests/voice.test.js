'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');
const handler=require('../api/voice');const {validate}=handler._test;
const valid={speaker:'Eleanor',text:'A good question.'};
test('valid voice request accepted',()=>assert.equal(validate(valid),null));
test('unknown voice rejected',()=>assert.match(validate({...valid,speaker:'Unknown'}),/Unknown/));
test('voice request must be short',()=>assert.match(validate({...valid,text:'x'.repeat(481)}),/480/));
test('voice request rejects missing text',()=>assert.match(validate({...valid,text:''}),/480/));
test('premium audio is unavailable without credentials',async()=>{
 const old=process.env.ELEVENLABS_API_KEY;delete process.env.ELEVENLABS_API_KEY;
 const res={code:0,headers:{},setHeader(k,v){this.headers[k]=v;return this},status(c){this.code=c;return this},json(obj){this.value=obj;return this}};
 try{await handler({method:'POST',body:valid,headers:{}},res);assert.equal(res.code,503);assert.match(res.value.error,/browser voice/);}finally{if(old)process.env.ELEVENLABS_API_KEY=old}
});
