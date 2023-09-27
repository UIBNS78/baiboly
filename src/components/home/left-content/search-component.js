import { collection, getDocs } from "firebase/firestore/lite";
import { motion } from "framer-motion";
import React from "react";
import { CiSearch, CiSliderHorizontal } from "react-icons/ci";
import database from "../../../config/firebase.config";
import { collections, area, severity } from "../../../common/constante";
import "../../../style/home/search-style.css";
import VerseComponent from "../../common/verse/verse-component";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import LoadingSearchComponent from "../../common/loading/loadingSearch-component";
import LoadingSelectedComponent from "../../common/loading/loadingSelected-component";
import { useDispatch } from "react-redux";
import { handleSnackbar } from "../../../redux/reducers/index-reducer";
import { getAllVerse } from "../../../common/methods";
import { Tooltip } from "@mui/material";

const filter = [
  { mode: 1, name: "nom", placeholder: "(e.g: Salamo)" },
  { mode: 2, name: "texte", placeholder: "(e.g: niakatra avy tany Ejipta)" },
  {
    mode: 3,
    name: "texte + chapter + verse",
    placeholder: "(e.g: Salamo 2 : 13 - 14)",
  },
];

function SearchComponent() {
  const dispatch = useDispatch();

  const [bible, setBible] = React.useState([]);
  const [boxes, setBoxes] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [filterMode, setFilterMode] = React.useState(filter[0]);

  const name_promiseInProgress = usePromiseTracker({
    area: area.name,
  }).promiseInProgress;
  const search_promiseInProgress = usePromiseTracker({
    area: area.search,
  }).promiseInProgress;

  React.useEffect(() => {
    const bibleCollection = collection(database, collections.BIBLE);
    trackPromise(
      getDocs(bibleCollection)
        .then((snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
          setBible(docs);
          setBoxes(docs);
        })
        .catch((reason) => {
          const snackbar = {
            open: true,
            message: reason.message,
            severity: severity.ERROR,
          };
          dispatch(handleSnackbar({ snackbar }));
        }),
      area.search
    );
  }, [dispatch]);

  const handleShowResult = (nameSelected) => {
    const nameCollection = collection(database, nameSelected.slug);
    trackPromise(
      getDocs(nameCollection)
        .then((snapshot) => {
          const name = [];
          snapshot.forEach((s) => {
            name.push({ id: s.id, ...s.data() });
          });
          const verses = getAllVerse(name);
          setResult({
            bibleRef: verses.bibleRef,
            name: nameSelected.name,
            slug: nameSelected.slug,
            totalChapter: snapshot.size,
            totalVerse: verses.total,
            content: verses.content,
          });
        })
        .catch((reason) => {
          const snackbar = {
            open: true,
            message: reason.message,
            severity: severity.ERROR,
          };
          dispatch(handleSnackbar({ snackbar }));
        })
        .finally(() => {
          setShowResult(!showResult);
        }),
      area.name
    );
  };

  const searchDirectly = (event) => {
    const { value } = event.target;
    if (value) {
      const bb = bible.filter((b) => b.name.toLowerCase().includes(value));
      setBoxes(bb);
    } else {
      setBoxes(bible);
    }
  };

  const handleFilterMode = () => {
    const currentIndex = filter.indexOf(filterMode);
    const index =
      currentIndex !== -1
        ? currentIndex < filter.length - 1
          ? currentIndex + 1
          : 0
        : 0;
    setFilterMode(filter[index]);
  };

  return (
    <>
      <div className="d-flex jc-center gap-15">
        <div className="input-outside">
          <div className="icon-search">
            <CiSearch />
          </div>
          <input
            type="text"
            className="input-search"
            placeholder={`Search here... ${filterMode.placeholder}`}
            autoComplete="off"
            autoFocus
            onKeyUp={searchDirectly}
          />
        </div>
        <div className="filter-box">
          <Tooltip title={`Mode : ${filterMode.name}`} placement="top" arrow>
            <div className="filter-btn" onClick={handleFilterMode}>
              <CiSliderHorizontal />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="item-search-box">
        {!search_promiseInProgress &&
          boxes.map((bb) => (
            <motion.div
              key={bb.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="item"
              onClick={() => handleShowResult(bb)}
            >
              {name_promiseInProgress ? (
                <LoadingSelectedComponent area={area.name} />
              ) : (
                <span>{bb.name}</span>
              )}
            </motion.div>
          ))}
      </div>
      <LoadingSearchComponent area={area.search} />
      <div id="verse-component">
        <VerseComponent
          show={showResult}
          result={result}
          handleClose={setShowResult}
        />
      </div>
    </>
  );
}

export default SearchComponent;
