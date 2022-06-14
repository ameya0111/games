var fps = 60;
void setup(){
  size( 400, 400 );
  strokeWeight( 10 );
  frameRate( fps );
}


var gameState = 0;  // for start screen, end screen, game screen

var keyArray = [];

var shipAlive = 1;

var explodingCircle = function(x,y){ // for big bombs exploding
  
  this.rad = 5 ; 
  this.x = x;
  this.y = y;

  this.cRp = [];
  this.cGp = [];
  this.cBp = [];

    for(var i = 0; i < 12 ; i++){
        this.cRp.push(round(random(1,255)));
        this.cGp.push(round(random(1,255)));
        this.cBp.push(round(random(1,255)));
    }

};
explodingCircle.prototype.draw = function(){
    for(var i = 0 ; i < 12 ; i++){
        strokeWeight(3);
        fill(this.cRp[i], this.cGp[i],this.cBp[i]);
        noStroke();
        ellipse(this.x + this.rad*cos(radians(i*30)),this.y + this.rad*sin(radians(i*30)),5,5);

    }
   
};

var bomb = function(x,y,dropVertical){
  this.x = x;
  this.y = y;
  
  this.w = round(random(10,20));
  this.h = this.w;
  
  this.cR = round(random(120,255));
  this.cG = round(random(120,255));
  this.cB = round(random(120,255));

  this.sign = 1 - (2 * round(random(0,1)));

  this.xDir = 2*this.sign;  // give velocities with random direction left or right
  this.yDir = 2;
  
  if(dropVertical === 1){
    this.xDir = 0;   // drop some weapons vertically
    this.yDir = 2;
    this.w = 10;
    this.h = 10;
  }
  
  if(dropVertical === 2){
      this.xDir = 0;   // drop some weapons vertically
      this.yDir = 1;
      this.w = 50;
      this.h = 50;
  }
  
};

bomb.prototype.draw = function() {
    
    fill(this.cR,this.cG,this.cB);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h);
};

var antenna = function(x,y,angle){

    this.x = x;
    this.y = y;
    this.angle = angle;
};

//using same antenna panels at different angles.
antenna.prototype.draw = function() {

    
    fill(79,53,26);
    noStroke();
    
    switch(this.angle){
        case 0:
            rect(this.x,this.y,10,40);
            for(var i = this.y ; i < this.y + 50 ; i = i + 10){
                stroke(255, 255, 255);
                strokeWeight(1);
                line(this.x,i,this.x + 10,i); //solar panel lines on the antenna
            }
            line(this.x + 5, this.y, this.x + 5, this.y + 40);
            break;
        case 90:
            rect(this.x,this.y,40,10);
            for(var i = this.x ; i < this.x + 50 ; i = i + 10){
                stroke(255, 255, 255);
                strokeWeight(1);
                line(i,this.y,i,this.y+10); //solar panel lines on the antenna
            }
            line(this.x , this.y + 5, this.x + 40, this.y + 5);
            break;
        case -45:
            quad(this.x,this.y,this.x+28,this.y+28,this.x+35,this.y+21,this.x+7,this.y-7);
            stroke(255, 255, 255);
            strokeWeight(1);
            for(var i = 0 ; i < 5 ; i++){
                line(this.x+7*i,this.y+7*i,this.x+7+7*i,this.y-7+7*i);
            }
            line(this.x+3,this.y-3,this.x+31,this.y+24);
            break;
        case 45:
            quad(this.x,this.y,this.x+28,this.y-28,this.x+35,this.y-21,this.x+7,this.y+7);
            stroke(255, 255, 255);
            strokeWeight(1);
            for(var i = 0 ; i < 5 ; i++){
                line(this.x+7*i,this.y-7*i,this.x+7+7*i,this.y+7-7*i);
            }
            line(this.x+3,this.y+3,this.x+31,this.y-24);
            break;
    }
    


};
antenna.prototype.update = function(xDir){
    this.x = this.x + xDir;
};

