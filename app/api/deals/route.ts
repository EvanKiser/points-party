import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Deal from "@/models/Deal";

// This is where we receive api requests confirming a new deal
// We then save the new deal in the db
export async function POST(req: NextRequest) {
  await connectMongo();

  // Parse the request body to get the selected airports
  const deal = await req.json();

  try {
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

    console.log("no saved")
    newDeal.save();
    console.log("saved")

    return NextResponse.json({"message": "Deal created" }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error' }, { status: 500 })
  }
}
