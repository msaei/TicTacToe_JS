var current_player = "X";
var rooms = [0,0,0,0,0,0,0,0,0];
var game_countinue = true;

// this function change players turn between X and O
function flip_player() {
	if (current_player == "X") {
		current_player = "O";
		document.getElementById('game_table').innerHTML = "Current Player is O";
	} else {
		current_player = "X";
		document.getElementById('game_table').innerHTML = "Current Player is X";
	}
}

// this function handle game when user click on any cell
function room_clicked(room) {
	if (game_countinue) {
		if (rooms[room.id - 1] != 0){
			alert("this room is fool !");
		}else{
			document.getElementById(room.id).innerHTML = current_player;
			document.getElementById(room.id).style.color = "black";
			rooms[room.id - 1] = ((current_player == "X") ? 1 : -1);

			if (check_board()) {
				document.getElementById('game_table').innerHTML = "Player " + current_player + " won!";
			} else {
			flip_player();
			}
		}		
	}
}

// this function display a gray X or O when user mouse over cells
function room_overd(room) {
	if (rooms[room.id - 1] == 0 && game_countinue){
		document.getElementById(room.id).innerHTML = current_player;
		document.getElementById(room.id).style.color = "gray";
	}
}

// this function clear mouse over effects of cell
function room_out(room) {
	if (rooms[room.id - 1] == 0 && game_countinue){
		document.getElementById(room.id).innerHTML = "[ ]";
		document.getElementById(room.id).style.color = "black";
	}
}

// this function checks the games status and display winer or tie situation
function check_board() {
	// wining combination array
	var combs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	// check for wining game
	for (i = 0; i < combs.length; i++) {
		if (Math.abs(rooms[combs[i][0]] +  rooms[combs[i][1]] + rooms[combs[i][2]]) == 3) {	
			document.getElementById(combs[i][0] + 1).style.color = "red";
			document.getElementById(combs[i][1] + 1).style.color = "red";
			document.getElementById(combs[i][2] + 1).style.color = "red";
			alert("You won !");
			game_countinue = false ;
			return true;
		} 
	}
	
	// check for tie situation
	var check = 1;
	for (i = 0; i < 9; i++) {
		check = rooms[i] * check
	}
	if (check != 0) {
		// tie happened
		alert("Tie!");
		game_countinue = false ;
		return true;
	}
		
	return false;
}