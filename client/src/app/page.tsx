"use client";
import LaudeCard from "../components/shared/laude-card";
import { Button } from "../components/shared/button";
import Link from "next/link";
import Image from "next/image";
import { LAUDE } from "../enums/laude-enum";

export default function Home() {
  return (
    <>
      {/* Calculate Laude Points */}
      <div className="flex md:flex-row flex-col min-h-screen gap-14 md:text-left text-center justify-center items-center md:justify-between px-16 py-20">
        <div className="flex flex-col object-left gap-3 md:w-1/4">
          <p className="font-octinsports lg:text-5xl text-4xl">
            calculate your laude points
          </p>
          <div className="flex-col flex gap-5">
            <p className="font-bravaslab lg:text-3xl text-2xl">
              No more tedious calculations! Simply upload your transcript and
              instantly get results.
            </p>
            <div className="md:object-left object-center">
              <Button asChild size="lg">
                <Link href="calculator">Calculate Now</Link>
              </Button>
            </div>
          </div>
        </div>
        <Image
          className="md:w-1/4 w-1/2 select-none"
          priority
          draggable={false}
          src="/media/calculator_person.svg"
          width={300}
          height={300}
          alt="Person interacting with a calculator"
        />
      </div>

      {/* Graduation Tiers */}
      <div className="bg-secondary h-1/6 py-5 flex flex-col gap-4 items-center">
        <p className="font-octinsports text-center text-white text-5xl">
          graduation tiers
        </p>
        <hr className="bg-white md:w-1/3 w-2/3 border-2 rounded-lg dark:black" />
        <div className="flex md:flex-row flex-col gap-20 py-5">
          {Object.keys(LAUDE)
            .slice(0, 3)
            .map((l) => (
              <div key={l}>
                {LaudeCard(LAUDE[l as keyof typeof LAUDE], true)}
              </div>
            ))}
        </div>
      </div>

      {/* Transcript Feedback */}
      <div className="flex md:flex-row min-h-screen justify-center items-center flex-col gap-14 md:justify-between md:text-left text-center px-16 py-20">
        <div className="flex flex-col object-left gap-3 md:w-1/4">
          <p className="font-octinsports lg:text-5xl text-4xl">
            get feedback from your transcript
          </p>
          <div className="flex-col flex gap-5">
            <p className="font-bravaslab lg:text-3xl text-2xl">
              Get personalized feedback from uploading your transcript! Our
              technology can recommend classes to boost your laude points.
            </p>
            <div className="md:object-left object-center">
              <Button asChild size="lg">
                <Link href="#">Coming Soon</Link>
              </Button>
            </div>
          </div>
        </div>
        <Image
          className="md:w-1/4 w-1/2 select-none"
          priority
          src="/media/file_person.svg"
          draggable={false}
          width={300}
          height={300}
          alt="Person holding a transcript"
        />
      </div>

      {/* Tutorial */}
      <div className="bg-primary flex flex-col gap-5 items-center py-10">
        <p className="font-octinsports text-center md:text-5xl text-3xl text-white">
          learn how to get feedback now!
        </p>
        <Button asChild variant="secondary" size="xlg">
          <Link href="tutorial">Tutorial</Link>
        </Button>
      </div>
    </>
  );
}
