import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";

// This is where we receive webhook events to trigger sending a 
// deal out to customers
// The deal id is sent by the request
// This then goes and gets that id in the database 
// and sends it to the customer
export async function POST() {
  await connectMongo();

  return NextResponse.json({});
}
