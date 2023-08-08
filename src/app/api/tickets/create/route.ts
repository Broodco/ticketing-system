import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  //const token = await getToken({ req: request });
  const cookiesList = cookies();
  const headersList = await headers();
  console.log("headers : ", headersList.get("Authorization"));
  console.log("cookies : ", cookiesList.getAll());
  console.log("session: ", session);

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
