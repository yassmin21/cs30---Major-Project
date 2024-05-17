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
let twoCactus;
let moreCactus;

let imageOfCactai;
let a;
let b;
let c;
let choices;

let lastTimeSwitched = 0;
let duration = 70;

let state1 = "startScreen";
let state2 = "isLeftFoot";
//state jumping
//state dead
//92 97

function preload(){
  dinoleft = loadImage("running dino left.png");
  dinoRight = loadImage("runing dino right.png");
  dinoJump = loadImage("running dino jump.png");
  grassBackground = loadImage("background.png");
  cactusPicture = loadImage("cactus.png");
  twoCactus = loadImage("two cactai.png");
  moreCactus = loadImage("a lot of cactai.png");
}

let Cactai = [];
let milliSecond;
let startTime;

class Dinosour{
  constructor(x, y){
    this.x = 60;
    this.y = height - height/4.5;
    this.w = height/7;
    this.h = this.w;
    this.gravity = 2.8;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - height/4.5){
      this.velocity = -45;
    }
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, height/20, height - height/4.5);
  }

  display(){
    // rect(this.x, this.y, this.w, this.w);
    
    if(state1 === "startScreen"){
      image(dinoJump, this.x, this.y, this.w, this.w);
    }
    else if(state1 === "playing"){
      if(state2 === "isLeftFoot"){
        image(dinoleft, this.x, this.y, this.w, this.w);
      }
      else if(state2 === "isRightFoot"){
        image(dinoRight, this.x, this.y, this.w, this.w);
      }
      else if(state2 === "isDinoJump"){
        image(dinoJump, this.x, this.y, this.w, this.w);
      }
    }
  }

  switchBetweenDinos(){
    
    if(state2 === "isLeftFoot" && millis()> lastTimeSwitched + duration){
      state2 = "isRightFoot";
      lastTimeSwitched = millis();
    }
    else if(state2 === "isRightFoot" && millis()> lastTimeSwitched + duration){
      state2 = "isLeftFoot";
      lastTimeSwitched = millis();
    }
    else if(state2 === "isDinoJump" && millis() > lastTimeSwitched + 700){
      state2 = "isLeftFoot";
      lastTimeSwitched = millis();
    }
    
    
    
  }
  
  collision(Cactus){
    
    hit = collideRectRect(this.x, this.y, this.w, this.h, Cactus.x, Cactus.y, Cactus.w, Cactus.h);
    
    
    if(hit){
      background("black");
    }
  }

}
let hit;
class Cactus{
  constructor(x, y, imageOfCactai){
    this.x = width;
    this.y = height - height/6 - height/10.5,
    //178
    this.h = height/6;
    //50
    this.w = width/ 20;
    //30
    this.speed = 11;
    this.a = cactusPicture;
    this.b = twoCactus;
    this.c = moreCactus;
    this.imageOfCactai = random([this.a, this.b, this.c]);

  }

  move(){
    this.x -= this.speed;
    
    
  }

  display(){
    // rect(this.x, this.y, 10, this.w);
    if(this.imageOfCactai === this.a){
      this.w = width/20;
    }
    else if(this.imageOfCactai === this.b){
      this.w = width/10;
      this.h = height/6  + 8;
    }
    else if(this.imageOfCactai === this.c){
      this.w = width/8;
    }
    
    image(this.imageOfCactai, this.x, this.y, this.w, this.h);
    // image(cactusPicture, this.x, this.y, this.w, this.h);
  }

  disapeared(){
    this.x > 0;
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
  if (mouseIsPressed){
    resizeCanvas(windowWidth, windowHeight);
  }
  


}



function draw(){
  if(state1 === "startScreen"){
    startScreen();

  }
  else if(state1 === "playing"){
    background(grassBackground);
    time();
    //200
    // let distance = random(110, 200);
    if(frameCount % 150 === 0){
      cactais = new Cactus(this.x, this.y, this.imageOfCactai);
      Cactai.push(cactais);
    }
  

    for(let theCactai of Cactai){
    
      if(theCactai.disapeared()){
        let index = Cactai.indexOf(theCactai);
        Cactai.splice(index, 1);
      }
      else{
        theCactai.move();
        theCactai.display();
        dino.collision(theCactai);
      }
    }
    dino.switchBetweenDinos();
    dino.run();
    dino.display();
  }
  
  
}

function keyPressed(){
  if(key === " " && state1 === "startScreen"){
    state1 = "playing";
  }
  else if(key === " " && state1 === "playing"){
    dino.jump();
    state2 = "isDinoJump";
    lastTimeSwitched = millis();
  }
}

function startScreen(){
  background(grassBackground);
  dino.display();
}

function time(){
  milliSecond = int(millis()/100);
  if(state2 === "isDinoJump"){
    startTime = int(millis()/100);
  }
  
  if (milliSecond > 0){
    milliSecond = milliSecond - startTime; //minus the millis from total from millis of start screen
  }
  text(milliSecond, width - 50, 40);
}

