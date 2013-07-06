var pong = (function(my) {

  var interval;
  function run_simulation() { interval = window.setInterval(game_loop,  50); }
  function pause_simulation() { window.clearInterval(interval); interval = null; }
  function toggle_simulation() { 
    if (interval != null) { 
      pause_simulation();
      } else {
      run_simulation();
    }
  }

  var x = 110;
  var y = 140;
  var dx = -5;
  var dy = -4;
  var min_x, min_y, max_x, max_y, paddle_x, paddle_y;

  function init() { 
    var canvas = document.getElementById('canvas');
    canvas.addEventListener("mousemove", function(event) {
      paddle_x = event.clientX;
    }, false);
    min_x = canvas.scrollLeft;
    min_y = canvas.scrollTop;
    max_x = canvas.scrollWidth - min_x;
    max_y = canvas.scrollHeight - min_y;
    paddle_x = max_x/2 + min_x
    paddle_y = max_y - 10;
    toggle_simulation();
  }

  function game_loop() { update(); draw(); }

  function hit_paddle() {
    return (dy > 0 && 
    y >= paddle_y && 
    y <= paddle_y + 20 && 
    x >= (paddle_x - 20) && 
    x <= (paddle_x + 20));
  }

  function bounce_x() {
      dx = -dx;
  }

  function bounce_y() {
      dy = -dy;
  }

  function update() {
    x += dx;
    y += dy;
    if (hit_paddle()) {
      bounce_y();
    }
    if (x > max_x) {
      bounce_x();
      x = max_x;
    }
    if (x < min_x) {
      bounce_x();
      x = min_x;
    }
    if (y > max_y) {
      y = max_y;
    }
    if (y < min_y) {
      bounce_y();
      y = min_y;
    }
  }

  function draw(){
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(min_x, min_y, max_x, max_y);
    ctx.fillRect(x,y,10,10);

    // paddle
    ctx.fillRect(paddle_x-20, paddle_y, 40, 10);
  }
  my.init = init;
  my.toggle_simulation = toggle_simulation;
  return my;
}(pong || {}));

window.onload = pong.init;
window.onclick = pong.toggle_simulation;
// vim: ts=2:sw=2:et
