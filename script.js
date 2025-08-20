const startButton = document.querySelector('#start-btn')

startButton.addEventListener('click', ()=>{
    Game.start()
})


const Gameboard =  (function(){
    let board = ["","","","","","","","",""]

    const render = () =>{
        let boardHTML="";
        const gameBoardDiv = document.querySelector('.board')
        board.forEach((square, index)=>{
            boardHTML +=`<div class="square" id="square-${index}">${square}</div>`
            gameBoardDiv.innerHTML = boardHTML
        })
        const squares = document.querySelectorAll('.square')
        squares.forEach((element)=>{
            element.addEventListener("click",Game.handleClick)
        })
    }

    const updateBoard = (index,mark) =>{
        board[index] = mark //update the array
        render();
        
    }

    const checkWinner = (board)=>{
        const winCombos = [
            [0,1,2],[3,4,5],
            [6,7,8],[0,3,6],
            [1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        for(let i=0; i < winCombos.length;i++){
            let combo = winCombos[i]
            console.log(combo)
            let a = combo[0];
            let b = combo[1];
            let c = combo[2];
            console.log(board)
            if(board[a] !=="" && board[a]===board[b] && board[a] ===board[c]){
                console.log(a)
                return board[a];
            }
            

        }
        return null;
    }

    const getBoard = () => board;

   
    return{render,updateBoard,checkWinner,getBoard}

})();

// Gameboard.render();

//createplayer function factory
const createPlayer = (name,mark)=>{
    return{
        name,
        mark
    }
}


const Game = (function(){
    let players = [];
    let currentPlayerIndex; 
    let gameOver ;


    const start= () =>{
        players= [
            createPlayer(document.querySelector('#player-1').value, "X"),
            createPlayer(document.querySelector('#player-2').value, "O")
        ]
        currentPlayerIndex= 0
        gameOver=false;
        Gameboard.render();
    }

    

    const handleClick = (event)=>{
        if(gameOver) return;
        
        let index = parseInt(event.target.id.split("-")[1]);
        // console.log(index)

        if(!event.target.textContent){
            const mark = players[currentPlayerIndex].mark;
            Gameboard.updateBoard(index, mark);

            
            currentPlayerIndex = 1 - currentPlayerIndex;
            const winner = Gameboard.checkWinner(Gameboard.getBoard());
            if(winner){
                gameOver=true;
                alert(`${winner} wins!`)
            }
        }
      
    }

    return{start, handleClick,}
})();


/*   
    TODO
    set a win condition for the game based on winCon array and display who won in results message
*/

//you need to know where exactly in the board did the player clicked so u can set win conditions based on this array
////           [0,1,2],
//             [3,4,5],
//             [6,7,8],
//             [0,3,6],
//             [1,4,7],
//             [2,5,8],
//             [0,4,8],
//             [2,4,6]




















//old code
// //IIFE, runs once right here and now, whatever we return will be assigned to the gameboard const
// const gameboard = (function(){ 
//     let board = ["","","","","","","","",""] //private variable nothing outside this IIFE can access this variable directly,
//                                                 //9 elements for a 3x3 grid for tictactoe
    
//     //public method that lets outside code READ the board                                           
//     function getBoard(){ 
//         return board
//     }
    
//     //another public method to safely update the board, takes an index (0-8) and a mark ("X" or "O")
//     function setCell(index,mark){
//         //check if index is 0-8  and ensures the cell is empty ("")
//     if (index >= 0 && index <= 8 && board[index] === ""){
//         //if true, update the board with a mark at the index 
//         board[index]=mark
//         return true
//     } else{
//         //leave the board unchanged and return false
//         return false
//     }
 
// }

//     //reset method that clears the board so all 9 cells are empty again ["","","","",...]
//     function reset(){
//         board= ["","","","","","","","",""]
//     }

//     //return the public API 
//     return {getBoard, setCell,reset}
// })();

// //So basically: we have a private board, and three safe “doors” to interact with it: one to read, one to write, one to reset.

// //player factory function 
// function player(name,mark){
//     return {name, mark}
// }

// //IIFE that will run immediately and return the public API, inside we define private variables for players, currentPlayer, gameOver
// const gameController = (function(){
//     //private variables
//     let players 
//     let currentPlayer
//     let gameOver

//     //public methods, just placeholders for now
//     function start(player1Name, player2Name){
//         const player1 = player(player1Name, "X");
//         const player2 = player(player2Name, "O");
//         players=[player1,player2]
//         currentPlayer = players[0]
//         gameOver=false;
//         gameboard.reset()
//     }


//     function playRound(index){
//         if(gameOver===true){
//             return false
//         }
//         if(!gameboard.setCell(index, currentPlayer.mark)){
//             return false
//         }
//         if(checkWin()===true){
//             gameOver= true
//             return "win"
//         }
//         if(!gameboard.getBoard().includes("")){
//             gameOver= true
//             return "tie"
//         }
//         currentPlayer = currentPlayer ===players[0] ? players[1] : players[0]
//         return true
//     }

    
//     function getCurrentPlayer(){
//         console.log(currentPlayer)
//     }
//     function checkWin(){
//         console.log("checkWin() has been called!");

//         const board = gameboard.getBoard();
//         const mark  = currentPlayer.mark;

//         //all possible winning index combinations
//         const winCombos = [
//             [0,1,2],
//             [3,4,5],
//             [6,7,8],
//             [0,3,6],
//             [1,4,7],
//             [2,5,8],
//             [0,4,8],
//             [2,4,6]
//         ]

//         return winCombos.some(combo=>
//             combo.every(index=>board[index]===mark)
//         )
//     }
//     function restart(){}

//     return {start,playRound,getCurrentPlayer,checkWin,restart}

// })();

