import { useState } from "react";

type Airport = {
    iataCode: string
    name: string
    tzName: string
    popularity: number
}

export const DepartureAirportsForm = () => {
    const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
    const [isTouched, setIsTouched] = useState(false); // New state to track if the form was touched

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsTouched(true); // Set touched to true when the form is submitted

        if (selectedAirports.length === 0 || selectedAirports[0] === "") {
            // If no selection was made, handle it accordingly (e.g., showing an error message)
            console.log("Please select at least one airport.");
            return;
        }

        console.log("Selected Airports:", selectedAirports);
        // Further processing...
    }

    const airports: Airport[] = require('../public/data/departure_airports.json');
    const airportOptions = airports.map((airport: Airport) => (
        <option key={airport.iataCode} value={airport.iataCode}>{`${airport.iataCode} ${airport.name}`}</option>
    ));

    // Dynamically set the class for the select elements based on whether they have been touched and are required
    const selectClass = (isTouched && selectedAirports.length === 0) ? "select w-full max-w-xs border-red-500" : "select w-full max-w-xs";
    return (
        <form className="bg-neutral-100 p-8 rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-extrabold">Departure Airports</h1>
            <p className="mt-4">Choose up to three departure airports to receive alerts</p>
            <div className="flex flex-col space-y-4 mt-4">
                <select
                    required
                    className={selectClass}
                    value={selectedAirports[0] || ""}
                    onChange={(e) =>
                        setSelectedAirports([e.target.value])
                    }
                >
                    <option value="" disabled selected hidden>Home Airport</option>
                    {airportOptions}
                </select>
                <select className="select w-full max-w-xs">
                    <option value="" disabled selected hidden>Optional</option>
                    {airportOptions}
                </select>
                <select className="select w-full max-w-xs">
                    <option value="" disabled selected hidden>Optional</option>
                    {airportOptions}
                </select>
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
