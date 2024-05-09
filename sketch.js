// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//make a object for character

class Dinosour{
  constructor(){
    this.x;
    this.y;
    this.w;
    this.h;

  }

  jump(){

  }

  display(){

  }

  
}
let x = 30;
let y = 175;

let gravity = 0.3;
let velocity = 0;

function setup(){
  createCanvas(600, 250);
}

function draw(){
  background("grey");
  character();
  // keyPressed();
}

function character(){
  velocity += gravity;
  y += velocity;

  if(y > height - 70){
    //doesnt let the bird go down the screen 
    y = height - 70;
    velocity = 0;
  }

  if(mouseIsPressed){
    velocity -= gravity * 3; 
    
  }
  
  rect(x, y, 50, 50);
}

// function keyPressed() {
//   if (keyCode === UP_ARROW) {
    
//   }
// }
