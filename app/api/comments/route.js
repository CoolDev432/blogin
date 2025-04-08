import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID, Query } from "appwrite";


export async function GET(req) {  
    const { searchParams } = new URL(req.url); 
    const blog_id = searchParams.get("blog_id"); 

    console.log(blog_id)
    
    const response = await database.listDocuments(
        'blogin',
        '67d417dd000cc7f4280c',
        [Query.equal('blog_id', blog_id)]
    )
    console.log(response)
    return NextResponse.json(response)
}