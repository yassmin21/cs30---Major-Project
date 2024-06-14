// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - constrain, video, scrolling screen


//535353 HEX COLOUR

// make it look like the game score


//variable names for my images, sounds and video
let dinoleft;
let darkDinoLeft;
let dinoRight;
let darkDinoRight;
let dinoJump;
let dinoBlickingLight;
let darkDinoJump;
let darkBlinkingDino;
let dinoDead;
let darkDinoDead;
let dinoTank;
let grassBackground;
let grassBackgroundEmpty;
let darkModeGrassBackground;
let darkModeGrassBackgroundEmpty;
let cactusPicture;
let darkCactus;
let twoCactus;
let twoDarkCactus;
let moreCactus;
let moreDarkCactus;
let resetBottonImage;
let darkResetButtonImage;
let darkModeButtonImage;
let lightModeButtonImage;
let gameOverImage;
let darkGameOverImage;
let jumpSound;
let crashSound;
let pointSound;
let cloadsBackground;
let darkCloadsBackground;


//different cactai images variables
let imageOfCactai;
let a;
let b;
let c;
let choices;

let hit;

let highScore = 0;

let lastTimeSwitched = 0;
let duration = 70;

let nextSpawnDistance;

//different state variables
let state1 = "startScreen";
let state2 = "isDinoJump";
let state3 = "notOnPress";
let stateDark = "light";
let stateBlinking = "open";
let stateChangeStart = "before";

let font;

let dino;
let cactais;

// different button variables
let resetButton;
let howToPlayButton;
let existHowToPlay;
let switchBetweenModes;

let Cactai = [];
let milliSecond;
let startTime;

//variables for scrolling image
let x1Cloads = 0;
let x2Cloads;
let x1Grass = 0;
let x2Grass;
let scrollSpeed1 = 18;
let scrollSpeed2 = 1;

//video variables
let video;
let playing = true;
let alreadyPlayed = "notYet";

//button variables
let imageSwitch;
let strokeSwitch;
let colourSwitch;
let fillSwitch;
let imageSwitch2;

let displayHighScoreNumber = 0;

// preload all the assets
function preload(){
  dinoleft = loadImage("assets/running dino left.png");
  darkDinoLeft = loadImage("assets/dark running dino left.png");
  dinoRight = loadImage("assets/runing dino right.png");
  darkDinoRight = loadImage("assets/dark running dino right.png");
  dinoJump = loadImage("assets/running dino jump.png");
  dinoBlickingLight = loadImage("assets/dinoLightBlicking.png");
  darkBlinkingDino = loadImage("assets/darkBlinkingDino.png");
  darkDinoJump = loadImage("assets/darkDinoJump.png");
  dinoDead = loadImage("assets/dino dead.png");
  darkDinoDead = loadImage("assets/darkDeadDino.png");
  grassBackground = loadImage("assets/background.png");
  grassBackgroundEmpty = loadImage("assets/backgroundEmpty.png");
  darkModeGrassBackground = loadImage("assets/darkModeGrass.png");
  darkModeGrassBackgroundEmpty = loadImage("assets/darkGrassBackgroundEmpty.png");
  cloadsBackground = loadImage("assets/cloads.png");
  darkCloadsBackground = loadImage("assets/darkCloads.png");
  cactusPicture = loadImage("assets/cactus.png");
  darkCactus = loadImage("assets/darkModeCactus.png");
  twoCactus = loadImage("assets/two cactai.png");
  twoDarkCactus = loadImage("assets/2DarkCactai.png");
  moreCactus = loadImage("assets/a lot of cactai.png");
  moreDarkCactus = loadImage("assets/3DarkCactai.png");
  resetBottonImage = loadImage("assets/resetButton.png");
  darkResetButtonImage = loadImage("assets/darkModeReset.png");
  darkModeButtonImage = loadImage("assets/darkModeButton.png");
  lightModeButtonImage = loadImage("assets/lightModeButton.png");
  gameOverImage = loadImage("assets/gameover.png");
  darkGameOverImage = loadImage("assets/darkGameOver.png");
  font = loadFont("font.ttf");
  jumpSound = loadSound("assets/jump.wav");
  crashSound = loadSound("assets/die.wav");
  pointSound = loadSound("assets/point.wav");
  video = createVideo("assets/rickRollVideo.mp4");
}


