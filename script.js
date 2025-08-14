
//IIFE, runs once right here and now, whatever we return will be assigned to the gameboard const
const gameboard = (function(){ 
    let board = ["","","","","","","","",""] //private variable nothing outside this IIFE can access this variable directly,
                                                //9 elements for a 3x3 grid for tictactoe
    
    //public method that lets outside code READ the board                                           
    function getBoard(){ 
        return board
    }
    
    //another public method to safely update the board, takes an index (0-8) and a mark ("X" or "O")
    function setCell(index,mark){
        //check if index is 0-8  and ensures the cell is empty ("")
    if (index >= 0 && index <= 8 && board[index] === ""){
        //if true, update the board with a mark at the index 
        board[index]=mark
        return true
    } else{
        //leave the board unchanged and return false
        return false
    }
 
}

    //reset method that clears the board so all 9 cells are empty again ["","","","",...]
    function reset(){
        board= ["","","","","","","","",""]
    }

    //return the public API 
    return {getBoard, setCell,reset}
})();

//So basically: we have a private board, and three safe “doors” to interact with it: one to read, one to write, one to reset.

//player factory function 
function player(name,mark){
    return {name, mark}
}

//IIFE that will run immediately and return the public API, inside we define private variables for players, currentPlayer, gameOver
const gameController = (function(){
    //private variables
    let players 
    let currentPlayer
    let gameOver

    //public methods, just placeholders for now
    function start(player1Name, player2Name){
        const player1 = player(player1Name, "X");
        const player2 = player(player2Name, "O");
        players=[player1,player2]
        currentPlayer = players[0]
        gameOver=false;
        gameboard.reset()
    }


    function playRound(index){
        if(gameOver===true){
            return false
        }
        if(!gameboard.setCell(index, currentPlayer.mark)){
            return false
        }
        if(checkWin()===true){
            gameOver= true
            return "win"
        }
        if(!gameboard.getBoard().includes("")){
            gameOver= true
            return "tie"
        }
    }
    function getCurrentPlayer(){
        console.log(currentPlayer)
    }
    function checkWin(){}
    function restart(){}

    return {start,playRound,getCurrentPlayer,checkWin,restart}

})();

