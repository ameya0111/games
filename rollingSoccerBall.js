var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


{

var toPI = PI/180;

var ballImages = [];
var pointSet = [];

var customChar  = function()
{
    
//image 0 for soccer_animation_0    
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);
pointSet.push(new PVector(143, 210));
pointSet.push(new PVector(165, 192));
pointSet.push(new PVector(202, 214));
pointSet.push(new PVector(193, 247));
pointSet.push(new PVector(154, 243));

    fill(0, 0, 0);

    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();   
    
pointSet = [];
pushMatrix();
translate(-1,-1);
pointSet.push(new PVector(154, 145));
pointSet.push(new PVector(165, 137));
pointSet.push(new PVector(178, 131));
pointSet.push(new PVector(191, 128));
pointSet.push(new PVector(206, 127));
pointSet.push(new PVector(207, 137));
pointSet.push(new PVector(170, 156));
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();  
popMatrix();

pointSet = [];
pointSet.push(new PVector(264, 163));
pointSet.push(new PVector(246, 158));
pointSet.push(new PVector(242, 192));
pointSet.push(new PVector(263, 213));
pointSet.push(new PVector(273, 194));
pointSet.push(new PVector(270, 177));




    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();  

pointSet = [];
pointSet.push(new PVector(247,259));
pointSet.push(new PVector(254, 245));
pointSet.push(new PVector(217, 260));
pointSet.push(new PVector(214, 270));
pointSet.push(new PVector(228, 269));
pointSet.push(new PVector(237,264));
pointSet.push(new PVector(238, 262));

    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();  
    
stroke(0,0,0);
strokeWeight(2);
line(168,156,166,194);    
line(203,215,242,191); 
line(206,136,246,157);    
line(194,248,216,262);    
line(253,246,263,213);  
line(154,243,147,254);
line(143,212,127,205);

ballImages.push(get(125,125,150,150));  //image 0 for soccer_animation_0

//image 1 for soccer_animation_1:-
pointSet = [];
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);

pointSet.push(new PVector(167, 213));
pointSet.push(new PVector(202, 194));
pointSet.push(new PVector(235, 216));
pointSet.push(new PVector(221, 247));
pointSet.push(new PVector(180, 249));

    fill(0, 0, 0);

    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();   
    
pointSet = [];

pointSet.push(new PVector(178, 134));
pointSet.push(new PVector(171, 143));
pointSet.push(new PVector(199, 158));
pointSet.push(new PVector(229, 144));
pointSet.push(new PVector(220, 132));
pointSet.push(new PVector(200, 131));

    pushMatrix();
    translate(-1,-5);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();  
    popMatrix();
    
pointSet = [];    
pointSet.push(new PVector(129, 212));
pointSet.push(new PVector(139, 195));
pointSet.push(new PVector(141, 164));
pointSet.push(new PVector(132, 176));
pointSet.push(new PVector(129, 194));
    pushMatrix();
    translate(-3,0);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();
    
pointSet = [];    
pointSet.push(new PVector(264, 194));
pointSet.push(new PVector(260, 164));
pointSet.push(new PVector(267, 178));
pointSet.push(new PVector(271, 209));
    pushMatrix();
    translate(3,1);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();
stroke(0,0,0);
strokeWeight(2);
line(171,139,137,167);    
line(168,213,136,196); 
line(203,196,197,152);    
line(180,250,163,265);    
line(221,247,238,263);  
line(234,217,267,195);
line(227,139,265,168);


ballImages.push(get(125,125,150,150)); //image 1 for soccer_animation_1


//image 2 for soccer_animation_2 :-
pointSet = [];
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);

pointSet.push(new PVector(203, 215));
pointSet.push(new PVector(240, 195));
pointSet.push(new PVector(262, 212));
pointSet.push(new PVector(249, 246));
pointSet.push(new PVector(212, 250));
    fill(0, 0, 0);

    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();   

pointSet = [];
pointSet.push(new PVector(141, 215));
pointSet.push(new PVector(167, 194));
pointSet.push(new PVector(161, 159));
pointSet.push(new PVector(140, 163));
pointSet.push(new PVector(133, 174));
pointSet.push(new PVector(130, 185));
pointSet.push(new PVector(130, 197));
    fill(0, 0, 0);
    
    pushMatrix();
    translate(-3,0);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape(); 
    popMatrix();
