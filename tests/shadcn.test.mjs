import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = new URL("../", import.meta.url).pathname;
const read = path => readFileSync(join(root,path),"utf8");
const config = JSON.parse(read("components.json"));
const pkg = JSON.parse(read("package.json"));
const primitives = {
  button:"@radix-ui/react-slot",
  tabs:"@radix-ui/react-tabs",
  select:"@radix-ui/react-select",
  label:"@radix-ui/react-label",
  dialog:"@radix-ui/react-dialog",
  sheet:"@radix-ui/react-dialog",
  checkbox:"@radix-ui/react-checkbox",
  "scroll-area":"@radix-ui/react-scroll-area",
  popover:"@radix-ui/react-popover",
  command:"cmdk",
};
test("shadcn/ui registry configuration",()=>{
 assert.equal(config.style,"new-york");assert.equal(config.tailwind.css,"app/globals.css");assert.equal(config.tailwind.cssVariables,true);
 assert.equal(config.aliases.ui,"@/components/ui");assert.equal(config.iconLibrary,"lucide");
});
test("Every interaction primitive has a real upstream Radix / cmdk dependency",()=>{
 for(const [component,dependency] of Object.entries(primitives)){
  const path=`components/ui/${component}.tsx`;
  assert.ok(existsSync(join(root,path)),`${path} is missing`);
  assert.ok(read(path).includes(dependency),`${component} does not use ${dependency}`);
  assert.ok(pkg.dependencies[dependency],`Missing dependency ${dependency}`);
 }
});
test("shadcn/ui source contracts are present",()=>{
 for(const name of ["button","input","card","tabs","badge","label","separator","skeleton","textarea","select","dialog","sheet","command","checkbox"]){
  assert.ok(read(`components/ui/${name}.tsx`).includes("data-slot"),`${name} lacks shadcn data-slot convention`);
 }
 assert.match(read("components/ui/button.tsx"),/class-variance-authority/);
 assert.match(read("components/ui/button.tsx"),/asChild/);
});
test("Live pages use UI components instead of handmade select, modal or plain buttons",()=>{
 for(const path of ["components/docs-content.tsx","components/docs-shell.tsx","components/showcase.tsx","components/brand-switcher.tsx"]){
  const src=read(path);
  assert.ok(!/<button\b/.test(src),`Raw button in ${path}`);
  assert.ok(!/<select\b/.test(src),`Raw select in ${path}`);
  assert.ok(!/shadcn-style|shadcn-compatible/i.test(src),`Old placeholder terminology in ${path}`);
 }
 assert.match(read("components/docs-shell.tsx"),/CommandInput/);
 assert.match(read("components/docs-shell.tsx"),/SheetContent/);
 assert.match(read("components/brand-switcher.tsx"),/SelectTrigger/);
});
test("Brand portal styling and 5 weights remain in the token system",()=>{
 const css=read("src/styles/generated-tokens.css");
 const brand=read("components/brand-provider.tsx");
 for(const id of ["lunio","helix","sunset","bedding"])assert.ok(css.includes(`[data-brand="${id}"]`));
 for(const w of ["regular","medium","semibold","bold","heavy"])assert.match(css,new RegExp(`--font-weight-${w}:`));
 assert.ok(css.includes("--interactive-text:"));
 assert.ok(brand.includes("document.documentElement.dataset.brand=brand"),"Radix portals must inherit the active brand theme");
});
test("Real shadcn components are composed by the commerce patterns",()=>{
 for(const name of ["product-card","size-selector","pdp-sticky-bar","quantity-stepper","mobile-mega-menu"])
 assert.ok(existsSync(join(root,`components/commerce/${name}.tsx`)),`${name} missing`);
 const demo=read("components/docs-content.tsx");
 for(const item of ["<ProductCard","<SizeSelector","<PDPStickyBar","<QuantityStepper","<MobileMegaMenu"])
 assert.ok(demo.includes(item),`${item} not used in Documentation`);
});
