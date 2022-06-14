/*
Author :- Ameya Khandekar

In this basic 3d game, I have made use of pespective projection to model a basic basket ball throw in 3-d.

*/


var fps = 60;
void setup(){
  size( 400, 400 );
 // strokeWeight( 10 );
  frameRate( fps );
}

var toPI = PI/180;
var keyArray = [];

var score = 5;
var restartTimer = 0;
var startScreen = 1 ; 

var pt3d = function(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
};

pt3d.prototype.add = function(node3){
    this.x += node3.x;
    this.y += node3.y;
    this.z += node3.z;
};
pt3d.prototype.set = function(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
};
pt3d.prototype.div = function(k){
    this.x /= k ;
    this.y /= k ;
    this.z /= k ;
};

pt3d.prototype.mag = function(){
    return sqrt(sq(this.x)+sq(this.y)+sq(this.z));
};

var projection = function(node3){
    var f = 120;
    
    var camPos = new pt3d(110,70,70);
    
    var pt2d = new PVector(round(f*((node3.x-camPos.x)/node3.z))+camPos.x,round(f*((node3.y-camPos.y)/node3.z))+camPos.y);
    return pt2d;
};

var backdrop = function(x,y){

    this.roof = [projection(new pt3d(0,0,20)),projection(new pt3d(0,0,200)),projection(new pt3d(450,0,200)),projection(new pt3d(450,0,20))];

    //floor
    
    this.floor = [ projection(new pt3d(0,400,20)),projection(new pt3d(0,400,200)),projection(new pt3d(450,400,200)),projection(new pt3d(450,400,20))];
    
    //floor line points :- 
    this.floorLines = [];
    for(var i = 0 ; i < 8 ; i++){
        this.floorLines.push(projection(new pt3d(0,400,120+10*i)));
        this.floorLines.push(projection(new pt3d(450,400,120+10*i)));
    }
    
    //wall
    this.wall = [projection(new pt3d(0,400,200)),projection(new pt3d(0,0,200)),projection(new pt3d(450,0,200)),projection(new pt3d(450,400,200))];
    
    //target
    this.target = [projection(new pt3d(220,60,200)),projection(new pt3d(220,120,200)),projection(new pt3d(280,120,200)),projection(new pt3d(280,60,200))];
    this.targetInterior =  [projection(new pt3d(230,70,200)),projection(new pt3d(230,110,200)),projection(new pt3d(270,110,200)),projection(new pt3d(270,70,200))];
    
    this.target2 = [projection(new pt3d(120,160,200)),projection(new pt3d(120,220,200)),projection(new pt3d(160,220,200)),projection(new pt3d(160,160,200))];
    this.target2Interior =  [projection(new pt3d(130,170,200)),projection(new pt3d(130,210,200)),projection(new pt3d(150,210,200)),projection(new pt3d(150,170,200))];

    

};

    

var bckDrop = new backdrop(200,200);

backdrop.prototype.draw = function() {
    noStroke();
    stroke(0,0,0);

    fill(17, 140, 109);
    quad((this.roof[0].x),(this.roof[0].y),(this.roof[1].x),(this.roof[1].y),(this.roof[2].x),(this.roof[2].y),(this.roof[3].x),(this.roof[3].y));
    
    fill(117,117,105);
   quad((this.floor[0].x),(this.floor[0].y),(this.floor[1].x),(this.floor[1].y),(this.floor[2].x),(this.floor[2].y),(this.floor[3].x),(this.floor[3].y));
   
    fill(171, 51, 51);
       quad((this.wall[0].x),(this.wall[0].y),(this.wall[1].x),(this.wall[1].y),(this.wall[2].x),(this.wall[2].y),(this.wall[3].x),(this.wall[3].y));
    noStroke();
    fill(0,0,0);
    quad((this.target[0].x),(this.target[0].y),(this.target[1].x),(this.target[1].y),(this.target[2].x),(this.target[2].y),(this.target[3].x),(this.target[3].y));
    fill(171, 51, 51);
    quad((this.targetInterior[0].x),(this.targetInterior[0].y),(this.targetInterior[1].x),(this.targetInterior[1].y),(this.targetInterior[2].x),(this.targetInterior[2].y),(this.targetInterior[3].x),(this.targetInterior[3].y));
    
    fill(0,0,0);
    quad((this.target2[0].x),(this.target2[0].y),(this.target2[1].x),(this.target2[1].y),(this.target2[2].x),(this.target2[2].y),(this.target2[3].x),(this.target2[3].y));
    fill(171, 51, 51);
    quad((this.target2Interior[0].x),(this.target2Interior[0].y),(this.target2Interior[1].x),(this.target2Interior[1].y),(this.target2Interior[2].x),(this.target2Interior[2].y),(this.target2Interior[3].x),(this.target2Interior[3].y));

    //floor lines :- 
    stroke(99, 58, 15);
    strokeWeight(1);
    for(var i = 0 ; i < this.floorLines.length; i+= 2){
        line((this.floorLines[i]).x,(this.floorLines[i]).y,(this.floorLines[i+1]).x,(this.floorLines[i+1]).y);
    }
    noStroke();

};

