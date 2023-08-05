import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export async function POST(request: Request) {
  const res = await request.json();
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    console.log("Not signed in");
  }
  console.log(session);

  redirect("/");
}
