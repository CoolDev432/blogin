import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID, Query } from "appwrite";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await database.createDocument(
      "blogin",
      "blogs",
      ID.unique(),
      {
        title: body.title,
        content: body.content,
        author: body.author,
        user_email: body.user_email,
        Likes: 0,
      }
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); 
    const userEmail = searchParams.get("email"); 

    if (!userEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const blogs = await database.listDocuments("blogin", "blogs", [
      Query.equal("user_email", userEmail),
    ]);

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;
  const deletion = await database.deleteDocument(
    'blogin',
    'blogs',
    id
  )
}