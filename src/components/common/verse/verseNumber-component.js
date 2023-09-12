import React from "react";

function VerseNumberComponent({ type, result, next }) {
  const [verse, setVerse] = React.useState([]);
  const [from, setFrom] = React.useState({ value: 0, selected: false });
  const [to, setTo] = React.useState({ value: 0, selected: false });

  React.useEffect(() => {
    let newVerse = [];
    Array.from({ length: result.verse }).forEach((a, i) => {
      newVerse.push({
        value: i + 1,
        selected: false,
      });
    });
    setVerse(newVerse);
  }, [result]);

  const selectNumber = (a) => {
    //   change state selected
    const newVerse = verse.map((and) => {
      if (and.value === a.value) {
        return { ...and, selected: to.value !== 0 ? true : !and.selected };
      }
      return and;
    });
    setVerse(newVerse);

    if (from.value !== 0) {
      if (to.value !== 0) {
        verse.forEach((an) => {
          an.selected = an.value === a.value;
        });
        setVerse(newVerse);
        setFrom(a);
        setTo({ value: 0, selected: false });
      } else {
        if (a.value < from.value) {
          verse.find((an) => an.value === a.value)["selected"] = false;
          verse.forEach((an) => {
            if (an.value !== a.value) {
              an.selected = false;
            }
          });
          setFrom(a);
        } else {
          verse.forEach((an) => {
            if (an.value >= from.value && an.value <= a.value) {
              an.selected = true;
            }
          });
          setTo(a);
          next({ from: from.value, to: a.value });
        }
      }
    } else {
      setFrom(a);
    }
  };

  return (() => {
    switch (type) {
      case "chapter":
        return (
          <div className="d-flex jc-center ai-center gap-10 f-wrap">
            {Array.from({ length: result.chapter }).map((t, i) => (
              <div
                key={i}
                className="verse-number chapter-number"
                onClick={() => next({ chapter: i + 1 })}
              >
                {i + 1}
              </div>
            ))}
          </div>
        );
      case "verse":
        return (
          <div className="d-flex jc-center ai-center gap-10 f-wrap">
            {verse &&
              verse.map((a, i) => (
                <div
                  key={i}
                  className={
                    "verse-number verse-number " +
                    (a.selected && "verse-selected")
                  }
                  onClick={() => selectNumber(a)}
                >
                  {a.value}
                </div>
              ))}
          </div>
        );
      default:
        return;
    }
  })();
}

export default VerseNumberComponent;
