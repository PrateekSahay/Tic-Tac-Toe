import React, { useState } from "react";
import "./styles.css";
import TicTacToeContainer from "./TicTacToeContainer";

const TicTacToeHome = () => {
  const [boardSize, setBoardSize] = useState("");
  const [showGame, setShowGame] = useState(false);

  const onPlayClick = () => {
    setShowGame(true);
  };

  const onInputChange = (e) => {
    const value = e.target.value
     
    // Allow empty input or single-digit numbers from 1 to 9
    if (value === "" || (/^[1-9]$/.test(value) && value.length <= 1)) {
            setBoardSize(value);
      }
  };

  return (
    <>
      <header className="center">
        <h1>Tic Tac Toe</h1>
      </header>
      {showGame ? (
        <TicTacToeContainer boardSize={Number(boardSize) || 3} />
      ) : (
        <div className="homeInfo">
          <label>Enter the board size:</label>
          <input
            className="inputSize"
            type="text"
            onChange={onInputChange}
            value={boardSize}
            max="1"            
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
