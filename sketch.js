// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - constrain



// make it look like the game score

let dinoleft;
let darkDinoLeft;
let dinoRight;
let darkDinoRight;
let dinoJump;
let darkDinoJump;
let dinoDead;
let darkDinoDead;
let dinoTank;
let grassBackground;
let darkModeGrassBackground;
let grassFullBackground;
let cactusPicture;
let darkCactus;
let twoCactus;
let twoDarkCactus;
let moreCactus;
let moreDarkCactus;
let resetBottonImage;
let gameOverImage;

let jumpSound;
let crashSound;
let cloadsBackground;
let darkCloadsBackground;


let imageOfCactai;
let a;
let b;
let c;
let choices;

let hit;

let highScore = 0;

let lastTimeSwitched = 0;
let duration = 70;

let state1 = "startScreen";
let state2 = "isDinoJump";
let state3 = "notOnPress";
let stateDark = "light";

let font;

let dino;
let cactais;

let resetButton;
let howToPlayButton;
let existHowToPlay;
let switchBetweenModes;

let Cactai = [];
let milliSecond;
let startTime;

let x1Cloads = 0;
let x2Cloads;
let x1Grass = 0;
let x2Grass;
let scrollSpeed1 = 22;
let scrollSpeed2 = 1;

//state dead
//92 97

function preload(){
  dinoleft = loadImage("assets/running dino left.png");
  darkDinoLeft = loadImage("assets/dark running dino left.png");
  dinoRight = loadImage("assets/runing dino right.png");
  darkDinoRight = loadImage("assets/dark running dino right.png");
  dinoJump = loadImage("assets/running dino jump.png");
  darkDinoJump = loadImage("assets/darkDinoJump.png");
  dinoDead = loadImage("assets/dino dead.png");
  darkDinoDead = loadImage("assets/darkDeadDino.png");
  grassBackground = loadImage("assets/background.png");
  darkModeGrassBackground = loadImage("assets/darkModeGrass.png");
  cloadsBackground = loadImage("assets/cloads.png");
  darkCloadsBackground = loadImage("assets/darkCloads.png");
  grassFullBackground = loadImage("assets/backgroundfull.png");
  cactusPicture = loadImage("assets/cactus.png");
  darkCactus = loadImage("assets/darkModeCactus.png");
  twoCactus = loadImage("assets/two cactai.png");
  twoDarkCactus = loadImage("assets/2DarkCactai.png");
  moreCactus = loadImage("assets/a lot of cactai.png");
  moreDarkCactus = loadImage("assets/3DarkCactai.png");
  resetBottonImage = loadImage("assets/resetButton.png");
  gameOverImage = loadImage("assets/gameover.png");
  font = loadFont("font.ttf");
  jumpSound = loadSound("assets/jump.wav");
  crashSound = loadSound("assets/die.wav");
}

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
    if(state1 === "startScreen"){
      if(stateDark === "light"){
        image(dinoJump, this.x, this.y, this.wD, this.wD);
      }
      else if(stateDark === "dark"){
        image(darkDinoJump, this.x, this.y, this.wD, this.wD);
      }
    }

    else if(state1 === "playing"){
      if(state2 === "isLeftFoot"){
        if(stateDark === "light"){
          image(dinoleft, this.x, this.y, this.wD, this.wD);
        }
        else if(stateDark === "dark"){
          image(darkDinoLeft, this.x, this.y, this.wD, this.wD);
        }
      }
      else if(state2 === "isRightFoot"){
        if(stateDark === "light"){
          image(dinoRight, this.x, this.y, this.wD, this.wD);
        }
        else if(stateDark === "dark"){
          image(darkDinoRight, this.x, this.y, this.wD, this.wD);
        }
      }
      else if(state2 === "isDinoJump"){
        if(stateDark === "light"){
          image(dinoJump, this.x, this.y, this.wD, this.wD);
        }
        else if(stateDark === "dark"){
          image(darkDinoJump, this.x, this.y, this.wD, this.wD);
        }
      }
      
    }
    else if(state1 === "dead"){
      if(stateDark === "light"){
        image(dinoDead, this.x, this.y, this.wD, this.wD);
      }
      else if(stateDark === "dark"){
        image(darkDinoDead, this.x, this.y, this.wD, this.wD);
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
    this.speed = 22;
    this.a = cactusPicture;
    this.b = twoCactus;
    this.c = moreCactus;
    this.aDark = darkCactus;
    this. bDark = twoDarkCactus;
    this.cDark = moreDarkCactus;
    this.imageOfCactai = random([this.a, this.b, this.c]);
    this.darkImageOfCactai = random([this.aDark, this.bDark, this.cDark]);

  }

  //add more cactus pics

  move(){
    this.x -= this.speed;
  }

  display(){
    // rect(this.x, this.y, 10, this.w);
    if(stateDark === "light"){
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
    }
    else if(stateDark === "dark"){ 
      if(this.darkImageOfCactai === this.aDark){
        this.w = width/19;
      }
      else if(this.darkImageOfCactai === this.bDark){
        this.w = width/13;
      }
      else if(this.darkImageOfCactai === this.cDark){
        this.w = width/9;
      }
      image(this.darkImageOfCactai, this.x, this.y, this.w, this.h); 
    }
  }

  disapeared(){
    this.x > 0;
  }
  
}


