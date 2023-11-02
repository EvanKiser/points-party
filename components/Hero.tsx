import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
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
          Try {config.appName} For Free
        </Link>
        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="/hero-image.png"
          alt="Four Deal Cards"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
