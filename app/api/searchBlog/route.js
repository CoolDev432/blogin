import { NextResponse } from "next/server";
import database from "@/app/appwriteConf";
import { Query } from "appwrite";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const param = searchParams.get("param");
    const searchText = searchParams.get("searchedText");

    if (!param || !searchText) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const response = await database.listDocuments(
            'blogin',
            'blogs',
            [Query.equal(param.toLowerCase(), searchText)]
        );

        if (response.documents.length > 0) {
            return NextResponse.json(response);
        } else {
            return NextResponse.json({ message: "No Documents Found!" });
        }
    } catch (error) {
        console.error("Error fetching documents:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
