import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Airport = {
    iataCode: string
    name: string
    tzName: string
    popularity: number
}

export const DepartureAirportsForm = () => {
    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [isTouched, setIsTouched] = useState(false); // New state to track if the form was touched
    const [query, setQuery] = useState<string>("");

    const airports: Airport[] = require('../public/data/departure_airports.json');

    const filteredAirports =
        query === ''
            ? airports
            : airports.filter((airport) =>
                airport.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')) ||
                airport.iataCode.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
            );

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
        setIsTouched(true); // Set touched to true when the form is submitted

        if (departureAirports.length === 0 || departureAirports[0] === "") {
            // If no selection was made, handle it accordingly (e.g., showing an error message)
            console.log("Please select at least one airport.");
            return;
        }

        console.log("Departure Airports:", departureAirports);
        saveAirports(departureAirports);
    }

    // Function to handle changing a specific airport in the departureAirports array
    const handleSelectChange1 = (newValue: string) => {
        // Create a new array with the updated value at the specific index
        const updatedAirports = [...departureAirports];
        updatedAirports[0] = newValue;
        setDepartureAirports(updatedAirports);
        return updatedAirports[0];
    };

    const handleSelectChange = (index: number, newValue: string) => {
        // Create a new array with the updated value at the specific index
        const updatedAirports = [...departureAirports];
        updatedAirports[index] = newValue;
        setDepartureAirports(updatedAirports);
    };

    // Function that returns the airport name or "Home Airport" if the airport code is empty
    const displayValue = (airportCode: string) => {
        if (airportCode === "" && departureAirports.length === 0) {
            return "Home Airport";
        }
        return airports.find((airport) => airport.iataCode === airportCode)?.name || '';
    };

    const airportOptions = filteredAirports.map((airport: Airport) => (
        <option key={airport.iataCode} value={airport.iataCode}>{`${airport.iataCode} ${airport.name}`}</option>
    ));

    // Dynamically set the class for the select elements based on whether they have been touched and are required
    const selectClass = (isTouched && departureAirports.length === 0) ? "select w-full max-w-xs border-red-500" : "select w-full max-w-xs";
    return (
        <form className="bg-neutral-100 p-8 rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-extrabold">Departure Airports</h1>
            <p className="mt-4">Choose up to three departure airports to receive alerts</p>
            <div className="flex flex-col space-y-4 mt-4">
                <Combobox value={departureAirports[0] || "Home Airport"} onChange={handleSelectChange1}>
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input 
                            displayValue={displayValue}
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            onChange={(event) => setQuery(event.target.value)} 
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredAirports.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredAirports.map((airport) => (
                                <Combobox.Option
                                    key={airport.iataCode}
                                    className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                    }`
                                    }
                                    value={airport.iataCode}
                                >
                                    {({ selected, active }) => (
                                    <>
                                        <span
                                        className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                        }`}
                                        >
                                        {airport.iataCode} {airport.name}
                                        </span>
                                        {selected ? (
                                        <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-teal-600'
                                            }`}
                                        >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        ) : null}
                                    </>
                                    )}
                                </Combobox.Option>
                                ))
                            )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            {[0, 1, 2].map((index) => (
                <select
                    key={index}
                    required
                    className={selectClass}
                    value={departureAirports[index] || ""}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                >
                    {index === 0 ? <option value="" disabled selected hidden>Home Airport</option> : <option value="">None</option>}
                    {airportOptions}
                </select>
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
