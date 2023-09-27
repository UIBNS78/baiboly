import React from "react";
import { Backdrop, Stepper, Step, StepLabel, IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import VerseNumberComponent from "./verseNumber-component";
import "../../../style/verse-style.css";
import ContentComponent from "./content-component";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import database from "../../../config/firebase.config";
import { collections } from "../../../common/constante";

function VerseComponent({ show, result, handleClose }) {
  // VAR
  const [selected, setSelected] = React.useState({
    bibleRef: "",
    name: "",
    slug: "",
    chapter: "",
    from: "",
    to: "",
    number: 0,
    content: [],
  });
  const [favorites, setFavorites] = React.useState([]);

  // STEP
  const steps = ["Toko", "Andininy"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed] = React.useState({});

  React.useEffect(() => {
    setSelected({
      ...selected,
      bibleRef: result.bibleRef,
      name: result.name,
      slug: result.slug,
      number: result.totalChapter,
      content: result.content,
    });
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
    setSelected({
      ...selected,
      number: result.totalChapter,
      content: result.content,
      from: "",
      to: "",
    });
  };

  const next = (value) => {
    let newValue = { ...selected };
    switch (activeStep) {
      case 0:
        newValue = selectChapter(newValue, value);
        handleNext();
        break;
      case 1:
        newValue = getVerseContent(newValue, value);
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
      slug: "",
      chapter: "",
      from: "",
      to: "",
    });
    setFavorites([]);
    handleClose();
  };

  const selectChapter = (newValue, value) => {
    newValue.chapter = value.chapter;
    const correctVerse = selected.content.find(
      (c) => c.chapter === value.chapter
    );
    if (correctVerse) {
      newValue.content = [correctVerse];
      newValue.number = correctVerse.verse.length;
    }
    return newValue;
  };

  const getFavoriteByChapterRef = (collectionName, chapterId) => {
    const favoriteCollection = collection(database, collections.FAVORITE);
    const chapterRef = doc(database, collectionName, chapterId);
    const queryRef = query(
      favoriteCollection,
      where("chapterRef", "==", chapterRef)
    );
    getDocs(queryRef).then((snapshot) => {
      const favs = [];
      snapshot.forEach((f) => {
        let newFav = { ...f.data(), id: f.id };
        getDoc(newFav.bible)
          .then((b) => {
            newFav.bible = b.exists() ? b.data() : null;
            favs.push(newFav);
          })
          .finally(() => setFavorites(favs));
      });
    });
  };

  const getVerseContent = (newValue, value) => {
    const { from, to } = value;
    const { chapter, content } = newValue;
    const correctVerse = result.content.find((c) => c.chapter === chapter);
    const contentVerse = correctVerse.verse;
    let verse = [];
    if (to !== 0) {
      verse =
        to === contentVerse.length
          ? contentVerse.slice(from - 1)
          : contentVerse.slice(from - 1, to);
    } else {
      verse = contentVerse.slice(from - 1);
    }
    // get Favorite by chapter selected
    getFavoriteByChapterRef(newValue.slug, correctVerse.id);

    return {
      ...newValue,
      from: value.from,
      to: value.to,
      content: [
        {
          chapter,
          totalVerse: content[0].totalVerse,
          verse,
        },
      ],
    };
    // const nameCollection = collection(database, name)
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
                      type={activeStep === 0 ? "chapter" : "verse"}
                      number={selected.number}
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
          <ContentComponent
            selected={selected}
            favorites={favorites}
          ></ContentComponent>
        </div>
      </div>
    </Backdrop>
  );
}

export default VerseComponent;