var spaceStation = function(x,y){
    
    this.x = x;
    this.y = y;
    
    this.xDir = 1;
    
    this.antennae = [];
    
    this.timer = 0;
    
    this.hitPartId = 0;
    this.hitTimer = 0;
    this.hitCount = [];
    this.exploded = 0;
    this.explosionCount = 0;
    
    this.explodingCirc = new explodingCircle(500,500);
    this.explodingCircleActive = 0;
    
    this.bigBomb = new bomb(500,500,2);
    this.bigBombFlag = 0;
    
    for(var i = 0 ; i <= 6 ; i++){
        this.hitCount[i] = 0;
    } 

    this.antennae.push(new antenna(this.x - 40, this.y - 60,90)); 
    this.antennae.push(new antenna(this.x - 50, this.y,0)); 
    this.antennae.push(new antenna(this.x , this.y - 50,0)); 
    this.antennae.push(new antenna(this.x , this.y,0));  
    this.antennae.push(new antenna(this.x - 50, this.y - 50,0));
    
    //weapons :- 
    this.bombs = [];
    this.bombs.index = 0;
    for(var j = 0 ; j < 10 ; j++){
        this.bombs.push(new bomb(0,450,1));
    }
    
};

spaceStation.prototype.explodeCircle = function(){
    this.explodingCircleActive = 1;
    this.explodingCirc = new explodingCircle(this.bigBomb.x,this.bigBomb.y);

};

spaceStation.prototype.draw = function() {

    if(this.exploded === 1 && this.timer % 8 < 4){
        return;
    }
    
 

    for(var i = 0 ; i < this.antennae.length ; i++){

        this.antennae[i].draw();

    }
    
    strokeWeight(3);
    stroke(255, 255, 255);
    line(this.x-27,this.y-12,this.x-12,this.y+2);
    line(this.x-27,this.y+2,this.x-12,this.y-12);
    noStroke();
    if(this.hitPartId === 1 && this.hitTimer > 0){
        fill(255, 0, 0);
    }
    else{
        fill(225, 225, 225);
    }
    rect(this.x - 52, this.y - 8, 65,7);
    ellipse(this.x-20,this.y-5,15,15);
    
    for(var j = 0 ; j < this.bombs.length; j++){
        if(this.bombs[j].y < 400){
            this.bombs[j].draw();
        }
    }
    
    if(this.bigBomb.y < 400 && this.explodingCircleActive === 0){
        this.bigBomb.draw();
    }

    if(this.explodingCircleActive === 1){
        this.explodingCirc.draw();
    }
};

spaceStation.prototype.hit = function(x){ //maintain information of hits to spaceStation
    this.hitPartId = x;
    this.hitTimer = 1;
    this.hitCount[this.hitPartId]++;
};


var stationAK = new spaceStation(200,80); //antennas in shape of Initials :- AK

var beam = function(x,y){  //bullets fired by spaceship
  
  this.x = x;
  this.y = y;
  this.fire = 0;
  this.speed = 5;
};

beam.prototype.draw = function() {
    fill(129, 194, 227);
    rect(this.x,this.y,3,10);
};

beam.prototype.update = function(){
    if(this.y < 0){
        this.fire = 0;
    }
    else{
        this.y = this.y - this.speed;
    }
    
    //check for collision with spaceStation bridge
    if(this.y === stationAK.y && this.x > (stationAK.x - 30) &&  this.x < (stationAK.x)){
        stationAK.hit(1);
    }
    if(this.y > (stationAK.bigBomb.y - 50) && this.y <(stationAK.bigBomb.y + 50) &&
    this.x > (stationAK.bigBomb.x - 50) && this.x <(stationAK.bigBomb.x + 50)){
        stationAK.explodeCircle();
    }
};

