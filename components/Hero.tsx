import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import { DealCard } from "@/components/DealCard";
import config from "@/config";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Discover Unbeatable Deals On Award Travel
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Travel Luxuriously After Saving 50-80% On Flights Using Miles Or Credit Card Points.
        </p>
        <Link href="/#pricing" className="btn btn-primary btn-wide">
          Get {config.appName} Now!
        </Link>
        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full grid md:grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8">
        <DealCard destination="Paris" origin="Dallas" points={15000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Air-France-Logo-2009.jpg" carrier="Air France" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
        <DealCard destination="Bali" origin="Los Angeles" points={10000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo.png" carrier="Singapore Airlines" imageUrl="https://static.independent.co.uk/2023/06/02/12/iStock-1157937978.jpg" />
        <DealCard destination="Dubai" origin="London" points={70000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://i0.wp.com/onedayitinerary.com/wp-content/uploads/2017/04/Dubai.jpg?resize=723%2C482" />
        <DealCard destination="Madagascar" origin="New York" points={37500} cabinClass="Premium Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo.png" carrier="United" imageUrl="https://www.nationsonline.org/gallery/Madagascar/Allee-des-Baobabs-Madagascar.jpg" />
      </div>
    </section>
  );
};

export default Hero;