var throwingPlaneObj = function(x,y,z){

    this.initX = x;
    
    this.corner1 = new pt3d(x,y-300,z-50);
    this.corner2 = new pt3d(x,y+100,z-50);
    this.corner3 = new pt3d(x,y+100,200);
    this.corner4 = new pt3d(x,y-300,200);

    this.corner2d1 = projection(this.corner1);
    this.corner2d2 = projection(this.corner2);
    this.corner2d3 = projection(this.corner3);
    this.corner2d4 = projection(this.corner4);
        

    this.angle = 0;
    
};

var ballObj = function(x, y,z) {
    this.init = new pt3d(x,y,z);
    this.pos3d = new pt3d(x,y,z);
    this.position = projection(this.pos3d);
    this.initPos = projection(this.init);
    this.thrown = 0;
    this.velocity = new pt3d(0,-10,2); // init velocity - later change using mouse click
    this.acceleration = new pt3d(0, 0.01,0);
    this.aVelocity = 0;
    this.angle = 0;
    this.bounceCoeff = -0.5;
    this.boardCoeff = -0.001;
    this.size = 25;
    this.fallenFloor = 0;
    this.hitBoard = 0;
    this.bounce = 0;

    
};

var ball = new ballObj(200, 300 , 120);
var throwPlane = new throwingPlaneObj(200,300,120);

throwingPlaneObj.prototype.draw = function() {
    fill(31, 148, 184,68);
    quad(this.corner2d1.x,this.corner2d1.y,this.corner2d2.x,this.corner2d2.y,this.corner2d3.x,this.corner2d3.y,this.corner2d4.x,this.corner2d4.y);
};

throwingPlaneObj.prototype.updateCorners = function(){
    this.initX = ball.init.x;
    
    this.corner1.x = this.initX - 250*tan(this.angle);
    this.corner2.x = this.initX - 250*tan(this.angle);
    this.corner3.x = this.initX + 400*tan(this.angle);
    this.corner4.x = this.initX + 400*tan(this.angle); 
    //since we are updating the opposite corner by 400 for a corresponding change of 80 in z value, we should drag x by 5 times the value of z in mouseGdragged function
    
    
    this.corner2d1 = projection(this.corner1);
    this.corner2d2 = projection(this.corner2);
    this.corner2d3 = projection(this.corner3);
    this.corner2d4 = projection(this.corner4);

};

throwingPlaneObj.prototype.update = function(){
    
    if(keyArray[RIGHT] === 0 && keyArray[LEFT] === 0){
        return;
    }
    
    if(keyArray[RIGHT] === 1 && this.corner3.x < 450){
        this.angle += toPI;
    }
    if(keyArray[LEFT] === 1 && this.corner3.x > 0){
        this.angle -= toPI;
    }
    
    
    this.updateCorners();
   

    
};

ballObj.prototype.update = function(){
    
    
    
    if(this.thrown === 2){
        
        this.pos3d.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.position = projection(this.pos3d);

    }
    
    if(this.thrown === 1){
        this.position.set((projection(this.pos3d)).x,(projection(this.pos3d)).y);
    }
    

    
    if((this.pos3d.x < 0 || this.pos3d.x > 450) && this.thrown === 2){
        this.velocity.set(-this.velocity.x,this.velocity.y,this.velocity.z);
        this.bounce++;
    }
    
    
    if(this.pos3d.z > 200){
        this.velocity.set(this.velocity.x,this.velocity.y,-this.velocity.z);
        this.bounce++;
    }
    
    if(this.pos3d.y > 400 || this.pos3d.y < 0){
        this.velocity.set(this.velocity.x,-this.velocity.y,this.velocity.z);
        this.bounce++;
    }
    
    if((this.pos3d.z < 80 || this.bounce > 4) && this.thrown === 2){
     //   println("Reached");
        this.thrown = 0;
        this.init.x = random(50,350);
        this.bounce = 0;
        this.pos3d.set(this.init.x,this.init.y,this.init.z);
        this.position = projection(this.pos3d);
        this.initPos = projection(this.init);
        throwPlane.updateCorners();
        score--;

    }


    //Check if inside target :- 
    //no need to check if this.thrown equals 2
    //[projection(new pt3d(260,60,200)),projection(new pt3d(260,120,200)),projection(new pt3d(320,120,200)),projection(new pt3d(320,60,200))];

    if(this.pos3d.x > 220 && this.pos3d.x < 280 && this.pos3d.y > 60 && this.pos3d.y < 120 && this.pos3d.z < 210  && this.pos3d.z > 190 && this.bounce === 0){
        score+=5;
        this.thrown = 0;
        this.init.x = random(50,350);
        this.bounce = 0;
        this.pos3d.set(this.init.x,this.init.y,this.init.z);
        this.position = projection(this.pos3d);
        this.initPos = projection(this.init);
        throwPlane.updateCorners();


    }

        if(this.pos3d.x > 120 && this.pos3d.x < 160 && this.pos3d.y > 160 && this.pos3d.y < 220 && this.pos3d.z < 210  && this.pos3d.z > 190 && this.bounce === 0){
        score+=3;
        this.thrown = 0;
        this.init.x = random(50,350);
        this.bounce = 0;
        this.pos3d.set(this.init.x,this.init.y,this.init.z);
        this.position = projection(this.pos3d);
        this.initPos = projection(this.init);
        throwPlane.updateCorners();


    }


    //spinning ball
    if(this.thrown === 2){
        this.aVelocity = toPI*this.velocity.mag() * 2;	// modify constant 4
/*        if (this.velocity.x < 0) {
            this.aVelocity = -this.aVelocity;
        }*/
        this.angle += this.aVelocity;
    }
};
ballObj.prototype.draw = function() {
   
    if(this.thrown === 1){
        stroke(0,0,0);
        strokeWeight(2);
        line(this.initPos.x,this.initPos.y,this.position.x,this.position.y);
        strokeWeight(1);

    }
   
    fill(255,114,0);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    scale(0.25*120/this.pos3d.z);
    noStroke();
    ellipse(0, 0, 100, 100);
    stroke(0,0,0);
    pushMatrix();
        translate(-200,-200);
        bezier(250, 201, 249, 203, 209, 272, 154, 192);
        bezier(226, 240, 211, 250, 251, 233, 172, 237);
        bezier(234, 161, 257, 202, 209, 260, 169, 166);

    popMatrix();
    noFill();
    arc(-24,-3,91,133,-44*toPI,toPI*51);
    popMatrix();

};

