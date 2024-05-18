// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - constrain


// make it die if we hit cactus
// highscore
// make it look like the game score

let dinoleft;
let dinoRight;
let dinoJump;
let dinoDead;
let grassBackground;
let cactusPicture;
let twoCactus;
let moreCactus;

let imageOfCactai;
let a;
let b;
let c;
let choices;

let hit;

let highScore =0;

let lastTimeSwitched = 0;
let duration = 70;

let state1 = "startScreen";
let state2 = "isDinoJump";


//state dead
//92 97

function preload(){
  dinoleft = loadImage("running dino left.png");
  dinoRight = loadImage("runing dino right.png");
  dinoJump = loadImage("running dino jump.png");
  dinoDead = loadImage("dino dead.png");
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
    this.y = height - height/4.3;
    this.w = height/7;
    this.h = this.w;
    this.gravity = 2.8;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - height/4.3){
      this.velocity = -45;
    }
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, height/20, height - height/4.3);
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
    else if(state1 === "dead"){
      image(dinoDead, this.x, this.y, this.w, this.w);
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
    
    hit = collideRectRect(this.x, this.y, this.w, this.w, Cactus.x, Cactus.y, Cactus.w, Cactus.h);
    
    
    if(hit){
      state1 = "dead";
    }
  }

  resetDino(){
    this.velocity = 0;
    this.y = height - height/4.3;
  }
}


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

  //add more cactus pics

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


function draw(){
  if(state1 === "startScreen"){
    startScreen();
    startTime = int(millis()/100);
  }
  else if(state1 === "playing"){
    background(grassBackground);
    time();
    highScoreCount();

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
  else if(state1 === "dead"){
    resetGame();
  }
}

function keyPressed(){
  if(key === " " && state1 === "startScreen"){
    state1 = "playing";
    dino.jump();
  }
  else if(key === " " && state1 === "playing"){
    state2 = "isDinoJump";
    dino.jump();
    lastTimeSwitched = millis();
  }
}

function startScreen(){
  background(grassBackground);
  dino.display();
}
//change to part only of image

function time(){
  milliSecond = int(millis()/100);
  if (milliSecond > 0){
    milliSecond = milliSecond - startTime; //minus the millis from total from millis of start screen
  }
  text(milliSecond, width - 50, 40);
}

function highScoreCount(){
  if(state2 === "playing" && milliSecond > highScore){
    highScore = milliSecond;
  }
  text(highScore, width - 100, 40);
}

function resetGame (){
    if (state1 === "dead" && mouseIsPressed) {
      state1 = "startScreen";
      //removes cactus
      for(let theCactai of Cactai){
        let index = Cactai.indexOf(theCactai);
        Cactai.splice(index, 2);
      }
      dino.resetDino();
      milliSecond = 0;
    }
}