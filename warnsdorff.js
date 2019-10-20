var warnsdorff = function warnsdorff() {

  var data = {
    width: 8,
    height: 8,
    board: []
  };

  // get_knights_moves
  // Take x and y position on board
  // Return array of squares a knights move away from x,y
  function get_knights_moves(x,y) {
    var res = [];
      // Iterate over a 5x5 square centered on x,y, skipping non knights moves
      for (var i = -2; i < 3; i++) {
        if (i == 0) { continue; } // Skip non knights moves
        for (var j = -2; j < 3; j++) {
          if ((j == 0) || (i == j) || (i == -j)) { continue; } // Skip non knights moves
          var cx = x + i;
          var cy = y + j;
          if((cx > 0) && (cx < data.width) && (cy > 0) && (cy < data.height)) {
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

    console.log(data.board);
  }

  // Make board visible to subsequent scripts
  function get_board() {
    return data.board;
  }

  return {
    init: init,
    get_board: get_board
  }

}();

warnsdorff.init();
