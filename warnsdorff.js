var warnsdorff = function warnsdorff() {

  var data = {
    width: 8,
    height: 8,
    board: []
  };

  // random_start
  // Calculate tour from random start point
  function random_start() {
    var rx = Math.floor(Math.random() * data.width);
    var ry = Math.floor(Math.random() * data.height);

    calculate_path(rx, ry);

  }

  // corner_start
  // Calculate Knights Tour from corner
  function corner_start() {
    calculate_path(0, 0);
  }

  // calculate_path
  // Take a starting x, y position on the board
  // Using Warnsdorff's heuristic, try and calculate a knights tour
  // FIXME - Assumes empty board
  function calculate_path(x, y) {
    var finished = false;
    var kx = x;
    var ky = y;
    var move_number = 0;
    var next_move;

    while(finished == false) {
      move_number++;
      data.board[kx][ky] = move_number;
      next_move = get_best_move(kx, ky);
      if(next_move[0] == -1) {
        finished = true;
      } else {
        kx = next_move[0];
        ky = next_move[1];
      }
    }

    return move_number;

  }

  // get_best_move
  // Given an x, y position on the board, calculate best next move from
  // there according to Warnsdorff
  function get_best_move(x, y) {
    var res = [-1, -1]; // If returned unchanged, we found no best move
    var least_onward_moves = 8; // There are never more than 7 onward moves in a tour
    var candidate_moves = get_available_moves(x, y);

    // Do not clobber existing marking of x, y, but if there was none, mark it
    // This way we can reuse this function both in full and partial calculations
    // and also possibly in some future interactive implementation
    if(data.board[x][y] == 0) {
      data.board[x][y] == -1;
    }
    // Iterate over candidate moves, calculating onward moves from there,
    // choosing first move found with the least onward moves.
    // NB - Does (yet) not implement Poll or Squirrel & Cull's better tiebreaker
    //      methods, so overall will fail in some cases. See Wiki.
    candidate_moves.forEach(function(item, index) {
      var onward_moves = get_available_moves(item[0], item[1]);
      if (onward_moves.length < least_onward_moves) {
        res = item;
        least_onward_moves = onward_moves.length;
      }
    });

    // Unclobber current square if we marked it ourselves
    if(data.board[x][y] == -1) {
      data.board[x][y] == 0;
    }

    return res;
  }

  // get_available_moves
  // Take x and y position on board
  // Return array of unvisited locations a knights move away
  function get_available_moves(x, y) {
    var all_moves = get_knights_moves(x, y);
    var res = [];
    all_moves.forEach(function(item, index) {
      if(data.board[item[0]][item[1]] == 0) {
        res.push(item);
      }
    })

    return res;
  }

  // get_knights_moves
  // Take x and y position on board
  // Return array of squares a knights move away from x,y
  function get_knights_moves(x, y) {
    var res = [];
      // Iterate over a 5x5 square centered on x,y, skipping non knights moves
      for (var i = -2; i < 3; i++) {
        if (i == 0) { continue; } // Skip non knights moves
        for (var j = -2; j < 3; j++) {
          if ((j == 0) || (i == j) || (i == -j)) { continue; } // Skip non knights moves
          var cx = x + i;
          var cy = y + j;
          if((cx > -1) && (cx < data.width) && (cy > -1) && (cy < data.height)) {
            res.push([cx, cy]);
          }
         }
      }

    return res;
  }

  // Initialise data for the Warnsdoff algorithm
  function init() {
    // Create board array, 8x8 for now
    for (var i = 0; i < data.height; i++) {
      data.board[i] = new Array(data.width);
      for (var j = 0; j < data.width; j++) {
        data.board[i][j] = 0;
      }
    }

    // console.log(data.board);
  }

  // Make board visible to subsequent scripts
  function get_board() {
    return data.board;
  }

  return {
    init: init,
    get_board: get_board,
    corner_start: corner_start,
    random_start: random_start
  }

}();

warnsdorff.init();
warnsdorff.random_start();
