import {notFound} from "next/navigation";
import {allDocs} from "@/lib/design-system";
import {DocsContent} from "@/components/docs-content";
export function generateStaticParams(){return allDocs.filter(x=>x.slug!=="source").map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=allDocs.find(x=>x.slug===slug);return {title:item?.title??'Documentation'};}
export default async function DocsPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!allDocs.some(x=>x.slug===slug&&slug!=="source"))notFound();return <DocsContent slug={slug}/>;}
