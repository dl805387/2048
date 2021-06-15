export default class Game {

    constructor (size) {
        this.size = size;
        this.gameState = {
            board: new Array(size * size),
            score: 0,
            won: false,
            over: false
        }
        this.setupNewGame(); 
        this.moves = [];
        this.wins = [];
        this.loses = [];
    }

    setupNewGame = () => {
        this.gameState.board.fill(0);
        let initialTile = randomNum(0, this.size * this.size - 1);
        this.gameState.board[initialTile] = twoOrFour();
        while (true) {
            let secondTile = randomNum(0, this.size * this.size - 1);
            // only places the second tile if its position is different than first tile
            // if not, then this will loop until second tile is different than first
            if (secondTile !== initialTile) {
                this.gameState.board[secondTile] = twoOrFour();
                break;
            }
        }
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;
        this.moves = [];
        this.wins = [];
        this.loses = [];
    }

    loadGame = (gameState) => {
        this.gameState = gameState;
    }

    move = (direction) => {

        // Stops the game if the player loses
        if (this.gameState.over) {
            return;
        }

        let invalidMove = true;         // Stays true if move does not cause the board to change
        let originalBoard = [];         // This is a non-reference clone of the board before it changes
        this.gameState.board.map(x => {
            originalBoard.push(x);
        });

        if (direction === "right") {
            let pos = this.size - 2;    // Starting position in the board array
            let spePos = pos;           // This position will be updated to the next row/column
            let boundaryPos = 0;        // This represents the minimum position to prevent going out of bounds
            let merged = [];            // Keeps track of which tile position has already merged
            
            while (pos < (this.size * this.size)) {
                // This for loop keeps the tiles moving until it reaches the end
                for (let i = 1; i <= spePos + 1 - pos; i++) {
                    // This if statement is for moving through empty tiles
                    // The else if statement is for merging tiles
                    if (this.gameState.board[pos + i] === 0) {
                        let temp = this.gameState.board[pos + i - 1];
                        this.gameState.board[pos + i - 1] = 0;
                        this.gameState.board[pos + i] = temp;
                    } else if (this.gameState.board[pos + i] === this.gameState.board[pos + i - 1]) {
                        let stop = false;
                        merged.map(x => {
                            if (x === pos + i - 1 || x === pos + i) {
                                stop = true;
                            }
                        });
                        if (stop === true) {
                            break;
                        }                        
                        this.gameState.board[pos + i] += this.gameState.board[pos + i - 1];
                        this.gameState.board[pos + i - 1] = 0;
                        merged.push(pos + i);
                        this.gameState.score += this.gameState.board[pos + i];
                    }
                }
                pos--;
                if (pos < boundaryPos) {
                    spePos += this.size;
                    pos = spePos;
                    boundaryPos += this.size;
                }
            }
        }

        if (direction === "left") {
            let pos = 1;
            let spePos = pos;
            let boundaryPos = this.size - 1;
            let merged = [];
            while (pos < (this.size * this.size)) {
                for (let i = 1; i <= pos - (spePos - 1); i++) {
                    if (this.gameState.board[pos - i] === 0) {
                        let temp = this.gameState.board[pos - i + 1];
                        this.gameState.board[pos - i + 1] = 0;
                        this.gameState.board[pos - i] = temp;
                    } else if (this.gameState.board[pos - i] === this.gameState.board[pos - i + 1]) {
                        let stop = false;
                        merged.map(x => {
                            if (x === pos - i + 1 || x === pos - i) {
                                stop = true;
                            }
                        });
                        if (stop === true) {
                            break;
                        }                        
                        this.gameState.board[pos - i] += this.gameState.board[pos - i + 1];
                        this.gameState.board[pos - i + 1] = 0;
                        merged.push(pos - i);
                        this.gameState.score += this.gameState.board[pos - i];
                    }
                }
                pos++;
                if (pos > boundaryPos) {
                    spePos += this.size;
                    pos = spePos;
                    boundaryPos += this.size;
                }
            }
        }

        if (direction === "down") {
            let pos = this.size * this.size - (this.size * 2);
            let spePos = pos;
            let boundaryPos = 0;
            let merged = [];
            while (pos < (this.size * this.size)) {
                for (let i = this.size; i <= spePos + this.size - pos; i += this.size) {
                    if (this.gameState.board[pos + i] === 0) {
                        let temp = this.gameState.board[pos + i - this.size];
                        this.gameState.board[pos + i - this.size] = 0;
                        this.gameState.board[pos + i] = temp;
                    } else if (this.gameState.board[pos + i] === this.gameState.board[pos + i - this.size]) {
                        let stop = false;
                        merged.map(x => {
                            if (x === pos + i - this.size || x === pos + i) {
                                stop = true;
                            }
                        });
                        if (stop === true) {
                            break;
                        }                        
                        this.gameState.board[pos + i] += this.gameState.board[pos + i - this.size];
                        this.gameState.board[pos + i - this.size] = 0;
                        merged.push(pos + i);
                        this.gameState.score += this.gameState.board[pos + i];
                    }
                }
                pos -= this.size;
                if (pos < boundaryPos) {
                    spePos++;
                    pos = spePos;
                    boundaryPos++;
                }
            }
        }

        if (direction === "up") {
            let pos = this.size;
            let spePos = pos;
            let boundaryPos = this.size * this.size - this.size;
            let merged = [];
            while (pos < (this.size * this.size)) {
                for (let i = this.size; i <= pos - (spePos - this.size); i += this.size) {
                    if (this.gameState.board[pos - i] === 0) {
                        let temp = this.gameState.board[pos - i + this.size];
                        this.gameState.board[pos - i + this.size] = 0;
                        this.gameState.board[pos - i] = temp;
                    } else if (this.gameState.board[pos - i] === this.gameState.board[pos - i + this.size]) {
                        let stop = false;
                        merged.map(x => {
                            if (x === pos - i + this.size || x === pos - i) {
                                stop = true;
                            }
                        });
                        if (stop === true) {
                            break;
                        }                        
                        this.gameState.board[pos - i] += this.gameState.board[pos - i + this.size];
                        this.gameState.board[pos - i + this.size] = 0;
                        merged.push(pos - i);
                        this.gameState.score += this.gameState.board[pos - i];
                    }
                }
                pos += this.size;
                if (pos > boundaryPos) {
                    spePos++;
                    pos = spePos;
                    boundaryPos++;
                }
            }
        }

        // Checks to see if the board has any open spots
        // Also calculates the highest tile number
        let fullBoard = true;
        let max = 0;
        this.gameState.board.map(x => {
            if (x === 0) {
                fullBoard = false;
            }
            if (x > max) {
                max = x;
            }
        })

        // Compares the original board to the updated board
        // If the boards are different, that means that the move was valid
        // If the boards are the same, then that means no tiles have moved
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] !== originalBoard[i]) {
                invalidMove = false;
                break;
            }
        }

        // Add tile at random open position
        // Does not add tile if an invalid move was made (board doesn't change)
        if (!invalidMove) {
            while (!fullBoard) {
                let newTile = randomNum(0, this.size * this.size - 1);
                if (this.gameState.board[newTile] === 0) {
                    this.gameState.board[newTile] = twoOrFour();
                    break;
                }
            }
        }

        this.moves.map(x => {
            x(this.gameState);
        });

        // Checks to see if board is full again because a tile was added
        fullBoard = true;
        this.gameState.board.map(x => {
            if (x === 0) {
                fullBoard = false;
            }
        })
    
        // If board is full, then this will check to see if any moves are possible
        if (fullBoard) {
            let possibleMoves = false;
            for (let i = 0; i < this.gameState.board.length; i++) {

                // The rightmost tiles do not check right
                if ((i + 1) % this.size === 0) {
                    // checks left
                    if (this.gameState.board[i - 1] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks down
                    if (this.gameState.board[i + this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks up
                    if (this.gameState.board[i - this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                } else if (i % this.size === 0) {
                    // Leftmost tiles do not check left

                    // checks right
                    if (this.gameState.board[i + 1] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks down
                    if (this.gameState.board[i + this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks up
                    if (this.gameState.board[i - this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                } else {
                    // checks right
                    if (this.gameState.board[i + 1] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks left
                    if (this.gameState.board[i - 1] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks down
                    if (this.gameState.board[i + this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                    // checks up
                    if (this.gameState.board[i - this.size] === this.gameState.board[i]) {
                        possibleMoves = true;
                    }
                }

            }

            if (!possibleMoves) {
                this.gameState.over = true;
                this.loses.map(x => {
                    x(this.gameState);
                });
            }
        }

        if (max >= 2048) {
            this.gameState.won = true;
            this.wins.map(x => {
                x(this.gameState);
            });
        }
 
    }

    toString = () => {
        for (let i = 0; i < this.gameState.board.length; i++) {
            process.stdout.write("[" + this.gameState.board[i] + "] ");
            if ((i + 1) % this.size === 0) {
                console.log();
            }
        }
        console.log();
    } 

    onMove = (callback) => {
        this.moves.push(callback);
    }

    onWin = (callback) => {
        this.wins.push(callback);
    }

    onLose = (callback) => {
        this.loses.push(callback);
    }

    getGameState = () => {
        return this.gameState;
    }

}

let randomNum = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let twoOrFour = () => {
    let chance = Math.random();
    if (chance < 0.9) {
        return 2;
    } else {
        return 4;
    }
}