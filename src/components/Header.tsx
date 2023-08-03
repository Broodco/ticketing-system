"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const { data: session, status } = useSession();
  const currentPathname = usePathname();
  const isActive: (pathname: string) => boolean = (pathname) =>
    currentPathname === pathname;

  let left = (
    <div>
      <Link href="/" data-active={isActive("/")}>
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    right = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div>
        <Link href="/api/auth/signin" data-active={isActive("/signup")}>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div>
        <Link href="/" data-active={isActive("/")}>
          Feed
        </Link>
        <Link href="/my-tickets" data-active={isActive("/my-tickets")}>
          My Tickets
        </Link>
      </div>
    );

    right = (
      <div>
        <p>
          {session.user?.name} ({session.user?.email})
        </p>
        <Link href="/create">
          <button>New post</button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log Out</a>
        </button>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
}