var starship = function(x,y,scale){
  this.x = x;   //center of gravity wheel is at this.x, this.y 
  this.y = y;
  this.scale = scale;
  this.translateScale = (1/this.scale) - 1;
  this.lastFireCount = 0;
  this.beams = [];
  for(var i = 0 ; i < 10 ; i++){
      this.beams.push(new beam(200,500));
  }
  this.beams.index = 0;
};

starship.prototype.draw = function() {
    
    for(var idx = 0 ; idx < this.beams.length ; idx++){
        if(this.beams[idx].fire === 1){
            this.beams[idx].draw();
        }
    }
    
    pushMatrix();
    scale(this.scale);
    translate( this.translateScale*this.x, this.translateScale*this.y);

    
    fill(180, 186, 189);
    stroke(129, 194, 227);
    strokeWeight(2);

    quad(this.x-10,this.y+45,this.x+10,this.y+45,this.x+7,this.y+110,this.x-7,this.y+110);//main deck
    ellipse(this.x,this.y,104,104); //gravity wheel
    ellipse(this.x,this.y,100,100);
    noStroke();
    stroke(129, 194, 227);
    
    //connecting pylons
    quad(this.x - 25, this.y + 90,this.x - 5 , this.y + 80, this.x - 6 , this.y + 85, this.x -25, this.y + 100);
    quad(this.x + 25, this.y + 90,this.x + 5  , this.y + 80, this.x + 6 , this.y + 85, this.x + 25, this.y + 100);
    
    //propellers
    rect(this.x-30,this.y+70,10,70,3);
    rect(this.x + 20,this.y+70,10,70,3);
    
    //plasma trail
/*    if(time%2 === 0){
        rect(this.x - 25,this.y+140,2,20,3);
        rect(this.x + 25,this.y + 140,2,20,3);
    }
*/
    //name
    fill(148, 30, 124);
    textFont(createFont("monospace"),15);
    text("U.S.S",this.x-17,this.y-20);
    text("ENTERPRISE",this.x-40,this.y-5);
    fill(93, 88, 210);
    ellipse(this.x,this.y+40,5,5);
    
    popMatrix();
};

starship.prototype.fire = function(){
    if(this.lastFireCount === 0){
        //this.beams.push(new beam(this.x,this.y));
        this.beams[this.beams.index].fire = 1;
        this.beams[this.beams.index].x = this.x;
        this.beams[this.beams.index].y = this.y;
        this.beams.index = (this.beams.index+1)%10;
    }
    this.lastFireCount++;
};

starship.prototype.update = function(){
    
    if(this.lastFireCount > 0){  //this ensures that bullets aren't fired with high frequency
        this.lastFireCount = (this.lastFireCount + 1)%30;
    }
    for(var idx = 0 ; idx < this.beams.length ; idx++){
        this.beams[idx].update();
    }
    
    if(keyArray[LEFT] === 1){
        this.x = ( this.x > 0 ) ? (this.x - 5) : this.x ;
    }
    
    if(keyArray[RIGHT] === 1){
        this.x = ( this.x < 400 ) ? (this.x + 5) : this.x ;

    }
    
};

var explodingShip = function(x,y,scale){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.translateScale = (1/this.scale) - 1;
    this.timer = 0 ;
};

