const nRC = 32;
const sR = Math.ceil(1280/nRC);
const sC = Math.ceil(950/nRC);
let grid = Array(nRC);
for (let x=0;x<nRC; x++){
  grid[x] = Array(nRC)
}
function setup() {
  createCanvas(1280, 950);
  console.log(grid)
  for (let x=0;x<nRC; x++){
    for (let y = 0; y <  nRC; y++) {
      grid[x][y] = floor(random(0,2));
    }
  }
}

function livingCells(array, x, y) {
  let n = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + nRC) % nRC;
      let row = (y + j + nRC) % nRC;
      n += array[col][row];
    }
  }
  n -= array[x][y];
  return n;
}
function rules(state,n,i,j){
    if (state == 0 && n ==3 ){
      return 1;
    }
    else if (state ==1 && (n< 2 || n >3)){
      return  0;
    }
    else {
      return state;
    }
}
function draw() {
  background(0,0,0);
  for (let y=0; y<nRC; y++) {
    for (let x=0; x<nRC; x++){
      fill('black')
      rect(x*sR,y*sC,sR,sC);
      if (grid[x][y] == 1){
        fill('white');
        stroke(500);
        rect(x*sR,y*sC,sR,sC);
      }
    
    }
    }
let nextGrid = Array(nRC);
for (let i=0;i<nRC; i++){
  nextGrid[i] = Array(nRC)
  }
for (let i =0; i < nRC; i++){
  for (let j= 0; j< nRC; j++){
    let state = grid[i][j];
    let neighbours = livingCells(grid,i,j);
    nextGrid[i][j] = rules(state,neighbours,i,j)

  }
}
grid = nextGrid;
frameRate(10);
}


