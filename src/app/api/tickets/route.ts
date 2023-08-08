import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const token = await getToken({ req });
  console.log(token);
  if (session && session.user) return new Response(" Ok You Have Logged In!");

  return new Response("unauthorized", { status: 401 });
}
