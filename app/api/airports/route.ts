import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// This route is used to update users airport selections in the database.
// The API call is initiated by <DepartatureAirportsForm />
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(session)
    
    try {
        // Connect to the MongoDB database
        await connectMongo();

        // Retrieve the user from the database
        const user = await User.findById(session?.user?.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
        // Parse the request body to get the selected airports
        const selectedAirports = await req.json();
        if (!selectedAirports) {
            return NextResponse.json({ error: "Selected airports not provided" }, { status: 400 });
        }

        // Update the user's selectedAirports field
        user.selectedAirports = selectedAirports;
        
        // Save the updated user to the database
        console.log("here")
        await user.save();
        console.log("now here")
        // Return a successful response
        return NextResponse.json({ message: "Departure Airports updated successfully" }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
        // Connect to the MongoDB database
        await connectMongo();

        // Retrieve the user from the database
        const user = await User.findById(session?.user?.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const { departureAirports } = user;
        console.log(departureAirports)
        return new Response(JSON.stringify({ departureAirports }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
