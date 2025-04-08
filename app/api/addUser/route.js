import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { ID, Query } from "appwrite";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔹 Check if the user already exists
    const res = await database.listDocuments("blogin", "users", [
      Query.equal("email", body.email), 
    ]);

    if (res.documents.length > 0) {
      // User already exists, return the existing user data
      return NextResponse.json(
        { success: true, data: res.documents[0] },
        { status: 200 }
      );
    }

    // 🔹 Create a new user
    const newUser = await database.createDocument(
      "blogin",
      "users",
      ID.unique(),
      {
        user_name: body.name,
        email: body.email,
      }
    );

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
