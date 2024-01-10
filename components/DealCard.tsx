import Image from "next/image";
interface DealCardProps {
    destination: string;
    origin: string;
    points: number;
    cabinClass: string;
    carrier: string;
  }
  
  export const DealCard = ({
    destination,
    origin,
    points,
    cabinClass,
    carrier,
  }: DealCardProps) => {
    const carrierLogoPath = `/carrierLogos/${carrier.toLowerCase()}.png`;
    const destinationImagePath = `/destinationImages/${destination.toLowerCase()}.jpg`;
    return (
      <div className="w-72 border border-gray-300 rounded overflow-hidden bg-orange-50 relative" style={{ borderRadius: '5%' }}>
        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${destinationImagePath})` }}>
          <div className="absolute bottom-0 left-0 mb-2.5 ml-2.5 bg-white bg-opacity-85 px-2 py-1 rounded">{cabinClass}</div>
        </div>
        <div className="p-2.5">
          <div className="bg-white rounded-lg px-4 py-2 flex justify-between items-center w-11/12 max-w-xs mx-auto mb-2">
            <Image src={carrierLogoPath} alt={carrier} className="h-8" />
            <div className="text-xl font-bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {points.toLocaleString()} Points
            </div>
          </div>
          <div className="bg-white rounded-lg px-4 py-1 flex justify-between items-center w-11/12 max-w-xs mx-auto">
            <span className="font-semibold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{origin}</span>
            <span className="text-xl font-bold mx-2">→</span>
            <span className="font-semibold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{destination}</span>
          </div>
        </div>
      </div>
    );
  };
  
  