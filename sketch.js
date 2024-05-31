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
let dinoTank;
let grassBackground;
let cactusPicture;
let twoCactus;
let moreCactus;
let resetBottonImage;
let gameOverImage;
let button1;
let jumpSound;
let crashSound;
let cloadsBackground;

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

let font;
//state dead
//92 97

function preload(){
  dinoleft = loadImage("running dino left.png");
  dinoRight = loadImage("runing dino right.png");
  dinoJump = loadImage("running dino jump.png");
  dinoDead = loadImage("dino dead.png");
  dinoTank = loadImage("dinoTank.png");
  grassBackground = loadImage("background.png");
  cloadsBackground = loadImage("cloads.png");
  cactusPicture = loadImage("cactus.png");
  twoCactus = loadImage("two cactai.png");
  moreCactus = loadImage("a lot of cactai.png");
  resetBottonImage = loadImage("resetButton.png");
  gameOverImage = loadImage("gameover.png");
  font = loadFont("font.ttf");
  button1 = loadImage("button1.png");
  jumpSound = loadSound("jump.wav");
  crashSound = loadSound("die.wav");
}

let Cactai = [];
let milliSecond;
let startTime;
let state4 = "dino";

class Dinosour{
  constructor(x, y){
    this.x = 60;
    this.y = height - height/4.3;
    this.wD = height/7;
    this.wB = height/4;
    this.hD = this.wD;
    this.gravity = 5;
    this.velocity = 0;

  }

  jump(){
    if(this.y === height - height/4.3){
      this.velocity = -55;
      jumpSound.play();
    }
      
  }

  run(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, height/20, height - height/4.3);
  }

  display(){
    // rect(this.x, this.y, this.w, this.w);
    if (state4 === "dino"){
      if(state1 === "startScreen"){
        image(dinoJump, this.x, this.y, this.wD, this.wD);
      }

      else if(state1 === "playing"){
        if(state2 === "isLeftFoot"){
          image(dinoleft, this.x, this.y, this.wD, this.wD);
        }
        else if(state2 === "isRightFoot"){
          image(dinoRight, this.x, this.y, this.wD, this.wD);
        }
        else if(state2 === "isDinoJump"){
          image(dinoJump, this.x, this.y, this.wD, this.wD);
        }
      
      }
      else if(state1 === "dead"){
        image(dinoDead, this.x, this.y, this.wD, this.wD);
      }
    }
    else if(state4 === "tank"){
      image(dinoTank, this.x, this.y, this.wD + 20, this.wD);
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
    else if(state2 === "isDinoJump" && millis() > lastTimeSwitched + 550){
      state2 = "isLeftFoot";
      lastTimeSwitched = millis();
    }
    
  }
  
  collision(Cactus){
    
    //debugging
    // circle(this.x + this.w/2 - 10, this.y + this.w/2 - 10, this.w - 20);
    // rect(Cactus.x, Cactus.y, Cactus.w, Cactus.h);

    // hit = collideRectRect(this.x, this.y, this.w, this.w, Cactus.x, Cactus.y, Cactus.w, Cactus.h);
    hit = collideRectCircle( Cactus.x, Cactus.y, Cactus.w, Cactus.h, this.x + this.wD/2 - 10, this.y + this.wD/2 - 10, this.wD - 20);
    
    if(hit){
      crashSound.play();
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
    this.speed = 23;
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

let resetButton;
let state3 = "notOnPress";

let howToPlayButton;

let existHowToPlay;

//600, 250
function setup(){
  createCanvas(windowWidth, windowHeight);
  fill("grey");
  dino = new Dinosour(this.x, this.y);
  textSize(30);
  // eslint-disable-next-line no-undef
  resetButton = new Clickable();
  resetButton.locate(windowWidth/2 - 30, windowHeight/2);
  resetButton.onPress = changePress;
  resetButton.image = resetBottonImage;
  resetButton.fitImage = true; 
  resetButton.text = " ";  
  resetButton.strokeWeight = 0;

  textFont(font);
  // eslint-disable-next-line no-undef
  howToPlayButton = new Clickable();
  howToPlayButton.locate(width - 90, 100);
  howToPlayButton.onPress = changePress;
  howToPlayButton.cornerRadius = 3;
  howToPlayButton.text = "i"; 
  howToPlayButton.textFont = font;
  howToPlayButton.strokeWeight = 3;
  howToPlayButton.textSize = 30;  
  howToPlayButton.resize(50, 50);
  howToPlayButton.textColor = "grey"; 
  howToPlayButton.stroke = "grey";  

  // eslint-disable-next-line no-undef
  existHowToPlay = new Clickable();
  existHowToPlay.locate(width - 90, 50);
  existHowToPlay.onPress = changePress;
  existHowToPlay.cornerRadius = 3;
  existHowToPlay.text = "X"; 
  existHowToPlay.textFont = font;
  existHowToPlay.strokeWeight = 3;
  existHowToPlay.textSize = 30;  
  existHowToPlay.resize(50, 50);
  existHowToPlay.textColor = "grey"; 
  existHowToPlay.stroke = "grey";  

  x2Cloads = width;
  x2Grass = width;
}

// let colour ;

let x1Cloads = 0;
let x2Cloads;
let x1Grass = 0;
let x2Grass;
let scrollSpeed1 = 23;
let scrollSpeed2 = 3;

function draw(){
  highScoreCount();
  displayScore();
 
  // changeColourIfHover();
  if(state1 === "startScreen"){
    background(cloadsBackground);
    state3 = "notOnPress";
    startScreen();
    startTime = int(millis()/100);
    highScoreCount();
    howToPlayButton.draw();
  }
  else if(state1 === "playing"){
    // background(grassBackground);
    moveBackgroundCloads();
    moveBackground();
    
    howToPlayButton.draw();
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
    howToPlayButton.draw();
    resetGame();
    displayGameOver();
  }
  else if(state1 === "howTo"){
    displayHowTo();
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
  image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
  dino.display();
  // howToPlayButton.draw();
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
  text(milliSecond, width - 100, 60);
  
}

function displayHighScore(){
  text(highScore, width - 230, 60);
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
  if(state1 === "dead"){
    state3 = "onPress";
  }
  else if(state1 === "startScreen"){
    state1 = "howTo";
  }
  else if(state1 === "howTo"){
    state1 = "startScreen";
  }
}

function displayGameOver(){
  displayHighScore();
  resetButton.draw();
  image(gameOverImage, width/3.8, height/4, width/2, height/18);
}

function displayHowTo(){
  
  background(grassBackground);
  existHowToPlay.draw();
  text("press space to jump", width/2 - 300, 170);
  text("the score is how long you have been playing", width/2 - 650, 340);
  text("try not to die!!", width/2 - 250, 510);
  line(width/2 - 200, 90, width/2 + 150, 90);
  line(width/2 - 200, 565, width/2 + 150, 565);
}

function moveBackground(){
  image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
  image(grassBackground, x2Grass, height - height/3.8, width, height - height/1.3);
  x1Grass -= scrollSpeed1;
  x2Grass -= scrollSpeed1;
  
  if (x1Grass < -width){
    x1Grass = width;
  }
  if (x2Grass < -width){
    x2Grass = width;
  }
}

function moveBackgroundCloads(){
  image(cloadsBackground, x1Cloads, 0, width, height);
  image(cloadsBackground, x2Cloads, 0, width, height);
  x1Cloads -= scrollSpeed2;
  x2Cloads -= scrollSpeed2;
  
  if (x1Cloads < -width){
    x1Cloads = width;
  }
  if (x2Cloads < -width){
    x2Cloads = width;
  }
}