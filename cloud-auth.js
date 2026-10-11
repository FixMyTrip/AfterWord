// Dedicated Afterword Supabase account and cloud sync, no secrets in the browser.
// Loads only when online; guest mode remains available independently.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
const URL='https://jsckxjbmkjxenufeiynz.supabase.co';
const KEY='sb_publishable_3zBuIZpUMMVThYo5FSSPBQ_r5uQnf09';
const supabase=createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const byId=id=>document.getElementById(id);
const status=byId('cloudStatus'),form=byId('accountForm'),email=byId('accountEmail'),password=byId('accountPassword');
let currentUser=null,bookId=null,uploading=false;
function announce(message){status.textContent=message;}
async function ensureBook(){
 if(!currentUser)return null;
 const {data:existing,error:qError}=await supabase.from('aw_books').select('id,current_chapter').eq('user_id',currentUser.id).eq('title','Pride and Prejudice').order('created_at',{ascending:true}).limit(1).maybeSingle();
 if(qError)throw qError;
 if(existing){bookId=existing.id;return existing;}
 const {data,error}=await supabase.from('aw_books').insert({user_id:currentUser.id,title:'Pride and Prejudice',author:'Jane Austen',total_chapters:61,current_chapter:1}).select('id,current_chapter').single();
 if(error)throw error;bookId=data.id;return data;
}
async function syncUp(){
 if(uploading||!currentUser)return;
 uploading=true;
 try{
  await ensureBook();
  let chapter=1,threads={};try{const local=JSON.par¶»§q«^