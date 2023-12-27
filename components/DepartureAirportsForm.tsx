import React from "react";
import { useState, useEffect } from "react";
import config from "@/config";
import { AirportCombobox } from "./AirportComboBox";
import ButtonCheckout from "./ButtonCheckout";

type Airport = {
    iataCode: string
    name: string
    tzName: string
    popularity: number
}

type BannerType = 'error' | 'success' | null;

export const DepartureAirportsForm = () => {
    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [banner, setBanner] = useState<{ type: BannerType; message: string }>({ type: null, message: '' });
    const [query, setQuery] = useState<string>("");

    const airports: Airport[] = require('../public/data/departure_airports.json');

    useEffect(() => {
        // Call getAirports when the component mounts
        getAirports();
    }, []); // The empty array ensures this effect only runs once after the initial render

    useEffect(() => {
        // Call getHasAccess when the component mounts
        getHasAccess();
    }, []); // The empty array ensures this effect only runs once after the initial render

    useEffect(() => {
        if (banner.type) {
          const timer = setTimeout(() => {
            setBanner({ type: null, message: '' });
          }, 3000);
          return () => clearTimeout(timer);
        }
    }, [banner]);

    const getAirports = async () => {
        try {
            const response = await fetch('/api/airports');
            if (!response.ok) {
                throw new Error('Failed to fetch airports');
            }
            const data = await response.json();

            setDepartureAirports(data.departureAirports);
            console.log(data.departureAirports)
        } catch (error) {
            console.error('Error fetching airports:', error);
            // Handle the error state as appropriate
        }
    };

    const getHasAccess = async () => {
        try {
            const response = await fetch('/api/access');
            if (!response.ok) {
                throw new Error('Failed to fetch airports');
            }
            const data = await response.json();
            console.log(data)
            setHasAccess(data.hasAccess);
        } catch (error) {
            console.error('Error fetching access:', error);
            setHasAccess(false);
        }
    };

    const saveAirports = async (departureAirports: string[]) => {
        try {
          const response = await fetch('/api/airports', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(departureAirports),
          });
          console.log(response)
          if (response.status === 400) {
            setBanner({ type: 'error', message: 'Error: Could not save selections. Be sure to select at least one airport.' });
            return;
          }
    
          if (response.status === 200) {
            setBanner({ type: 'success', message: 'Airports have been saved successfully!' });
            // Handle any other success operations here if necessary
            return;
          }
    
          // If we get here, it's neither a 200 nor a 400, so handle accordingly
          setBanner({ type: 'error', message: 'An unexpected error occurred.' });
        } catch (error) {
          console.error('Error saving airports:', error);
          setBanner({ type: 'error', message: 'Error: Could not connect to the server.' });
        }
      };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // if (departureAirports.length === 0 || departureAirports[0] === "") {
        //     // If no selection was made, handle it accordingly (e.g., showing an error message)
        //     console.log("Please select at least one airport.");
        //     return;
        // }

        console.log("Departure Airports:", departureAirports);
        saveAirports(departureAirports);
    }

    const handleSelectChange = (index: number, newValue: string) => {
        // Create a new array with the updated value at the specific index
        const updatedAirports = [...departureAirports];
        updatedAirports[index] = newValue;
        setDepartureAirports(updatedAirports);
    };

    const comboboxLabels = ["Home Airport", "Optional", "Optional"];

    const bannerStyle: React.CSSProperties = {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: 'auto',
        maxWidth: '90%', // prevent the banner from stretching too far on large screens
        fontSize: '1rem',
        color: 'white'
      };

    return (
    <>
        {banner.type && (
            <div
            style={{
                ...bannerStyle,
                backgroundColor: banner.type === 'error' ? '#f44336' : '#4caf50', // red for error, green for success
            }}
            >
            {banner.message}
            </div>
        )}
        <form className="bg-neutral-100 p-8 rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-extrabold">Departure Airports</h1>
            <p className="mt-4">Choose up to three departure airports to receive alerts</p>
            <div className="flex flex-col space-y-4 mt-4">
            {[0, 1, 2].map((index) => (
                <div key={index} className="mb-2">
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        {comboboxLabels[index]}
                    </label>
                    <AirportCombobox       
                        airports={airports}
                        selectedAirport={departureAirports[index] || ""}
                        onAirportChange={(newAirport) => handleSelectChange(index, newAirport)}
                        query={query}
                        setQuery={setQuery}
                        includeNoneOption={index !== 0}
                    />
                </div>
            ))}
            </div>
            <div className={`mt-4 ${!hasAccess ? 'flex' : ''}`}>
                <button
                    type="submit"
                    className={`btn btn-primary py-2 px-4 ${!hasAccess ? 'w-1/2 mr-2' : 'w-full'}`}
                    onClick={handleSubmit}
                >
                    Save
                </button>
                {!hasAccess && (
                    <div className="w-1/2">
                        <ButtonCheckout
                            priceId={config.stripe.plans[0].priceId}
                            mode={'subscription'}
                        />
                    </div>
                )}
            </div>
        </form>
    </>
    )
}
