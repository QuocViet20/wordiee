import React from "react";
import Square from "../Square/square";
import "./board.css";

interface IProps {
  board: string[];
}

const Board: React.FC<IProps> = (props) => {
  const { board } = props;
  return (
    <>
      <div className="board">
        {board.map((square, index) => {
          return (
            <>
              <Square val={square} squareIdx={index} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Board;
