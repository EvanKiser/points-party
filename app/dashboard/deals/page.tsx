"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { DealCard } from "@/components/DealCard";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Call getDeals when the component mounts
    getDeals();
  }, []); // The empty array ensures this effect only runs once after the initial render

  const getDeals = async () => {
    try {
        const response = await fetch('/api/deals');
        if (!response.ok) {
            throw new Error('Failed to fetch deals');
        }
        const data = await response.json();

        setDeals(data.deals);
    } catch (error) {
        console.error('Error fetching airports:', error);
        // Handle the error state as appropriate
    }
  };
  return (
    <>
      <Header />
      <main className="min-h-screen p-8 pb-24 items-center justify-center">
        <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Deals</h2>
        <div className="flex flex-wrap gap-8 justify-start">
          {deals.map(deal => (
              <DealCard origin={deal.origin} destination={deal.destination} points={deal.cost_in_points} cabinClass={deal.cabinClass} carrier={deal.carrier} isAdmin={true} />
          ))}
          </div>
        </section>
      </main>
    </>
  );
}