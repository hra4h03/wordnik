import React, { useState } from "react";

export const Answer = ({ wordInfo, isRight, No, onClick }) => {
  const [classes, setClasses] = useState(["answer"]);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <li
      className={classes.join(" ")}
      onClick={() => {
        if (!isDisabled) {
          isRight
            ? setClasses([...classes, "right"])
            : setClasses([...classes, "wrong"]);
          onClick();
          setIsDisabled(true);
        }
      }}
    >
      {No}.<span>{wordInfo.word}</span>
    </li>
  );
};
