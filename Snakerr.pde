/*

Special and creative aspects of the code :-
0) Hybrid of Frogger game and Snake game.
1) Player character is a Snake not a Frog. Snake food is seen as rotating coins.
2) Motion of a snake is complex as compared to frog as it's body is composed of parts.
3) Snake motion is different on land and when it is moving with a wooden log.
4) Created an animated mongoose NPC from scratch using CreateVertex
5) There are enemy snakes. When the player snake sits inside logs smaller than it's length,
it's tail is cut off - which is villainously attached to one of the enemy snakes
6) the game can be played at multiple speeds and at two difficulty levels.
*/

/*Author : Ameya Khandekar*/
/*ECE 4525 Project 2*/

/* @pjs preload="Grass Block.png"; */
/* @pjs preload="Stone Block.png"; */
/* @pjs preload="Water Block.png"; */


PImage aImg;

aImg = loadImage("Grass Block.png");

PImage bImg;

bImg = loadImage("Stone Block.png");

PImage cImg;

cImg = loadImage("Water Block.png");

var fps = 60;
void setup(){
  size( 400, 400 );
 // strokeWeight( 10 );
  frameRate( fps );
}


var currFrameCount = 0;

var gameOver = -1;

var keyQueue = function(){
    
    this.data = [];
    this.begIdx = 0;
    this.nextIdx = 0;
    this.prevCode = RIGHT;
};

keyQueue.prototype.isEmpty = function(){
    if(this.begIdx === this.nextIdx){
        return true;
    }
    else{
        return false;
    }
};

keyQueue.prototype.enqueue = function(code){
  if(this.prevCode === code){
      return;
  }
  this.prevCode = code;
  if(  this.nextIdx >= this.data.length){
      this.data.push(code);
      this.nextIdx++;
      return;
  }
  this.data[this.nextIdx] = code;
  this.nextIdx++;
};

keyQueue.prototype.dequeue = function(){  // do not dequeue without checking for emptyness first.
    var temp = this.data[this.begIdx];
    this.begIdx++;
    if(this.begIdx === this.nextIdx){
        this.data = [];
        this.begIdx = 0;
        this.nextIdx = 0;
    }
    
    return temp;
};

keyQueue.prototype.clear = function(){
    this.begIdx = 0;
    this.data = [];
    this.begIdx = 0;
    this.nextIdx = 0;
};

var keyQ = new keyQueue();





var snkStates = {
    RIGHT:0,
    LEFT:1,
    UP:2,
    DOWN:3
};

var snkColors0 = {
    R:0,
    G:0,
    B:0
};

var snkColors1 = {
    R:208,
    G:235,
    B:5
};

var snkColors2 = {
    R:224,
    G:33,
    B:33
};

var keyArray = [];


var gameSpeed = 1;
var gameSpeedCounter = 0;
var gameLevel = 1;
var gameScore = 0;

var helpPage = 0;


var foodObj = function(){
    this.x = 16*round(random(5,20));
    this.yArray = [12,28,380,396];
    this.yIdx = 3;
    this.y = this.yArray[this.yIdx];
    this.timer = 0;
    this.cR = round(random(1,255));
    this.cG = 0;
    this.cB = round(random(1,255));
};

foodObj.prototype.draw = function() {
    //if(this.timer%30 < 15){return;}
    noStroke();
    fill(this.cR, this.cG, this.cB);
    ellipse(this.x,this.y-4,this.timer%10,16);
};
foodObj.prototype.update = function(){
    this.timer++;
};

foodObj.prototype.newMeal = function(){
    this.x = 16*round(random(5,20));
    this.yArray = [12,28,380,396];
    
    this.yIdx = 2*((floor(this.yIdx/2)+1)%2) + round(random(0,1));
    
    this.y = this.yArray[this.yIdx];
    this.cR = round(random(1,255));
    this.cB = round(random(1,255));
};

var food = new foodObj();

var snakePart = function(x,y,col,state){
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.state = state;
    this.prevState = state;
    this.speed = 16;
    this.timer = 0;
    this.col = col;
};  

snakePart.prototype.draw = function() {
    
    pushMatrix();
    translate(this.x,this.y);
    rotate(radians(this.angle));
    if(this.col === 0){
        fill(snkColors0.R, snkColors0.G, snkColors0.B);
    }
    else{
        if(this.y < 368 && this.y > 224){
            fill(snkColors2.R, snkColors2.G, snkColors2.B);
        }
        else{
            fill(snkColors1.R,snkColors1.G,snkColors1.B);
        }
    }
    
    if(this.state !== snkStates.LEFT && this.prevState === this.state){
    
        rect(-4, -4,12,4);
        rect(-8,0,12,4);    
        
    }
    else if (this.state !== snkStates.LEFT && this.prevState !== this.state){
        rect(-4,-4,4,4);//,15);
        rect(0, -4,8,4);
        rect(-4,0,8,4);    
        
    }
    else if(this.state === snkStates.LEFT && this.prevState === this.state){
        rect(-8, -4,12,4);
        rect(-4,0,12,4);    
    }
    else if(this.state === snkStates.LEFT && this.prevState !== this.state){
        rect(-4,-4,4,4);//,15);
        rect(-8, -4,12,4);
        rect(-4,0,8,4);
    }
    popMatrix();
};

