import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import connectMongo from "@/libs/mongoose";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import User from "@/models/User";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  await connectMongo();

  const { id } = session.user;

  const user = await User.findById(id);

  if (!user?.hasAccess) {
    return (
      <main className="min-h-screen p-8 pb-24 flex items-center justify-center">
          <section className="max-w-xl mx-auto space-y-8">
              <div className="flex flex-col items-center">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-4">You must be a paying subscriber to access this page</h3>
                  <Link href="/#pricing" className="btn btn-primary btn-wide">
                      Try {config.appName} Now!
                  </Link>
              </div>
          </section>
      </main>
    )
  }

  return <>{children}</>;
}
