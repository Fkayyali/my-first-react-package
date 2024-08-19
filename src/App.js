import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Page from "./Components/Page";

function App({}) {
  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(602);

  const fetchVerses = async (page) => {
    await axios
      .get(
        `https://api.quran.com/api/v4/verses/by_page/${currentPage}?words=true&fields=text_uthmani&word_fields=text_uthmani,code_v1&v1_page=${currentPage}`
      )
      .then((res) => {
        console.log(res)
        const x = { ...pages };
        const lines = {};
        const { verses } = res.data;
        for (let i = 0; i < verses.length; i += 1) {
          verses[i].words.map((word) => {
            const code = word.code_v1;
            const lineNumber = word.line_number;
            const wordObj = {text: code, verseKey: verses[i].verse_key}
            var surahNumBeforeLine = null;
            if(verses[i].verse_number === 1){
              surahNumBeforeLine = verses[i].verse_key.split(":")[0];
            }
            if (lines[lineNumber])
              lines[lineNumber].words.push(wordObj) ;
            else lines[lineNumber] = {surahNumBeforeLine, words: [wordObj]};
            return true;
          });
        }
        x[page] = lines;
        console.log(lines);
        setPages(x);
      })
      .catch((e) => {
        console.error("Error fetching verses:", e);
      });
  };

  useEffect(() => {
    if (!pages[currentPage]) fetchVerses(currentPage);
  }, [currentPage, pages]);

  return (
    <>
      <Page pages={pages} currentPage={currentPage} />
      <button onClick={() => setCurrentPage(currentPage + 1)}>+</button>
    </>
  );
}

export default App;