snakePart.prototype.update = function(x,y) {
    this.x = x;
    this.y = y;
    if(this.prevState !== this.state){
        this.timer++;
    }
    if(this.timer === 1)
    {
        this.timer = 0;
        this.prevState = this.state;
    }

};

snakePart.prototype.changeSpeed = function(s){
    this.speed = s;
    println("changing snakePart speed " + this.speed);

};

snakePart.prototype.changeState = function(newState){
     switch(newState){
        case snkStates.RIGHT:
            if(this.state !== snkStates.LEFT){
                this.angle = 0;
                this.state = snkStates.RIGHT;
            }
            break;
        case snkStates.DOWN:
            if(this.state !== snkStates.UP){
                this.angle = 90;
                this.state = snkStates.DOWN;
            }
            break;
        case snkStates.LEFT:
            if(this.state !== snkStates.RIGHT){
                this.angle = 0;
                this.state = snkStates.LEFT;
            }
            break;
        case snkStates.UP:
            if(this.state !== snkStates.DOWN){
                this.angle = 270;
                this.state = snkStates.UP;

            }
            break;

    }
};

var snakeHead = function(x,y,col){
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.state = 0;
    this.timer = 0;
    this.prevState = 0;
    this.speed = 16;
    this.col = col;
};

snakeHead.prototype.draw = function() {
    
    pushMatrix();
    
    translate(this.x, this.y);
    
    rotate(radians(this.angle));
    if(this.col === 0){
        if(this.y < 368 && this.y > 224){
            fill(snkColors2.R, snkColors2.G, snkColors2.B);
        }
        else{
            fill(snkColors1.R,snkColors1.G,snkColors1.B);
        }
    }
    else{
        fill(0,0,0);
    }
    if(this.state !== snkStates.LEFT){
        rect(-4, -4,4,4);
        rect(4, -4, 4,4);
        rect(0, -8, 4,4);               
        rect(-8, 0,20,4);
        rect(8, -4,4,4);
    }
    else{
        rect(0, -4,4,4);
        rect(-8, -4, 4,4);
        rect(-4, -8, 4,4);               
        rect(-12, 0,20,4);
        rect(-12, -4,4,4);
    }
    popMatrix();
};

snakeHead.prototype.changeSpeed = function(s){
    this.speed = s;
    println("changing snakeHead speed :- " + this.speed);
};


snakeHead.prototype.update = function(){

  switch(this.state){
    case snkStates.RIGHT:
        this.x += this.speed;
        if(this.x > 400){
            this.x = 0;
        }
        break;
    case snkStates.DOWN:
        this.y += this.speed;
        if(this.y > 400){
            this.y = 0;
        }
        break;
    case snkStates.LEFT:
        this.x -= this.speed;
        if(this.x < 0){
            this.x = 400;
        }
        break;
    case snkStates.UP:
        this.y -= this.speed;
        if(this.y < 0){
            this.y = 400;
        }
        break;

  }

};


snakeHead.prototype.changeState0 = function(state){
    switch(state){
        case snkStates.RIGHT:
            if(this.state !== snkStates.LEFT){
                this.angle = 0;
                this.state = snkStates.RIGHT;
            }
            break;
        case snkStates.DOWN:
            if(this.state !== snkStates.UP){
                this.angle = 90;
                this.state = snkStates.DOWN;
            }
            break;
        case snkStates.LEFT:
            if(this.state !== snkStates.RIGHT){
                this.angle = 0;
                this.state = snkStates.LEFT;
            }
            break;
        case snkStates.UP:
            if(this.state !== snkStates.DOWN){
                this.angle = 270;
                this.state = snkStates.UP;

            }
            break;

    }
};

snakeHead.prototype.changeState = function(code){

     switch(code){
        case RIGHT:
            if(this.state !== snkStates.LEFT){
                this.angle = 0;
                this.state = snkStates.RIGHT;
            }
            break;
        case DOWN:
            if(this.state !== snkStates.UP){
                this.angle = 90;
                this.state = snkStates.DOWN;
            }
            break;
        case LEFT:
            if(this.state !== snkStates.RIGHT){
                this.angle = 0;
                this.state = snkStates.LEFT;
            }
            break;
        case UP:
            if(this.state !== snkStates.DOWN){
                this.angle = 270;
                this.state = snkStates.UP;

            }
            break;

    }
};



var mongoose = function(x,y){
    this.x = x;
    this.y = y;
     this.scale = 0.35;
    this.translateScale = (1/this.scale) - 1;
    this.opacity = 255;
    this.animFlag = 0;
    this.timer = 0;
};

