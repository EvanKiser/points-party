import Image from "next/image";
import Link from "next/link";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            The only thing better than going on vacation is flying there in first class for free.
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Let Points Party show you how
          </p>
          <Link
            href="/departure-airports"
            title="Departure Airports"
          >
          <button className="btn btn-primary btn-wide">Try {config.appName} Now!</button>
        </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
