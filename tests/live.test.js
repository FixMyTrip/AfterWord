const assert=require('node:assert/strict'),{test}=require('node:test');
const discussion=require('../api/discuss'),voices=require('../api/voice');
function res(){return {code:200,headers:{},setHeader(k,v){this.headers[k]=v;return this},status(n){this.code=n;return this},json(v){this.value=v;return this}}}
test('rejects oversized history text before AI billing',()=>{const history=[{speaker:'Max',text:'X'.repeat(801)}];assert.match(discussion._test.validate({chapter:1,message:'Hello',history}),/conversation entry/i)});
test('live AI returns structured two-member conversation with mocked Gateway',async()=>{
 const oldKey=process.env.AI_GATEWAY_API_KEY,old=global.fetch;
 process.env.AI_GATEWAY_API_KEY='test-fake-token';
 global.fetch=async(url,opts)=>{assert.match(url,/ai-gateway/);const data=JSON.parse(opts.body);assert.match(data.messages[0].content,/chapter 1/i);return{ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({turns:[{speaker:'Max',text:'His wit is clever, but cutting.'},{speaker:'Eleanor',text:'Humour does not guarantee kindness.'}]})}}]})}};
 try{const r=res();await discussion({method:'POST',headers:{},body:{chapter:1,message:'Is Mr Bennet cruel?',target:'Max',history:[]}},r);assert.equal(r.code,200);assert.equal(r.value.turns.length,2);assert.equal(r.value.turns[0].speaker,'Max');assert.equal(r.value.model,'live')}finally{global.fetch=old;if(oldKey)process.env.AI_GATEWAY_API_KEY=oldKey;else delete process.env.AI_GATEWAY_API_KEY}
});
test('premium TT¶»§q«^