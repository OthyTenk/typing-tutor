import { FC } from "react";

interface RightHandProps {
  nextKey: string;
}

export const RightHand: FC<RightHandProps> = ({ nextKey }) => {
  const renderFingerPointer = () => {
    switch (nextKey?.toUpperCase()) {
      case ";":
      case "'":
      case "]":
      case "[":
      case "P":
      case "/":
        return <div className="finger-pointer pinky" />;
      case "L":
      case "O":
      case ".":
        return <div className="finger-pointer ring" />;
      case "K":
      case "I":
      case ",":
        return <div className="finger-pointer middle" />;
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
