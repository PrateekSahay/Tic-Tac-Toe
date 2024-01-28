// App.js
import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import Board from "./Board";
import GameHistory from "./GameHistory";
import { calculateWinner } from "./utils";

const TicTacToeContainer = ({boardSize = 3}) => {
    console.log("boardSize", boardSize  )
  const [history, setHistory] = useState([
    { squares: Array(boardSize).fill(Array(boardSize).fill(null)) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);

  const currentSquares = history[stepNumber].squares;
  console.log("currentSquares", currentSquares);
  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    if (winner) {
      alert(`Winner: ${winner}`);
    }
  }, [winner]);

  const handleClick = useCallback(
    (row, col) => {
      if (currentSquares[row][col] || winner) {
        return;
      }

      const newSquares = currentSquares.map((row) => row.slice());
      newSquares[row][col] = isXNext ? "X" : "O";

      setHistory((prevHistory) => [
        ...prevHistory.slice(0, stepNumber + 1),
        { squares: newSquares },
      ]);
      setStepNumber((prevStepNumber) => prevStepNumber + 1);
      setIsXNext(!isXNext);
    },
    [currentSquares, winner, isXNext, stepNumber]
  );

  const jumpTo = useCallback((step) => {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  }, []);

  const undoLastMove = useCallback(() => {
    if (stepNumber > 0) {
      setStepNumber((prevStepNumber) => prevStepNumber - 1);
      setIsXNext((prevIsXNext) => !prevIsXNext);
    }
  }, [stepNumber]);

  const resetGame = useCallback(() => {
    setHistory([
      { squares: Array(boardSize).fill(Array(boardSize).fill(null)) },
    ]);
    setStepNumber(0);
    setIsXNext(true);
  }, []);

  return (
    <>            
      <section className="game">
        <div className="game-board">
          <Board squares={currentSquares} onClick={handleClick} />
        </div>
        <div className="data-container">
          <div className="game-info">
            <div>
              {winner
                ? `Winner: ${winner}`
                : `Next Player: ${isXNext ? "X" : "O"}`}
            </div>
            <button
              onClick={undoLastMove}
              disabled={stepNumber === 0}
              aria-label="Undo Last Move"
            >
              Undo Last Move
            </button>
            <button onClick={resetGame} aria-label="Reset Game">
              Reset Game
            </button>
          </div>
          <GameHistory history={history} jumpTo={jumpTo} />
        </div>
      </section>
    </>
  );
};

export default TicTacToeContainer;
