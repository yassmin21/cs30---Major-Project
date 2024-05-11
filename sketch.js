// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//make a object for character

let Cactai = [];
let milliSecond;
let startTime;

class Dinosour{
  constructor(x, y){
    this.x = 30;
    this.y = 175;
    this.w = 50;
    this.h = this.w;
    this.gravity = 2;
    this.velocity = 0;

  }

  jump(){
    this.velocity = -25;
    if(this.y > height - 70){
      this.y = height - 70;
      this.velocity = 0;
    }
    else if(this.y < 60){
      this.velocity = 0;
    }
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    if(this.y > height - 70){
      this.y = height - 70;
      this.velocity = 0;
    }
    else if(this.y < 60){
      this.velocity = 0;
    }
  }

  display(){
    rect(this.x, this.y, this.w, this.w);
  }


}

class Cactus{
  constructor(x, y){
    this.x = width;
    this.y = 179,
    this.w = 50;
    this.speed = 3;

  }

  move(){
    this.x -= this.speed;
    
    
  }

  display(){
    rect(this.x, this.y, this.w, this.w);
  }
}

let dino;
let cactais;


function setup(){
  createCanvas(600, 250);
  dino = new Dinosour(this.x, this.y);
  
}

function draw(){
  background("grey");
  time();
  dino.display();
  dino.run();
  if(keyIsPressed){
    dino.jump();
  }

  if(frameCount % 110 === 0){
    let cactais = new Cactus(this.x, this.y);
    Cactai.push(cactais);
  }

  for(let theCactai of Cactai){
    theCactai.move();
    theCactai.display();
  }
}


function collision(){
  
}

function time(){
  milliSecond = int(millis()/100);
  if(mouseIsPressed){
    startTime = int(millis()/100);
  }
  if (milliSecond > 0){
    milliSecond = milliSecond - startTime; //minus the millis from total from millis of start screen
  }
  text(milliSecond, width/2, height/2);
}

function keyPressed(){
  
}