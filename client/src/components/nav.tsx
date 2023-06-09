"use client";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

function Nav({ setSignIsOpen, signIsOpen }: any) {
  return (
    <header className="w-full absolute flex items-center top-0 z-10 h-20 border-b border-gray-300">
      <div className="flex items-center justify-between w-full h-full px-10">
        <h1 className="text-xl font-semibold text-white">FileStore</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <button
            onClick={() => setSignIsOpen(!signIsOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Sign in
          </button>
        </SignedOut>
      </div>
    </header>
  );
}

export default Nav;
