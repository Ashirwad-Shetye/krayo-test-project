"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Login from "./login";
import Nav from "@/components/nav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Hero from "@/components/hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [signIsOpen, setSignIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Nav setSignIsOpen={setSignIsOpen} />
      {signIsOpen ? <Login /> : null}
      <SignedIn></SignedIn>
      <SignedOut>
        <Hero />
      </SignedOut>
    </main>
  );
}
