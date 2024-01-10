import Header from "@/components/Header";
import { DealCard } from "@/components/DealCard";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Deals() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8 pb-24 items-center justify-center">
        <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Deals</h2>
        <div className="flex flex-wrap gap-8 justify-start">
            <DealCard destination="Paris" origin="Dallas" points={15000} cabinClass="Economy" carrier="AirFrance" />
            <DealCard destination="Bali" origin="Los Angeles" points={10000} cabinClass="Economy" carrier="Singapore" />
            <DealCard destination="Dubai" origin="London" points={100000} cabinClass="First" carrier="Emirates" />
            <DealCard destination="Madagascar" origin="New York" points={37500} cabinClass="Premium Economy" carrier="United" />
            <DealCard destination="Lisbon" origin="Chicago" points={22500} cabinClass="Economy" carrier="TAP" />
            <DealCard destination="Sydney" origin="San Francisco" points={22500} cabinClass="Economy" carrier="Qantas" />
            <DealCard destination="Tokyo" origin="Miami" points={60000} cabinClass="Business" carrier="American" />
            <DealCard destination="Ibiza" origin="New York" points={37500} cabinClass="Premium Economy" carrier="Delta" />
          </div>
        </section>
      </main>
    </>
  );
}