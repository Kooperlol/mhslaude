import React from "react";
import Image from "next/image";
import notFoundSVG from "../../public/media/404.svg";

export default function notFound() {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-32 h-screen items-center lg:px-36 p-10">
      <div className="flex flex-col gap-2">
        <p className="font-octinsports text-9xl">Oops!</p>
        <p className="font-bravaslab text-5xl">
          We can't seem to find the page you're looking for.
        </p>
      </div>
      <Image
        className="xl:w-1/3 lg:w-1/2 md:w-3/4 w-full"
        priority
        draggable={false}
        src={notFoundSVG}
        alt="404"
      />
    </div>
  );
}
