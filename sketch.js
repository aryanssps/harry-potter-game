var harry,harry_Img;
var bg_Img;
var flag,flag_Img
var goldball,goldball_Img,goldBallGroup;
var blackball,blackball_Img,blackBallGroup;
var edges;
var harryscore=0,drakescore=0,trophy,trophy_Img;
var sign,sign_Img;
var sign2,sign2_Img;
var PLAY=1,END=0;
var gameState=PLAY
var harry_Img2;
var reset,reset_Img;
var potter_Img
var blackBallSound,goldBallSound,hitSound
var harry3
//var drakeM,drake_Img,drakeMGroup;

function preload(){
  harry_Img=loadImage("harry2.png")
  potter_Img=loadImage("potter.png")
  bg_Img=loadImage("bg.jpg")
  flag_Img=loadImage("hogwartsFlag.png")
  goldball_Img=loadImage("goldball.png")
  trophy_Img=loadImage("trophy.png")
  sign_Img=loadImage("sign.png")
  sign2_Img=loadImage("sign2.png")
  blackball_Img=loadImage("blackball2.png")
  reset_Img=loadImage("reset.png")
  harry_Img2=loadImage("drake.png")
  blackBallSound=loadSound("blackball.mp3")
  goldBallSound=loadSound("goldSnitch.mp3")
  hitSound=loadSound("hit.mp3")
  //drake_Img=loadImage("drake.png")
  harry3=loadImage("harry.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
 
  harry=createSprite(100,100,50,50)
  //harry.addImage("flying",harry_Img)
  //harry.scale=0.28
  
  
  drake=createSprite(800,100,50,50)
  drake.addImage("failed",harry_Img2)
  drake.scale=0.1
 drake.visible=false;

 

  flag=createSprite(40,40,50,50)
  flag.addImage(flag_Img)
  flag.scale=0.08
  

  trophy=createSprite(700,90,50,50)
  trophy.addImage(trophy_Img)
  trophy.scale=0.1
  trophy.visible=false;
  
  sign=createSprite(windowWidth/2,windowHeight/2,50,50)
  sign.addImage(sign_Img)
  sign.scale=0.1
  sign.visible=false;
  
  sign2=createSprite(windowWidth/2,windowHeight/2,50,50)
  sign2.addImage(sign2_Img)
  sign2.scale=0.1
  sign2.visible=false;
  
   reset=createSprite(700,windowHeight-200,50,50)
  reset.addImage(reset_Img)
  reset.scale=0.3
  reset.visible=false;
  
  goldBallGroup=new Group();
  blackBallGroup=new Group();
  drakeMGroup=new Group();
  edges=createEdgeSprites();
}


function draw(){
  background(bg_Img)
   push()
   
   fill(0)
   textSize(20)
   //textAlign("CENTER")
   text("WELCOME TO QUIDITCH MATCH",600,20)
   pop ();
  fill (0)
  textSize(20)
  text("HarryScore:"+harryscore,370,20)
  text("DrakeScore:"+drakescore,970,20)
  
  

  
  
  if(gameState===PLAY){
    
    harry.y=mouseY
    harry.x=mouseX

    if(harry.x <= windowWidth/2 ){
      harry.addImage("flying",potter_Img)
      harry.scale=0.28
    }
    else{
      harry.addImage("flying",harry_Img)
    }
    
    if( harry.y<=windowHeight/2){
      harry.addImage("flying",potter_Img)
      harry.scale=0.28
    }
    else{
      harry.addImage("flying",harry_Img)
    
    }

    if(harry.isTouching(goldBallGroup)){
    harryscore++
    goldBallSound.play();
    goldBallGroup.destroyEach();
  }
    if(blackBallGroup.isTouching(goldBallGroup)){
     hitSound.play();
    }

  if(harry.isTouching(blackBallGroup)){
    drakescore++
    blackBallSound.play();
    blackBallGroup.destroyEach();
  }
     
  if(harryscore===2){
    goldball.velocityX=Math.round(random(9,-10))
    goldball.velocityY=Math.round(random(10,-9))
  }

  if(drakescore===2){
    goldball.velocityX=Math.round(random(11,-12))
    goldball.velocityY=Math.round(random(12,-12))
  }

  if(harryscore===5){
    goldball.velocityX=Math.round(random(11,-12))
    goldball.velocityY=Math.round(random(12,-11))
  }

  if(drakescore===5){
    goldball.velocityX=Math.round(random(13,-14))
    goldball.velocityY=Math.round(random(12,-13))
  }
  
  if(harryscore===7){
    goldball.velocityX=Math.round(random(15,-16))
    goldball.velocityY=Math.round(random(16,-14))
  }

  if(drakescore===7){
    goldball.velocityX=Math.round(random(16,-17))
    goldball.velocityY=Math.round(random(15,-18))
  }
  
  if(harryscore===10){
    
    gameState=END
  }
    
    if(drakescore===10){
      gameState=END
      harry.visible=false;
      drake.visible=true;
     
  }
  }
  
  else if(gameState===END){
    
    harry.x=70
    harry.y=200

    flag.visible=true;

    if(harryscore===10){
    trophy.visible=true;
    sign.visible=true;
    harry.addImage("flying",harry3)
    harry.y=100
    harry.x=600
    fill("red")
    textSize(30)
    text("GREYINFIDOR WIN!!!",600,250)
    }
    
    else if(drakescore===10){
   // stroke("red")
    fill("red")
    textSize(30)
    text("SLYTHERIAN WIN!!!",600,250)
    trophy.visible=true;
    sign2.visible=true;
    
  }
  
  
    reset.visible=true;
    blackball.destroy();                          
     goldball.destroy()
     blackBallGroup.destroyEach();
    goldBallGroup.destroyEach();
     blackBallGroup.setVelocityXEach(0);
     goldBallGroup.setVelocityXEach(0);
     blackBallGroup.setVelocityYEach(0);
     goldBallGroup.setVelocityYEach(0);
  
     if(mousePressedOver(reset)){
       restart();
     }
     
   
}
  createEdgeSprites();
  
  spawnBalls();
  //drako();
  
  goldBallGroup.bounceOff(edges)
  blackBallGroup.bounceOff(edges)
 
     

  
  
  
  
 drawSprites();
  
}

function spawnBalls(){
 
  if(frameCount%100===0){
     goldball=createSprite(700,100,50,50)
     goldball.addImage(goldball_Img)
     goldball.scale=0.15
     goldball.velocityX=Math.round(random(8,-7))
     goldball.velocityY=Math.round(random(7,-8))
     goldball.lifetime=70
     goldball.x=Math.round(random(300,600))
     goldball.y=Math.round(random(300,800))
     goldBallGroup.add(goldball)
    
     }
    if(frameCount%50===0){
     blackball=createSprite(800,100,50,50)
     blackball.addImage(blackball_Img)
     blackball.scale=0.08
     blackball.velocityX=Math.round(random(6,-7))
     blackball.velocityY=Math.round(random(7,-9))
     blackball.lifetime=50
     blackball.x=Math.round(random(320,610))
     blackball.y=Math.round(random(300,850))
     blackBallGroup.add(blackball)
    
     }
    }
  
   /* function drako(){
      if(frameCount%110===0){
      drakeM=createSprite(200,200,50,50)
      drakeM.addImage("catching",drake_Img)
      drakeM.scale=0.08
      drakeM.x=Math.round(random(100,610))
      drakeM.y=Math.round(random(200,800))
      drakeM.velocityX=random(-9,10)
      drakeM.velocityY=random(9,-10)
     drakeMGroup.setLifetimeEach(windowWidth/10,windowHeight/10)
      drakeMGroup.add(drakeM)
      }
    }*/

  function restart(){
    
      harryscore=0
      drakescore=0
      harry.visible=true;
      drake.visible=false;
      gameState=PLAY;
      trophy.visible=false;
      sign.visible=false;
      sign2.visible=false;
      reset.visible=false;
  }