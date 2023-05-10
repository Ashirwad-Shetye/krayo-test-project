"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Login from "./login";
import Nav from "@/components/nav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Hero from "@/components/hero";
import Uploader from "@/components/uploader";
import Files from "@/components/files";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [signIsOpen, setSignIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Nav setSignIsOpen={setSignIsOpen} signIsOpen={signIsOpen} />
      {signIsOpen ? <Login /> : null}
      <SignedIn>
        <div className="w-full flex flex-col items-center justify-center space-y-8">
          <Uploader />
          <Files />
        </div>
      </SignedIn>
      <SignedOut>{signIsOpen ? null : <Hero />}</SignedOut>
    </main>
  );
}
