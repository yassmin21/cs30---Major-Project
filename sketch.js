// No Wifi Dinosour game
// Yassmin Ibrahim
// 5 / 3/ 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//make a object for character

let Cactai = [];

class Dinosour{
  constructor(x, y){
    this.x = 30;
    this.y = 175;
    this.w = 50;
    this.h = this.w;
    this.gravity = 0.3;
    this.velocity = 0;

  }

  jump(){
    this.velocity += this.gravity;
    this.y += this.velocity;
    if(this.y > height - 70){
      //doesnt let the bird go down the screen 
      this.y = height - 70;
      this.velocity = 0;
    }
    else if(this.y < 60){
      this.velocity = 0;
    }
    if(keyIsPressed){
      this.velocity -= this.gravity * 3; 
    }
      
  }

  display(){
    rect(this.x, this.y, this.w, this.w);
  }


}

class Cactus{
  constructor(x, y){
    this.x = width/2;
    this.y = 175,
    this.w = 50;
    this.speed = 3;

  }

  move(){
    this.x -= this.speed;
    if(frameCount % 110 === 0){
      let cactais = new Cactus(0, this.y);
      Cactai.push(cactais);
    }
    
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
  // cactais = new Cactus(0, this.y);
  
}

function draw(){
  background("grey");
  dino.display();
  dino.jump();

  for(let theCactai of Cactai){
    theCactai.move();
    theCactai.display();
    
  }
}




