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
      <main className="min-h-screen p-8 pb-24 flex items-center justify-center">
          <section className="max-w-xl mx-auto space-y-8">
              <div className="flex flex-col items-center">
                <DealCard destination="New York" origin="London" points={1000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
                <DealCard destination="New York" origin="London" points={1000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
                <DealCard destination="New York" origin="London" points={1000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
                <DealCard destination="New York" origin="London" points={1000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
                <DealCard destination="New York" origin="London" points={1000} cabinClass="First" carrierLogo="https://1000logos.net/wp-content/uploads/2020/03/Emirates-Logo.png" carrier="Emirates" imageUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg" />
              </div>
          </section>
      </main>
    </>
  );
}