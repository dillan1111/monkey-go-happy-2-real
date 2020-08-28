var banana, bananaImage;
var BananaGroup, ObstaclesGroup;
var obstacle, obstacleImage;
var monkey, monkeyImage, score, count;
var PLAY = 1; 
var END = 0;
var gameState, background, backImage;

function preload(){
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backImage = loadImage("jungle.png");
  
}

function setup() {
  createCanvas(400, 400);
monkey = createSprite(200,300,20,50);
monkey.addAnimation("run", monkeyImage);

obstacle = createSprite(400,365,10,40);
obstacle.visible = false;
obstacle.debug = true

//set collision radius for the trex
  ///monkey.setCollider("circle",0,0,300);
//monkey.debug = true;

//scale and position the monkey
monkey.scale = 0.20;
monkey.x = 50;

//create a ground sprite
ground = createSprite(0,360,800,20);
//ground.addImage(backImage)
ground.scale = 1;
ground.x = ground.width /2;

//invisible Ground to support Trex
invisibleGround = createSprite(200,360,400,20);
invisibleGround.visible = false;

count = 0;
score = 0;
  
gameState = 1;
stroke("black");
textSize(20);
fill("black");
BananaGroup = new Group();
ObstaclesGroup = new Group();
  
  
}

function draw() {
  background(220);
  monkey.collide(invisibleGround);
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  
  if (gameState === PLAY ){
      //scoring
      count = count+Math.round(World.frameRate/60)
    
      spawnObstacles();
      spawnfruits();
    
      //move the ground
      ground.velocityX = -6;
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      } 
      if(keyDown("space") && monkey.y >= 250){
        monkey.velocityY = -13 ;
      }
      //add gravity
       monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(BananaGroup)){
      BananaGroup.destroyEach();
      score = score+1;
      monkey.scale = monkey.scale-0.01
  }
    
     //End the game when trex is touching the obstacle
  if(ObstaclesGroup.collide(monkey)){
      gameState = END;
  }
  }else if (gameState === END){
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    monkey.scale =  0.2
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
  }
  
drawSprites();
  //display score
  text("Survival Time: "+ count, 230, 100);
  
  //display score
  text("Fruits: "+ score, 100, 100);
}
function spawnObstacles() {
  if(World.frameCount % (80-count/5) === 0) {
    var obstacle = createSprite(400,335,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);  
  }
}
function spawnfruits() {
//write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
      var fruit = createSprite(400,320,40,10);
      fruit.y = random(140,200);
      fruit.addImage(bananaImage);
      fruit.scale = 0.05;
      fruit.velocityX = -6;
    
      //assign lifetime to the variable
      fruit.lifetime = 134;
    
      //add each cloud to the group
      BananaGroup.add(fruit);
    
  }
}
