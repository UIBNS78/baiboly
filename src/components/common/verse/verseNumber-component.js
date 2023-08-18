import React from "react";

function VerseNumberComponent({ type, result, next }) {
  const [andininy, setAndininy] = React.useState([]);
  const [from, setFrom] = React.useState({ value: 0, selected: false });
  const [to, setTo] = React.useState({ value: 0, selected: false });

  React.useEffect(() => {
    let newAndininy = [];
    Array.from({ length: result.andininy }).forEach((a, i) => {
      newAndininy.push({
        value: i + 1,
        selected: false,
      });
    });
    setAndininy(newAndininy);
  }, [result]);

  const selectAndininy = (a) => {
    //   change state selected
    const newAndininy = andininy.map((and) => {
      if (and.value === a.value) {
        return { ...and, selected: to.value !== 0 ? true : !and.selected };
      }
      return and;
    });
    setAndininy(newAndininy);

    if (from.value !== 0) {
      if (to.value !== 0) {
        andininy.forEach((an) => {
          an.selected = an.value === a.value;
        });
        setAndininy(newAndininy);
        setFrom(a);
        setTo({ value: 0, selected: false });
      } else {
        if (a.value < from.value) {
          andininy.find((an) => an.value === a.value)["selected"] = false;
          andininy.forEach((an) => {
            if (an.value !== a.value) {
              an.selected = false;
            }
          });
          setFrom(a);
        } else {
          andininy.forEach((an) => {
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
      case "toko":
        return (
          <div className="d-flex jc-center ai-center gap-10 f-wrap">
            {Array.from({ length: result.toko }).map((t, i) => (
              <div
                key={i}
                className="verse-number toko-number"
                onClick={() => next({ verse: i + 1 })}
              >
                {i + 1}
              </div>
            ))}
          </div>
        );
      case "andininy":
        return (
          <div className="d-flex jc-center ai-center gap-10 f-wrap">
            {andininy &&
              andininy.map((a, i) => (
                <div
                  key={i}
                  className={
                    "verse-number andininy-number " +
                    (a.selected && "verse-selected")
                  }
                  onClick={() => selectAndininy(a)}
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
