// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - constrain


// fix running pic using pixels
// randomize between cactai
// make it die if we hit cactus

let dinoleft;
let dinoRight;
let dinoJump;
let grassBackground;
let cactusPicture;
let lastTimeSwitched = 0;
let duration = 70;

let state = "isLeftFoot";
//state jumping
//state dead
//92 97

function preload(){
  dinoleft = loadImage("running dino left.png");
  dinoRight = loadImage("runing dino right.png");
  dinoJump = loadImage("running dino jump.png");
  grassBackground = loadImage("background.png");
  cactusPicture = loadImage("cactus.png");
}

let Cactai = [];
let milliSecond;
let startTime;

class Dinosour{
  constructor(x, y){
    this.x = 30;
    this.y = height - height/3.7;
    this.w = height/7;
    this.h = this.w;
    this.gravity = 1;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - height/3.7){
      this.velocity = -15;
    }
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, height/2, height - height/3.7);
  }

  display(){
    // rect(this.x, this.y, this.w, this.w);
    if(state === "isLeftFoot"){
      image(dinoleft, this.x, this.y, this.w, this.w);
    }
    else if(state === "isRightFoot"){
      image(dinoRight, this.x, this.y, this.w, this.w);
    }
    else if(state === "isDinoJump"){
      image(dinoJump, this.x, this.y, this.w, this.w);
    }
    
  }

  switchBetweenDinos(){
    if(state === "isLeftFoot" && millis()> lastTimeSwitched + duration){
      state = "isRightFoot";
      lastTimeSwitched = millis();
    }
    else if(state === "isRightFoot" && millis()> lastTimeSwitched + duration){
      state = "isLeftFoot";
      lastTimeSwitched = millis();
    }
    else if(state === "isDinoJump" && millis() > lastTimeSwitched + 600){
      state = "isLeftFoot";
      lastTimeSwitched = millis();
    }
  }


}

class Cactus{
  constructor(x, y){
    this.x = width;
    this.y = height - height/6 - height/8.5,
    //178
    this.h = height/6;
    //50
    this.w = width/ 20;
    //30
    this.speed = 3;

  }

  move(){
    this.x -= this.speed;
    
    
  }

  display(){
    // rect(this.x, this.y, 10, this.w);
    
    image(cactusPicture, this.x, this.y, this.w, this.h);
  }
}

let dino;
let cactais;

//600, 250
function setup(){
  createCanvas(windowWidth, windowHeight);
  dino = new Dinosour(this.x, this.y);
  
  
}
function windowResized() {
  //make the canvas the largest square that you can
  resizeCanvas(windowWidth, windowHeight);
  


}

function draw(){
  background(grassBackground);
  time();
 

  if(frameCount % 200 === 0){
    let cactais = new Cactus(this.x, this.y);
    Cactai.push(cactais);
  }

  for(let theCactai of Cactai){
    theCactai.move();
    theCactai.display();
    
  }
  dino.switchBetweenDinos();
  dino.run();
  dino.display();
}

function keyPressed(){
  if(key === " "){
    dino.jump();
    state = "isDinoJump";
    lastTimeSwitched = millis();
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

