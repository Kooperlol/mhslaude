"use client";
import { createGlobalStyle } from "styled-components";
import React from "react";
import LaudeCard from "../../components/shared/laude-card";
import Image from "next/image";
import { LAUDE, toPoints } from "../../enums/laude-enum";

export default function About() {
  const GlobalStyles = createGlobalStyle`
  p {
    font-size: 25px;
    font-family: var(--font-brava-slab);
  }
  h1 {
    font-size: 32px;
    font-family: var(--font-octin-sports);
  }
`;
  return (
    <div className="flex py-10 flex-col gap-16">
      <GlobalStyles />
      <div className="min-h-screen flex flex-col md:justify-evenly">
        <div className="px-20 flex md:flex-row flex-col md:justify-between">
          <div className="md:w-1/3">
            <h1>What are laude points?</h1>
            <br />
            <p>
              At Milton High School, Laude Points are used to recognize and
              reward students who have excelled academically and met specific
              criteria, including a combination of GPA (Grade Point Average),
              course credits, and additional achievements. To determine laude
              recognition, the student's GPA is multipled by their Laude Points
              to get their Laude Score.
            </p>
          </div>
          <br />
          <Image
            className="select-none"
            priority
            src="/media/graduation.svg"
            draggable={false}
            width={400}
            height={400}
            alt="Person with graduation cap"
          />
        </div>
        <br />
        <div className="flex md:flex-row flex-col gap-5 px-20">
          <p>
            <u>GPA (Grade Point Average):</u> A student's GPA is a fundamental
            component of Laude Points. It reflects their overall academic
            performance throughout high school. A higher GPA indicates better
            academic achievement.
          </p>
          <p>
            <u>Course Credits:</u> Laude recognition requires students to take
            advanced courses, honors classes, or other academically challenging
            programs. These credits contribute to their Laude Points.
          </p>
          <p>
            <u>Additional Achievements:</u> Beyond academics, students may
            accumulate Laude Points through involvement in extracurricular
            activities, community service, or special programs such as the
            Global Scholars Program (GSP).
          </p>
        </div>
      </div>
      <div className="flex flex-col p-10 text-white items-center bg-secondary">
        <h1>Laude point brackets</h1>
        <div className="flex md:flex-row flex-col md:gap-32 gap-16">
          {Object.keys(LAUDE)
            .slice(0, 3)
            .map((l) => (
              <div className="flex text-center flex-col gap-5" key={l}>
                {LaudeCard(LAUDE[l as keyof typeof LAUDE], false)}
                <p>{LAUDE[l as keyof typeof LAUDE]}</p>
                <p>{toPoints(LAUDE[l as keyof typeof LAUDE])} Laude Score</p>
              </div>
            ))}
        </div>
      </div>
      <div className="px-20">
        <h1>Benefits of laude graduation</h1>
        <br />
        <div className="flex flex-col gap-3">
          <p>
            <u>College Admissions:</u> Laude Points can bolster a student's
            college application. Achieving a high Laude status, such as Summa
            Cum Laude, can make a student more competitive in the college
            admissions process.
          </p>
          <p>
            <u>Scholarships:</u> Some scholarships are awarded based on Laude
            Points. Higher Laude status can open up opportunities for
            scholarships that help finance a student's higher education.
          </p>
          <p>
            <u>Career Benefits:</u> In the long run, achieving a high Laude
            status can be an advantage when entering the job market. Employers
            may view it as a reflection of dedication and commitment.
          </p>
        </div>
      </div>
      <div className="px-20">
        <h1>Planning your laude points</h1>
        <br />
        <p>
          To plan your laude points, refer to the{" "}
          <a
            href="https://www.milton.k12.wi.us/program_of_studies/Program%20of%20Studies_8.pdf"
            target="_blank"
          >
            <u>program of studies document.</u>
          </a>{" "}
          This contains information about laude points, different classes, and
          ways you can plan your laude points. If you need more help, make sure
          to reach out to your counselor.
        </p>
      </div>
    </div>
  );
}
