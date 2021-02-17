var l = 20;
var scl = 30; //min 15 (→text size)
let cells = [];
let isFirst = true;

function setup() {
  createCanvas(l * scl, l * scl);

  for (var x = 0; x < l; x++) {
    cells[x] = [];
    for (var y = 0; y < l; y++) {
      cells[x][y] = new Cell(Math.random() < 0.2, x, y);
    }
  }
}

function draw() {
  background(255);
  drawGrid();

  for (var x = 0; x < l; x++) {
    for (var y = 0; y < l; y++) {
      cells[x][y].getValue();

      if (cells[x][y].show) {
        cells[x][y].render();
      }
      if (cells[x][y].flagged) {
        fill(100, 0, 0);
        rect(x * scl, y * scl, scl, scl);
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / scl);
  let y = Math.floor(mouseY / scl);

  let notBorder = x > 0 && y > 0 && x < l - 1 && y < l - 1;
  cells[x][y].border = !notBorder;

  if (isFirst && notBorder) {
    cells[x][y].clearBombs(x, y);
  }
  isFirst = false;

  // if (cells[x][y].value == 0) {
  //   cells[x][y].revealEmpty(x, y);
  // }

  cells[x][y].show = true;
  if (cells[x][y].isBomb) {
    noLoop();
  }
}

function keyPressed() {
  let x = Math.floor(mouseX / scl)
  let y = Math.floor(mouseY / scl)

  cells[x][y].flagged = !cells[x][y].flagged;
  cells[x][y].show = false;
}

function drawGrid() {
  for (let x = 0; x < l; x++) {
    fill(0)
    line(x * scl, 0, x * scl, l * scl)
  }
  for (var y = 0; y < l; y++) {
    fill(200)
    line(0, y * scl, l * scl, y * scl)
  }
}