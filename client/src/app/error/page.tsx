import React from "react";
import Image from "next/image";
import errorSVG from "public/media/error.svg";

export default function Error() {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-32 h-screen items-center lg:px-36 p-10">
      <div className="flex flex-col gap-2">
        <p className="font-octinsports text-9xl">Oops!</p>
        <p className="font-bravaslab text-5xl">
          We ran in to an error! If this persists, please contact
          proppko@milton.k12.wi.us.
        </p>
      </div>
      <Image
        className="xl:w-1/3 lg:w-1/2 md:w-3/4 w-full"
        priority
        draggable={false}
        src={errorSVG}
        alt="404"
      />
    </div>
  );
}
