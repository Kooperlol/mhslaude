"use client";
import { createGlobalStyle } from "styled-components";
import React from "react";

export default function Tutorial() {
  const GlobalStyles = createGlobalStyle`
  p {
    font-size: 25px;
    font-family: var(--font-brava-slab);
  }
  ol li {
    font-size: 25px;
    font-family: var(--font-brava-slab);
  }
  h1 {
    font-size: 32px;
    font-family: var(--font-octin-sports);
  }
`;

  return (
    <div className="flex p-20 flex-col gap-10">
      <GlobalStyles />
      <div>
        <h1>Step 1: Introduction</h1>
        <p>
          Welcome to the Laude Point Calculator tutorial. In this tutorial, we
          will guide you through using the MHS Laude website.
        </p>
      </div>

      <div>
        <h1>Step 2: Set Up</h1>
        <ol>
          <li>Access the Laude Point Calculator page on your web browser.</li>
          <li>
            Make sure you have your high school transcript ready, as you'll need
            it for the calculations.
          </li>
        </ol>
      </div>

      <div>
        <h1>Step 3: Upload Transcript</h1>
        <ol>
          <li>Click on the "Upload Transcript" button on the website.</li>
          <li>Select your transcript file in PDF format.</li>
          <li>Click "Upload" to submit your transcript.</li>
        </ol>
      </div>

      <div>
        <h1>Step 4: Class Credits</h1>
        <ol>
          <li>
            On the "4 Credits" page, you will be asked about various subjects.
            For each subject, select "Yes" if you have completed 4 credits or
            "No" if you haven't.
          </li>
          <li>
            By hovering over different subjects, you can see their classes.
          </li>
          <li>
            After making your selections, click "Next" to proceed to the next
            step.
          </li>
        </ol>
      </div>

      <div>
        <h1>Step 5: Additional Information</h1>
        <ol>
          <li>
            Provide your unweighted grade point average (GPA) as it appears on
            your Skyward.
          </li>
          <li>
            Answer questions about any additional programs or points you've
            earned, such as being a Global Scholars Program (GSP) qualifier,
            completing Youth Apprenticeship Level 2, or participating in the
            Early College Credit Program.
          </li>
          <li>Enter any laude points assigned by the principal.</li>
          <li>Click "Next" to proceed to the results page.</li>
        </ol>
      </div>

      <div>
        <h1>Step 6: View Results</h1>
        <ol>
          <li>
            On the "Results" page, you'll receive feedback based on your inputs.
          </li>
          <li>
            If your GPA is 3.00 or higher, you'll be able to download a summary
            of your Laude Points and honors.
          </li>
        </ol>
      </div>

      <div>
        <h1>Step 7: Conclusion</h1>
        <p>
          Congratulations! You've successfully used the Laude Point Calculator
          to determine your Laude Points and honors status. Keep the downloaded
          summary for your reference.
        </p>
      </div>
    </div>
  );
}
