import config from "@/config";
import Link from "next/link";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Spreadsheets() {
  return (
    <main className="min-h-screen p-8 pb-24 flex items-center justify-center">
        <section className="max-w-xl mx-auto space-y-8">
            <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
                    The Cheapest Award Travel Per Month Per Airline Per Cabin Class For Hundreds Of Routes
                </h3>
                <Link href="https://docs.google.com/spreadsheets/d/1551UOgUnN3mdI-ZmKZOEAUtspo3oak8OjDvoweaQvnM/" className="btn btn-primary btn-wide">
                    Click Here To Access Award Travel Spreadsheets
                </Link>
            </div>
        </section>
    </main>
  );
}