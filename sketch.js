var tower,towerImg;
var ghost,ghostImg,ghostJumpImg ;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var spooky;
var gameState = "play";
var score = 0;
//var invisibleblock, invisibleblockGroup;

function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spooky.play();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
 // invisibleblockGroup = new Group();
  
}
 
function draw(){
  
background(0);
  
  if(gameState === "play"){
    
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left")){
    ghost.velocityX = -3;
  }
    
  if(keyDown("right")){
    ghost.velocityX = 3;
  }
  
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
    
  ghost.velocityY = ghost.velocityY + 0.8 ;
  
  spawnDoors();
    
    if(ghost.isTouching(climbersGroup) || ghost.y > 600 ){
      ghost.destroy();
      gameState = "end";
    }
  }
  else if(gameState === "end"){
    tower.destroy();
   
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
    
  }
    

  drawSprites();
}
function spawnDoors(){
  if(frameCount % 240 === 0){
  door = createSprite(200,-50);
  climber = createSprite(200,10);
  //invisibleblock = createSprite(200,15);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
   // invisibleblock.x = door.x;
    
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    //invisibleblock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    climber.lifetime = 800;
    door.lifetime = 800;
    //invisibleblock.lifetime = 800;
    
    climbersGroup.add(climber);
    doorsGroup.add(door);
    //invisibleblockGroup.add(invisibleblock);
}
}