explodingShip.prototype.draw = function() {
    
    pushMatrix();
    scale(this.scale);
    translate( this.translateScale*this.x, this.translateScale*this.y);
    
    fill(180, 186, 189);
    stroke(129, 194, 227);
    strokeWeight(2);
    //ellipse(this.x,this.y,104,104); //gravity wheel
    //ellipse(this.x,this.y,100,100);
    
    if(this.timer < 40){
        for(var angle = 0 ; angle < 360 ; angle = angle + 10){
            arc(this.x + this.timer*cos(radians(angle + 5)),this.y + this.timer*sin(radians(angle + 5)),100 ,100,radians(angle),radians(angle+10));
        }
            //propellers
        rect(this.x-30 - this.timer,this.y+70,10,70,3);
        rect(this.x + 20 + this.timer,this.y+70,10,70,3);
        quad(this.x-10,this.y+45 + this.timer,this.x+10,this.y+45+ this.timer,this.x+7,this.y+110+ this.timer,
        this.x-7,this.y+110+ this.timer);//main deck
        
        noStroke();
        stroke(129, 194, 227);

        //connecting pylons
        quad(this.x - 25 - this.timer, this.y + 90 + this.timer,this.x - 5 - this.timer, this.y + 80 + this.timer, 
        this.x - 6 -this.timer, this.y + 85 + this.timer, this.x -25 - this.timer, this.y + 100 + this.timer);
        quad(this.x + 25 + this.timer, this.y + 90 + this.timer,this.x + 5 + this.timer , this.y + 80 + this.timer, 
        this.x + 6 + this.timer, this.y + 85+ this.timer, this.x + 25+ this.timer, this.y + 100+ this.timer);
    
    }
    
    else{
        gameState = 2 ;
    }
    
    popMatrix();
};

explodingShip.prototype.update = function(){
   this.timer++;
};
explodingShip.prototype.fire = function(){ //making empty function to prevent errors due to inadvertent mouseclick on explosion. 

};

var enterprise = new starship(200,300,0.5);


bomb.prototype.update = function(){
    this.x = this.x + this.xDir;
    this.y = this.y + this.yDir;
    
    if(this.x < 0 || this.x > 400){
        this.xDir = -this.xDir;
        this.yDir = this.yDir;
    }
    
    if(this.x > (enterprise.x -25) && this.x < (enterprise.x + 25) && this.y < (enterprise.y + 70) && this.y > (enterprise.y - 25) ){
        shipAlive = 0;
    }
    
};

explodingCircle.prototype.update = function(){
    this.rad += 2;
    for(var i = 0 ; i < 12 ; i++){

        var tempX = this.x + this.rad*cos(radians(i*30));
        var tempY = this.y + this.rad*sin(radians(i*30));
        if(tempX > (enterprise.x -25) && tempX < (enterprise.x + 25) && tempY < (enterprise.y + 70) && tempY > (enterprise.y - 25) ){
        
        shipAlive = 0;
    }

    }
    
    if(this.rad > 125){
        return 2;
    }
    return 1;

};



spaceStation.prototype.update = function(){

    if(this.x <= 52 || this.x >= 387){
        this.xDir = -this.xDir;
    }
    
    this.x = this.x + this.xDir; 
    for(var i = 0 ; i < this.antennae.length ; i++){
        this.antennae[i].update(this.xDir);
    }
    this.timer = (this.timer + 1)%1800;
    if(this.timer % 600 === 0){
        this.xDir *= 10;
    }
    if(this.timer % 600 > 30 && this.x > 100 && this.x < 300 && abs(this.xDir) === 10){
        this.xDir /= 10;
    }
    
    //take care of hits to the space Station
    if(this.hitTimer > 0){
        this.hitTimer = (this.hitTimer + 1)%10;
    }
    
    if(this.hitCount[1] === 4){
        this.exploded = 1;
    }
    
    //manage explosion animation
    if(this.exploded === 1){
        this.explosionCount++;
    }
    if(this.explosionCount === 120){
        gameState = 3;
    }
    
    //throw weapons regularly :- 
    switch(this.timer % 360){
        case 0:
            this.bombs[this.bombs.index] = new bomb(this.x - 45,this.y + 40,0);
            this.bombs.index = (this.bombs.index + 1) % 10;
            break;
        case 120:
            this.bombs[this.bombs.index] = new bomb(this.x + 5,this.y + 40,0);
            this.bombs.index = (this.bombs.index + 1) % 10;
            break;
        case 240:
            this.bigBombFlag = (this.bigBombFlag + 1)%2 ;
            if(this.bigBombFlag === 0){
                this.bombs[this.bombs.index] = new bomb(this.x-20,this.y-5,1);
                this.bombs.index = (this.bombs.index + 1) % 10;
            }
            else{
                this.explodingCircleActive = 0;
                this.bigBomb = new bomb(this.x-20,this.y-5,2);
            }
            break;    
    }
    
    for(var i = 0 ; i < this.bombs.length ; i++){
        this.bombs[i].update();
    }
    this.bigBomb.update();
    if(this.explodingCircleActive === 1){
        this.explodingCircleActive = this.explodingCirc.update();
    }

};


