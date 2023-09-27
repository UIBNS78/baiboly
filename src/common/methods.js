export const getAllVerse = (data) => {
  let verse = {
    total: 0,
    content: [],
  };

  data.forEach((d) => {
    // set length
    verse.bibleRef = d.bible;
    verse.total += d.verse.length;
    let c = [];
    d.verse.forEach((value, i) => {
      c.push({ id: i + 1, text: value });
    });
    // set all verse content
    verse.content.push({
      id: d.id,
      chapter: d.chapter,
      totalVerse: d.verse.length,
      verse: c,
    });
  });
  return verse;
};

export const encodeToUTF8 = (text) => {
  text = decodeURI(text.toString());
  return text;
};
