// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - constrain


//make it run
// randomize between cactai

let dino1;
let grassBackground;
let cactusPicture;


let state = "running";
//state jumping
//state dead


function preload(){
  dino1 = loadImage("running dino.png");
  grassBackground = loadImage("Untitled design.png");
  cactusPicture = loadImage("cactus.png");
}

let Cactai = [];
let milliSecond;
let startTime;

class Dinosour{
  constructor(x, y){
    this.x = 30;
    this.y = height - 70;
    this.w = 50;
    this.h = this.w;
    this.gravity = 1;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - 70){
      this.velocity = -15;
    }
    
    
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, 60, height - 70);
  }

  display(){
    // rect(this.x, this.y, this.w, this.w);
    
    image(dino1, this.x, this.y, this.w, this.w);
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
    // rect(this.x, this.y, 10, this.w);
    
    image(cactusPicture, this.x, this.y, 30, this.w);
  }
}

let dino;
let cactais;


function setup(){
  createCanvas(600, 250);
  dino = new Dinosour(this.x, this.y);
  
}

function draw(){
  background(grassBackground);
  time();
  //  if(keyIsPressed){
  //   dino.jump();
  // }
  
  
 

  if(frameCount % 110 === 0){
    let cactais = new Cactus(this.x, this.y);
    Cactai.push(cactais);
  }

  for(let theCactai of Cactai){
    theCactai.move();
    theCactai.display();
    
  }
  dino.run();
  dino.display();
}

function keyPressed(){
  if(key === " "){
    dino.jump();
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

