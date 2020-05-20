import React from "react";

export const Navbar = ({
  defenition,
  No,
  rigth_answers_count,
  tries_count,
}) => {
  return (
    <>
      <div className="game_info">
        <span>Question: {No}</span>
        <span>
          Tries: {tries_count} Right: {rigth_answers_count}
        </span>
        <span>
          Accuracy:
          {rigth_answers_count !== 0
            ? Math.round((rigth_answers_count / tries_count) * 100)
            : 0}
          %
        </span>
      </div>
      <div className="question_word box_style">
        <div className="question_font">Question {No}</div>
        <span dangerouslySetInnerHTML={{ __html: defenition }}></span>
      </div>
    </>
  );
};
