import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// This route is used to determine if the user has a current subscription.

export async function GET() {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ hasAccess: false }, { status: 401 });
    }
    
    try {
        // Connect to the MongoDB database
        await connectMongo();

        // Retrieve the user from the database
        const user = await User.findById(session?.user?.id);

        if (!user) {
            return NextResponse.json({ hasAccess: false }, { status: 404 });
        }
        
        const { hasAccess } = user;

        return new Response(JSON.stringify({ hasAccess: hasAccess }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ hasAccess: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
