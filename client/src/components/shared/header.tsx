"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsList, BsX } from "react-icons/bs";
import Image from "next/image";
import { Button } from "./button";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default function Header() {
  const scrollPosition = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header
      className={`bg-background sticky top-0 z-50 transition-shadow ${
        scrollPosition > 0 ? "drop-shadow-md" : "shadow-none"
      }`}
    >
      {/* Desktop */}
      <div className="max-md:hidden flex items-center border-flex-row w-full justify-between p-4">
        <a href="/">
          <Image
            priority
            draggable={false}
            src="/media/logo.png"
            width={250}
            height={415}
            alt="Logo"
          />
        </a>
        <div className="flex gap-7">
          <Button asChild variant="ghost">
            <Link href="calculator">Calculate</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="tutorial">Tutorial</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="about">About</Link>
          </Button>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link href="#">Login</Link>
        </Button>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center border-flex-row w-full justify-between p-4">
        <a href="/">
          <Image
            priority
            draggable={false}
            src="/media/logo.png"
            width={200}
            height={415}
            alt="Logo"
          />
        </a>
        <BsList onClick={toggleMenu} className="fill-secondary text-xl m-2" />
      </div>
      <div
        className={
          menuOpen
            ? "fixed top-0 right-0 w-[60%] md:hidden h-screen bg-foreground p-10 ease-in-out duration-500"
            : "fixed right-[-100%] top-0 p-10 h-screen ease-in-out duration-500"
        }
      >
        <div className="flex w-full items-center justify-end">
          <div className="cursor-pointer">
            <BsX onClick={toggleMenu} className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4 text-white">
          <Button asChild variant="ghost">
            <Link href="#">Calculate</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="#">Tutorial</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="#">About</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="#">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
