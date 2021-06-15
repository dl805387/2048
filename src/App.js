import './App.css';
import Game from "./engine/game.js";
import React, { useState, useEffect } from "react";
import useKeypress from 'react-use-keypress';

let game = new Game(4);

function App() {

  const [gState, setGState] = useState(game.gameState);
  // These states represent the tiles on the board
  const [t1, setT1] = useState(game.gameState.board[0]);
  const [t2, setT2] = useState(game.gameState.board[1]);
  const [t3, setT3] = useState(game.gameState.board[2]);
  const [t4, setT4] = useState(game.gameState.board[3]);
  const [t5, setT5] = useState(game.gameState.board[4]);
  const [t6, setT6] = useState(game.gameState.board[5]);
  const [t7, setT7] = useState(game.gameState.board[6]);
  const [t8, setT8] = useState(game.gameState.board[7]);
  const [t9, setT9] = useState(game.gameState.board[8]);
  const [t10, setT10] = useState(game.gameState.board[9]);
  const [t11, setT11] = useState(game.gameState.board[10]);
  const [t12, setT12] = useState(game.gameState.board[11]);
  const [t13, setT13] = useState(game.gameState.board[12]);
  const [t14, setT14] = useState(game.gameState.board[13]);
  const [t15, setT15] = useState(game.gameState.board[14]);
  const [t16, setT16] = useState(game.gameState.board[15]);

  // This is testing for when the user wins
  // useEffect(() => {
  //   const winTesting = () => {
  //     game.gameState.board[0] = 1024;
  //     game.gameState.board[1] = 1024;
  //     updateBoard();
  //   };
  //   winTesting();
  // }, []);

  useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], (event) => {
    if (event.key === 'ArrowLeft') {
      game.move("left");
      updateBoard();

    } else if (event.key === 'ArrowRight') {
      game.move("right");
      updateBoard();
      
    } else if (event.key === 'ArrowUp') {
      game.move("up");
      updateBoard();

    } else if (event.key === 'ArrowDown') {
      game.move("down");
      updateBoard();
    } 
  });

  // Update the states
  const updateBoard = () => {
    setGState(game.gameState);
    setT1(game.gameState.board[0]);
    setT2(game.gameState.board[1]);
    setT3(game.gameState.board[2]);
    setT4(game.gameState.board[3]);
    setT5(game.gameState.board[4]);
    setT6(game.gameState.board[5]);
    setT7(game.gameState.board[6]);
    setT8(game.gameState.board[7]);
    setT9(game.gameState.board[8]);
    setT10(game.gameState.board[9]);
    setT11(game.gameState.board[10]);
    setT12(game.gameState.board[11]);
    setT13(game.gameState.board[12]);
    setT14(game.gameState.board[13]);
    setT15(game.gameState.board[14]);
    setT16(game.gameState.board[15]);
  }

  // Returns an empty string if tile value is 0
  // This is used so that the board won't have 0 values displayed
  const isEmptyTile = (num) => {
    if (num === 0) {
      return "";
    } else {
      return num;
    }
  }

  // Returns a message if user loses
  const isGameOver = (over) => {
    if (over) {
      return "Game Over";
    } else {
      return "";
    }
  }

  // Returns a message if user wins
  const hasWon = (won) => {
    if (won) {
      return "You Won!"
    } else {
      return "";
    }
  }

  // Used to change the color of the tile depending on the number
  const colorr = (num) => {
    if (num == 2) {
      return "white";
    } else if (num === 4) {
      return "lightyellow";
    } else if (num == 8) {
      return "orange";
    } else if (num == 16) {
      return "darkorange";
    } else if (num == 32) {
      return "orangered";
    } else if (num == 64) {
      return "red";
    } else if (num > 64){
      return "yellow";
    }
  } 

  return (
    <div>
      <p>HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!</p>

      <div className="columns">
        <div className="column">
        <p className="title">{"Score: " + gState.score}</p>
        <button className="button" type="button" onClick={() => {game.setupNewGame(); updateBoard();}}>New Game</button>
        </div>

        <div className="column">
        <p className="overLabel">{isGameOver(gState.over)}</p>
        </div>

        <div className="column">
        <p className="wonLabel">{hasWon(gState.won)}</p>
        </div>
      </div>

      <div className="board">
        <div className="columns topRow">
          <div className="column tile" style={{backgroundColor: colorr(t1)}}>{isEmptyTile(t1)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t2)}}>{isEmptyTile(t2)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t3)}}>{isEmptyTile(t3)}</div>
          <div className="column tile lastCol" style={{backgroundColor: colorr(t4)}}>{isEmptyTile(t4)}</div>
        </div>

        <div className="columns">
          <div className="column tile" style={{backgroundColor: colorr(t5)}}>{isEmptyTile(t5)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t6)}}>{isEmptyTile(t6)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t7)}}>{isEmptyTile(t7)}</div>
          <div className="column tile lastCol" style={{backgroundColor: colorr(t8)}}>{isEmptyTile(t8)}</div>
        </div>

        <div className="columns">
          <div className="column tile" style={{backgroundColor: colorr(t9)}}>{isEmptyTile(t9)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t10)}}>{isEmptyTile(t10)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t11)}}>{isEmptyTile(t11)}</div>
          <div className="column tile lastCol" style={{backgroundColor: colorr(t12)}}>{isEmptyTile(t12)}</div>
        </div>

        <div className="columns">
          <div className="column tile" style={{backgroundColor: colorr(t13)}}>{isEmptyTile(t13)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t14)}}>{isEmptyTile(t14)}</div>
          <div className="column tile" style={{backgroundColor: colorr(t15)}}>{isEmptyTile(t15)}</div>
          <div className="column tile lastCol" style={{backgroundColor: colorr(t16)}}>{isEmptyTile(t16)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;