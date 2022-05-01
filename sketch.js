var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var Level1, Level2;
var Lv1Img, Lv2Img;
var obstacle1, obstacle2, obstacle3, obstacleGroup, backImg, backx, bgImg, bgx;
var gameOverSound, restart, treasuresound, backsound, levelsound;


//Game States
var PLAY=1;
var END=0;
var HOME=2;
var gameState=2;
var PLAY2 = 3;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

  Lv1Img = loadImage("Lv1.png")
  Lv2Img = loadImage("Lv2.png")

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")

  backImg = loadImage("backbutton.png")

  bgImg = loadImage("bghome.png")

  gameOverSound = loadSound("gameover.mp3")

  treasuresound = loadSound("collectedsound.mp3")

  backsound = loadSound("backsound.mp3")

  levelsound = loadSound("levelsound.mp3")

}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device 
createCanvas(windowWidth, windowHeight);



path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

bgx = createSprite(750, 300, windowWidth, windowHeight);
bgx.addImage(bgImg);
bgx.scale = 2

Level1 = createSprite(windowWidth-790, windowHeight-500)
Level1.addImage(Lv1Img);


Level2 = createSprite(windowWidth-790, windowHeight-410)
Level2.addImage(Lv2Img);



cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

obstacleGroup = createGroup();



backx = createSprite(windowWidth-1520, 20)
backx.addImage(backImg)
backx.scale = 0.1



}

function draw() {

  if (gameState===2) {
    
    background("black")

    

    path.visible = false;
    boy.visible = false;
    backx.visible = false;


    Level1.visible = true;
    Level2.visible = true;


    if (mousePressedOver(Level1)) {

      gameState=1
  levelsound.play();

    }

    if (mousePressedOver(Level2)) {

      gameState=3;
      levelsound.play();
    }
    drawSprites();
  }
 
  if(gameState===1){
    background(0);


    path.velocityY = (4 + frameCount / 60 * 1.2)
   
    bgx.visible = false;


  path.visible = true;
  boy.visible = true;

  Level1.visible = false;
  Level2.visible = false;

  boy.x = World.mouseX || touches.length > 0;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background

  if (path.y > height){
    path.y = height/2;
  }


    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
      treasuresound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      treasuresound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      treasuresound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        gameOverSound.play();
       
    }
  }
  
  backx.visible = true;

  if (mousePressedOver(backx)) {
    path.velocityY = 0
    backsound.play();
    gameState=2;
    bgx.visible = true;

    treasureCollection = 0

    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();

  }

  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }



  if(gameState===3){

    background(0);
  
    path.velocityY = (4 + frameCount / 60 * 1.2)
  
    bgx.visible = false;
  
  path.visible = true;
  boy.visible = true;
  
  Level1.visible = false;
  Level2.visible = false;
  
  boy.x = World.mouseX || touches.length > 0;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
  if (path.y > height){
    path.y = height/2;
  }
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
      treasuresound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      treasuresound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      treasuresound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        gameOverSound.play();
    }
  }
  

  
spawnObstacle();


  if (boy.isTouching(obstacleGroup)) {

    obstacleGroup.destroyEach();
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();

    gameState=END;

    gameOverSound.play();
  }

  backx.visible = true;

  if (mousePressedOver(backx)) {
    obstacleGroup.setVelocityYEach(0);
    obstacleGroup.destroyEach();

    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();

    treasureCollection = 0


    backsound.play();
    gameState=2;
    bgx.visible = true;
  }
  
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }










  if (gameState===END) {
    boy.addAnimation("SahilRunning",endImg);
    boy.x=width/2;
    boy.y=height/2;
    boy.scale=0.6;
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);

    path.velocityY = 0;

    // obstacleGroup.setVelocityYEach(0)

    backx.visible = false;

    drawSprites();

  }






}

function createCash() {
  if (World.frameCount % 200 == 0) {
   // Modify the positions of cash 
    var cash = createSprite(Math.round(random(windowWidth-65),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (5 + treasureCollection / 100 * 0.5);
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
       // Modify the positions of diamonds 

    var diamonds = createSprite(Math.round(random(windowWidth-60),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (5 + treasureCollection / 100 * 0.3);
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //   Modify the positions of jwellery to make them spawn throughout the available screen size.

    var jwellery = createSprite(Math.round(random(windowWidth-60),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (5 + treasureCollection / 100 * 0.3);
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var sword = createSprite(Math.round(random(windowWidth-60),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (5 + treasureCollection / 100 * 0.3);
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}




function spawnObstacle() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(windowWidth - 70), 40))
    obstacle.velocityY = (6 + treasureCollection / 100 * 0.3)

    var rand = Math.round(random(1 , 3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      default: break;
    
    }

    obstacle.scale = 0.1;
    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);


  }
}