mongoose.prototype.draw = function() {
fill(153, 97, 44);
if(this.animFlag === 0){

    
pushMatrix();
beginShape();
noStroke();
translate(this.x-17,this.y+3);
scale(this.scale);

rotate(radians(-10));
curveVertex(0,0);
curveVertex(0, 2);
curveVertex(-8, 5);
curveVertex(-26, 19);
curveVertex(-10, 21);
curveVertex(8, 9);
curveVertex(15, 7);
curveVertex( 10, - 1);
curveVertex(16,  6);
endShape();    
popMatrix();    

pushMatrix();
beginShape();
noStroke();
translate(this.x+15,this.y+5);
scale(this.scale);

rotate(radians(-5));
curveVertex(0,0);
curveVertex(0, 2);
curveVertex(-8, 5);
curveVertex(-26, 19);
curveVertex(-10, 21);
curveVertex(8, 9);
curveVertex(15, 7);
curveVertex( 10, - 1);
curveVertex(16,  6);
endShape();    
popMatrix();    
    


pushMatrix();
scale(this.scale);
translate( this.translateScale*this.x, this.translateScale*this.y);
noStroke();





beginShape();
    
curveVertex(this.x  - 116, this.y - 18);
curveVertex(this.x  - 105, this.y - 29);
curveVertex(this.x  - 89, this.y - 41);
curveVertex(this.x  - 72, this.y - 41);
curveVertex(this.x  - 55, this.y - 35);
curveVertex(this.x  - 42, this.y - 30);
curveVertex(this.x  - 16, this.y - 26);
curveVertex(this.x  - 8, this.y - 27);
curveVertex(this.x  + 8, this.y - 34);
curveVertex(this.x  + 26, this.y - 37);
curveVertex(this.x  + 45, this.y - 37);
curveVertex(this.x  + 59, this.y - 32);
curveVertex(this.x  + 72, this.y - 26);
curveVertex(this.x  + 87, this.y - 16);
curveVertex(this.x  + 98, this.y - 3);

curveVertex(this.x  + 105, this.y + 16);
curveVertex(this.x  + 101, this.y + 34);
curveVertex(this.x  + 90, this.y + 49);
curveVertex(this.x  + 82, this.y + 56);
curveVertex(this.x  + 70, this.y + 63);
curveVertex(this.x  + 60, this.y + 63);
curveVertex(this.x  + 70, this.y + 52);
curveVertex(this.x  + 82, this.y + 24);

curveVertex(this.x  + 76, this.y + 15);

curveVertex(this.x  + 72, this.y + 24);
curveVertex(this.x  + 68, this.y + 33);
curveVertex(this.x  + 65, this.y + 44);
curveVertex(this.x  + 51, this.y + 51);
curveVertex(this.x  + 42, this.y + 47);
curveVertex(this.x  + 50, this.y + 42);
curveVertex(this.x  + 57, this.y + 37);
curveVertex(this.x  + 51, this.y + 30);
curveVertex(this.x  + 44, this.y + 24);
curveVertex(this.x  + 32, this.y + 23);
curveVertex(this.x  + 14, this.y + 20);
curveVertex(this.x  - 16, this.y + 14);
curveVertex(this.x  - 19, this.y + 18);
curveVertex(this.x  - 17, this.y + 24);
curveVertex(this.x  - 14, this.y + 30);
curveVertex(this.x  - 13, this.y + 35);
curveVertex(this.x  - 13, this.y + 39);
curveVertex(this.x  - 22, this.y + 46);




curveVertex(this.x  - 27, this.y + 25);
curveVertex(this.x  - 28, this.y + 23);
curveVertex(this.x  - 26, this.y + 25);


curveVertex(this.x  - 42, this.y + 12);
curveVertex(this.x  - 48, this.y + 5);
curveVertex(this.x  - 55, this.y - 4);
curveVertex(this.x  - 71, this.y - 9);
curveVertex(this.x  - 84, this.y - 10);
curveVertex(this.x  - 95, this.y - 12);
curveVertex(this.x  - 104, this.y - 15);
curveVertex(this.x  - 113, this.y - 20);
curveVertex(this.x  - 102, this.y - 29);

endShape();





fill(0,0,0,this.opacity);
ellipse(this.x - 109, this.y - 20, 5,5);
ellipse(this.x - 90, this.y - 28 , 5,4);    
fill(204, 152, 102);
ellipse(this.x - 90, this.y - 28 , 2,2);    


stroke(0,0,0,this.opacity);
strokeWeight(2);

arc(this.x + 31, this.y + -27,18,39,radians(-4),radians(75));
arc(this.x + 19, this.y + -27,18,39,radians(-4),radians(75));
arc(this.x + 7, this.y + -27,18,39,radians(-4),radians(75));

popMatrix();


}
    
else{

pushMatrix();
translate(0,-2);

pushMatrix();
beginShape();
noStroke();

translate(this.x-10,this.y+4);
scale(this.scale);

rotate(radians(-75));
curveVertex(0,0);
curveVertex(0, 2);
curveVertex(-8, 5);
curveVertex(-26, 19);
curveVertex(-10, 21);
curveVertex(8, 9);
curveVertex(15, 7);
curveVertex( 10, - 1);
curveVertex(16,  6);
endShape();    
popMatrix();    

pushMatrix();
beginShape();
noStroke();

translate(this.x+22,this.y+5);
scale(this.scale);

rotate(radians(-87));
curveVertex(0,0);
curveVertex(0, 2);
curveVertex(-8, 5);
curveVertex(-26, 19);
curveVertex(-10, 21);
curveVertex(8, 9);
curveVertex(15, 7);
curveVertex( 10, - 1);
curveVertex(16,  6);
endShape();    
popMatrix(); 


    
pushMatrix();
scale(this.scale);
translate( this.translateScale*this.x, this.translateScale*this.y);
noStroke();
fill(153, 97, 44,this.opacity);



beginShape();
    
curveVertex(this.x  - 116, this.y - 18);
curveVertex(this.x  - 105, this.y - 29);
curveVertex(this.x  - 89, this.y - 41);
curveVertex(this.x  - 72, this.y - 41);
curveVertex(this.x  - 55, this.y - 35);
curveVertex(this.x  - 42, this.y - 30);
curveVertex(this.x  - 16, this.y - 26);
curveVertex(this.x  - 8, this.y - 27);
curveVertex(this.x  + 8, this.y - 34);
curveVertex(this.x  + 26, this.y - 37);
curveVertex(this.x  + 45, this.y - 37);
curveVertex(this.x  + 59, this.y - 32);
curveVertex(this.x  + 72, this.y - 26);
curveVertex(this.x  + 87, this.y - 16);
curveVertex(this.x  + 98, this.y - 3);
curveVertex(this.x  + 105, this.y + 16);
curveVertex(this.x  + 101, this.y + 34);
curveVertex(this.x  + 90, this.y + 49);
curveVertex(this.x  + 82, this.y + 56);
curveVertex(this.x  + 70, this.y + 63);
curveVertex(this.x  + 60, this.y + 63);
curveVertex(this.x  + 70, this.y + 52);
curveVertex(this.x  + 79, this.y + 39);
curveVertex(this.x  + 83, this.y + 31);
curveVertex(this.x  + 85, this.y + 16);
curveVertex(this.x  + 82, this.y + 6);
curveVertex(this.x  + 80, this.y + 2);
curveVertex(this.x  + 76, this.y + 15);
curveVertex(this.x  + 70, this.y + 24);

curveVertex(this.x  + 65, this.y + 48);
curveVertex(this.x  + 51, this.y + 51);


curveVertex(this.x  + 54, this.y + 43);
curveVertex(this.x  + 56, this.y + 30);
curveVertex(this.x  + 44, this.y + 24);
curveVertex(this.x  + 36, this.y + 23);
curveVertex(this.x  + 14, this.y + 20);
curveVertex(this.x  - 23, this.y + 15);
curveVertex(this.x  - 34, this.y + 39);
curveVertex(this.x  - 47, this.y + 40);
curveVertex(this.x  - 41, this.y + 27);
curveVertex(this.x  - 42, this.y + 12);
curveVertex(this.x  - 48, this.y + 5);
curveVertex(this.x  - 55, this.y - 4);
curveVertex(this.x  - 71, this.y - 9);
curveVertex(this.x  - 84, this.y - 10);
curveVertex(this.x  - 95, this.y - 12);
curveVertex(this.x  - 104, this.y - 15);
curveVertex(this.x  - 113, this.y - 20);
curveVertex(this.x  - 102, this.y - 29);

endShape();





fill(0,0,0,this.opacity);
ellipse(this.x - 109, this.y - 20, 5,5);
ellipse(this.x - 90, this.y - 28 , 5,4);    
fill(204, 152, 102);
ellipse(this.x - 90, this.y - 28 , 2,2);    


stroke(0,0,0,this.opacity);
strokeWeight(2);

arc(this.x + 31, this.y + -27,18,39,radians(-4),radians(75));
arc(this.x + 19, this.y + -27,18,39,radians(-4),radians(75));
arc(this.x + 7, this.y + -27,18,39,radians(-4),radians(75));

popMatrix();

popMatrix();

}

    
};

