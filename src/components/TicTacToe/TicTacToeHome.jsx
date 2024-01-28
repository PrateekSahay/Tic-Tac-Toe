import React, { useState } from "react";
import "./styles.css";
import TicTacToeContainer from "./TicTacToeContainer";

const TicTacToeHome = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [showGame, setShowGame] = useState(false);

  const onPlayClick = () => {
    setShowGame(true);
  };

  const onInputChange = (e) => {
    setBoardSize(Number(e.target.value));
  };

  return (
    <>
      <header className="center">
        <h1>Tic Tac Toe</h1>
      </header>
      {showGame ? (
        <TicTacToeContainer boardSize={boardSize || 3} />
      ) : (
        <div className="homeInfo">
          <label>Enter the board size:</label>
          <input
            className="inputSize"
            type="number"
            onChange={onInputChange}
            value={boardSize}
            max={10}
            aria-label="board-size"
          />
          <button
            style={{
              background: "aquamarine",
              borderRadius: "10px",
              width: "50px",
            }}
            onClick={() => onPlayClick()}
          >
            Play
          </button>
        </div>
      )}
    </>
  );
};

export default TicTacToeHome;
