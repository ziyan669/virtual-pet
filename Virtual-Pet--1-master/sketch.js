//Create variables here
var dog, happyDog, database, food, foodStock, Dog
function preload()
{
  Dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,420);
  dog.addImage(Dog);
  dog.scale=0.2

  foodStock=database.ref('food');
  foodStock.on("value",readStock)

  
}
 

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDog);
  }
  drawSprites();
  fill(255);
  text("food remaining"+food,170,200);
  textSize(13);
  text("note:press the up arrow to fedd the dog",100,100);

  //add styles here
}

function readStock(data){
  food=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