var riki = new mongoose(200,280);

var woodLog = function(x,y,l,s){
    this.x = x;
    this.y = y;
    this.length = l;
    this.snkLength = floor((l - 20)/16);
    this.speed = s;
    this.spotsX = [];
    this.spotsY = [];
    
    this.spotrX = [];
    this.spotrY = [];
    
    for(var i = 0 ; i < this.length/5 ; i++){
        this.spotsX.push(round(random(1,this.length-10)));
        this.spotsY.push(round(random(-12,12)));
        this.spotrX.push(round(random(-2,2)));
        this.spotrY.push(round(random(-2,2)));

    }
};

woodLog.prototype.draw = function() {
    fill(204, 152, 102);
    noStroke();
    rect(this.x,this.y - 14,this.length,28,5);
    ellipse(this.x+2,this.y,9,20);
    fill(255,255,255);
    ellipse(this.x+this.length-3,this.y,5,30);
    fill(204,152,102);
    ellipse(this.x+this.length-3,this.y,3,22);
    fill(217, 181, 147);
    for(var i = 0 ; i < this.spotsX.length ; i++){
        stroke(217, 181, 147);
        strokeWeight(2);
        line(this.x+this.spotsX[i],this.y+this.spotsY[i],this.x+this.spotsX[i]+this.spotrX[i],this.y+this.spotsY[i]+this.spotrY[i]);
    }
    noStroke();
};

woodLog.prototype.update = function(){
    this.x = this.x + this.speed;
    if(this.x > 500){
        this.x = -100;
    }
    if(this.x < -100){
        this.x = 500;
    }
};

var wlogs = [];
wlogs.push(new woodLog(200,176,100,2));
wlogs.push(new woodLog(70,176,100,2));
wlogs.push(new woodLog(320,176,80,2));
wlogs.push(new woodLog(225,112,100,-3));
wlogs.push(new woodLog(100,112,100,-3));
wlogs.push(new woodLog(0,80,120,1));
wlogs.push(new woodLog(30,48,70,-2));
wlogs.push(new woodLog(150,48,200,-2));
wlogs.push(new woodLog(130,80,200,1));
wlogs.push(new woodLog(300,144,140,1));
wlogs.push(new woodLog(100,144,140,1));


