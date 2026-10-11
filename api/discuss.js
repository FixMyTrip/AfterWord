'use strict';
// Server-side only. Uses Vercel AI Gateway through a server-injected OIDC token or secret key.
const CHAPTERS={
  1:'Only Jane Austen Pride and Prejudice Chapter 1: Mrs Bennet announces wealthy unmarried Mr Bingley rented Netherfield. She hopes one of her daughters will marry him and wants her husband to visit. Mr Bennet teases her throughout. No assembly ball, Elizabeth/Darcy meeting, secret Bingley visit or later events.',
  2:'Only chapters 1â€“2: Mr Bennet has secretly already visited Mr Bingley and reveals it to the delighted family. Different daughters show distinctive reactions, Mrs Bennet is thrilled, Mr Bennet likes teasing. There has not yet been the assembly dance.',
  3:'Only chapters 1â€“3: First assembly ball. Bingley is sociable and well-liked, Jane dances with him. Darcy is perceived as proud, declines to dance with Elizabeth with a dismissive comment within earshot. Elizabeth takes it with good humour. Do not allude to later plot, romance, marriages or eventual character arcs.'
};
const HOSTS={Eleanor:'A sharp, observant literary critic. Thoughtful and warm, attentive to Austenâ€™s prose, class, satire and social codes. Not academic or pompous.',Max:'A witty, questioning sceptic. Playfully challenges comfortable interpretations and sometimes disagrees with Eleanor. Friendly, never cruel.',Sophie:'A lively, empathic reader. Interested in motivations, awkwardness and relationships. Gently disagrees with Max when he over-intellectualises.'};
const¶»§q«^