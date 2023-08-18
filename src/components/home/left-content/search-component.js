import { motion } from "framer-motion";
import React from "react";
import { CiSearch } from "react-icons/ci";
import "../../../style/home/search-style.css";
import VerseComponent from "../../common/verse/verse-component";

function SearchComponent() {
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState({});
  const handleShowResult = (result) => {
    setResult({
      name: "Salamo",
      toko: 115,
      andininy: 300,
    });
    setShowResult(!showResult);
  };
  return (
    <>
      <div className="d-flex jc-center">
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
          />
        </div>
      </div>
      <div className="item-search-box">
        {Array.from({ length: 13 }).map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="item"
            onClick={() => handleShowResult(a)}
          ></motion.div>
        ))}
      </div>
      <VerseComponent
        show={showResult}
        result={result}
        handleClose={setShowResult}
      />
    </>
  );
}

export default SearchComponent;
