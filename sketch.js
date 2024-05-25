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
let resetBottonImage;
let gameOverImage;

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
  resetBottonImage = loadImage("resetButton.png");
  gameOverImage = loadImage("gameover.png");
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
    this.gravity = 5;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - height/4.3){
      this.velocity = -55;
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
    else if(state2 === "isDinoJump" && millis() > lastTimeSwitched + 900){
      state2 = "isLeftFoot";
      lastTimeSwitched = millis();
    }
    
  }
  
  collision(Cactus){
    
    //debugging
    // circle(this.x + this.w/2 - 10, this.y + this.w/2 - 10, this.w - 20);
    // rect(Cactus.x, Cactus.y, Cactus.w, Cactus.h);

    // hit = collideRectRect(this.x, this.y, this.w, this.w, Cactus.x, Cactus.y, Cactus.w, Cactus.h);
    hit = collideRectCircle( Cactus.x, Cactus.y, Cactus.w, Cactus.h, this.x + this.w/2 - 10, this.y + this.w/2 - 10, this.w - 20);
    
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
    this.speed = 25;
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

let resetBotton;
let state3 = "notOnPress";

//600, 250
function setup(){
  createCanvas(windowWidth, windowHeight);
  dino = new Dinosour(this.x, this.y);
  textSize(30);
  resetBotton = new Clickable();
  resetBotton.locate(windowWidth/2 - 30, windowHeight/2);
  resetBotton.onPress = changePress;
  resetBotton.image = resetBottonImage;
  resetBotton.fitImage = true; 
  resetBotton.text = " ";  
  resetBotton.strokeWeight = 0;

}


function draw(){
  highScoreCount();
  displayScore();
  if(state1 === "startScreen"){
    state3 = "notOnPress";
    startScreen();
    startTime = int(millis()/100);
    highScoreCount();
    
  }
  else if(state1 === "playing"){
    background(grassBackground);
    time();
    // highScoreCount();
    displayScore();
    // let distance = random(110, 200);
    if(frameCount % 60 === 0){
      cactais = new Cactus(this.x, this.y, this.imageOfCactai);
      Cactai.push(cactais);
    }
  

    for(let theCactai of Cactai){
      if(theCactai.disapeared()){
        let index = Cactai.indexOf(theCactai);
        Cactai.splice(index, 3);
      }
      else{
        theCactai.move();
        dino.collision(theCactai);
        theCactai.display();
      }
    }
    dino.display();
    dino.switchBetweenDinos();
    dino.run();
    
  }
  else if(state1 === "dead"){
    resetGame();
    displayGameOver();
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
  // text(milliSecond, width - 70, 60);
  // text(highScore, width - 150, 60);
}

function highScoreCount(){
  if( milliSecond > highScore){
    highScore = milliSecond;
  }
}

function displayScore(){
  text(milliSecond, width - 70, 60);
  
}

function displayHighScore(){
  text(highScore, width - 150, 60);
}

function resetGame (){
  if (state1 === "dead" && state3  === "onPress") {
    state1 = "startScreen";
    //removes cactus
    for(let theCactai of Cactai){
      let index = Cactai.indexOf(theCactai);
      Cactai.splice(index, 1);
    }
    dino.resetDino();
    milliSecond = 0;
  }
}

function changePress(){
  state3 = "onPress";
}

function displayGameOver(){
  displayHighScore();
  resetBotton.draw();
  image(gameOverImage, width/3.8, height/4, width/2, height/18);
}