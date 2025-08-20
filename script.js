const startButton = document.querySelector('#start-btn')

startButton.addEventListener('click', ()=>{
    Game.start()
})

const restartButton = document.querySelector('#restart-btn')
restartButton.addEventListener("click",()=>{
    for(let i=0; i < Gameboard.getBoard().length;i++){
        console.log(Gameboard.getBoard()[i])
        Gameboard.getBoard()[i]="";
    }
    gameOver=false;
    currentPlayerIndex=0;
    Gameboard.render()
    
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
                return board[a];
            } 
        }
        if(board.every(cell=>cell!=="")){
            alert("its a tie!")
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

// add event listener to restart button that restarts the entire game (resets the board)
// add player 1 and player 2 names to X and O respectively