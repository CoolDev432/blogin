import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID } from "appwrite";

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await database.createDocument(
      "blogin",
      "67d417dd000cc7f4280c",
      ID.unique(),
      {
        blog_id: body.blog_id,
        name: body.name,
        comment: body.comment,
        user_email: body.email
      }
    );

    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
