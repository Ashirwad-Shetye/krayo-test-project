"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./login";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Nav />
      <Login />
    </main>
  );
}