pointSet = [];
pointSet.push(new PVector(196, 130));
pointSet.push(new PVector(211, 129));
pointSet.push(new PVector(228, 133));
pointSet.push(new PVector(247, 147));
pointSet.push(new PVector(233, 157));
pointSet.push(new PVector(196, 143));
    fill(0, 0, 0);
    
    pushMatrix();
    translate(1,-2);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape(); 
    popMatrix();

pointSet = [];
pointSet.push(new PVector(147, 248));
pointSet.push(new PVector(180, 263));
pointSet.push(new PVector(189, 271));
pointSet.push(new PVector(168, 265));
    fill(0, 0, 0);
    
    pushMatrix();
    translate(-3,1);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape(); 
    popMatrix();


stroke(0,0,0);
strokeWeight(2);
line(157,160,197,141);    
line(164,195,203,215); 
line(240,198,234,155);    
line(261,213,274,198);    
line(249,245,253,254);  
line(146,250,138,213);
line(177,265,213,249);


ballImages.push(get(125,125,150,150)); //image 2 for soccer_animation_2


//image 3 for soccer_animation_3 :-
pointSet = [];
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);
pointSet.push(new PVector(142, 193));
pointSet.push(new PVector(154, 161));
pointSet.push(new PVector(189, 157));
pointSet.push(new PVector(202, 192));
pointSet.push(new PVector(166, 216));
    fill(0, 0, 0);

    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
pointSet = [];
pointSet.push(new PVector(270, 207));
pointSet.push(new PVector(265, 225));
pointSet.push(new PVector(257, 240));
pointSet.push(new PVector(240, 245));
pointSet.push(new PVector(237, 213));
pointSet.push(new PVector(259, 194));
    fill(0, 0, 0);
    pushMatrix();
    translate(4,2);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();

pointSet = [];
pointSet.push(new PVector(252, 163));
pointSet.push(new PVector(253, 153));
pointSet.push(new PVector(234, 139));
pointSet.push(new PVector(211, 130));
pointSet.push(new PVector(217, 141));
    fill(0, 0, 0);
    pushMatrix();
    translate(2,-4);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();
    
pointSet = [];
pointSet.push(new PVector(204, 270));
pointSet.push(new PVector(205, 260));
pointSet.push(new PVector(172, 248));
pointSet.push(new PVector(154, 256));
pointSet.push(new PVector(167, 262));

pointSet.push(new PVector(179, 267));
    fill(0, 0, 0);
    pushMatrix();
    translate(0,5);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();


stroke(0,0,0);
strokeWeight(2);
line(188,158,219,136);    
line(200,191,241,216); 
line(264,198,253,159);    
line(143,195,126,204);    
line(156,164,147,150);  
line(167,215,172,253);
line(205,267,245,246);


ballImages.push(get(125,125,150,150)); //image 3 for soccer_animation_3

//image 4 for soccer_animation_4
pointSet = [];
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);
pointSet.push(new PVector(179, 158));
pointSet.push(new PVector(224, 159));
pointSet.push(new PVector(237, 193));
pointSet.push(new PVector(202, 217));
pointSet.push(new PVector(165, 194));
    fill(0, 0, 0);
    pushMatrix();
    translate(0,0);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();

pointSet = [];
pointSet.push(new PVector(179, 264));
pointSet.push(new PVector(171, 258));
pointSet.push(new PVector(203, 251));
pointSet.push(new PVector(228, 258));
pointSet.push(new PVector(221, 268));
pointSet.push(new PVector(207, 269));
pointSet.push(new PVector(191, 270));
    fill(0, 0, 0);
    pushMatrix();
    translate(0,5);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();

pointSet = [];
pointSet.push(new PVector(142, 240));
pointSet.push(new PVector(135, 226));
pointSet.push(new PVector(129, 204));
pointSet.push(new PVector(129, 194));
pointSet.push(new PVector(139, 211));
    fill(0, 0, 0);
    pushMatrix();
    translate(-4,1);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();

pointSet = [];
pointSet.push(new PVector(256, 242));
pointSet.push(new PVector(265, 225));
pointSet.push(new PVector(270, 198));
pointSet.push(new PVector(262, 211));
    fill(0, 0, 0);
    pushMatrix();
    translate(6,-2);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();


stroke(0,0,0);
strokeWeight(5);


noFill();
arc(200,200,148,148,toPI*215,toPI*240);
arc(200,200,148,148,toPI*305,toPI*330);

