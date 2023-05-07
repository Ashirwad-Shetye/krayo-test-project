"use client";

import React from "react";
import { UserButton, SignIn } from "@clerk/nextjs";

function Login() {
  return (
    <>
      <UserButton />
      <SignIn />
    </>
  );
}

export default Login;
