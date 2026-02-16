import { FC } from "react";
import { HandInfo } from "../types";

interface LeftHandProps {
  nextKey: string;
  handInfo: HandInfo;
}

export const LeftHand: FC<LeftHandProps> = ({ nextKey, handInfo }) => {
  const renderFingerPointer = () => {
    // Check if this hand needs to press Shift
    if (handInfo.requiresShift && handInfo.shiftHand === "left") {
      return <div className="finger-pointer pinky" data-finger="Shift" />;
    }

    // Otherwise check if this hand types the character
    if (handInfo.hand !== "left" && handInfo.hand !== "both") return null;

    switch (nextKey?.toUpperCase()) {
      case "1":
      case "!":
      case "Q":
      case "A":
      case "Z":
        return <div className="finger-pointer pinky" />;
      case "2":
      case "@":
      case "W":
      case "S":
      case "X":
        return <div className="finger-pointer ring" />;
      case "3":
      case "#":
      case "E":
      case "D":
      case "C":
        return <div className="finger-pointer middle" />;
      case "4":
      case "$":
      case "5":
      case "%":
      case "R":
      case "T":
      case "F":
      case "G":
      case "V":
      case "B":
        return <div className="finger-pointer index" />;
      case " ":
        return <div className="finger-pointer thumb" />;
      default:
        return null;
    }
  };
  return (
    <div className="hand-image left-hand">
      <img src="/left-hand.png" alt="Left Hand" />
      {renderFingerPointer()}
    </div>
  );
};
