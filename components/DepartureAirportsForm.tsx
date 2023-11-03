export const DepartureAirportsForm = () => {
    const handleSubmit = () => {

    }
    return (
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
                placeholder="Additional Aiport 1"
                className="border border-gray-300 rounded-lg p-2"
            />
            <input
                type="text"
                placeholder="Additional Aiport 2"
                className="border border-gray-300 rounded-lg p-2"
            />
            </div>
            <button
                type="submit"
                className="btn btn-primary py-2 px-4 mt-4"
                onClick={handleSubmit}
            >
                Save
            </button>
            </form>
}