import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID, Query } from "appwrite";

export async function GET(req) {  
  try {
    const { searchParams } = new URL(req.url); 
    const email = searchParams.get("email");
    const blog_id = searchParams.get("blog_id");
    const title = searchParams.get("title");
    const content = searchParams.get("content"); 
    const author = searchParams.get("author"); 

    if (!email || !blog_id || !title || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    const response1 = await database.listDocuments(
      "blogin",
      "likes",
      [
        Query.equal("user_email", email),
        Query.equal("blog_id", blog_id)
      ]
    );

    if (response1.documents.length > 0) {
      return NextResponse.json({ alreadyLiked: true });
    } 

  
    const blogDoc = await database.getDocument("blogin", "blogs", blog_id);
    const updatedLikes = (blogDoc.Likes || 0) + 1;

    const response2 = await database.updateDocument(
      'blogin',
      'blogs',
      blog_id,
      {
        title: title,
        content: content,
        user_email: email,
        author: author,
        Likes: updatedLikes
      }
    );
    

    const response = await database.createDocument(
      "blogin",
      "likes",
      ID.unique(),
      {
        user_email: email,
        blog_id: blog_id,
      }
    );

    return NextResponse.json(response);
  
  } catch (error) {
    console.error("Error in /api/handleLikes:", error); 
    return NextResponse.json({ error: error.message }, { status: 500 }); 
  }
}
