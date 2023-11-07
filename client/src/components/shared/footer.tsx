"use client";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="bg-foreground text-center md:text-left p-10 flex md:flex-row justify-between flex-col gap-8">
      <div className="flex flex-col self-center gap-1 md:w-full">
        <p className="font-octinsports text-2xl text-white">mhs laude</p>
        <p className="font-bravaslabs text-xl text-gray-400">
          MHS Laude is dedicated to supporting every MHS student.
        </p>
      </div>
      <div className="flex flex-row justify-center gap-3 text-white md:items-end">
        <CgWebsite
          size={25}
          className="hover:text-primary"
          onClick={() => window.open("https://www.milton.k12.wi.us/", "_blank")}
        />
        <BsFacebook
          size={25}
          className="hover:text-primary"
          onClick={() =>
            window.open("https://www.facebook.com/SchDistofMilton/", "_blank")
          }
        />
        <BsYoutube
          size={25}
          className="hover:text-primary"
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UC-6fUBVDMUq_9eTjjpeTcWg",
              "_blank"
            )
          }
        />
        <BsTwitter
          size={25}
          className="hover:text-primary"
          onClick={() =>
            window.open("https://twitter.com/SchDistofMilton", "_blank")
          }
        />
        <BsInstagram
          size={25}
          className="hover:text-primary"
          onClick={() =>
            window.open(
              "https://www.instagram.com/milton_school_district/?hl=en",
              "_blank"
            )
          }
        />
      </div>
    </footer>
  );
}