//my dino class
class Dinosour{
  constructor(x, y){
    this.x = 60;
    this.y = height - height/3.9;
    this.wD = height/5.8;
    this.wB = height/4;
    this.hD = this.wD;
    this.gravity = 3.8;
    this.velocity = 0;

  }

  jump(){
    // this makes it so that when the y value is on the ground the velocity decreases so the dino jumps and the sound affect starts
    if(this.y === height - height/3.9){
      this.velocity = -50;
      jumpSound.play();
    }
      
  }

  run(){
    // the y value moves with the velocity and the velocity is affected by the gravity, the y value cant go above or below a certain point
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, height/20, height - height/3.9);
  }

  display(){
    if(state1 === "startScreen"){
      //if we are in the startscreen the dino images switch between his eyes are open or closed
      if(stateDark === "light"){
        if(stateBlinking === "open"){
          image(dinoJump, this.x, this.y, this.wD, this.wD);
        }
        else if(stateBlinking === "closed"){
          image(dinoBlickingLight, this.x , this.y, this.wD, this.wD);
        }
        
      }
      else if(stateDark === "dark"){
        
        if(stateBlinking === "open"){
          image(darkDinoJump, this.x, this.y, this.wD, this.wD);
        }
        else if(stateBlinking === "closed"){
          image(darkBlinkingDino, this.x , this.y, this.wD, this.wD);
        }
      }
    }

    else if(state1 === "playing"){
      // if we are playing the feet switch images back and forth so it shows that the dino is running
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
      //if the state is dead it shows the dead dino image
      if(stateDark === "light"){
        image(dinoDead, this.x, this.y, this.wD, this.wD);
      }
      else if(stateDark === "dark"){
        image(darkDinoDead, this.x, this.y, this.wD, this.wD);
      }
      
    }
    
  }

  switchBetweenDinos(){
    //the logic behind switching the feet. the feet switch when ....
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
  
  blinking(){
    //the logic behind blinking
    if(stateBlinking === "open"  && millis()> lastTimeSwitched + 5000){
      stateBlinking = "closed";
      lastTimeSwitched = millis();
    }
    else if(stateBlinking === "closed"  && millis()> lastTimeSwitched + 300){
      stateBlinking = "open";
      lastTimeSwitched = millis();
    }
  }

  collision(Cactus){
    //if the cactus hits the dino the dino dies and so the state is dead and the dead soundaffect plays
    hit = collideRectCircle( Cactus.x, Cactus.y, Cactus.w, Cactus.h, this.x + this.wD/2 - 10, this.y + this.wD/2 - 10, this.wD - 20);
    
    if(hit){
      crashSound.play();
      state1 = "dead";
    }
  }

  resetDino(){
    //the velocity is set to 0 so the dino doesnt jump and the y value is set back to origin
    this.velocity = 0;
    this.y = height - height/4.3;
  }
}

//my cactus class
class Cactus{
  constructor(x, y, imageOfCactai){
    this.x = width;
    this.y = height - height/6 - height/10.5,
    this.h = height/6;
    this.w = width/ 20;
    this.speed = 18;
    // sets each cactus picture to a variable
    this.a = cactusPicture;
    this.b = twoCactus;
    this.c = moreCactus;
    this.aDark = darkCactus;
    this. bDark = twoDarkCactus;
    this.cDark = moreDarkCactus;
    //randomly chooses from the cactus image variables
    this.imageOfCactai = random([this.a, this.b, this.c]);
    this.darkImageOfCactai = random([this.aDark, this.bDark, this.cDark]);

  }


  makeSpeedHigher(){
    //every 30 milliseconds the speed increases by 0.01, if you are under 30 (30 is really fast after that the game gets unplayable)
    this.speed = scrollSpeed1;
    if(milliSecond % 30 === 0 && scrollSpeed1 < 30){
      
      scrollSpeed1 += 0.01;
    }
  }

  move(){
    //this links the cactais x value to the speed 
    this.x -= this.speed;
  }