var snakeObj = function(x,y){
    this.x = x;
    this.y = y;
    this.head = new snakeHead(this.x,this.y,0);
    this.timer = 0;
    this.speed = 16;
    this.glideSpeed = 0;
    this.glideFlag  = 0;
    this.state = 0;
    this.body = [];
    this.body.push(new snakePart(this.x-16,this.y,0,0));
    this.body.push(new snakePart(this.x-32,this.y,1,0));
    this.body.push(new snakePart(this.x-48,this.y,0,0));
    this.body.push(new snakePart(this.x-64,this.y,1,0));
/*    //
        this.body.push(new snakePart(this.x-80,this.y,0,0));
    this.body.push(new snakePart(this.x-96,this.y,1,0));
    this.body.push(new snakePart(this.x-112,this.y,0,0));
    this.body.push(new snakePart(this.x-128,this.y,1,0));*/


    this.stop = 0;
    this.isInside = 0;
    this.logIdx = 0;
    
    this.outSideTimer = 0;
    this.gameOverAnimateCounter = 0;
    
};

snakeObj.prototype.draw = function() {
    //gameOver animation handling
    if(gameOver === 1){
        this.gameOverAnimateCounter++;
    }
    
    if(this.gameOverAnimateCounter === 90){
        gameOver = 2;
        this.gameOverAnimateCounter = 0;
    }
    
    if(gameOver ===1 && this.gameOverAnimateCounter % 6 < 3){
        return;
    }
    
    
    
    this.head.draw();
    for(var i = 0 ; i < this.body.length ; i++){
        this.body[i].draw();
    }
};
var snake1 = new snakeObj(80,380);
////var snake1 = new snakeObj(80,28);

var killerSnakeObj  = function(x,y){
    this.x = x;
    this.y = y;
    this.head = new snakeHead(this.x,this.y,1);
    this.timer = 0;
    this.speed = 16;
    this.state = 0;
    this.body = [];
    this.body.push(new snakePart(this.x-16,this.y,0,0));
    this.body.push(new snakePart(this.x-32,this.y,0,0));
};

killerSnakeObj.prototype.draw = function() {

    this.head.draw();
    for(var i = 0 ; i < this.body.length ; i++){
        this.body[i].draw();
    }
};

killerSnakeObj.prototype.pushBack = function(){
this.body.push(new snakePart(this.body[this.body.length - 1].x,this.body[this.body.length - 1].y,0,this.head.state));
};


var killerSnakes = function(){

    this.data = [];
    this.data.push(new killerSnakeObj(300,332));
    this.data.push(new killerSnakeObj(100,252));
    this.nextGrowId = 0;
};
killerSnakes.prototype.grow = function(amt){
    for(var i = 0 ; i < amt ; i++){
        this.data[this.nextGrowId].pushBack(); 
    }
    this.nextGrowId = (this.nextGrowId+1)%2;
};

var enemySnakes = new killerSnakes();

snakeObj.prototype.cutTail = function(l){
        this.body.splice(this.body.length - l,l);
};

snakeObj.prototype.jump = function(x){
    this.head.x = x;
    for(var i = 0 ; i < this.body.length ; i++){
        this.body[i].x = x - (i+1)*16;
        this.body[i].y = this.head.y;
        this.body[i].state  = this.head.state;
        this.body[i].prevState = this.head.state;
    }
};

snakeObj.prototype.changeState = function(){
    this.head.changeState();

};

snakeObj.prototype.toggleMovement = function(){
    this.stop = (this.stop+1)%2;
};

snakeObj.prototype.changeSpeed = function(s){
    this.speed = s;
    this.head.changeSpeed(s);
    for(var i = 0; i < this.body.length; i++){
        this.body[i].changeSpeed(s);
    }
};

snakeObj.prototype.glide = function(s){
    this.glideSpeed = s;
    this.glideFlag = (this.glideFlag + 1)%2;
};

snakeObj.prototype.checkBite = function(){
  for(var i = 0 ; i < this.body.length ; i++){
    if(this.head.x === this.body[i].x && this.head.y === this.body[i].y){
        gameOver = 1;
        return;
    }
  }  
  if(this.head.y > 32 && this.head.y < 192 ){
      for(var idx = 0 ; idx < wlogs.length ; idx++){
         if(this.head.y < wlogs[idx].y + 14 && this.head.y > wlogs[idx].y - 14                                && this.head.x > wlogs[idx].x && this.head.x < wlogs[idx].x + wlogs[idx].length){
             this.outSideTimer = 0;
             return;
         }
      }
      this.outSideTimer++;
      if(this.outSideTimer === 3){
        this.outSideTimer = 0;
        gameOver = 1;
      }
  }
  //collide with borders check
  //println("reached "+this.head.x);
  if( ((this.head.x <= 0 || this.head.x >= 400) && gameLevel === 1) || this.head.y <= 0 || this.head.y >= 400){
      gameOver = 1;
  }
  //collide with mongoose check
  if(this.head.x > riki.x - 42 && this.head.x < riki.x + 38 &&                                             this.head.y > riki.y - 14 && this.head.y < riki.y + 16 ){
      gameOver = 1;
  }
  //rect(this.x-42,this.y-14,80,30);
  
  
  //bite with enemy snakes check :-
  for(var j = 0 ; j < enemySnakes.data.length ; j++){
      if(this.head.x < enemySnakes.data[j].head.x + 10 && this.head.x > enemySnakes.data[j].head.x - 10 && this.head.y < enemySnakes.data[j].head.y + 10 && this.head.y > enemySnakes.data[j].head.y - 10  ){
            gameOver = 1;
      }
      for(var idx = 0; idx < enemySnakes.data[j].body.length ; idx++){
        if(this.head.x < enemySnakes.data[j].body[idx].x + 10 && this.head.x > enemySnakes.data[j].body[idx].x - 10 && this.head.y < enemySnakes.data[j].body[idx].y + 10 && this.head.y > enemySnakes.data[j].body[idx].y - 10  ){
            gameOver = 1;
        }
    }
    
  }

};

