var fps = 96;
void setup(){
  size( 400, 400 );
  strokeWeight( 10 );
  frameRate( fps );
}

noStroke();

function explodingCircle(x,y){

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
    this.rad += 2;
    if(this.rad > 75){
        return true;
    }
    return false;
};

function balloon(){
  this.x = round(random(100,350));
  this.y = 400;
  this.w = round(random(30,50));
  this.h = this.w;
  
  this.cR = round(random(0,255));
  this.cG = round(random(0,255));
  this.cB = round(random(0,255));

};

balloon.prototype.move = function(){
    this.y = this.y - 1;
};

balloon.prototype.isBursted = function(){
  return (((sq(mouseX - this.x))/sq(this.w/2)) + ((sq(mouseY - this.y))/sq(this.h/2)) < 1 ); 
};

balloon.prototype.hitCeiling = function(){
    return this.y < 0;
};

balloon.prototype.draw = function() {
    
    fill(this.cR,this.cG,this.cB);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h);
};

function balloonFactory(){
  
  
  this.MAXballoons = 10;
  this.balloons = [];
  this.explosions = [];
  this.time = 0;
};

balloonFactory.prototype.draw = function() {
    if(this.balloons.length < this.MAXballoons && this.time % 100 === 0){
        this.balloons.push(new balloon());
    }
    for(var i = 0; i < this.balloons.length; i++){
        this.balloons[i].draw();
        this.balloons[i].move();
    }
    this.time++;
    for(var j = 0 ; j < this.explosions.length;j++){
        if(this.explosions[j].draw()){
            this.explosions.splice(j,1);
        }
    }
};

balloonFactory.prototype.checkBurst = function(){
    for(var i = 0; i < this.balloons.length; i++){
       if(this.balloons[i].isBursted()){
           var x = this.balloons[i].x;
           var y = this.balloons[i].y;
           this.explosions.push(new explodingCircle(x,y));
           this.balloons.splice(i,1);
       }
    }
};

balloonFactory.prototype.checkCeilingHits = function(){
    for(var i = 0; i < this.balloons.length; i++){
       if(this.balloons[i].hitCeiling()){
           var x = this.balloons[i].x;
           var y = this.balloons[i].y;
           this.explosions.push(new explodingCircle(x,y));
           this.balloons.splice(i,1);
       }
    }
};

var factory = new balloonFactory();

void mouseClicked(){
    factory.checkBurst();
};


void draw() {
    background(255, 255, 255);
    factory.checkCeilingHits();
    factory.draw();
};
