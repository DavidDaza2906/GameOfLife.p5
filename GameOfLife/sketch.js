const nRC = 200;
let sR;
let sC;
let sf= 3;
let mx,my;
let grid = initArray();
let a = 0;
let b = 0;
let pause = false;

function setup() {
  createCanvas(1300, 1300);
  sR = width/nRC;
  sC = height/nRC;
  grid = randomArray(grid);
}

function draw() {
  mx = mouseX;
  my = mouseY;
  translate(mx, my);
  scale(sf);
  translate(-mx, -my);
  translate();
  background(0,0,0);
  for (let y=0; y<nRC; y++) {
    for (let x=0; x<nRC; x++){
      //stroke('white')
      //fill('black')
      //rect(x*sR,y*sC,sR,sC);
      if (grid[x][y] == 1){
        fill(240,250,250);
        stroke(240,250,250);
        rect(x*sR,y*sC,sR,sC);
      }
    }
  }
let nextGrid = Array(nRC);
for (let i=0;i<nRC; i++){
  nextGrid[i] = Array(nRC)}
for (let i =0; i < nRC; i++){
  for (let j= 0; j< nRC; j++){
    let state = grid[i][j];
    let neighbours = livingCells(grid,i,j);
    nextGrid[i][j] = rules(state,neighbours,i,j)
  }
}
grid = nextGrid;
frameRate(60);
if (mouseIsPressed && isLooping) {
  a -= pmouseX - mouseX;
  b -= pmouseY - mouseY;
}
document.getElementById("generation").innerHTML = 'Generacion: ' + frameCount;
}

function initArray(){
let array = Array(nRC)
  for (let x=0;x<nRC; x++){
    array[x] = Array(nRC)
}
return array
}

function randomArray(array){
  for (let x=0;x<nRC; x++){
    for (let y = 0; y <  nRC; y++) {
      array[x][y] = floor(random(0,2));
    }
  }
  return array
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
    }}
function keyPressed(){
  if (keyCode == 82){
    grid = randomArray(grid);
    redraw()
  }
  else if (keyCode == 32){
    if (pause ==false){
      pause=true;
      noLoop()
    }
    else{
      loop();
      pause=false;
    }
  }
  else{
    return false;
  }
}
window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0 && isLooping){
    sf *= 1.1;}
  else if (isLooping){
    sf *= 0.90;
}}); 