stroke(0,0,0);
strokeWeight(2);
line(179,160,152,144);    
line(225,161,252,150); 
line(135,213,167,193);    
line(236,194,269,210);    
line(202,217,203,258); 

line(172,264,138,239);
line(227,264,263,238);


ballImages.push(get(125,125,150,150)); //image 4 for soccer_animation_4*/

//image 5 for soccer_animation_5
pointSet = [];
background(0,0,0,0);
fill(255,255,255);
noStroke();
ellipse(200,200,150,150);
pointSet.push(new PVector(213, 159));
pointSet.push(new PVector(249, 161));
pointSet.push(new PVector(262, 195));
pointSet.push(new PVector(239, 216));
pointSet.push(new PVector(203, 192));
fill(0, 0, 0);
    pushMatrix();
    translate(0,0);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();

pointSet = [];

pointSet.push(new PVector(194, 271));
pointSet.push(new PVector(195, 261));
pointSet.push(new PVector(234, 249));
pointSet.push(new PVector(245, 253));
pointSet.push(new PVector(234, 263));
pointSet.push(new PVector(218, 268));
fill(0, 0, 0);
    pushMatrix();
    translate(-1,4);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();
pointSet = [];

pointSet.push(new PVector(141, 240));
pointSet.push(new PVector(161, 245));
pointSet.push(new PVector(164, 213));
pointSet.push(new PVector(138, 192));
pointSet.push(new PVector(129, 214));
pointSet.push(new PVector(131, 219));
pointSet.push(new PVector(134, 229));
fill(0, 0, 0);
    pushMatrix();
    translate(-1,4);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();
pointSet = [];
pointSet.push(new PVector(145, 155));
pointSet.push(new PVector(154, 144));
pointSet.push(new PVector(168, 136));
pointSet.push(new PVector(190, 129));
pointSet.push(new PVector(183, 140));
pointSet.push(new PVector(167, 146));
fill(0, 0, 0);
    pushMatrix();
    translate(0,-3);
    beginShape();
    for (var i = 0; i < pointSet.length; i++) {
        vertex(pointSet[i].x, pointSet[i].y);   
    }    
    vertex(pointSet[0].x, pointSet[0].y);
    endShape();
    popMatrix();




stroke(0,0,0);
strokeWeight(2);
line(138,198,146,151);    
line(162,218,206,193); 
line(214,163,182,138);    
line(248,162,253,148);    
line(261,194,276,201); 
line(233,254,241,216);
line(197,267,159,249);


ballImages.push(get(125,125,150,150)); //image 5 for soccer_animation_5*/

}


var ballObj = function(x, y) {
    this.position = new PVector(x, y);
    this.prevPosition = new PVector(x,y);
    this.changePos = new PVector(x,y);
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(0, 0);
    this.drag = new PVector(0, 0);
    this.aAcc = 0;
    this.aVelocity = 0;
    this.angle = 0;
    this.idx = 0;
    this.moveCount = 0;
};
customChar();
var ball = new ballObj(100, 100);
var target = new PVector(0, 0);

///// EXPERIMENT /////
ballObj.prototype.move = function() {

    this.velocity.add(this.drag);

    this.position.add(this.velocity);
    this.drag.set(this.velocity.x, this.velocity.y,0);
    this.drag.mult(-0.03);
    
    this.aAcc = this.velocity.mag()/10;	// modify constant 10
    if (this.velocity.x < 0) {
        this.aAcc = -this.aAcc;
    }
    this.aVelocity += this.aAcc;
    this.aVelocity *= 0.98; // drag
    this.angle += this.aVelocity/2;
    this.idx  = floor((this.moveCount%60)/10);

    this.changePos.set(this.position.x,this.position.y,0);

    this.changePos.sub(this.prevPosition);

    this.moveCount += floor(this.changePos.mag());

    this.prevPosition.set(this.position.x,this.position.y,0);
};

ballObj.prototype.draw = function() {
    fill(255, 255, 255);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(toPI*this.angle);
    image(ballImages[this.idx],-20,-20,40,40);
    popMatrix();
};

var mouseClicked = function() {
    target.set(mouseX, mouseY,0);
    ball.velocity.set(target.x - ball.position.x, target.y - ball.position.y,0);
    ball.velocity.div(20);
    ball.drag.set(ball.velocity.x, ball.velocity.y,0);
    ball.drag.mult(-0.3);
};

var draw = function() {
    background(36, 115, 36);
    ball.move();
    ball.draw();
    
};
}






}};
