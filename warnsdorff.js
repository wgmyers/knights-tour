var warnsdorff = function warnsdorff() {

  var data = {
    width: 8,
    height: 8,
    board: []
  };

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


  return {
    init: init
  }

}();

warnsdorff.init();
