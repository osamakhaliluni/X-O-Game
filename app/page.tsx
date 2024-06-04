'use client';
import styles from "./page.module.css";
import { useState } from "react";
import classNames from 'classnames';

interface MyVal {
  value: string;
  index: number;
  square: string[];
  xIsNext: boolean;
  setSquare: React.Dispatch<React.SetStateAction<string[]>>;
  setXIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

let line: number[] = [];

const MyButton: React.FC<MyVal> = ({ value, index, square, setSquare, xIsNext, setXIsNext, className}) => {

  function handleClick(){
    if (square[index] || calculateWinner(square)) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    setSquare(nextSquares);
    setXIsNext(!xIsNext);
  }

  return(
    <button onClick={handleClick} className={className}>{value}</button>
  )
}

function isArrayFull<T>(array: T[]): boolean {
  return array.every((element) => element !== "" && element !== undefined);
}

function Board(){

  const [square, setSquare] = useState(Array<string>(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let gameOver;
  if(isArrayFull(square) && !winner){
    status = "Game Over!"
    gameOver = "=";
  }else{
    gameOver = "";
  }
  
  const winnerResult = calculateWinner(square);
  const isWinningSquare = (index: number): boolean => {
    return winnerResult ? line.includes(index) : false;
  };

  return(
    <div className={styles.main}>
      <div className={styles.gameOver}>{gameOver}</div>
      <div className={styles.status}>{status}</div>
      <div className={styles.row}>
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(0),
          })} value={square[0]} index={0} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(1),
          })} value={square[1]} index={1} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(2),
          })} value={square[2]} index={2} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      </div>
      <div className={styles.row}>
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(3),
          })} value={square[3]} index={3} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(4),
          })} value={square[4]} index={4} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(5),
          })} value={square[5]} index={5} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      </div>
      <div className={styles.row}>
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(6),
          })} value={square[6]} index={6} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(7),
          })} value={square[7]} index={7} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
        <MyButton className={classNames(styles.square, {
          [styles.winningSquare]: isWinningSquare(8),
          })} value={square[8]} index={8} square={square} setSquare={setSquare} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className={styles.body}>
      <Board />
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      line = [a, b, c];
      return squares[a];
    }
  }
  return null;
}