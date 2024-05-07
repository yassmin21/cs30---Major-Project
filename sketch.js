// Snakes and Ladders
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],];


// let cellSize;
// const GRID_SIZE = 10;

// function setup() {
//   //make the canvas the largest square that you can...
//   if (windowWidth < windowHeight) {
//     createCanvas(windowWidth, windowWidth);
//   }
//   else {
//     createCanvas(windowHeight, windowHeight);
//   }

  
//   //this is dumb -- should check if this is the right size!
//   cellSize = height/grid.length;
// }

// function windowResized() {
//   //make the canvas the largest square that you can...
//   if (windowWidth < windowHeight) {
//     resizeCanvas(windowWidth, windowWidth);
//   }
//   else {
//     resizeCanvas(windowHeight, windowHeight);
//   }

//   cellSize = height/grid.length;
// }

// function draw() {
//   background(220);
//   displayGrid();
//   displayNumbers();
// }


// function displayGrid() {
//   for (let y = 0; y < grid.length; y++) {
//     for (let x = 0; x < grid[y].length; x++) {
//       fill("white");
//       square(x * cellSize, y * cellSize, cellSize);
//     }
//   }
// }

// function displayNumbers(){
//   //goes through each element in the grid array
//   for(let y = 0; y< grid.length; y++){
//     for(let x = 0; x< grid[y].length; x++){
//       // constent variables for where x and y for the text are
//       let xText = x * cellSize + cellSize/2;
//       let yText = y * cellSize + cellSize/2;

//       fill("black");
//       //displays the number on the grid
//       if(grid[y][x] === 1){
//         text("1", xText , yText);
//       }
//       else if(grid[y][x] === 2){
//         text("2", xText , yText);
//       }
//       else if(grid[y][x] === 3){
//         text("3", xText , yText);
//       }
//       else if(grid[y][x] === 4){
//         text("4", xText , yText);
//       }
//       else if(grid[y][x] === 5){
//         text("5", xText , yText);
//       }
//       else if(grid[y][x] === 6){
//         text("6", xText , yText);
//       }
//       else if(grid[y][x] === 7){
//         text("7", xText , yText);
//       }
//       else if(grid[y][x] === 8){
//         text("8", xText , yText);
//       }
//       else if(grid[y][x] === 9){
//         text("9", xText , yText);
      
//       }
//     }
//   }
// }