void mouseDragged() {
    if(ball.thrown === 1  ){
        
//since we are updating the opposite corner by 400 for a corresponding change of 80 in z value, we should drag x by 5 times the value of z in mouseGdragged function.
        ball.pos3d.set(ball.init.x-5*(sin(throwPlane.angle))*abs(mouseX-ball.initPos.x),mouseY,ball.init.z-(cos(throwPlane.angle))*abs(mouseX-ball.initPos.x));
        
        ball.thrown = 1;
        
        if( !(ball.pos3d.z > 70 && ball.pos3d.x < 400 && ball.pos3d.x > 0 && ball.pos3d.y > 0 && ball.pos3d.y < 400)){
            ball.thrown = 0;
            ball.pos3d.set(ball.init.x,ball.init.y,ball.init.z);
            ball.position = projection(ball.pos3d);
        }
    }

    if(ball.thrown === 0){
        if(mouseY < ball.position.y+25 && mouseY > ball.position.y-25 && mouseX > ball.position.x-25 && mouseX < ball.position.x+25){
            ball.thrown = 1;
        }

    }
};

void mouseReleased() {
    if (ball.thrown === 1) {
        ball.thrown = 2;
        ball.velocity.set(ball.init.x-ball.pos3d.x,ball.init.y - ball.pos3d.y,ball.init.z-ball.pos3d.z);
        ball.velocity.div(10);
    }
};

void keyPressed(){
    keyArray[keyCode] = 1;
};

void keyReleased(){
    keyArray[keyCode] = 0;
};

void mouseClicked(){
    if(startScreen ===1){
        startScreen = 0;
    }
};


void draw() {
    if(keyArray[SHIFT] === 1){
        return;
    }
    background(43, 133, 67);
    
    if(startScreen === 1){
        
        textSize(18);
        fill(23, 23, 26);
        pushMatrix();
        translate(0,-50);
        text("3d BasketBall Shooting Practice",50,100);
        text("Instructions :-",50,130);
        text(" - Rotate the transparent blue plane ",50,160);
        text("that passes through the ball ",50,190);
        text("using RIGHT,LEFT arrow keys.",50,220);
        text("Ball stays in this plane before bouncing.",50,250);
        text("- Drag the ball back using mouse",50,280);
        text("and release. Initial velocity depends",50,310);
        text("on this drag-and-release",50,340);
        text("- Win points by aiming at the targets. ",50,370);
        text("- CLICK MOUSE TO BEGIN",50,400);
        popMatrix();
        return ;    
    }
    
    if(score < 0){
        restartTimer = 1;
        score = 5;
        startScreen = 1;
    }
    
    
    restartTimer = 0;
    
    bckDrop.draw();
    throwPlane.draw();
    throwPlane.update();
    ball.draw();
    ball.update();
    
    fill(0,0,0);
    textSize(15);
    text("Score "+score,270,20);
    text("3-d basketball practice!",40,20);
    text("Rotate plane of trajectory using RIGHT,LEFT keys.",20,380);
    text("Give inital velocity by dragging and releasing the mouse.",20,395);
  
};
