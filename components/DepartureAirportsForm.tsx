import React from "react";
import { useState, useEffect } from "react";
import { AirportCombobox } from "./AirportComboBox";

type Airport = {
    iataCode: string
    name: string
    tzName: string
    popularity: number
}

export const DepartureAirportsForm = () => {
    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [query, setQuery] = useState<string>("");

    const airports: Airport[] = require('../public/data/departure_airports.json');

    useEffect(() => {
        // Call getAirports when the component mounts
        getAirports();
    }, []); // The empty array ensures this effect only runs once after the initial render

    const getAirports = async () => {
        try {
            const response = await fetch('/api/airports');
            if (!response.ok) {
                throw new Error('Failed to fetch airports');
            }
            const data = await response.json();

            setDepartureAirports(data.departureAirports);
        } catch (error) {
            console.error('Error fetching airports:', error);
            // Handle the error state as appropriate
        }
    };

    const saveAirports = async (departureAirports: string[]) => {
        await fetch('/api/airports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(departureAirports),
        });
      
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (departureAirports.length === 0 || departureAirports[0] === "") {
            // If no selection was made, handle it accordingly (e.g., showing an error message)
            console.log("Please select at least one airport.");
            return;
        }

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

    return (
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
                    />
                </div>
            ))}
            </div>
            <button
                type="submit"
                className="btn btn-primary py-2 px-4 mt-4 w-full"
                onClick={handleSubmit}
            >
                Save
            </button>
        </form>
    )
}