snakeObj.prototype.checkLogIn = function(){
   if(this.isInside === 1 && (this.head.state === snkStates.DOWN || this.head.state === snkStates.UP)){
       this.isInside = 0;
   }
    else if(this.isInside === 1 && (this.head.state === snkStates.RIGHT || this.head.state === snkStates.LEFT)){
        return;
    }
    if(this.head.state === snkStates.RIGHT || this.head.state === snkStates.LEFT){// || this.state === snkStates.RIGHT){
        for(var idx = 0 ; idx < wlogs.length ; idx++){
            if(this.head.y < wlogs[idx].y + 14 && this.head.y > wlogs[idx].y - 14                                && this.head.x > wlogs[idx].x && this.head.x < wlogs[idx].x + wlogs[idx].length){

                this.isInside = 1;
                this.logIdx = idx;
                
                if(wlogs[idx].snkLength < this.body.length){

                   var cutLength = this.body.length - wlogs[idx].snkLength;
                    this.cutTail(cutLength);
                    enemySnakes.grow(cutLength);
                }
                
                //println("inside");
                return;
            }
        }
    }
};
snakeObj.prototype.checkFood = function(){

if(abs(this.head.x - food.x) < 8 && abs(this.head.y - food.y) < 8){
        this.body.push(new snakePart(this.body[this.body.length - 1].x,this.body[this.body.length - 1].y,(this.body.length)%2,this.head.state));
        food.newMeal();
        gameScore++;
    }
 
};
snakeObj.prototype.update = function(){
    
    if(gameOver === 1){
        return;
    }
    
    this.checkBite();
    this.checkLogIn();
    
    if(this.isInside === 1 ){
        
        if(this.head.state === snkStates.RIGHT){
            this.head.x = wlogs[this.logIdx].x + wlogs[this.logIdx].length - 12;
        }
        else if(this.head.state === snkStates.LEFT){
            this.head.x = wlogs[this.logIdx].x + 12;
        }
        for(var i = 0 ; i < this.body.length ; i++){
            if(this.head.state === snkStates.RIGHT){
                this.body[i].x = this.head.x - (i+1)*16;
            }
            else if(this.head.state === snkStates.LEFT){
                this.body[i].x = this.head.x + (i+1)*16;
            }
            this.body[i].y = this.head.y;
            this.body[i].angle = this.head.angle;
            this.body[i].state  = this.head.state;
            this.body[i].prevState = this.head.state;
        }
        if(!keyQ.isEmpty()){
            var tempCode = keyQ.dequeue();
            if(tempCode !== LEFT && tempCode !== RIGHT){
                this.head.changeState(tempCode);
            }
        }

        return;

    }
    

    this.timer++;
    if(this.timer % this.speed !== 0){
        return;
    }
    
    if(!keyQ.isEmpty()){
        this.head.changeState(keyQ.dequeue());
    }
    
    
    for(var i = this.body.length - 1 ; i >= 0 ; i--){
        if(i > 0){
            this.body[i].update(this.body[i-1].x,this.body[i-1].y);
            this.body[i].changeState(this.body[i-1].state);
        }
        else{
            this.body[i].update(this.head.x,this.head.y);
            this.body[i].changeState(this.head.state);

        }
    }
    this.head.update();
    
    this.checkFood();
};


killerSnakeObj.prototype.update = function(){
    this.timer++;
    if(this.timer % this.speed !== 0){// && this.speed === 16){
        return;
    }
   for(var i = this.body.length - 1 ; i >= 0 ; i--){
        if(i > 0){
            this.body[i].update(this.body[i-1].x,this.body[i-1].y);
        }
        else{
            this.body[i].update(this.head.x,this.head.y);

        }
    }
    this.head.update();
    
    //check bite :- 
    if(this.head.x < snake1.head.x + 10 && this.head.x > snake1.head.x - 10 &&                    this.head.y < snake1.head.y + 10 && this.head.y > snake1.head.y - 10  ){
            gameOver = 1;
        }
    for(var idx = 0; idx < snake1.body.length ; idx++){
        if(this.head.x < snake1.body[idx].x + 10 && this.head.x > snake1.body[idx].x - 10 &&                    this.head.y < snake1.body[idx].y + 10 && this.head.y > snake1.body[idx].y - 10  ){
            gameOver = 1;
        }
    }
    
};