  display(){
    //each picture has different widths to those are changed too
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
      // displays the cactus depending on which one was chosen before randomly
      image(this.darkImageOfCactai, this.x, this.y, this.w, this.h); 
    }
  }

  disapeared(){
    //if the cactus x value is less than 0
    this.x > 0;
  }
  
}



function setup(){
  createCanvas(windowWidth, windowHeight);
  //making a dino at the x and y value set before
  dino = new Dinosour(this.x, this.y);

  //constants for text
  textSize(30);
  textFont(font);

  //this hides the video so it doesnt show up when we first create the canvas
  video.hide();

  //making all the buttons
  resetButtonFunction();
  howToPlayButtonFunction();
  exitHowToPlayFunction();
  switchBetweenModesFunction();
  
  //setting the values for the second picture of grass and the cloads images (scrolling background)
  x2Cloads = width;
  x2Grass = width;
}

function switchBetweenModesFunction(){
  //this function makes the dark mode and light mode switch button
  // eslint-disable-next-line no-undef
  switchBetweenModes = new Clickable();
  switchBetweenModes.locate(width - 90, 200);
  switchBetweenModes.onPress = changePressModes;
  //the image switches depending on which state we are in
  switchBetweenModes.image = imageSwitch;
  switchBetweenModes.cornerRadius = 3;
  switchBetweenModes.text = " "; 
  switchBetweenModes.strokeWeight = 3;
  switchBetweenModes.resize(50, 50);
  switchBetweenModes.stroke = strokeSwitch;  
}

function exitHowToPlayFunction(){
  //exit how to play screen button
  // eslint-disable-next-line no-undef
  existHowToPlay = new Clickable();
  existHowToPlay.locate(width - 90, 50);
  existHowToPlay.onPress = changePressHowTo2;
  existHowToPlay.cornerRadius = 3;
  existHowToPlay.text = "X"; 
  existHowToPlay.textFont = font;
  existHowToPlay.strokeWeight = 3;
  existHowToPlay.textSize = 30;  
  existHowToPlay.resize(50, 50);
  //colour grey 
  existHowToPlay.textColor = 83,83,83; 
  existHowToPlay.stroke = 83,83,83;  
}

function howToPlayButtonFunction(){
  //how to play button 
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
  howToPlayButton.textColor = colourSwitch; 
  howToPlayButton.stroke = strokeSwitch; 
  howToPlayButton.color = fillSwitch;
}

function resetButtonFunction(){
  //game over reset button 
  // eslint-disable-next-line no-undef
  resetButton = new Clickable();
  resetButton.locate(windowWidth/2 - 30, windowHeight/2);
  resetButton.onPress = changePressGameOver;
  resetButton.image = imageSwitch2;
  resetButton.fitImage = true; 
  resetButton.resize(70,60);
  resetButton.text = " ";  
  resetButton.strokeWeight = 0;
}



function switchBetweenModesImagesButtons(){
  //some changes that happen in light and dark mode (makes button changes easier)
  if(stateDark === "light"){
    fill(83,83,83);
    imageSwitch = lightModeButtonImage;
    imageSwitch2 = resetBottonImage;
    strokeSwitch = "white";
    colourSwitch = 83,83,83;
    fillSwitch = "white";
  }
  else if(stateDark === "dark"){
    fill("white");
    imageSwitch = darkModeButtonImage;
    imageSwitch2 = darkResetButtonImage;
    strokeSwitch = "black";
    colourSwitch = "white";
    fillSwitch = "black";
  }
  resetButton.image = imageSwitch2; 
  switchBetweenModes.image = imageSwitch;
  switchBetweenModes.stroke = strokeSwitch; 
  howToPlayButton.textColor = colourSwitch; 
  howToPlayButton.stroke = strokeSwitch;  
  howToPlayButton.color = fillSwitch;
}

function draw(){
  //some universal functions
  highScoreCount();
  displayScore();
  sound();
  switchBetweenModesImagesButtons();
  

  if(state1 === "startScreen"){
    startScreen();
    //sets startscreen as the millisecond value at that moment
    startTime = int(millis()/100);
  }
  else if(state1 === "playing"){
    //button and background screen
    state3 = "notOnPress";
    moveBackgroundCloads();
    moveBackground();
    howToPlayButton.draw();
    switchBetweenModes.draw();
    //time and score
    time();
    displayScore();
    //display dino and cactus
    displayCactai();
    displayDino();
    
  }
  else if(state1 === "dead"){
    // reset the game and display the gameover screen
    resetGame();
    displayGameOver();
  }
  else if(state1 === "howTo"){
    //displays how to screen
    displayHowTo();
  }
  easterEgg();
}

