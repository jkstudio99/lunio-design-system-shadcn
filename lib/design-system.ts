import tokens from "@/src/design-system/tokens.json";
export { tokens };
export type BrandId = keyof typeof tokens.brands;
export type TypeRole = keyof typeof tokens.typography;
export const brands = Object.entries(tokens.brands).map(([key,value])=>({id:key as BrandId,...value}));
export const roleNames = Object.keys(tokens.typography) as TypeRole[];
export const docsNav: ReadonlyArray<{group:string;links:ReadonlyArray<{slug:string;title:string;number:string}>}> = [
 {group:"INTRODUCTION",links:[{slug:"getting-started",title:"Getting started",number:"00"},{slug:"brands",title:"Brand foundations",number:"01"}]},
 {group:"FOUNDATIONS",links:[{slug:"typography",title:"Typography",number:"02–03"},{slug:"colors",title:"Colors & semantics",number:"04"},{slug:"spacing",title:"Spacing & layout",number:"05"},{slug:"icons",title:"Icons & iconography",number:"06"},{slug:"custom-icons",title:"Custom icons studio",number:"07"}]},
 {group:"COMPONENTS",links:[{slug:"components",title:"Core UI components",number:"08"},{slug:"commerce",title:"Commerce patterns",number:"09"}]},
 {group:"STANDARDS",links:[{slug:"accessibility",title:"Accessibility",number:"10"},{slug:"release",title:"Production release",number:"11"},{slug:"changelog",title:"Changelog & versions",number:"12"},{slug:"source",title:"Full DESIGN.md",number:"MD"}]}
];
export const allDocs=docsNav.flatMap(x=>x.links);
export function contrastRatio(a:string,b:string){const L=(h:string)=>{const x=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*x[0]+.7152*x[1]+.0722*x[2];};const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
