import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const t=JSON.parse(fs.readFileSync(new URL('../src/design-system/tokens.json', import.meta.url),'utf8'));
const luminance=(hex)=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>{const [x,y]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (x+.05)/(y+.05)};
test('five official storefront brand themes (Lunio, Helix, Sunset, Bedding, Lunio Life)',()=>{
  assert.equal(Object.keys(t.brands).length,5);
  assert.equal(t.brands.bedding.name,'Lunio Bedding');
  assert.equal(t.brands.bedding.primary,'#1C46B4');
  assert.equal(t.brands['lunio-life'].name,'Lunio Life');
  assert.equal(t.brands['lunio-life'].primary,'#2D274A');
  assert.equal(t.brands['lunio-life'].accent,'#9786F3');
  assert.equal(t.brands['lunio-life'].surface,'#CCD5F8');
});
test('sale promotion token (#E53935) is distinct from error token (#B42318)',()=>{
  assert.equal(t.foundation.sale,'#E53935');
  assert.equal(t.foundation.error,'#B42318');
  assert.notEqual(t.foundation.sale,t.foundation.error);
});
test('MiSans TC has five official weights',()=>{ assert.deepEqual(Object.values(t.weights),[400,500,600,700,800]);});
test('12 consistent typography roles, mobile/desktop H4 semibold',()=>{assert.equal(Object.keys(t.typography).length,12); assert.equal(t.typography.h4.weight,600);assert.deepEqual(t.typography['body-md'].mobile,[16,26]);});
test('all primary brand foreground contrast >= 4.5:1',()=>{for(const [key,v] of Object.entries(t.brands))assert.ok(ratio(v.primary,v.onPrimary)>=4.5,`${key} has contrast ${ratio(v.primary,v.onPrimary).toFixed(2)}`)});
test('all brand accent foreground contrast >= 4.5:1',()=>{for(const [key,v] of Object.entries(t.brands))assert.ok(ratio(v.accent,v.onAccent)>=4.5,`${key} accent has contrast ${ratio(v.accent,v.onAccent).toFixed(2)}`)});
test('all brand surface vs ink contrast >= 4.5:1',()=>{for(const [key,v] of Object.entries(t.brands))assert.ok(ratio(v.surface,v.ink)>=4.5,`${key} surface/ink has contrast ${ratio(v.surface,v.ink).toFixed(2)}`)});
test('every spacing value follows 4px rhythm',()=>{assert.ok(Object.values(t.spacing).every(v=>v%4===0));});
test('container/control/pill radii follow spec',()=>{assert.equal(t.radii.control,8);assert.equal(t.radii.container,16);assert.equal(t.radii.pill,9999);});
