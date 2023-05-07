import React from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

function Nav() {
  return (
    <header className="w-full absolute flex items-center top-0 z-10 h-20 border-b border-gray-300">
      <div className="flex items-center justify-between w-full h-full px-10">
        <h1 className="text-xl font-semibold">FileStore</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Nav;
