import React, { useEffect, useState, useRef } from "react";
import { useHttp } from "./hooks/useHTTP";
import { Question } from "./components/Question";
import { Navbar } from "./components/Navbar";
import { Loading } from "./components/Loading";
const key = "udydrloa7v16d3bo5dmmvutycbxaht4021wxrfu09nrhzmhcd";

const urlRandomWords = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=10&minLength=3&maxLength=10&limit=4&api_key=${key}`;
const urlWordDict = (word) =>
  `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${key}`;

function App() {
  const { loading, request, error } = useHttp();
  const [word_list, setWord_list] = useState([]);
  const [def, setDef] = useState("");
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 4));

  const [NoQuestion, setNoQuestion] = useState(1);
  const [right_answers_count, setRight_answers_count] = useState(0);
  const [tries_count, setTries_count] = useState(0);

  // useMemo(() => , input)
  const num = useRef(0);
  num.current = randomNum;
  useEffect(() => {
    (async () => {
      let data = await request(urlRandomWords, "GET");
      setWord_list(data);
      console.log("called");
    })();
  }, [request, randomNum]);

  useEffect(() => {
    (async () => {
      console.log("2 called");
      if (word_list.length) {
        let res = await request(
          urlWordDict(word_list[num.current].word),
          "GET"
        );
        setDef(res[0].text);
      }
    })();
  }, [request, word_list]);

  const click_handler = (bool) => {
    setTries_count(tries_count + 1);
    if (bool) {
      setNoQuestion(NoQuestion + 1);
      setRight_answers_count(right_answers_count + 1);
    }
    // console.log(bool);
  };
  return (
    <div className="game">
      <Navbar
        defenition={def}
        No={NoQuestion}
        tries_count={tries_count}
        rigth_answers_count={right_answers_count}
      />
      {error ? (
        <h1>Error, please refresh app</h1>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <Loading />
        </div>
      ) : (
        <Question
          word_list={word_list}
          right_answer={randomNum}
          click_handler={click_handler}
        />
      )}
      <hr />
      <div className="next">
        <button onClick={() => setRandomNum(Math.floor(Math.random() * 4))}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default App;
