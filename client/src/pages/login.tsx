"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

function Login() {
  return (
    <div>
      <SignIn redirectUrl={"/"} />
    </div>
  );
}

export default Login;
