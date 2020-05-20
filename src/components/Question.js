import React, { useState } from "react";
import { Answer } from "./Answer";

export const Question = ({ word_list, right_answer, click_handler }) => {
  return (
    <div className="answers">
      <ul>
        {word_list.map((wordInfo, i) => {
          return (
            <Answer
              No={i + 1}
              key={i}
              wordInfo={wordInfo}
              onClick={() => {
                right_answer === i ? click_handler(true) : click_handler(false);
              }}
              isRight={right_answer === i ? true : false}
            />
          );
        })}
      </ul>
    </div>
  );
};
