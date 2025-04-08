"use client";

import React, { forwardRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = forwardRef((props, ref) => {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.firstName,
        }),
      });
    }
  }, [isLoaded, user]);

  return (
    <div
      ref={ref}
      className="h-[80px] w-full md:w-[55vw] text-black rounded-3xl p-6 sm:p-9 mt-8 flex justify-evenly items-center border-2 border-orange-300 shadow-orange-300 shadow-2xl z-10 bg-white sticky top-0"
    >
      <div className="flex gap-7">
        <SignedIn>
          <div className="flex gap-2">
            <UserButton />
            <Link href={"/dashboard"} className="cursor-pointer">
              <Button variant={"outline"} className={"cursor-pointer"}>
                Dashboard
              </Button>
            </Link>
          </div>
          <SignOutButton>
            <Button variant={"destructive"} className={"cursor-pointer"}>
              Sign Out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>

      <SignedOut>
        <SignInButton>
          <Button className={"cursor-pointer"} variant={"destructive"}>
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className={"cursor-pointer"} variant={"destructive"}>
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
});

export default Navbar;
