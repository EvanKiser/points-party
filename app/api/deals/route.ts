import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Deal from "@/models/Deal";

// This is where we receive api requests confirming a new deal
// We then save the new deal in the db
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const deal = await req.json();
    const { origin, destination, carrier, cost_in_points, deal_found_date, deal_end_date } = deal;
    // Create a new deal using the form data from the request body
    const newDeal = await Deal.create({
      origin,
      destination,
      carrier,
      cost_in_points,
      deal_found_date: deal_found_date || undefined, // Use provided value or leave undefined to use default
      deal_end_date: deal_end_date || undefined // Use provided value or leave undefined to use default
    });

    newDeal.save();

    return NextResponse.json({"message": "Deal created" }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectMongo();

    // Retrieve all deals from the database
    const deals = await Deal.find({}).sort({deal_found_date: -1});

    if (!deals) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return new Response(JSON.stringify({ deals }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
