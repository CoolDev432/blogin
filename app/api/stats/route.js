import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { Query } from "appwrite";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("email");

        if (!userEmail) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400  });
        }

        // Fetch user's blogs
        const docs = await database.listDocuments(
            'blogin',  
            'blogs',   
            [Query.equal('user_email', userEmail)]
        );


        // Fetch user's comments
        const comments = await database.listDocuments(
            'blogin',
            '67d417dd000cc7f4280c',
            [Query.equal('user_email', userEmail)]
        )
        return NextResponse.json({ success: true, docs: docs.documents, comments: comments.documents });

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
