import React from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Airport = {
  iataCode: string;
  name: string;
};

interface AirportComboboxProps {
  airports: Airport[];
  selectedAirport: string;
  // eslint-disable-next-line no-unused-vars
  onAirportChange: (newAirport: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const AirportCombobox: React.FC<AirportComboboxProps> = ({
  airports,
  selectedAirport,
  onAirportChange,
  query,
  setQuery
}) => {
  const filteredAirports =
    query === ''
      ? airports
      : airports.filter(
          (airport) =>
            airport.name.toLowerCase().includes(query.toLowerCase()) ||
            airport.iataCode.toLowerCase().includes(query.toLowerCase())
        );

  const displayValue = (airportCode: string) => {
    const airport = airports.find((airport) => airport.iataCode === airportCode);
    return airport ? `${airport.iataCode} - ${airport.name}` : '';
  };

  return (
    <Combobox value={selectedAirport} onChange={onAirportChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            displayValue={displayValue}
            className="w-full border-none py-3 pl-3 pr-10 text-sm leading-6 font-semibold text-gray-900 focus:ring-0" // Increased padding for height and made text bold
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
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
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {airport.iataCode + " - " + airport.name}
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
  );
};
