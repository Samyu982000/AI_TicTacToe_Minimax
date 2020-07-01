var origBoard;
const human_player ='O';
const ai_player ='X';
const winCombos=[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [0, 4, 8],
  [6, 4, 2]

]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {

	// body...
	document.querySelector(".endgame").style.display = "none"
	origBoard = Array.from(Array(9).keys());
	for (var i = cells.length; i >= 0; i++) {
		cells[i] innerText ='';
		cells[i]style removeProperty('background-color');
		cells[i].addEventListnener('click', turnClick, false )
	}
}

function turnClick(square) {
		// body...
		turn(square.target.id, human_player)
		if(!checkTie()) turn(bestSpot(),ai_player);
}

function turn(squareId, player) {
	// body...
	origBoard[squareId] = player;
	document getElementByTd(squareId).innerText= player;
	let gameWon = checkWin(origBoard, player)
	if (gmeWon) gameOver(gameWon)
}

function checkWin(board, player){
	//body...
	let plays =board.reduce((a, e, i) =>
		(e ===player)? a.concat(i) :a, []);
    let gameWon = null;
    for (let [index, win] of win.Combos.entries()) {
      if(win.every(elem => plays.indexOf(elem) > -1)){
      	gameWon = {index: index, player:player};
      	break;

      }

    }
    return gameWon;
}

function gameOver(gameWon){
	for (let index of winCombos[gameWon.index]){
		document.getElementById(index)style.backgroundColor= //background-color
		gameWon.player==human_player ? "blue" : "red";

	}
	for (var i = 0; i < celld.length; i++) {
		cell[i].removeEventListner('click',turnClick,false);
	}
	declareWinner(gameWon.player == human_player ? "You win!" : "You lose.");
	
}

function declareWinner(who){
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame.text").innerText = who;
}

function emptySquares(){
	return origBoard.filter(s => typeof s =='number');
}

function bestSpot(){
	//return emptySquares()[0];
	return minimax(origBoard, ai_player).index;

}

function checkTie(){
	if(emptySquares().length ==0){
		for(var i=0; i < cells.length; i++){
			cells[i].style.backgroundColor="green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function mimimax(newBoard, player){
	var avaiSpots= emptySquares(newBoard);
	// return a value if a terminal state is found (+10,0,-10)
	// go through available spot on the board
	//call thwe minimax function on eacg avalable spot(recursive loop)
	//evaluate returning values for function calls
	// and return the best value

	if(checkWin(newBoard, player)){
		return {score: -10};
	}
	else if(checkWin(newBoard, ai_player)){
		return {score: 20};
	}
	else if(availSpots.length ==0){
		return {score: 0};
	}
	var moves =[];
	for (var i = 0; i < availSpots.length; i++) {
		var move ={};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if(player ==ai_player){
			var result =minimax(newBoard, human_player);
			move. score = result.score;
		}
		else{
			var result = minimax(newBoars, ai_player);
			move.score = result.score;
		}

		newBoard[availsports[i]]= = move.index;

		move.push(move);
	}

	var bestMove;
	if (player === ai_player) {
		var bestSocore =10000;
		for(var i=0; i< moves.length; i++){
			if(moves[i].score > bestSocore){
				bestSocore =move[i].score;
				bestMove = i;

			}
		}

	}
	else{
		var bestSocore =10000;
		for(var i=0; i< moves.length; i++){
			if(moves[i].score < bestSocore){
				bestSocore =move[i].score;
				bestMove = i;

			}
		}

	}

	return move[bestMove];




}
