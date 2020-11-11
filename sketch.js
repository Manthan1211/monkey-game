var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;

var restart, restartImage;
var gameover, gameoverImage


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
  
}



function setup() {
  createCanvas(600, 350);
  
  monkey = createSprite(80,230,10,10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,340,600,10);
  ground.velocityX = -4 
  ground.x = ground.width /2;
  console.log(ground.x);
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImage);
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  
  gameover.scale = 0.5;
  restart.scale = 0.5;

  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  
}

function draw() {
  
  background("skyblue");
  text("Score: "+ score, 500,50);
  
  
  
  if (gameState===PLAY) {
  score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
     if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8  
    monkey.collide(ground);  
    
    if(monkey.isTouching(FoodGroup))
    score = + 1;  
    
  bananas();
  stone();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(monkey.isTouching(obstacleGroup)){
        gameState = END;
    }
    
  }
  
  else if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-5);
    FoodGroup.setLifetimeEach(-5);
    
    
   
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  ground.visible = false;
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 500,50);
  
  drawSprites();
}

function bananas() {
  if (frameCount % 80 === 0) {
   var banana = createSprite(620,120, 50, 50);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 160;
  FoodGroup.add(banana);
  }
}

function stone() {
   if (frameCount%200 === 0){
    obstacle = createSprite(620,315,50,50); 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 180;
  obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  monkey.changeAnimation("moving",monkey_running);
  
  score = 0;
  
}