//600, 250
function setup(){
  createCanvas(windowWidth, windowHeight);
  fill("grey");
  dino = new Dinosour(this.x, this.y);
  textSize(30);
  // eslint-disable-next-line no-undef
  resetButton = new Clickable();
  resetButton.locate(windowWidth/2 - 30, windowHeight/2);
  resetButton.onPress = changePressGameOver;
  resetButton.image = resetBottonImage;
  resetButton.fitImage = true; 
  resetButton.resize(60,50);
  resetButton.text = " ";  
  resetButton.strokeWeight = 0;

  textFont(font);
  // eslint-disable-next-line no-undef
  howToPlayButton = new Clickable();
  howToPlayButton.locate(width - 90, 100);
  howToPlayButton.onPress = changePressHowTo;
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
  existHowToPlay.onPress = changePressHowTo;
  existHowToPlay.cornerRadius = 3;
  existHowToPlay.text = "X"; 
  existHowToPlay.textFont = font;
  existHowToPlay.strokeWeight = 3;
  existHowToPlay.textSize = 30;  
  existHowToPlay.resize(50, 50);
  existHowToPlay.textColor = "grey"; 
  existHowToPlay.stroke = "grey";  

  switchBetweenModes = new Clickable();
  switchBetweenModes.locate(width - 90, 200);
  switchBetweenModes.onPress = changePressModes;
  switchBetweenModes.cornerRadius = 3;
  switchBetweenModes.text = "M"; 
  switchBetweenModes.textFont = font;
  switchBetweenModes.strokeWeight = 3;
  switchBetweenModes.textSize = 30;  
  switchBetweenModes.resize(50, 50);
  switchBetweenModes.textColor = "grey"; 
  switchBetweenModes.stroke = "grey";  

  x2Cloads = width;
  x2Grass = width + 9;
}



function draw(){
  highScoreCount();
  displayScore();
  if(state1 === "startScreen"){
    startScreen();
    startTime = int(millis()/100);
  }
  else if(state1 === "playing"){
    state3 = "notOnPress";
    moveBackgroundCloads();
    moveBackground();
    howToPlayButton.draw();
    switchBetweenModes.draw();
    time();
    displayScore();
    displayCactai();
    dino.display();
    dino.switchBetweenDinos();
    dino.run();
  }
  else if(state1 === "dead"){
    resetGame();
    displayGameOver();
    
  }
  else if(state1 === "howTo"){
    displayHowTo();
  }
}

function displayCactai(){
  for(let theCactai of Cactai){
    if(theCactai.disapeared()){
      Cactai = [];
    }
    else{
      theCactai.move();
      dino.collision(theCactai);
      theCactai.display();
    }
  }
  if(frameCount % 60 === 0){
      cactais = new Cactus(this.x, this.y, this.imageOfCactai);
      Cactai.push(cactais);
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
  
  if(stateDark === "light"){
    image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
    image(cloadsBackground, x1Cloads, 0, width, height - height/8);
  }
  else if(stateDark === "dark"){
    image(darkModeGrassBackground, x1Grass, height - height/2, width, height - height/2);
    image(darkCloadsBackground, x1Cloads, 0, width, height/2);
  }
  howToPlayButton.draw();
  switchBetweenModes.draw();

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
  if(milliSecond > highScore){
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
    state1 = "playing";
    startTime = int(millis()/100);
    Cactai = [];
    dino.resetDino();
    milliSecond = 0;
  }
}

function changePressHowTo(){
  if(state1 === "startScreen" || state1 === "dead"){
    state1 = "howTo";
  }
  else if(state1 === "howTo"){
    state1 = "startScreen";
  }
}

function changePressModes(){
  if(stateDark === "light"){
    stateDark = "dark";
  }
  else if(stateDark === "dark" ){
    stateDark = "light";
  }
}

function changePressGameOver(){
  if(state1 === "dead"){
    state3 = "onPress";
  }
}

function displayGameOver(){
  displayHighScore();
  resetButton.draw();
  howToPlayButton.draw();
  switchBetweenModes.draw();
  image(gameOverImage, width/3.8, height/4, width/2, height/18);
}

function displayHowTo(){
  background(grassFullBackground);
  existHowToPlay.draw();
  text("press space to jump", width/2 - 300, 170);
  text("the score is how long you have been playing", width/2 - 650, 340);
  text("try not to die!!", width/2 - 250, 510);
  line(width/2 - 200, 90, width/2 + 150, 90);
  line(width/2 - 200, 565, width/2 + 150, 565);
}

function moveBackground(){
  if(stateDark === "light"){
    image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
    image(grassBackground, x2Grass, height - height/3.8, width, height - height/1.3);
  }
  else if(stateDark === "dark"){
    image(darkModeGrassBackground, x1Grass, height - height/2, width, height - height/2);
    image(darkModeGrassBackground, x2Grass, height - height/2, width, height - height/2);
  }
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
  if(stateDark === "light"){
    image(cloadsBackground, x1Cloads, 0, width, height);
    image(cloadsBackground, x2Cloads, 0, width, height);
  }
  else if(stateDark === "dark"){
    image(darkCloadsBackground, x1Cloads, 0, width, height/2);
    image(darkCloadsBackground, x2Cloads, 0, width, height/2);
  }
  
  
  x1Cloads -= scrollSpeed2;
  x2Cloads -= scrollSpeed2;
  
  if (x1Cloads < -width){
    x1Cloads = width;
  }
  if (x2Cloads < -width){
    x2Cloads = width;
  }
}