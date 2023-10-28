"use client";
import React, { useState } from "react";
import axios from "axios";
import { Dropzone, ExtFile } from "@dropzone-ui/react";
import calculateLaudePoints from "../../server-actions/calculate-laude-points";
import { Button } from "../../components/shared/button";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  SliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const extractLaudePoints = async (file: ExtFile) => {
  const pdfFormData = new FormData();
  pdfFormData.append("pdf", file.file!);

  try {
    const pdfResponse = await axios.post(
      "https://mhslaude-backend-git-main-kooperlols-projects.vercel.app/pdf/extract-text",
      pdfFormData
    );

    return calculateLaudePoints(pdfResponse.data.text);
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
  }
};

export default function Calculator() {
  const [laudePoints, setLaudePoints] = useState<number>(0);
  const [gpaSliderValue, setGpaSliderValue] = useState<string>("0.00");
  const [gspValue, setGspValue] = useState<number>(0);
  const [apprenticeshipValue, setApprenticeshipValue] = useState<number>(0);
  const [earlyCreditValue, setEarlyCreditValue] = useState<number>(0);
  const [startNowValue, setStartNowValue] = useState<number>(0);
  const [additionalPoints, setAdditionalPoints] = useState<number>(0);

  const retreiveLaudePoints = async (file: ExtFile) => {
    if (file == null) return;
    let num = (await extractLaudePoints(file)) as number;
    console.log(num);
    setLaudePoints(num);
  };

  const steps = [
    {
      label: "Upload Transcript",
      component: (
        <div>
          <Dropzone
            onChange={(file) => {
              retreiveLaudePoints(file[0]);
              setActiveStep(1);
            }}
            accept="application/pdf"
            maxFiles={1}
          />
        </div>
      ),
    },
    {
      label: "Extras",
      component: (
        <div className="flex flex-col gap-8 font-bravaslabs">
          <div>
            <p>
              What is your unweighted grade point average (GPA)? Enter what
              appears on Skyward.
            </p>
            <Flex className="w-1/4">
              <NumberInput
                maxW="100px"
                mr="2rem"
                value={gpaSliderValue}
                step={0.01}
                max={4.0}
                min={0.0}
                onChange={(gpa) => setGpaSliderValue(gpa)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                focusThumbOnChange={false}
                step={0.01}
                max={4.0}
                value={Number.parseFloat(gpaSliderValue)}
                onChange={(gpa) => setGpaSliderValue(gpa.toString())}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  fontSize="sm"
                  boxSize="32px"
                  children={gpaSliderValue}
                />
              </Slider>
            </Flex>
          </div>
          <RadioGroup
            name="form-gsp"
            defaultValue="no"
            onChange={(value) =>
              value == "yes" ? setGspValue(1) : setGspValue(0)
            }
          >
            <p>Are you a Global Scholars Program (GSP) qualifier?</p>
            <Stack spacing={4} direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup
            name="form-apprenticeship"
            defaultValue="no"
            onChange={(value) =>
              value == "yes"
                ? setApprenticeshipValue(1)
                : setApprenticeshipValue(0)
            }
          >
            <p>Have you completed Youth Apprenticeship Level 2?</p>
            <Stack spacing={4} direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup
            name="form-early-college"
            defaultValue="no"
            onChange={(value) =>
              value == "yes" ? setEarlyCreditValue(1) : setEarlyCreditValue(0)
            }
          >
            <p>Have you enrolled in the Early College Credit Program?</p>
            <Stack spacing={4} direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <div>
            <p>
              Have you enrolled in the Start College Now program? If so, how
              many laude points have been assigned by administration?
            </p>
            <NumberInput
              className="w-1/12"
              name="form-college-now"
              defaultValue={0}
              onChange={(value) => setStartNowValue(Number.parseInt(value))}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <p>
              Have any additional laude points been assigned by the principal?
              If so, how many?
            </p>
            <NumberInput
              className="w-1/12"
              name="form-other"
              defaultValue={0}
              onChange={(value) => setAdditionalPoints(Number.parseInt(value))}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <Button className="w-fit" onClick={() => setActiveStep(2)} size="lg">
            Next
          </Button>
        </div>
      ),
    },
    {
      label: "Results",
      component: (
        <div>
          {Number.parseFloat(gpaSliderValue) *
            (laudePoints +
              gspValue +
              apprenticeshipValue +
              earlyCreditValue +
              startNowValue +
              additionalPoints)}
        </div>
      ),
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <div className="flex flex-col justify-center px-10 py-32 gap-10 h-screen-min">
      <div className="md:text-center text-left">
        <p className="font-octinsports md:text-6xl text-4xl">
          calculate your laude points
        </p>
        <p className="font-bravaslab md:text-3xl text-2xl">
          Follow the instructions below to automatically calcuate your points.
        </p>
      </div>

      <Card>
        <CardHeader>
          <Stepper
            size="sm"
            index={activeStep}
            orientation="horizontal"
            colorScheme="red"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.label}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </CardHeader>

        <CardBody>{steps[activeStep].component}</CardBody>
      </Card>
    </div>
  );
}
