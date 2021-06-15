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

    // Update the game state
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
    const color = (num) => {
        if (num === 2) {
            return "white";
        } else if (num === 4) {
            return "rgb(25, 247, 255)";
        } else if (num === 8) {
            return "rgb(25, 255, 205)";
        } else if (num === 16) {
            return "rgb(25, 255, 121)";
        } else if (num === 32) {
            return "rgb(187, 255, 0)";
        } else if (num === 64) {
            return "rgb(255, 252, 58)";
        } else if (num > 64){
            return "rgb(255, 159, 50)";
        }
    } 

    // change font size if number is too big
    const reSize = (num) => {
        if (num >= 1000) {
            return " largeNum";
        } else {
            return "";
        }
    }
    
    // This is for testing purposes
    // useEffect(() => {
    //     game.gameState.board[0] = 1024;
    //     game.gameState.board[1] = 1024;
    //     game.gameState.board[2] = 124;
    //     game.gameState.board[3] = 104;
    //     game.gameState.board[4] = 102;
    //     game.gameState.board[5] = 124;
    //     game.gameState.board[6] = 104;
    //     game.gameState.board[7] = 104;
    //     game.gameState.board[8] = 24;
    //     game.gameState.board[9] = 14;
    //     game.gameState.board[10] = 24;
    //     game.gameState.board[11] = 124;
    //     game.gameState.board[12] = 24;
    //     game.gameState.board[13] = 4;
    //     game.gameState.board[14] = 102;
    //     game.gameState.board[15] = 24;
    //     updateBoard();
    // }, []);


    return (
        <div>
            <p className="instr">HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!</p>

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
                <div className="columns is-mobile">
                    <div className={"column tile" + reSize(t1)} style={{backgroundColor: color(t1), fontSize: reSize(t1)}}>{isEmptyTile(t1)}</div>
                    <div className={"column tile" + reSize(t2)} style={{backgroundColor: color(t2)}}>{isEmptyTile(t2)}</div>
                    <div className={"column tile" + reSize(t3)} style={{backgroundColor: color(t3)}}>{isEmptyTile(t3)}</div>
                    <div className={"column tile" + reSize(t4)} style={{backgroundColor: color(t4)}}>{isEmptyTile(t4)}</div>
                </div>

                <div className="columns is-mobile">
                    <div className={"column tile" + reSize(t5)} style={{backgroundColor: color(t5)}}>{isEmptyTile(t5)}</div>
                    <div className={"column tile" + reSize(t6)} style={{backgroundColor: color(t6)}}>{isEmptyTile(t6)}</div>
                    <div className={"column tile" + reSize(t7)} style={{backgroundColor: color(t7)}}>{isEmptyTile(t7)}</div>
                    <div className={"column tile" + reSize(t8)} style={{backgroundColor: color(t8)}}>{isEmptyTile(t8)}</div>
                </div>

                <div className="columns is-mobile">
                    <div className={"column tile" + reSize(t9)} style={{backgroundColor: color(t9)}}>{isEmptyTile(t9)}</div>
                    <div className={"column tile" + reSize(t10)} style={{backgroundColor: color(t10)}}>{isEmptyTile(t10)}</div>
                    <div className={"column tile" + reSize(t11)} style={{backgroundColor: color(t11)}}>{isEmptyTile(t11)}</div>
                    <div className={"column tile" + reSize(t12)} style={{backgroundColor: color(t12)}}>{isEmptyTile(t12)}</div>
                </div>

                <div className="columns is-mobile">
                    <div className={"column tile" + reSize(t13)} style={{backgroundColor: color(t13)}}>{isEmptyTile(t13)}</div>
                    <div className={"column tile" + reSize(t14)} style={{backgroundColor: color(t14)}}>{isEmptyTile(t14)}</div>
                    <div className={"column tile" + reSize(t15)} style={{backgroundColor: color(t15)}}>{isEmptyTile(t15)}</div>
                    <div className={"column tile" + reSize(t16)} style={{backgroundColor: color(t16)}}>{isEmptyTile(t16)}</div>
                </div>
            </div>
        </div>
    );
}

export default App;