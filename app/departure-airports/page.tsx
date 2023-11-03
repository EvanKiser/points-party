"use client";

import Header from "@/components/Header";

export const dynamic = "force-dynamic";

const handleDepartureAirportsSave = () => {
  console.log("handleDepartureAirportsSave")
  return ""
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function DepartureAirports() {
  return (
      <>
        <Header />
        <main className="min-h-screen p-8 pb-24">
          <section className="max-w-xl mx-auto space-y-8">
            <form className="bg-neutral-100 p-8 rounded-lg">
              <h1 className="text-3xl md:text-4xl font-extrabold">Departure Airports</h1>
              <p className="mt-4">Choose up to three departure airports to receive alerts for</p>
              <div className="flex flex-col space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Home Airport"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Search 2"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Search 3"
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary py-2 px-4 mt-4"
                onClick={handleDepartureAirportsSave}
              >
                Save
              </button>
            </form>
          </section>
        </main>
      </>
  );
}