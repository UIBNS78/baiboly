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

function SearchComponent() {
  const dispatch = useDispatch();

  const [bible, setBible] = React.useState([]);
  const [boxes, setBoxes] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState({});
  const name_promiseInProgress = usePromiseTracker({
    area: area.name,
  }).promiseInProgress;
  const search_promiseInProgress = usePromiseTracker({
    area: area.search,
  }).promiseInProgress;

  React.useEffect(() => {
    getBible();
  }, []);

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

  const getBible = () => {
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
            placeholder="Search here... (e.g: Salamo 2 13 14) "
            autoComplete="off"
            autoFocus
            onKeyUp={searchDirectly}
          />
        </div>
        <div className="filter-box">
          <div className="filter-btn">
            <CiSliderHorizontal />
          </div>
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
      <VerseComponent
        show={showResult}
        result={result}
        handleClose={setShowResult}
      />
    </>
  );
}

export default SearchComponent;