var backDrop = function(){
    
};
backDrop.draw = function() {

    noStroke();

    stroke(255, 0, 0);
    for(var i = 0 ; i < 10 ; i++){
            image(aImg,40*i,172,40,52);
    }
    for(var i = 0 ; i < 10 ; i++){
        for(var j = 0 ; j < 5; j++){
            image(cImg,40*i,32*j,40,64);
        }
    }
    for(var i = 0 ; i < 10 ; i++){
        image(aImg,40*i,-20,40,52);
    }
        for(var i = 0 ; i < 10 ; i++){
        image(aImg,40*i,348,40,52);
    }
    for(var i = 0 ; i < 10 ; i++){
        for(var j = 0 ; j < 4; j++){
            image(bImg,40*i,32*j + 204,40,67);
        }
    }


    noStroke();

   /* fill(55, 111, 38);
    rect(0,0,400,40);
    fill(0, 1, 178);
    rect(0,40,400,120);
    fill(121,5,120);
    rect(0,160,400,40);
    fill(0,0,0);
    rect(0,200,400,120);
    fill(121,5,120);
    rect(0,320,400,40);
    fill(0,0,0);
    rect(0,360,400,40);
    */
};


mongoose.prototype.update = function(){
    this.timer++;
    if(this.timer % 16 !== 0){
        return;
    }
    this.x = this.x - 16;
    if(this.x < -10){
        this.x = 420;
    }
    this.animFlag = (this.animFlag + 1)%2;
    for(var idx = 0; idx < snake1.body.length ; idx++){
        if(this.x-42 < snake1.body[idx].x + 10 && this.x-42 > snake1.body[idx].x - 10 &&                                 this.y -10 < snake1.body[idx].y + 10 && this.y-10 > snake1.body[idx].y - 10  ){
            gameOver = 1;
        }
    }


};


killerSnakes.prototype.draw = function() {
       for(var snkId = 0 ; snkId < this.data.length ; snkId++){
            this.data[snkId].draw();
            //killerSnakes[snkId].update();
        }
};
killerSnakes.prototype.update = function() {
       for(var snkId = 0 ; snkId < this.data.length ; snkId++){
            this.data[snkId].update();
            //killerSnakes[snkId].update();
        }
};


var startScreenSnake = new snakeObj(140,80);

startScreenSnake.update = function(){
    this.timer++;
    if(this.timer % this.speed !== 0){// && this.speed === 16){
        return;
    }
   for(var i = this.body.length - 1 ; i >= 0 ; i--){
        if(i > 0){
            this.body[i].update(this.body[i-1].x,this.body[i-1].y);
            this.body[i].changeState(this.body[i-1].state);

        }
        else{
            this.body[i].update(this.head.x,this.head.y);
            this.body[i].changeState(this.head.state);

        }
    }
    this.head.update();
    //println(this.head.x);
    switch(this.head.state){
        case snkStates.RIGHT:
            if(this.head.x > 330){
               // println("reached");
                //this.angle = 0;
                this.head.changeState0(snkStates.DOWN);
            }
            break;
        case snkStates.DOWN:
            if(this.head.y > 330){
               // println("reached");
                //this.angle = 0;
                this.head.changeState0(snkStates.LEFT);
            }
            break;
        case snkStates.LEFT:
            if(this.head.x < 80){
               // println("reached");
                //this.angle = 0;
                this.head.changeState0(snkStates.UP);
            }
            break;
        case snkStates.UP:
            if(this.head.y < 80){
               // println("reached");
                //this.angle = 0;
                this.head.changeState0(snkStates.RIGHT);
            }
            break;
    }
    
};

