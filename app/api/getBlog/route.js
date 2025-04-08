import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID, Query } from "appwrite";


export async function GET() {
    const response = await database.listDocuments(
        'blogin',
        'blogs'
    )
    return NextResponse.json(response.documents)
} 