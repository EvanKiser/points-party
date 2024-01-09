import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import connectMongo from "@/libs/mongoose";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Custom404 from "@/app/not-found";

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

  const { email } = session.user;
  if (email != "kiser.evan1@gmail.com")
    return Custom404()
  
  return <>{children}</>;
  
}
