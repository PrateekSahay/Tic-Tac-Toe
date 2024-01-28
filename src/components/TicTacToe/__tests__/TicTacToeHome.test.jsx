// TicTacToeHome.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TicTacToeHome from "../TicTacToeHome";

test("renders TicTacToeHome component", () => {
  const { getByText, getByLabelText } = render(<TicTacToeHome />);

  // Check if the component renders the header
  const headerElement = getByText(/Tic Tac Toe/i);
  expect(headerElement).toBeInTheDocument();

  // Check if the input and play button are rendered when showGame is false
  const inputElement = getByLabelText(/board-size/i);
  expect(inputElement).toBeInTheDocument();

  const playButton = getByText(/Play/i);
  expect(playButton).toBeInTheDocument();

  // Simulate input change and click on the play button
  fireEvent.change(inputElement, { target: { value: "4" } });
  fireEvent.click(playButton);

  expect(inputElement).not.toBeInTheDocument();
});
