var board = function board() {

  var data = {
    board: []
  }

  // This assumes warnsdorff.js is loaded and exposes a var 'warsndorff'
  function init() {
    data.board = warnsdorff.get_board();
  }

  // Primitive ASCII representation for now
  function draw() {
    var bdiv = document.querySelector("#board");
    var msg = "<pre>";
    data.board.forEach(function(item, index) {
      item = item.map(function(x) {
        if (x < 10) {
          return "0" + x.toString();
        } else {
          return x.toString();
        }
      });
      msg += item.join(" ");
      msg += "\n";
    })
    msg = msg + "</pre><p>(Hit reload for a new one)</p>";
    bdiv.innerHTML = msg;
  }

  return {
    init: init,
    draw: draw
  }

}();

board.init();
board.draw();
