"use client";
import React, { useReducer, useState, useEffect } from "react";
import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { Dropzone, ExtFile } from "@dropzone-ui/react";
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
import { fromPoints } from "../../enums/laude-enum";
import LaudeCard from "../../components/shared/laude-card";
import { FOUR_CREDITS, getSubjectClasses } from "@/enums/four-credits-enum";
import OverlayConfetti from "@/components/calculator/confetti";

// Initalize default variables
const initState = {
  laudeClasses: {},
  gpaValue: "0.00",
  laudePoints: 0,
  startNowValue: 0,
  additionalPoints: 0,
  confettiActive: false,
  studentName: "",
};

// Reducer Actions
const enum REDUCER_ACTION_TYPE {
  INCREMENT_LAUDE_POINTS,
  DECREMENT_LAUDE_POINTS,
  SET_LAUDE_POINTS,
  SET_CLASSES,
  TOGGLE_CONFEETTI,
  SET_GPA,
  SET_START_NOW,
  SET_ADDITIONAL_POINTS,
  SET_STUDENT_NAME,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

// Reducer action functions
const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT_LAUDE_POINTS:
      return { ...state, laudePoints: state.laudePoints + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT_LAUDE_POINTS:
      return { ...state, laudePoints: state.laudePoints - 1 };
    case REDUCER_ACTION_TYPE.SET_LAUDE_POINTS:
      return { ...state, laudePoints: action.payload };
    case REDUCER_ACTION_TYPE.SET_CLASSES:
      return { ...state, laudeClasses: action.payload };
    case REDUCER_ACTION_TYPE.TOGGLE_CONFEETTI:
      return { ...state, confettiActive: !state.confettiActive };
    case REDUCER_ACTION_TYPE.SET_GPA:
      return { ...state, gpaValue: action.payload };
    case REDUCER_ACTION_TYPE.SET_START_NOW:
      return { ...state, startNowValue: action.payload };
    case REDUCER_ACTION_TYPE.SET_ADDITIONAL_POINTS:
      return { ...state, additionalPoints: action.payload };
    case REDUCER_ACTION_TYPE.SET_STUDENT_NAME:
      return { ...state, studentName: action.payload };
    default:
      throw new Error();
  }
};

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [creditClasses, setCreditClasses] = useState<string[]>([]);
  const [otherReasons, setOtherReasons] = useState<string[]>([]);

  // Reducer functions
  const incrementLaudePoints = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT_LAUDE_POINTS });
  const decrementLaudePoints = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT_LAUDE_POINTS });
  const setLaudePoints = (points: number) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_LAUDE_POINTS,
      payload: points,
    });
  const setGpaValue = (gpa: string) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_GPA,
      payload: gpa,
    });
  const toggleConfetti = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_CONFEETTI });
  const toggleCreditClasses = (subject: string) => {
    if (creditClasses.includes(subject)) {
      setCreditClasses(creditClasses.filter((item) => item != subject));
    } else {
      setCreditClasses([...creditClasses, subject]);
    }
  };
  const toggleOtherReasons = (reason: string) => {
    if (otherReasons.includes(reason)) {
      setOtherReasons(otherReasons.filter((item) => item != reason));
    } else {
      setOtherReasons([...otherReasons, reason]);
    }
  };

  // Reads the transcript pdf and returns extracted data
  const readTranscript = async (file: ExtFile) => {
    const transcriptFormData = new FormData();
    transcriptFormData.append("transcript", file.file!);

    try {
      const laudeResponse = await axios.post(
        "http://localhost:5000/laude-points/calculate",
        transcriptFormData
      );

      // Set data like laude points, student name, and classes
      setLaudePoints(laudeResponse.data.points as number);
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_STUDENT_NAME,
        payload: laudeResponse.data.name,
      });
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_CLASSES,
        payload: laudeResponse.data.classes as Map<string, number>,
      });
    } catch (error) {
      console.error("Error getting laude points:", error);
    }
  };

  // Adds laude points to get the total
  const addLaudePoints = () => {
    const otherPoints: number =
      state.laudePoints + state.startNowValue + state.additionalPoints;
    setLaudePoints(Number.parseFloat(state.gpaValue) * otherPoints);
  };

  // Creates a PDF summary using the data from the calculations and then requests the user to download it
  const downloadSummary = async () => {
    try {
      const pdfResponse = await axios.post(
        "http://localhost:5000/pdf/create-summary",
        {
          student: [
            {
              name: state.studentName,
              points: (
                state.laudePoints / Number.parseFloat(state.gpaValue)
              ).toFixed(2),
              score: state.laudePoints.toFixed(2),
              status: fromPoints(state.laudePoints),
              gpa: state.gpaValue,
              classes: state.laudeClasses,
              startNow: state.startNowValue,
              additionalPoints: state.additionalPoints,
              fourCredits: creditClasses,
              other: otherReasons,
            },
          ],
        },
        {
          responseType: "blob",
        }
      );

      if (pdfResponse.status == 200) {
        const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "summary.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error("PDF generation failed!");
      }
    } catch (error) {
      console.error("Error getting pdf summary:", error);
    }
  };

  // Stepper steps
  const steps = [
    {
      label: "Upload Transcript",
      component: (
        <div>
          <Dropzone
            onChange={(file) => {
              readTranscript(file[0]);
              setActiveStep(1);
            }}
            accept="application/pdf"
            maxFiles={1}
          />
        </div>
      ),
    },
    {
      label: "4 Credits",
      component: (
        <div className="flex flex-col gap-8 font-bravaslabs">
          <p>
            <u>Note:</u> Most classes are worth 0.5 credits. Make sure to double
            check the credits on your transcript! You can hover over each field
            to see the classes that count.
          </p>
          {Object.values(FOUR_CREDITS).map((subject) => (
            <Tooltip
              key={subject}
              label={getSubjectClasses(subject)}
              placement="bottom-start"
            >
              <div key={subject}>
                <RadioGroup
                  className={subject}
                  defaultValue="no"
                  onChange={(value) => {
                    value == "yes"
                      ? incrementLaudePoints()
                      : decrementLaudePoints();
                    toggleCreditClasses(subject);
                  }}
                >
                  <p>Do you have 4 credits of {subject}?</p>
                  <Stack spacing={4} direction="row">
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Stack>
                </RadioGroup>
              </div>
            </Tooltip>
          ))}

          <Button className="w-fit" onClick={() => setActiveStep(2)} size="lg">
            Next
          </Button>
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
                value={state.gpaValue}
                step={0.01}
                max={4.0}
                min={0.0}
                onChange={(gpa) => setGpaValue(gpa)}
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
                value={Number.parseFloat(state.gpaValue)}
                onChange={(gpa) => setGpaValue(gpa.toString())}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  fontSize="sm"
                  boxSize="32px"
                  children={state.gpaValue}
                />
              </Slider>
            </Flex>
          </div>
          <RadioGroup
            name="form-gsp"
            defaultValue="no"
            onChange={(value) => {
              value == "yes" ? incrementLaudePoints() : decrementLaudePoints();
              toggleOtherReasons("GSP Qualifier");
            }}
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
            onChange={(value) => {
              value == "yes" ? incrementLaudePoints() : decrementLaudePoints();
              toggleOtherReasons("Youth Apprentinceship Level 2");
            }}
          >
            <p>Have you completed Youth Apprenticeship Level 2 (NOT CO-OP)?</p>
            <Stack spacing={4} direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup
            name="form-early-college"
            defaultValue="no"
            onChange={(value) => {
              value == "yes" ? incrementLaudePoints() : decrementLaudePoints();
              toggleOtherReasons("Early College Credit Program");
            }}
          >
            <p>Have you enrolled in the Early College Credit Program?</p>
            <Stack spacing={4} direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <div>
            <p>
              Have you enrolled in the Start College Now Program? If so, how
              many laude points have been assigned by administration?
            </p>
            <NumberInput
              className="w-1/12"
              name="form-college-now"
              defaultValue={0}
              onChange={(value) =>
                dispatch({
                  type: REDUCER_ACTION_TYPE.SET_START_NOW,
                  payload: Number.parseFloat(value),
                })
              }
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
              onChange={(value) =>
                dispatch({
                  type: REDUCER_ACTION_TYPE.SET_ADDITIONAL_POINTS,
                  payload: Number.parseFloat(value),
                })
              }
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
          <Button
            className="w-fit"
            onClick={() => {
              setActiveStep(3);
              addLaudePoints();
              if (Number.parseFloat(state.gpaValue) >= 3) {
                toggleConfetti();
              }
            }}
            size="lg"
          >
            Next
          </Button>
        </div>
      ),
    },
    {
      label: "Results",
      component: (
        <>
          {Number.parseFloat(state.gpaValue) < 3 && (
            <p className="text-center font-bravaslabs text-xl">
              Sorry, but you need to have at least a GPA of 3.00 to graduate
              with honors.
            </p>
          )}
          {Number.parseFloat(state.gpaValue) >= 3 &&
            fromPoints(state.laudePoints) == null && (
              <p>Sorry, but you do not qualify for any honors.</p>
            )}
          {Number.parseFloat(state.gpaValue) >= 3 &&
            fromPoints(state.laudePoints) != null && (
              <div className="flex flex-col items-center">
                <div className="flex font-bravaslabs flex-row gap-3 text-left items-center justify-between">
                  <div>
                    <p className="text-5xl">Congratulations!</p>
                    <p className="text-3xl">
                      You're graduating with {fromPoints(state.laudePoints)}
                    </p>
                  </div>
                  {LaudeCard(fromPoints(state.laudePoints)!!, false)}
                </div>
                <Button onClick={() => downloadSummary()} variant="default">
                  Download Summary
                </Button>
              </div>
            )}
        </>
      ),
    },
  ];

  // Stepper state
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Desktop
  return (
    <>
      <div className="flex flex-col justify-center px-10 py-32 gap-10 min-h-screen">
        {state.confettiActive && <OverlayConfetti />}
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
              orientation={isMobile ? "vertical" : "horizontal"}
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
    </>
  );
}