function displayDino(){
  //displays the dino and makes it run and after a certain amount of time the dino turns dark
  dino.display();
  dino.switchBetweenDinos();
  dino.run();
  switchMidGameSetting();
}

function displayCactai(){
  for(let theCactai of Cactai){
    if(theCactai.disapeared()){
      //if the cactus is otsidethe screen empty the array
      Cactai = [];
    }
    else{
      //if the cactus is inthe screen do everything else 
      theCactai.makeSpeedHigher();
      theCactai.move();
      dino.collision(theCactai);
      theCactai.display();
      
    }
  }
  //randomize distance between cactai withen a range
  let minDistance = width/3;
  if(Cactai.length <= 0 || width - Cactai[Cactai.length - 1].x >= nextSpawnDistance){
    cactais = new Cactus(this.x, this.y, this.imageOfCactai);
    Cactai.push(cactais);
    nextSpawnDistance = random(minDistance, width);
  }
  
}



function keyPressed(){
  if(key === " " || keyCode === UP_ARROW || keyCode === 87 && state1 === "startScreen"){
    // if the state is startscreen and you press the key you start playing and make the dino jump
    state1 = "playing";
    dino.jump();
  }
  else if(keyCode === UP_ARROW || keyCode === 87 || keyIsPressed || keyIsDown(32) && state1 === "playing"){
    //if your playing and you press the key it makes the dino jump
    state2 = "isDinoJump";
    dino.jump();
    lastTimeSwitched = millis();
  }
}



function startScreen(){
  //displays the startcreen and has the function for blinking and the buttons
  if(stateDark === "light"){
    background("white");
    image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
    image(cloadsBackground, x1Cloads, 0, width, height/2);
    text("press space to start", width/3.2, height/3);
  }
  else if(stateDark === "dark"){
    image(darkModeGrassBackground, x1Grass, height - height/2, width, height - height/2);
    image(darkCloadsBackground, x1Cloads, 0, width, height/2);
    text("press space to start", width/3.2, height/3);
  }
  howToPlayButton.draw();
  switchBetweenModes.draw();

  dino.display();
  dino.blinking();
}



function time(){
  milliSecond = int(millis()/100);
  if (milliSecond > 0){
    milliSecond = milliSecond - startTime; //minus the millis from total from millis of start screen
  }
}


function highScoreCount(){
  //records highscrore
  if(milliSecond > highScore){
    highScore = milliSecond;
    
  }
  displayHighScoreNumber = highScore;
}

function displayScore(){
  //this makes the 0s indent every time another is added
  if(milliSecond< 10){
    text("0000" + milliSecond, width - 200, 60);
  }
  else if(milliSecond>= 10 && milliSecond < 100){
    
    text("000" + milliSecond, width - 200, 60);
  }
  else if(milliSecond>= 100 && milliSecond < 1000){
    text("00" + milliSecond, width - 200, 60);
  }
  else if(milliSecond>= 1000 && milliSecond < 10000){
    text("0" + milliSecond, width - 200, 60);
  }
  else if(milliSecond>= 10000 && milliSecond < 100000){
    text( milliSecond, width - 200, 60);
  }
  
}


function easterEgg(){
  //if we are more than 100 and we havent play the video then the video plays
  if(milliSecond >= 100 && alreadyPlayed === "notYet"){
      
    let completion = video.time()/video.duration();
    video.play();
    let img = video.get();
    image(img, 0, 0); 
    video.size(width, height);
    video.showControls();
      
    if(completion === 1){
      alreadyPlayed = "Yet";
    }  
  }
  else if(milliSecond>= 100 && alreadyPlayed === "Yet"){
    //if we already played the video then pause the video
    video.pause();
  }
}

function sound(){
  if(milliSecond % 100 === 0 && milliSecond !== 0){
    //every 100 milliseconds play the point sound
    if (!pointSound.isPlaying()) {
      pointSound.play();
    }
  }
 
}

