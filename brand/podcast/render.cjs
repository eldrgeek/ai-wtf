const { chromium } = require('playwright');
(async()=>{const [,,file,w,h,out]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:1});
await p.goto('file://'+require('path').resolve(file));await p.waitForTimeout(400);
await p.screenshot({path:out,clip:{x:0,y:0,width:+w,height:+h}});await b.close();})();
