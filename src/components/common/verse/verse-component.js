import React from "react";
import { Backdrop, Stepper, Step, StepLabel, IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import VerseNumberComponent from "./verseNumber-component";

function VerseComponent({ show, result, handleClose }) {
  // VAR
  const [selected, setSelected] = React.useState({
    name: "",
    verse: "",
    from: "",
    to: "",
  });

  // STEP
  const steps = ["Toko", "Andininy"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed] = React.useState({});

  React.useEffect(() => {
    setSelected({ ...selected, name: result.name });
  }, [result]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSelected({ ...selected, verse: "", from: "", to: "" });
  };

  const next = (value) => {
    let newValue = { ...selected };
    switch (activeStep) {
      case 0:
        newValue.verse = value.verse;
        handleNext();
        break;
      case 1:
        newValue.from = value.from;
        newValue.to = value.to;
        break;
      default:
        break;
    }
    newValue.name = result.name;
    setSelected(newValue);
  };

  const close = () => {
    setActiveStep(0);
    setSelected({
      name: "",
      verse: "",
      from: "",
      to: "",
    });
    handleClose();
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show !== undefined ? show : false}
    >
      <div mode="wait" className="verse-main">
        <div className="verse-left-box">
          <div className="btn-close-box">
            <IconButton onClick={close}>
              <IoCloseOutline />
            </IconButton>
          </div>
          <motion.div
            key={1}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="verse-number-box"
          >
            <>
              <Stepper
                nonLinear
                activeStep={activeStep}
                alternativeLabel
                className="head-stepper-box"
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div className="verse-number-content">
                <AnimatePresence>
                  <motion.div
                    key={activeStep ? activeStep : 0}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VerseNumberComponent
                      type={activeStep === 0 ? "toko" : "andininy"}
                      result={result}
                      next={next}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="d-flex jc-space-between ai-center btn-box">
                <IconButton
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  <BsArrowLeft />
                </IconButton>
                <IconButton onClick={handleNext} sx={{ mr: 1 }}>
                  <BsArrowRight />
                </IconButton>
              </div>
            </>
          </motion.div>
        </div>
        <div className="verse-right-box">
          <motion.div
            key={2}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="verse-text-box"
          >
            <div>
              <h2 className="verse-name">
                {"selected.name" +
                  " " +
                  selected.verse +
                  " : " +
                  selected.from +
                  " - " +
                  selected.to}
              </h2>
            </div>
            <div className="verse-text">
              <p>
                Consectetur magna consequat occaecat laborum proident commodo
                nisi qui proident do ea adipisicing magna. Ex culpa excepteur
                dolor dolor sit occaecat eu cillum enim. Officia consequat in
                nulla officia laborum. Reprehenderit veniam adipisicing sit
                tempor voluptate aliqua amet velit veniam magna adipisicing
                dolor. Consectetur do ipsum occaecat cillum esse ut pariatur
                laboris ullamco ullamco consequat. Veniam et nisi qui non.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Backdrop>
  );
}

export default VerseComponent;