function displayHighScore(){
  //this makes the 0s indent every time another is added and with HI (highscore)
  if(highScore< 10){
    text("HI " + "0000" + displayHighScoreNumber, width - 480, 60);
  }
  else if(highScore>= 10 && highScore <= 100){
    text("HI " + "000" + displayHighScoreNumber, width - 480, 60);
  }
  else if(highScore>= 100 && highScore <= 1000){
    text("HI " + "00" + displayHighScoreNumber, width - 480, 60);
  }
  else if(highScore>= 1000 && highScore <= 10000){
    text("HI " + "0" + displayHighScoreNumber, width - 480, 60);
  }
  else if(highScore>= 10000 && highScore <= 100000){
    text("HI " + displayHighScoreNumber, width - 480, 60);
  }
  
}

function resetGame (){
  //
  if (state1 === "dead" && state3 === "onPress") {
    state1 = "playing";
    milliSecond = 0;
    
  }
  startTime = int(millis()/100);
  scrollSpeed1 = 18;
  Cactai = [];
  dino.resetDino();
}


function changePressHowTo(){
  if(state1 === "startScreen"){
    state1 = "howTo";
    stateChangeStart = "true";
  }
  else if(state1 === "dead"){
    state1 = "howTo";
    stateChangeStart = "false";
  }
  
}

function changePressHowTo2(){
  if(state1 === "howTo" && stateChangeStart === "false"){
    state1 = "dead";
    state3 = "onPress";
    
  }
  else if(state1 === "howTo" && stateChangeStart === "true"){
    state1 = "startScreen";
  }
}

function changePressModes(){
  if(stateDark === "light"){
    stateDark = "dark";
    state3 = "onPress";
  }
  else if(stateDark === "dark" ){
    stateDark = "light";
    state3 = "onPress";
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
  if(stateDark === "light"){
    image(gameOverImage, width/3.8, height/4, width/2, height/18);
  }
  else if(stateDark === "dark"){
    image(darkGameOverImage, width/3.8, height/4, width/2, height/10);
  }
  
}

function displayHowTo(){
  if(stateDark === "light"){
    background("white");
    image(grassBackground, 0, height - height/3.8, width, height - height/1.3);
    image(cloadsBackground, 0, 0, width, height/2);
  }
  else if(stateDark === "dark"){
    image(darkModeGrassBackground, 0, height - height/2, width, height - height/2);
    image(darkCloadsBackground, 0, 0, width, height/2);
  }
  line(width/2 - 200, 90, width/2 + 150, 90);
  line(width/2 - 200, 565, width/2 + 150, 565);
  text("press space to jump", width/2 - 300, 170);
  text("the score is how long you have been playing", width/2 - 650, 340);
  text("try not to die!!", width/2 - 250, 510);
  existHowToPlay.draw();
}

function moveBackground(){
  if(stateDark === "light"){
    image(grassBackgroundEmpty, 0, height - height/3.8, width, height - height/1.3);
    image(grassBackground, x1Grass, height - height/3.8, width, height - height/1.3);
    image(grassBackground, x2Grass, height - height/3.8, width, height - height/1.3);
  }
  else if(stateDark === "dark"){
    image(darkModeGrassBackgroundEmpty, 0, height - height/2, width, height - height/2);
    image(darkModeGrassBackground, x1Grass, height - height/2, width, height - height/2);
    image(darkModeGrassBackground, x2Grass, height - height/2, width, height - height/2);
  }
  x1Grass  -= scrollSpeed1 ;
  x2Grass -= scrollSpeed1;
  
  

  if (x1Grass < -width ){
    x1Grass = width;
  }
  if (x2Grass < -width ){
    x2Grass = width;
  }
  
}

function moveBackgroundCloads(){
  if(stateDark === "light"){
    background("white");
    image(cloadsBackground, x1Cloads, 0, width, height/2);
    image(cloadsBackground, x2Cloads, 0, width, height/2);
  }
  else if(stateDark === "dark"){
    background("black");
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

function switchMidGameSetting(){
  if(milliSecond === 200){
    stateDark = "dark";
    
  }
  else if(milliSecond === 400){
    stateDark = "light";
  }
}

