export const getAllVerse = (data) => {
  let verse = {
    total: 0,
    content: [],
  };
  console.log("data", data);

  data.forEach((d) => {
    // set length
    verse.total += d.verse.length;
    // set all verse content
    verse.content.push({
      chapter: d.chapter,
      verse: d.verse,
    });
  });
  return verse;
};

export const encodeToUTF8 = (text) => {
  text = decodeURI('"' + text + '"');
  return text;
};
