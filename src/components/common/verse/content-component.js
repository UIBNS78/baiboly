import { motion } from "framer-motion";
import React from "react";
import { encodeToUTF8 } from "../../../common/methods";

function ContentComponent({ selected }) {
  const { name, chapter, from, to, content } = selected;
  return (
    <motion.div
      key={2}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="verse-text-box"
    >
      <div className="verse-title-box">
        <h2 className="verse-name">
          {`${name} ${chapter} ${from && " : " + from} ${
            to && to !== 0 ? " - " + to : ""
          }`}
        </h2>
      </div>
      <div className="verse-text">
        {content &&
          content.map((content) => (
            <p key={content.chapter} className="verse-text-paragraph">
              <span className="chapter-number-in-text">{content.chapter} </span>
              {content.verse &&
                content.verse.map((verse) => (
                  <span key={verse.id}>
                    <span className="verse-number-in-text">
                      {` ${verse.id} - `}
                    </span>
                    {encodeToUTF8(verse.text)}
                  </span>
                ))}
            </p>
          ))}
      </div>
    </motion.div>
  );
}

export default ContentComponent;