var startScreenManager = function(){
    if(gameOver === 2){
        fill(19, 209, 161);
        rect(50,50,300,300,15);
        fill(16, 67, 222);
        rect(100,100,200,50,5);
        fill(23, 214, 52);
        textFont(createFont("monospace"),30);
        fill(0,0,0);
        text("GAME OVER!!",114,260,200,100);
        textFont(createFont("monospace"),30);
        fill(23, 214, 52);
        text("START MENU",110,112,200,50);

    }
    else if(gameOver === -2){
        //recreate game objects if game Over.
        snake1 = new snakeObj(50,380);
        enemySnakes = new killerSnakes();
        food = new foodObj();
        keyQ.clear();
        gameScore = 0;
        gameOver = -1;
    }
    else if(gameOver === -1){
        fill(19, 209, 161);
        rect(50,50,300,300,15);
        fill(16, 67, 222);
        rect(100,100,200,50,5);
        rect(100,160,200,50,5);
        rect(100,220,200,50,5);
        fill(23, 214, 52);
        textFont(createFont("monospace"),30);
        text("START",154,112,100,50);
        text("OPTIONS",144,172,120,50);
        text("HELP",154,232,100,50);
        fill(255, 102, 0);
        text("Snakerr",134,272,120,50);
        textFont(createFont("monospace"),15);
        fill(255,0,0);
        text("Frogger with a Snake !!",104,302,220,40);
        startScreenSnake.draw();
        startScreenSnake.update();

    }
    
    else if(gameOver === -3){
        fill(19, 209, 161);
        rect(50,50,300,300,15);
        fill(16, 67, 222);
        rect(100,100,200,50,5);
        rect(100,160,200,40,5);
        rect(100,210,200,40,5);
        //rect(100,260,200,40,5);
        fill(23, 214, 52);
        textFont(createFont("monospace"),30);
        text("START MENU",114,112,200,50);
        textFont(createFont("monospace"),25);

        text("SPEED = ",114,162,200,50);
        text(gameSpeed,234,162,200,50);
        if(gameLevel === 0){
            text("EASY",154,217,200,50);
        }
        else{
            text("DIFFICULT",114,217,200,50);

        }
        fill(28, 103, 232);
        text("Snakerr",134,292,120,50);
        textFont(createFont("monospace"),15);
        fill(255,0,0);
        text("Frogger with a Snake !!",104,322,220,40);
        startScreenSnake.draw();
        startScreenSnake.update();
    }
    else if(gameOver === -4){
        fill(19, 209, 161);
        rect(50,50,300,300,15);
        fill(16, 67, 222);
        rect(100,100,200,50,5);
        fill(219, 13, 219);
        rect(315,320,35,30,12);
       // rect(100,160,200,40,5);
       // rect(100,210,200,40,5);
        //rect(100,260,200,40,5);
        fill(23, 214, 52);
        textFont(createFont("monospace"),30);
        text("START MENU",114,112,200,50);
        textFont(createFont("monospace"),25);

        if(helpPage === 0){
            text("->",318,330,40,40);
        }
        else{
            text("<-",318,330,40,40);

        }
        fill(0,0,0);
        textFont(createFont("monospace"),15);

        if(helpPage === 0){
            text("The player controls the multi- ",55,160,280,40);
            text("colored snake using the arrow ",55,180,280,40);
            text("keys. Mongoosse & other snakes ",55,200,280,40);
            text("kill on contact. Use logs in upper half to cross river. As",55,220,280,40);
            text(" snake can't survive in water",55,255,280,40);
            text("for long. To SIT on wooden log ",55,275,280,40);
            text("press RIGHT or LEFT arrow  ",55,295,280,40);
            text("when snakehead is inside log. ",55,315,280,40);



        }
        else{
            text("use SHIFT key for PAUSING the game.",55,60,280,40);
            text("To exit woodenLog move UP or",55,160,280,40);
            text("down. Grow snake by eating ",55,180,280,40);
            text("food which appears on top .",55,200,280,40);
            text("and bottom of the screen .",55,220,280,40);
            text(" If you use logs smaller than",55,240,280,40);
            text("snake,it's tail gets cut off",55,260,280,40);
            text("which becomes food for enemy snakes. In EASY mode Snake can",55,280,280,40);
            text("move through left/right ",55,315,280,40);
            text("screen borders. ENJOY!! ",55,335,280,40);

        }
        
        
        
    }
};

var pauseState = 0;
void keyPressed(){
  keyQ.enqueue(keyCode);
};

void keyReleased(){
    keyArray[keyCode] = 0;
};

void mouseClicked(){
    if(mouseX < 300 && mouseX > 100 && mouseY < 150 && mouseY > 100){
        if(gameOver === -1){
            gameOver = 0;
        }
        else if(gameOver === 2){
            gameOver = -2;
        }
        else if(gameOver === -3){
            gameOver = -1;
        }
        else if(gameOver === -4){
            gameOver = -1;
        }
    }
    else if(mouseX < 300 && mouseX > 100 && mouseY < 210 && mouseY > 160){
       if(gameOver === -1){
            gameOver = -3;
        }    
        else if(gameOver === -3){
            gameSpeed--;
            gameSpeed = (gameSpeed + 1)%3;
            gameSpeed++;
        }
     
    }
    
    else if(mouseX < 300 && mouseX > 100 && mouseY < 260 && mouseY > 210){
      if(gameOver === -3){
           gameLevel = (gameLevel + 1)%2;
        }
      else if(gameOver === -1){
           gameOver = -4;
      }
    }
    else if(mouseX < 350 && mouseX > 300 && mouseY < 350 && mouseY > 320){
      if(gameOver === -4){
           helpPage = (helpPage + 1)%2;
        }
    }

    
};
void draw() {

    gameSpeedCounter++;
    if(gameSpeed !== 3 && gameSpeedCounter % (3 - gameSpeed + 1) !== 0){
        return;
    }
    if(gameSpeedCounter === 300000){
        gameSpeedCounter = 0;
    }
    var linX = 235;
    background(255,255,255);
    backDrop.draw();    

    if(gameOver === 0 || gameOver === 1){
        
        if(pauseState === 1){
            fill(20, 204, 173,120);
            rect(100,150,200,100,25);
            textFont("monospace",40);
            fill(27, 20, 222,180);
            text("PAUSED",120,180,200,100);
            return;
        }
        
        for(var idx = 0 ; idx < wlogs.length ; idx++){
            wlogs[idx].draw();
            wlogs[idx].update();
        }
   
        snake1.draw();
        enemySnakes.draw();
   
        riki.draw();
        food.draw();
        food.update();
        
        if(gameOver === 0){
            snake1.update();
            enemySnakes.update();
            riki.update();
        }
        
        
        
    }
    
    
    
    startScreenManager();
    fill(0, 255, 191,120);
    rect(0,380,80,30,10);
    fill(0,0,0,200);
    
    textFont(createFont("monospace"),15);

    text("Score "+gameScore,2,395);
};
