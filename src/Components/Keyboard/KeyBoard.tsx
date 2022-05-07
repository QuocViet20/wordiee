import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decPos, incRow, setBoard } from "../../Redux/boardSlice";
import { rootState } from "../interface";
import Key from "../Key/Key";
import "./keyboard.css";
import wordList from "../../word.json";

const KeyBoard: React.FC = () => {
  const position = useSelector((state: rootState) => state.board.pos);
  const board = useSelector((state: rootState) => state.board.board);
  const row = useSelector((state: rootState) => state.board.row);
  const rows: string[] = [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m",
  ];
  let board5Words: string = `${board[position - 5]}${board[position - 4]}${board[position - 3]}${board[position - 2]}${board[position - 1]}`.toLowerCase();
  let allWords: string[] = wordList.words;
  const correctWord = useSelector((state: rootState) => state.board.correctWord);
  const dispatch = useDispatch();
  const clickBack = () => {
    if (Math.floor((position - 1) / 5) < row) return;
    const newBoard = [...board];
    newBoard[position - 1] = " ";
    dispatch(decPos());
    dispatch(setBoard(newBoard));
  };
  const clickEnter = () => {
    console.log(correctWord);
    if (allWords.includes(board5Words) === false) {
      alert("invalid word");
    } else if (allWords.includes(board5Words)) {
      if (position % 5 === 0 && position !== 0) {
        dispatch(incRow());
      }
    }
    {
      if (position === 30 && allWords.includes(board5Words)) {
        alert("the word is:" + correctWord);
      }
    }
  };
  return (
    <div className="keyboard-container">
      {rows.map((row, index) => {
        return (
          <div className="row">
            {index === 2 && (
              <span className="letter-row" onClick={clickEnter}>
                Enter
              </span>
            )}
            {row.split(" ").map((letter, index) => {
              return (
                <div className="letter-row">
                  <Key letter={letter.toUpperCase()} />
                  {letter === "m" && <span onClick={clickBack}>Back</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default KeyBoard;
