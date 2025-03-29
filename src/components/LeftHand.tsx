import { FC } from "react";

interface LeftHandProps {
  nextKey: string;
}

export const LeftHand: FC<LeftHandProps> = ({ nextKey }) => {
  return (
    <div className="hand-image left-hand">
      <img src="/left-hand.png" alt="Left Hand" />
      {nextKey === "A" ? (
        <div className="finger-pointer pinky"></div>
      ) : nextKey === "S" ? (
        <div className="finger-pointer ring"></div>
      ) : nextKey === "D" ? (
        <div className="finger-pointer middle"></div>
      ) : nextKey === "F" ? (
        <div className="finger-pointer index"></div>
      ) : nextKey === "space" ? (
        <div className="finger-pointer thumb"></div>
      ) : null}
    </div>
  );
};
