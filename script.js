const gameboard = (function(){
    let board = ["","","","","","","","",""] //private 
    function getBoard(){
        return board
    }
    

    function setCell(index,mark){
    if (index >= 0 && index <= 8 && board[index] === ""){
        board[index]=mark
        return true
    } else{
        return false
    }

    
}
    //return the public API 
    return {getBoard, setCell}
})();

