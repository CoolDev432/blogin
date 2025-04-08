import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";

const Navigation = ({ writeBlog, route }) => {
  const { openUserProfile } = useClerk();
  return (
    <div className="w-[70vw] rounded-2xl flex justify-evenly p-2 items-center bg-gradient-to-r from-purple-500 to-pink-500 flex-wrap">
      <Link
        href={route=='dashboard'?'/blogPage':'/dashboard'}
        className="text-white hover:bg-white hover:text-black p-2 rounded-xl transition-all cursor-pointer"
      >
        {route == "dashboard" ? "Blog Showcase" : "Dashboard"}
      </Link>
    {
      route=='dashboard'?
      <button
        className={
          "text-white hover:bg-red-600 p-2 rounded-xl transition-all cursor-pointer"
        }
        onClick={writeBlog}
      >
        Write a Blog!
      </button> :
      ''
    }
      <Link
        href={"/"}
        className="text-white hover:bg-white hover:text-black rounded-xl p-2 transition-all cursor-pointer"
      >
        <SignedIn>
          <SignOutButton className="cursor-pointer">
            Sign Out Of Your Account
          </SignOutButton>
        </SignedIn>
      </Link>
      <Button
        onClick={() => {
          openUserProfile();
        }}
        variant={"outline"}
        className={"cursor-pointer"}
      >
        Open Your Profile
      </Button>
    </div>
  );
};

export default Navigation;
