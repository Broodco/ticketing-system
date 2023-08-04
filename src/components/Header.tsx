"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Comfortaa } from "next/font/google";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function Header() {
  const { data: session, status } = useSession();
  const currentPathname = usePathname();
  const isActive: (pathname: string) => boolean = (pathname) =>
    currentPathname === pathname;

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="flex justify-between items-center mx-auto px-4 text-gray-600 h-16 w-full max-w-7xl">
            <div className="flex gap-4">
              {/* Hamburger Menus */}
              <div className="-mr-2 flex items-center md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Left side */}
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className={`text-lg align-middle items-center flex mr-6 text-amber-500 font-semibold hover:text-amber-600 ${comfortaa.className}`}
                >
                  <Image
                    src={"ticket.svg"}
                    alt="Ticket logo"
                    height="40"
                    width="40"
                    className="mr-2 fill-amber-500 text-gray-200"
                  />
                  <h1 className="hidden md:block text-center h-full">
                    Ticketing System
                  </h1>
                </Link>
                <Link
                  href="/"
                  data-active={isActive("/")}
                  className="hover:text-amber-600 mr-6 hidden md:block"
                >
                  Board
                </Link>
                {session && (
                  <Link
                    href="/my-tickets"
                    data-active={isActive("/my-tickets")}
                    className="hover:text-amber-600 hidden md:block"
                  >
                    My Tickets
                  </Link>
                )}
              </div>
            </div>

            {/* Right side */}
            {status === "loading" ? (
              <div>
                <p>Validating session ...</p>
              </div>
            ) : session ? (
              <div className="flex justify-between">
                <div className="text-right hidden lg:block max-h-full mr-3">
                  <p className="text-sm">{session.user?.name}</p>
                  <p className="text-sm">({session.user?.email})</p>
                </div>
                {session.user?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user?.image}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full mr-6 hidden md:block"
                  />
                )}
                <Link href="/create" className="hover:text-amber-600 mr-6">
                  <button className="h-full bg-amber-600 py-2 px-4 rounded-lg text-amber-50 hover:bg-amber-500">
                    New ticket
                  </button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-amber-600 hidden md:block"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div>
                <Link href="/api/auth/signin" data-active={isActive("/signup")}>
                  Log in
                </Link>
              </div>
            )}
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2 flex flex-row">
              <Disclosure.Button as={Link} href={"/"}>
                Board
              </Disclosure.Button>
              <Disclosure.Button as={Link} href={"/my-tickets"}>
                My Tickets
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
