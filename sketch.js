var dog;
var happydog;
var database;
var foodS;
var foodStock;
var doggy;
var milk;
var foodStock;
var lastFed;

function preload()
{
  dog = loadImage ("images/dogImg.png");
  happydog = loadImage ("images/dogImg1.png");
  milk = loadImage ("images/Milk.png");
}

function setup() {
	createCanvas(1000,1000);
  
    database = firebase.database();
    console.log(database);

      foodObj = new Food();
    
      foodStock=database.ref('Food');
      foodStock.on("value",readStock);
    
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function(data){
        lastFed=data.val();
      });
    
      //read game state from database
      readState=database.ref('gameState');
      readState.on("value",function(data){
        gameState=data.val();
      });

    doggy = createSprite (550,600,50,50)
    doggy.addImage(dog);
    doggy.scale = 0.5;

    foodStock = database.ref("food")
    foodStock.on("value",readStock)

    feed = createSprite("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(addFoods);

    addFood = createSprite("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
}

function draw() {  
  background(0)
 
  /*if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    doggy.addImage(happydog)}
  add styles here
  text("PRESS UP_ARROW KEY TO FEED DRAGO MILK");
  fill("blue");
  textSize(20);
  stroke(3);*/

    fedTime = database.ref('feedTime');
    fedTime.on("value",function(data){
    lastFed = data.val();
    })

    fill(255,255,254);
    textSize(15);
    if(lastFed>= 12) {
      text("LAST FEED : "+ lastFed % 12 + "PM", 350,30);
    }
    else if (lastFed == 0) {
      text("LAST FEED : 12 AM" , 350,30);
    }
    else{
      text("LAST FEED :" + lastFed + "AM", 350,30)
    }

  drawSprites();
}



function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog () {
  doggy.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods (){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}




