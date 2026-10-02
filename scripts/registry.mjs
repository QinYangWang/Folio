import { css } from './theme.mjs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const item = { $schema:'https://ui.shadcn.com/schema/registry-item.json', name:'folio', type:'registry:ui', title:'Folio primitives', description:'Accessible Button, Field, Checkbox and Switch built with React Aria and Tailwind CSS v4.', css, dependencies:['react-aria-components','lucide-react','clsx','tailwind-merge'], files:[{path:'src/components/ui.tsx',target:'@ui/folio.tsx',type:'registry:ui',content:await readFile('src/components/ui.tsx','utf8')}] };
await mkdir('public/r',{recursive:true});
await writeFile('public/r/folio.json',JSON.stringify(item,null,2));
await writeFile('registry.json',JSON.stringify({$schema:'https://ui.shadcn.com/schema/registry.json',name:'folio',homepage:'http://localhost:5173',items:[{...item,files:item.files.map(({content,...file})=>file)}]},null,2));
console.log('Built public/r/folio.json');
