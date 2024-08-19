import React, { useState } from "react";
import "./Page.css";
import "../FontsGenerator/fonts.css";

function Page({ pages, currentPage }) {
  const [selectedAyah, setSelectedAyah] = useState(null);
  const renderedChapters = [];
  const addChapterAsRendered = (chapter) => {
    renderedChapters.push(chapter);
  }
  return (
    !!pages[currentPage] && (
      <div>
        {Object.values(pages[currentPage]).map((line) => (
          <>
            {!!line.surahNumBeforeLine && (
              !renderedChapters.includes(line.surahNumBeforeLine) &&
              <>
                <div className="line">
                  <span className="suraname">surah</span>
                  <span className="suraname">
                    {String(line.surahNumBeforeLine).padStart(3, "0")}
                  </span>
                </div>
                {line.surahNumBeforeLine !== "1" &&
                  line.surahNumBeforeLine !== "2" &&
                  line.surahNumBeforeLine !== "9" && (
                    <div className="line">
                    <div
                    className="bismeallah"
                    dangerouslySetInnerHTML={{ __html: "ﱁ" }}
                      />
                      <div
                        className="bismeallah"
                        dangerouslySetInnerHTML={{ __html: "ﱂ" }}
                        />
                      <div
                        className="bismeallah"
                        dangerouslySetInnerHTML={{ __html: "ﱃ" }}
                        />
                      <div
                        className="bismeallah"
                        dangerouslySetInnerHTML={{ __html: "ﱄ" }}
                        />
                    </div>
                  )}
                {line.surahNumBeforeLine === "2" && (
                  <div
                  className="line bismeallah"
                  style={{ fontFamily: "p1" }}
                  dangerouslySetInnerHTML={{ __html: "ﭑﭒﭓﭔ" }}
                  />
                )}
                {addChapterAsRendered(line.surahNumBeforeLine)}
              </>
            )}

            <div className="line">
              {line.words.map((word) => (
                <>
                  <div
                    key={word.text}
                    className="word"
                    style={{
                      fontFamily: `p${currentPage}`,
                      color: word.verseKey === selectedAyah && "#2ca4ab",
                      backgroundColor:
                        word.verseKey === selectedAyah && "#e7f2ff49",
                    }}
                    dangerouslySetInnerHTML={{ __html: word.text }}
                    onClick={() => setSelectedAyah(word.verseKey)}
                  />
                </>
              ))}
            </div>
          </>
        ))}
      </div>
    )
  );
}

export default Page;
