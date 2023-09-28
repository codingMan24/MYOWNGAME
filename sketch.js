var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstaclesTop
var obstaclesBottom
var obstacleTop1Image

var obstacleTop2Image

var obstacleBottom1Image
var p
var obstacleBottom2Image
var gameState = 0
var obstacleBottom3Image
var gameOverImage
var restartImage
var ret
var s
var score = 0
function preload(){
bgImg = loadImage("assets/bg.png")
obstacleTop1Image = loadImage('assets/obsTop1.png')
obstacleTop2Image = loadImage('assets/obsTop2.png')
obstacleBottom1Image = loadImage('assets/obsBottom1.png')
obstacleBottom2Image = loadImage('assets/obsBottom2.png')
obstacleBottom3Image = loadImage('assets/obsBottom3.png')
gameOverImage = loadImage('assets/gameOver.png')
restartImage = loadImage('assets/restart.png')
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
  createCanvas(400,400)
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
obstaclesTop = createGroup()
obstaclesBottom = createGroup()
//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;
//gameState = 0
topGround = createSprite(200,10,800,20);
topGround.visible = false;
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.1;
p = createSprite(200,250)
p.addImage(restartImage)
p.visible = false
p.scale = 0.5
s = createSprite(200,200)
s.addImage(gameOverImage)
s.visible = false
s.scale = 0.8
}
function createTopObstacles(){
  if(gameState == 1){
  if(frameCount % 60 == 0){
  var obstacle = createSprite(500,Math.round(random(50,70)),20,20)
  obstacle.velocityX = -6
  obstacle.scale = 0.15
  balloon.depth = obstacle.depth+=1
  var x = Math.round(random(1,2))
  switch(x){
    case 1:
      obstacle.addImage(obstacleTop1Image)
      obstacle.scale = 0.1
      obstacle.y -= 15
    break
    case 2:
      obstacle.addImage(obstacleTop2Image)
      obstacle.scale = 0.04
    break   
    default:
    break
  }
  obstaclesTop.add(obstacle)
}
}
}
function createBottomObstacles(){
  if(gameState == 1){
  if(frameCount % 20 == 0){
  var obstacle = createSprite(500,310,20,20)
  obstacle.velocityX = -6
  obstacle.scale = 0.15
  balloon.depth = obstacle.depth+=1
  var x = Math.round(random(1,5))
  switch(x){
    case 1:
      obstacle.addImage(obstacleBottom1Image)
      obstacle.scale = 0.1
    break
    case 5:
      obstacle.addImage(obstacleBottom1Image)
      obstacle.scale = 0.07
      obstacle.y = 340
    break
    case 2:
      obstacle.addImage(obstacleBottom2Image)
      obstacle.scale = 0.05
      obstacle.y = 350
    break
    case 3:
      obstacle.addImage(obstacleBottom3Image)
      obstacle.scale = 0.1 
    break
    case 4:
      obstacle.addImage(obstacleBottom3Image)
      obstacle.scale = 0.07
      obstacle.y = 330
    break
    default:
    break
  }
  obstaclesBottom.add(obstacle)
}
}
}
function thing(){
  gameState = 1
}
function draw(){
  background(bgImg)
  if(gameState === 1){ 
    textSize(19)
    textStyle(BOLD)
    text("Score: " + score, 30,30) 
    balloon.velocityY = balloon.velocityY += 1
    if(keyDown('space')){
      balloon.velocityY = -10
    }
    if((frameCount % 10) === 0){
      score = score + 1
    }
    if(balloon.isTouching(obstaclesBottom)){
      obstaclesBottom.destroyEach()
      obstaclesTop.destroyEach()
      console.log('asdf')
      gameState = 0
    }
    if(balloon.isTouching(obstaclesTop)){
      obstaclesBottom.destroyEach()
      obstaclesTop.destroyEach()
      console.log('asdfss')
      gameState = 0
    }
    if(balloon.y >= 400 || balloon.y <=0){
      gameState = 0
    }
  }
  if(gameState === 0){
    obstaclesBottom.destroyEach()
      obstaclesTop.destroyEach()
      score = 0
    p.visible = true
    s.visible = true
    balloon.y = 200
    balloon.x = 100
    balloon.velocityY = 0
    if(mousePressedOver(p)){
      gameState = 1
      p.visible = false
      s.visible = false
    }
  }  
  drawSprites()
  textSize(19)
  textStyle(BOLD)
  text("Score: " + score, 30,30)
  createTopObstacles()
  createBottomObstacles()
  console.log(gameState)
} 