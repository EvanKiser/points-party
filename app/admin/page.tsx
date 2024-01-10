"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import { DealCard } from "@/components/DealCard";

// Type definitions for the modal props
interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: DealFormData) => void;
}

// Type for form data
interface DealFormData {
  origin: string;
  destination: string;
  points: number;
  cabinClass: string;
  carrier: string;
  destinationImageURL: string;
}

// Modal Component
const NewDealModal: React.FC<NewDealModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<DealFormData>({
    origin: '',
    destination: '',
    points: 0,
    cabinClass: '',
    carrier: '',
    destinationImageURL: '',
  });
  const [showTestCard, setShowTestCard] = useState<boolean>(false);

  // Form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    onClose(); // Close the modal after submission
  };

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Test button handler
  const handleTest = () => {
    setShowTestCard(true);
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isOpen ? '' : 'hidden'}`}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">New Deal</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            {/* Form fields */}
            <input name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" className="block w-full px-4 py-2 mt-2 border rounded-md" />
            <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" className="block w-full px-4 py-2 mt-2 border rounded-md" />
            <input name="points" type="number" value={formData.points} onChange={handleChange} placeholder="Points" className="block w-full px-4 py-2 mt-2 border rounded-md" />
            <input name="cabinClass" value={formData.cabinClass} onChange={handleChange} placeholder="Cabin Class" className="block w-full px-4 py-2 mt-2 border rounded-md" />
            <input name="carrier" value={formData.carrier} onChange={handleChange} placeholder="Carrier" className="block w-full px-4 py-2 mt-2 border rounded-md" />
            <input
              name="destinationImageURL"
              value={formData.destinationImageURL}
              onChange={handleChange}
              placeholder="Destination Image URL"
              className="block w-full px-4 py-2 mt-2 border rounded-md"
            />
            <button type="button" onClick={handleTest} className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Test
            </button>
            <button type="submit" className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Submit
            </button>
          </form>
          <button onClick={onClose} className="mt-3 text-sm underline">
            Cancel
          </button>
          {/* DealCard Test Preview */}
          {showTestCard && (
            <DealCard
              destination={formData.destination}
              origin={formData.origin}
              points={formData.points}
              cabinClass={formData.cabinClass}
              carrierLogo="https://logos-world.net/wp-content/uploads/2023/01/Qantas-Logo.png" // Ensure this is set correctly
              carrier={formData.carrier}
              imageUrl={formData.destinationImageURL} // Ensure this matches your state field
            />
          )}
        </div>
      </div>
    </div>
  );
}

const Deals: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleNewDealSubmit = (newDealData: DealFormData) => {
    // Handle the new deal data here
    // You may want to add this to your state or send it to your server
    console.log(newDealData);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen p-8 pb-24 items-center justify-center">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Deals</h2>
          {/* Add Deal Button */}
          <button
            className="mb-8 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setModalOpen(true)}
          >
            Add New Deal
          </button>
          <div className="flex flex-wrap gap-8 justify-start">
            <DealCard destination="Paris" origin="Dallas" points={15000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Air-France-Logo-2009.jpg" carrier="Air France" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
            <DealCard destination="Bali" origin="Los Angeles" points={10000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo.png" carrier="Singapore Airlines" imageUrl="https://static.independent.co.uk/2023/06/02/12/iStock-1157937978.jpg" />
            <DealCard destination="Dubai" origin="London" points={100000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://i0.wp.com/onedayitinerary.com/wp-content/uploads/2017/04/Dubai.jpg?resize=723%2C482" />
            <DealCard destination="Madagascar" origin="New York" points={37500} cabinClass="Premium Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo.png" carrier="United" imageUrl="https://www.nationsonline.org/gallery/Madagascar/Allee-des-Baobabs-Madagascar.jpg" />
            <DealCard destination="Lisbon" origin="Chicago" points={22500} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2019/12/TAP-Portugal-Logo.png" carrier="TAP" imageUrl="https://www.portugal.com/wp-content/uploads/2022/01/Lisbon-Skyline-small.jpg" />
            <DealCard destination="Sydney" origin="San Francisco" points={22500} cabinClass="Economy" carrierLogo="https://logos-world.net/wp-content/uploads/2023/01/Qantas-Logo.png" carrier="Qantas Airlines" imageUrl="https://i.natgeofe.com/n/bd48279e-be5a-4f28-9551-5cb917c6766e/GettyImages-103455489cropped.jpg" />
            <DealCard destination="Tokyo" origin="Miami" points={60000} cabinClass="Business" carrierLogo="https://s202.q4cdn.com/986123435/files/doc_downloads/logos/american-airlines/THUMB-aa_aa__ahz_4cp_grd_pos-(1).png" carrier="American Airlines" imageUrl="https://a.cdn-hotels.com/gdcs/production65/d826/d42a8ade-b32e-436a-a51d-a9c32630d4f8.jpg" />
          <DealCard destination="Ibiza" origin="New York" points={37500} cabinClass="Premium Economy" carrierLogo="https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png" carrier="Delta" imageUrl="https://a.cdn-hotels.com/gdcs/production64/d142/a34f9d10-b69b-11e8-a095-0242ac11000d.jpg" />
          </div>
        </section>
      </main>
      {/* Modal */}
      <NewDealModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNewDealSubmit} />
    </>
  );
}

export default Deals;

