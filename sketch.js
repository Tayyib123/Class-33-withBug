const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope1,rope2,rope3,fruit,ground;
var fruit_con1,fruit_con2,fruit_con3;

var bg_img;
var food;
var rabbit;

var button1,button2,button3;
var bunny;

var bgSound;
var cutSound;
var sadSound;
var eatingSound;
var airSound;

var blink,eat,sad;

var muteButton;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');

  bgSound = loadSound('sound1.mp3');
  sadSound = loadSound('sad.wav');
  cutSound = loadSound('rope_cut.mp3');
  eatingSound = loadSound('eating_sound.mp3');
  airSound = loadSound('air.wav');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  eat.looping = false;
  sad.looping = false;
 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button1 = createImg('cut_btn.png');
  button1.position(20,30);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(55,55);
  button3.mouseClicked(drop3);

  muteButton = createImg('mute.png');
  muteButton.position(450,20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);
  
  rope1 = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:365,y:40});
  rope3 = new Rope(5,{x:400,y:225});

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(420,620,100,100);
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope1.body,fruit);

  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  ground = new Ground(200,690,600,20);

  bgSound.play()
  bgSound.setVolume(0.5)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope1.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)== true){
    bunny.changeAnimation('eating')
    eatingSound.play()
  }
  if(fruit != null && fruit.position.y > 650){
    bunny.changeAnimation('crying')
    bgSound.stop()
    sadSound.play()
    fruit = null
  }

   drawSprites();
}

function drop1()
{
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null; 
  cutSound.play()
}

function drop2(){

  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cutSound.play()
}

function drop3(){

  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cutSound.play()
}

function collide(body,sprite) {
  
  if(body != null) {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}

function mute(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  airSound.play()
}


