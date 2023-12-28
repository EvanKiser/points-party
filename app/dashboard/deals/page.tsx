import Header from "@/components/Header";
import { DealCard } from "@/components/DealCard";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Deals() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8 pb-24 items-center justify-center">
        <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Deals</h2>
        <div className="flex flex-wrap gap-8 justify-start">
            <DealCard destination="Paris" origin="Dallas" points={15000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Air-France-Logo-2009.jpg" carrier="Air France" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
            <DealCard destination="Bali" origin="Los Angeles" points={10000} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo.png" carrier="Singapore Airlines" imageUrl="https://static.independent.co.uk/2023/06/02/12/iStock-1157937978.jpg" />
            <DealCard destination="Dubai" origin="London" points={100000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://i0.wp.com/onedayitinerary.com/wp-content/uploads/2017/04/Dubai.jpg?resize=723%2C482" />
            <DealCard destination="Madagascar" origin="New York" points={37500} cabinClass="Premium Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo.png" carrier="United" imageUrl="https://www.nationsonline.org/gallery/Madagascar/Allee-des-Baobabs-Madagascar.jpg" />
            <DealCard destination="Lisbon" origin="Chicago" points={22500} cabinClass="Economy" carrierLogo="https://1000logos.net/wp-content/uploads/2019/12/TAP-Portugal-Logo.png" carrier="TAP" imageUrl="https://www.portugal.com/wp-content/uploads/2022/01/Lisbon-Skyline-small.jpg" />
            <DealCard destination="Sydney" origin="San Francisco" points={22500} cabinClass="Economy" carrierLogo="https://logos-world.net/wp-content/uploads/2023/01/Qantas-Logo.png" carrier="Qantas Airlines" imageUrl="https://i.natgeofe.com/n/bd48279e-be5a-4f28-9551-5cb917c6766e/GettyImages-103455489cropped.jpg" />
            <DealCard destination="Tokyo" origin="Miami" points={60000} cabinClass="Business" carrierLogo="https://s202.q4cdn.com/986123435/files/doc_downloads/logos/american-airlines/THUMB-aa_aa__ahz_4cp_grd_pos-(1).png" carrier="American Airlines" imageUrl="https://a.cdn-hotels.com/gdcs/production65/d826/d42a8ade-b32e-436a-a51d-a9c32630d4f8.jpg" />
            <DealCard destination="Ibiza" origin="New York" points={37500} cabinClass="Premium Economy" carrierLogo="https://assets.stickpng.com/images/61586b0b258f1e000415490d.png" carrier="Delta" imageUrl="https://a.cdn-hotels.com/gdcs/production64/d142/a34f9d10-b69b-11e8-a095-0242ac11000d.jpg" />
          </div>
        </section>
      </main>
    </>
  );
}