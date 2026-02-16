import { FC } from "react";
import { HandInfo } from "../types";

interface RightHandProps {
  nextKey: string;
  handInfo: HandInfo;
}

export const RightHand: FC<RightHandProps> = ({ nextKey, handInfo }) => {
  const renderFingerPointer = () => {
    // Check if this hand needs to press Shift
    if (handInfo.requiresShift && handInfo.shiftHand === "right") {
      return <div className="finger-pointer pinky" data-finger="Shift" />;
    }

    // Otherwise check if this hand types the character
    if (handInfo.hand !== "right" && handInfo.hand !== "both") return null;

    switch (nextKey?.toUpperCase()) {
      case "0":
      case ")":
      case "-":
      case "_":
      case "=":
      case "+":
      case "[":
      case "{":
      case "]":
      case "}":
      case "\\":
      case "|":
      case ";":
      case ":":
      case "'":
      case '"':
      case "P":
      case "/":
      case "?":
        return <div className="finger-pointer pinky" />;
      case "9":
      case "(":
      case "L":
      case "O":
      case ".":
      case ">":
        return <div className="finger-pointer ring" />;
      case "8":
      case "*":
      case "K":
      case "I":
      case ",":
      case "<":
        return <div className="finger-pointer middle" />;
      case "6":
      case "^":
      case "7":
      case "&":
      case "J":
      case "H":
      case "U":
      case "Y":
      case "N":
      case "M":
        return <div className="finger-pointer index" />;
      case " ":
        return <div className="finger-pointer thumb" />;
      default:
        return null;
    }
  };

  return (
    <div className="hand-image right-hand">
      <img src="/right-hand.png" alt="Right Hand" />
      {renderFingerPointer()}
    </div>
  );
};
