var canvas;
var block1,block2,block3,block4;
var ball, edges;
var music;
var play,playimg;
var play=0,end=1;
var gamestate;

function preload(){
    music = loadSound("music.mp3");
    playimg = loadImage("play.png");
}


function setup(){
    canvas = createCanvas(800,600);

    play = createSprite(width/2,height/2);
    play.addImage(playimg);
    play.scale = 0.6;
    play.setCollider("circle",0,7,88);

    block1 = createSprite(0,580,360,30);
    block1.shapeColor = rgb(0,0,255);

    block2 = createSprite(295,580,200,30);
    block2.shapeColor = rgb(255,128,0);

    block3 = createSprite(515,580,200,30);
    block3.shapeColor = rgb(153, 0, 23);

    block4 = createSprite(740,580,220,30);
    block4.shapeColor = rgb(0,100,0);

    ball = createSprite(random(20,750),100, 40,40);
    ball.shapeColor = rgb(255,255,255);
    ball.velocityX = 4;
    ball.velocityY = 9;
    
    gamestate = end;
}

function draw() {
    background(rgb(169,169,169));
    edges=createEdgeSprites();
    ball.bounceOff(edges);

    if(gamestate===play){
        play.visible = false;
        ball.visible = true;
        if(block1.isTouching(ball) && ball.bounceOff(block1)){
            ball.shapeColor = rgb(0,0,255);
            music.play();
        }
    
        if(block2.isTouching(ball)){
            ball.shapeColor = rgb(255,128,0);
            gamestate = end;
        }
    
        if(block3.isTouching(ball) && ball.bounceOff(block3)){
            ball.shapeColor = rgb(153, 0, 23);
        }
    
        if(block4.isTouching(ball) && ball.bounceOff(block4)){
            ball.shapeColor = rgb(0,100,0);
        }
    }
    if(gamestate === end){
        play.visible = true;
        ball.visible = false;
        ball.velocityX = 0;
        ball.velocityY = 0;
        music.stop();

         if(mousePressedOver(play)){
             ball.shapeColor = rgb(255,255,255);
            ball.velocityX = 4;
            ball.velocityY = 9;
            ball.x = random(20,750)
            ball.y = 100
            gamestate = play;
        }
    }
    drawSprites();
}
