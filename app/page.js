"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Poppins, Luxurious_Roman } from "next/font/google";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TextHoverEffect } from "@/components/ui/text-hovertext-hover-effect";
import { SignUp, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Footer from "./dashboard/_components/Footer";
import { FeaturesSectionDemo } from "@/components/ui/grid";


gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const roman = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const span = useRef(null);
  const nav = useRef(null);
  const headings = useRef([]);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (span.current) {
      gsap.fromTo(
        span.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }

    if (nav.current) {
      gsap.fromTo(
        nav.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
      );
    }

    if (headings.current) {
      gsap.utils.toArray(headings.current).forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              end: "top 10%",
              scrub: true,
            },
          }
        );
      });
    }
  }, []);
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
    <div className="relative w-full overflow-visible h-auto">
      <BackgroundBeamsWithCollision>
        <h1
          ref={span}
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-300 text-center mt-6 px-4 ${poppins.className}`}
        >
          Write Blogs With Ease.
        </h1>
        <Navbar ref={nav} />
      </BackgroundBeamsWithCollision>

      <div className="flex justify-evenly items-center flex-col w-full mt-[50px]">
        <h1
          ref={headings}
          className={`${roman.className} text-7xl text-orange-500`}
        >
          Features
        </h1>
        <div className="flex justify-center">
        <FeaturesSectionDemo />
        </div>
      </div>
      <SignedOut>
        <div className="w-full p-3 my-6 rounded-4xl">
          <TextHoverEffect text={"Convinced?"} duration={0.03} />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1
            className={`${roman.className} text-5xl text-orange-600 mb-9`}
            ref={headings}
          >
            Create Your Account
          </h1>
          <div className="flex justify-evenly w-full items-center">
            <SignUp routing="hash" className={`${roman.className}`} />
          </div>
        </div>
      </SignedOut>
      <div className="flex justify-center mt-9">
        <Footer />
      </div>
    </div>
  );
}
