import { chromium } from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const phase=process.env.FOLIO_SCREENSHOT_THEME||'light';const base=(process.env.FOLIO_TEST_URL||'http://localhost:5173').replace(/\/$/,'')+'/';
const dir=process.env.FOLIO_SCREENSHOTS_DIR||`/tmp/folio-visual-${phase}`;await mkdir(dir,{recursive:true});
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:Number(process.env.FOLIO_SCREENSHOT_WIDTH||1440),height:1000},reducedMotion:'reduce',colorScheme:phase});
const entries=JSON.parse(await readFile('registry.json','utf8')).items;
for(const mode of ['catalog','detail']) {
 let shots=[];
 if(mode==='catalog') await page.goto(base+'#/components');
 for(const item of entries) {
  let target;
  if(mode==='catalog') {target=page.locator('.component-card').filter({has:page.locator(`a[href="#/components/${item.name}"]`)});await target.scrollIntoViewIfNeeded();const lazy=target.locator('[data-preview]');if(await lazy.count()) await target.locator('[data-preview-ready]').waitFor();}
  else {await page.goto(base+'#/components/'+item.name);target=page.locator('.doc-preview');await target.locator('.doc-example').waitFor();}
  await target.screenshot({path:`${dir}/${mode}-${item.name}.png`});shots.push({name:item.name,data:(mode==='detail' ? await page.locator('.doc-example').screenshot() : await readFile(`${dir}/${mode}-${item.name}.png`)).toString('base64')});
 }
 const gallery=await browser.newPage({viewport:{width:1200,height:1200}});
 for(let i=0;i<shots.length;i+=12) {
  await gallery.setContent(`<style>body{margin:0;font:14px sans-serif;background:#ddd}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px}.tile{background:white;padding:8px}.picture{height:350px;display:flex;align-items:center;justify-content:center}img{max-width:100%;max-height:350px;object-fit:contain}h3{margin:0 0 5px}</style><div class="grid">${shots.slice(i,i+12).map(s=>`<div class="tile"><h3>${s.name}</h3><div class="picture"><img src="data:image/png;base64,${s.data}"></div></div>`).join('')}</div>`);
  await gallery.screenshot({path:`${dir}/${mode}-sheet-${i/12}.png`,fullPage:true});
 }
 await gallery.close();console.log(`${mode}: ${shots.length} screenshots`);
}
await browser.close();
