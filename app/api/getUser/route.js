import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Query } from "appwrite";
import database from "@/app/appwriteConf";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {

        const userDocs = await database.listDocuments("blogin", "users", [
            Query.equal("email", email),
        ]);
        const appwriteUser = userDocs.documents[0] || null;

  
        const users = await clerkClient.users.getUserList({
            emailAddress: [email],
        });

        const clerkUser = users.length > 0 ? users[0] : null;
        console.log("Clerk User:", clerkUser); 

        const clerkProfileImage = clerkUser?.imageUrl || null;


        const userBlogs = await database.listDocuments(
            'blogin',
            'blogs',
            [Query.equal('user_email', email)]
        );
        const blogs = userBlogs.documents;

        return NextResponse.json({ 
            appwriteUser, 
            clerkProfileImage,
            blogs
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
