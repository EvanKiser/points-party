export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Deals() {
  return (
    <main className="min-h-screen p-8 pb-24 flex items-center justify-center">
        <section className="max-w-xl mx-auto space-y-8">
            <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Coming Soon</h3>
            </div>
        </section>
    </main>
  );
}