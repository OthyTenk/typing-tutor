import { FC } from "react";

interface LeftHandProps {
  nextKey: string;
}
export const RightHand: FC<LeftHandProps> = ({ nextKey }) => {
  return (
    <div className="hand-image right-hand">
      <img src="./public/right-hand.png" alt="Right Hand" />

      {nextKey === ";" || nextKey === "'" ? (
        <div className="finger-pointer pinky"></div>
      ) : nextKey === "L" ? (
        <div className="finger-pointer ring"></div>
      ) : nextKey === "K" ? (
        <div className="finger-pointer middle"></div>
      ) : nextKey === "J" ? (
        <div className="finger-pointer index"></div>
      ) : nextKey === " " ? (
        <div className="finger-pointer thumb"></div>
      ) : null}
    </div>
  );
};
