const startButton = document.querySelector('#start-btn')

startButton.addEventListener('click', ()=>{
    Game.start()
})

const restartButton = document.querySelector('#restart-btn')
        restartButton.addEventListener("click", ()=>{
            Game.restart();
        })

const resultMessage = document.querySelector('.results')


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
            
            let a = combo[0];
            let b = combo[1];
            let c = combo[2];
            
            if(board[a] !=="" && board[a]===board[b] && board[a] ===board[c]){
                return board[a];
            } 
        }
        if(board.every(cell=>cell!=="")){
            resultMessage.textContent= "It's a tie!"
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
        document.querySelector('.player-names').textContent = 
        `${players[0].name} (X) vs ${players[1].name} (O)`;
        Gameboard.render();
    }

    

    const handleClick = (event)=>{
        if(gameOver) return;
        
        let index = parseInt(event.target.id.split("-")[1]);
        

        if(!event.target.textContent){
            const mark = players[currentPlayerIndex].mark;
            Gameboard.updateBoard(index, mark);

            
            currentPlayerIndex = 1 - currentPlayerIndex;
           const winnerMark = Gameboard.checkWinner(Gameboard.getBoard());
        if(winnerMark){
            gameOver = true;
            const winnerName = players.find(p => p.mark === winnerMark).name;
            resultMessage.textContent = `${winnerName} wins!`;
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
            resultMessage.textContent = "It's a tie!";
            gameOver = true;
        }

        }
      
    }

    const restart=()=>{
         let board = Gameboard.getBoard();
        for(let i=0; i<board.length; i++){
            board[i] = "";
        }
        currentPlayerIndex = 0;
        gameOver = false;
        resultMessage.textContent = "";
        Gameboard.render();
    }

    return{start, handleClick,restart}
})();


// add player 1 and player 2 names to X and O respectively
// add winner to results
// manipulate the dom to display who won on the result div 