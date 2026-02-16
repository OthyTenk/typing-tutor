import { FC } from "react";

interface LeftHandProps {
  nextKey: string;
}

export const LeftHand: FC<LeftHandProps> = ({ nextKey }) => {
  const renderFingerPointer = () => {
    switch (nextKey?.toUpperCase()) {
      case "Z":
      case "Q":
      case "A":
        return <div className="finger-pointer pinky" />;
      case "X":
      case "W":
      case "S":
        return <div className="finger-pointer ring" />;
      case "C":
      case "E":
      case "D":
        return <div className="finger-pointer middle" />;
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
