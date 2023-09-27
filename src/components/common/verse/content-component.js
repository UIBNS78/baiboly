import { motion } from "framer-motion";
import React from "react";
import { encodeToUTF8 } from "../../../common/methods";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Slider, Tooltip, Zoom } from "@mui/material";
import { messages, severity } from "../../../common/constante";
import { handleSnackbar } from "../../../redux/reducers/index-reducer";
import { useDispatch } from "react-redux";

function ContentComponent({ selected, favorites }) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { name, chapter, from, to, content } = selected;
  const [sliderValue, setSliderValue] = React.useState(15);

  const handleFavorite = (type) => {
    console.log(selected);
  };

  React.useEffect(() => {
    setIsFavorite(!!favorites.find((f) => f.from === from && to === f.to));
  }, [favorites, from, to]);

  const copyVerse = (verse) => {
    navigator.clipboard.writeText(`${verse.id} - ${verse.text}`).finally(() => {
      const snackbar = {
        open: true,
        message: messages.copy,
        severity: severity.INFO,
      };
      dispatch(handleSnackbar({ snackbar }));
    });
  };

  return (
    <motion.div
      key={2}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="verse-text-box"
    >
      {/* <TrackTime /> */}
      <div className="verse-title-box">
        <div className="verse-name-box">
          <h2 className="verse-name">
            {`${name} ${chapter} ${from && " : " + from} ${
              to && to !== 0 ? " - " + to : ""
            }`}
          </h2>
        </div>
        <div
          className={`favorite-btn ${isFavorite && "favorite-red"}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <AiFillHeart onClick={() => handleFavorite(0)} />
          ) : (
            <AiOutlineHeart onClick={() => handleFavorite(1)} />
          )}
        </div>
      </div>
      <div className="verse-text" style={{ fontSize: sliderValue }}>
        {content &&
          content.map((content) => (
            <p key={content.chapter} className="verse-text-paragraph">
              <span className="chapter-number-in-text">{content.chapter} </span>
              {content.verse &&
                content.verse.map((verse) => (
                  <Tooltip
                    key={verse.id}
                    title="Copier"
                    placement="top"
                    followCursor
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <span
                      className="verse-text-copy"
                      onClick={() => copyVerse(verse)}
                    >
                      <span className="verse-number-in-text">
                        {` ${verse.id} - `}
                      </span>
                      {encodeToUTF8(verse.text)}
                    </span>
                  </Tooltip>
                ))}
            </p>
          ))}
      </div>
      <div className="setting-text-box">
        <div className="slider-box">
          <span className="a">A</span>
          <Slider
            value={sliderValue}
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setSliderValue(newValue)}
            step={5}
            marks
            min={10}
            max={40}
          />
          <span className="A">A</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ContentComponent;