//background animation of stars
var star = function(x,y){
  this.x = x;
  this.y = y;
};

star.prototype.draw = function() {
    noStroke();
    fill(255, 255, 255);
    ellipse(this.x,this.y,2,2); 
};

star.prototype.update = function(){ //allowing vertical movement only
    this.y = this.y + 1;
};

star.prototype.reset = function(x,y){
    this.x = x;
    this.y = y;
};

var space = function(){
    this.timer = 0;
    this.nearStars = [];
    for(var i = 0 ; i < 40 ; i++){
        this.nearStars.push(new star( round(random(0,400)),round(random(0,400))));
    }
};

space.prototype.update = function(){
    this.timer++;
    
    for(var i = 0; i < this.nearStars.length ; i++){
        this.nearStars[i].update();
    }

    
    //delete old stars
    for( var i = 0 ; i < this.nearStars.length ; i++){
        if(this.nearStars[i].y > 400){
            this.nearStars[i].reset( round(random(0,400)),0);
        }
    }
};

space.prototype.draw = function() {
    for(var i = 0; i < this.nearStars.length ; i++){
        this.nearStars[i].draw();
    }

};

var finalFrontier = new space();

mouseClicked = function(){
    switch(gameState){
        case 0:
            if( mouseX > 120 && mouseX < 270 && mouseY > 280 && mouseY < 310){
                gameState = 1;
            }  
            break;
        case 1:
            enterprise.fire();
            break;
    }
    
};

void keyPressed(){
    keyArray[keyCode] = 1;
};

void keyReleased(){
    keyArray[keyCode] = 0;
};


void draw(){
    
    background(0,0,0);
    finalFrontier.draw();
    finalFrontier.update();
    
    switch(gameState){
    
        case 0:    
            fill(168, 34, 201);
            rect(75,50,260,340,15);
            fill(129, 194, 227);
            rect(120,280,150,30,10);
            fill(255,255,255);
            
            textFont(createFont("monospace"),15);
            text("The goal of the game is to",80,90);
            text("shoot the A-shape moving at",80,110);
            text("the top screen. The player",80,130);
            text("can control the spaceShip",80,150);
            text("at the bottom. CLICK mouse ",80,170);
            text("to shoot. Use ARROW keys to ",80,190);
            text("move sideways.Dodge the  ",80,210);
            text("bombs dropped.Click 'start'",80,230);
            text("button in rectangle below",80,250);
            text("to start the game!!",80,270);
            text("(careful, dont shoot the ",80,330);
            text("Big bombs, they explode)",80,350);
            text("Target: Silver part of enemy",80,370);
            fill(30, 0, 255);
            textFont(createFont("monospace"),20);
            text("START!!",150,300);
            
            break;
        case 1:

            enterprise.update();
            enterprise.draw();

            if(shipAlive === 0){
                var newX = enterprise.x;
                var newY = enterprise.y;
                enterprise = new explodingShip(newX,newY,0.5);
                shipAlive = 2;
            }
            stationAK.draw();
            stationAK.update();
    
            
            break;
        case 2:
            fill(168, 34, 201);
            rect(75,175,250,50,15);
            fill(255, 0, 0);
            textFont(createFont("monospace"),25);
            text("GAME OVER!",120,205);
            break;
        case 3:

            fill(168, 34, 201);
            rect(75,175,250,50,15);
            fill(0, 255, 0);
            textFont(createFont("monospace"),25);
            text("YOU WIN!!",120,205);
            break;
    }
};


