"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const [nav, setNav] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div className="font-bravaslabs absolute left-0 top-0 z-50 ease-in duration-300">
      <div
        className={`m-auto flex w-screen justify-between items-center px-8 py-5 text-white ${
          scrollPosition > 0
            ? "fixed drop-shadow-md bg-background"
            : "fixed shadow-none"
        }`}
      >
        <Link href="/">
          <Image
            priority
            draggable={false}
            src="/media/logo.png"
            alt="logo"
            width={250}
            height={250}
          />
        </Link>
        <ul className="hidden text-black sm:flex">
          <li className="p-4 hover:text-primary">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="/calculator">Calculator</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="/tutorial">Tutorial</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="/about">About</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-50">
          {nav ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu color="black" size={20} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden z-40 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-primary text-center ease-in duration-300"
              : "sm:hidden z-40 absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-primary text-center ease-in duration-300"
          }
        >
          <ul>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/calculator">Calculator</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/tutorial">Tutorial</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
