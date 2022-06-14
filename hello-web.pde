
// Setup the Processing Canvas
var fps = 6;
void setup(){
  size( 500, 400 );
  strokeWeight( 10 );
  frameRate( fps );
}

noStroke();

var curSize = 10;
var score = 0;
var mealsGen = 0;

var highScore = 0 ;
var prevHighScore = 0;
var paused = 0;

var campaignModeFlag = 0 ;

var campaignLevel = 0;
var campaignTargetSize = 5;

var selectMenuFlag = 0 ; 

var selectionAnimCount = 0 ; 
var levelAnimCount = 0;
var levelChangeFlag = 0;

var state = 0;
var count = 0;
var reset = 0;
var resetPause = 0 ;

var newX ;
var newY ;

var bonusPtTimer = 60;

var setUpCount = 0; 
var genNewPointFlag = 0;

var x = new Array(2000);
var y = new Array(2000);
var tilemap = new Array(40);

//init values for snake :- 
for(var i = 0 ; i < curSize ; i++){
    
    x[i] = 200;
    y[i] = 110 + 10*i;
}

for(var i = 0 ; i < 40 ; i++){
    tilemap[i] = new Array(40);
    for(var j = 0 ; j < 40 ; j++){
        tilemap[i][j] = 0;
    }
}

for(var i = 1 ; i < curSize ; i++){
    tilemap[x[i]/10][y[i]/10] = 1;
}

void initSnake(){
    for(var i = 0 ; i < curSize ; i++){
        x[i] = 200;
        y[i] = 110 + 10*i;
    }

    for(var i = 0 ; i < 40 ; i++){
        for(var j = 0 ; j < 40 ; j++){
            tilemap[i][j] = 0;
        }
    }

    for(var i = 1 ; i < curSize ; i++){
        tilemap[x[i]/10][y[i]/10] = 1;
    }

};

void selectMenu(){  //try to compress logic later.
    
    fill(168, 34, 201);
    rect(110,115,300,150,15);
    fill(255,255,255);
    
    textFont(createFont("monospace"),20);
    text("press SHIFT to select",145,245);
    
    if(selectMenuFlag === 0){
        if(campaignModeFlag === 0){
            triangle(160,150,169,158,160,169);
        }
        else{
            triangle(160,190,169,198,160,209);
        }
        text("classic mode",185,165);
        text("campaign mode",185,205);
    }
    
    else{ //selection animation
        if(selectionAnimCount % 6 < 3){
            if(campaignModeFlag === 0){
                triangle(160,150,169,158,160,169);
                text("classic mode",185,165);
            }
            else{
                triangle(160,190,169,198,160,209);
                text("campaign mode",185,205);
            }
        }
        if(campaignModeFlag === 1){  //non-animated text
            text("classic mode",185,165);
            }
        else{
            text("campaign mode",185,205);
        }
        selectionAnimCount++;
        if(selectionAnimCount === 18){
            selectionAnimCount = 0;
            selectMenuFlag = 2;
        }
    }
};

void scoreDisplay(flag){
     
    textFont(createFont("monospace"),12);
    
    fill(255, 255, 255);
    rect(400,0,100,400);
    fill(0, 0, 0);
    text("High Score :-",420,130);
    text(highScore,430,150);
    text("Score :- ",420,90);
    text(score,430,110);

   //text("mealsGen",420,210);
   // text(mealsGen,430,230);
    
    if(flag === 1){
        prevHighScore = highScore;
        text("Speed :- ",420,50);
        text(fps/6,430,70);
        if(mealsGen % 5 === 3 && bonusPtTimer < 60){
            text("BONUS",420,170);
            text(bonusPtTimer/6,430,190);
        }
    }
    else{            
        if(highScore < score){
            highScore = score;
        }
        text("GAME",420,50);
        text("OVER!!",420,70);
        if(highScore > prevHighScore){
            text("High Score ",420,190);
            text("Reached!!!",420,210);
        }
    }
};

void createBlockade(){

   if(campaignLevel > 2){
        for(var i = 0 ; i < 400 ; i = i + 10){
            tilemap[i/10][0] = 1;
            tilemap[i/10][39] = 1;
            tilemap[0][i/10] = 1;
            tilemap[39][i/10] = 1;
        
            fill(20, 222, 44);
            rect(i,0,10,10);
            rect(i,390,10,10);
            rect(0,i,10,10);
            rect(390,i,10,10);
        }
    }
    
    else if(campaignLevel === 1){
        
        for(var i = 100 ; i < 300 ; i = i + 10){

            tilemap[10][i/10] = 1;
            tilemap[29][i/10] = 1;
        
            fill(20, 222, 44);
            rect(100,i,10,10);
            rect(290,i,10,10);
        }
        
    }
   else if(campaignLevel === 2){
        for(var i = 50 ; i < 300 ; i = i + 10){

            tilemap[i/10][(i+50)/10] = 1;
            fill(20, 222, 44);
            rect(i,i+50,10,10);
        }
    }
};

void updatePosition(){
   for(var j = curSize - 1 ; j > 0 ; j--){
        x[j] = x[j - 1];
        y[j] = y[j - 1];
        tilemap[x[j]/10][y[j]/10] = 1;
    } 
    //update head
    if(state === 0){
        y[0] = y[0] + 10;
    }
    else if(state === 1){
        x[0] = x[0] + 10;
    }
    else if(state === 2){
        y[0] = y[0] - 10;
    }
    else if(state === 3){
        x[0] = x[0] - 10;
    }
    //take care of boundaries
    if(x[0] > 390){
        x[0] = 0;
    }
    if(y[0] > 390){
        y[0] = 0;
    }
    if(x[0] < 0){
        x[0] = 390;
    }
    if(y[0] < 0){
        y[0] = 390;
    }
};

void collisionCheck(){
    if(tilemap[x[0]/10][y[0]/10] === 1){
        count++;
        if(count > 4){
            reset = 1;
            resetPause = 0;
            count = 0;
        }
    }  
};

int resetSnake(){
 
     if(reset === 1){
         
        if(resetPause < 2*fps){
            resetPause++ ;
            if(resetPause % 2 === 1){
                for(var i = 1 ; i < curSize ; i++){
                    fill(255, 170, 0);
                    rect(x[i],y[i],10,10);
                }
            }
            scoreDisplay(0);
            return 0;
        }
        curSize = 10;
        campaignTargetSize = 5;
        score = 0;
        state = 0 ;
        mealsGen = 0;
        bonusPtTimer = 60;
        campaignLevel = 0;
        
        //reset = 0 ; 
        for(var i = 0 ; i < curSize ; i++){
            x[i] = 200;
            y[i] = 110 + 10*i;
        }

        
        for(var i = 0 ; i < 40 ; i++){
            
            for(var j = 0 ; j < 40 ; j++){
                tilemap[i][j] = 0;
            }
        }
        
        for(var i = 1 ; i < curSize ; i++){
            tilemap[x[i]/10][y[i]/10] = 1;
        }
        
        setUpCount = 0;
        reset = 0 ;
    }
    
    return 1;
};

void newMealGen(){  // also checks if eaten meal
  if(setUpCount > 5){
        if(genNewPointFlag === 0){
            
           while(1){
                newX = 10*floor(random(1,39));
                newY = 10*floor(random(1,39));
         
                if(tilemap[newX/10][newY/10] === 0 && !(newX === x[0] && newY === y[0])){
                     break;
                } 

            }
            genNewPointFlag = 1; 
            mealsGen++;
        }
        if(mealsGen % 5 === 3){
           fill(235, 18, 159);
        }
        else{
           fill(255, 132, 0);
        }
        rect(newX,newY,10,10);
    }
    
    if(mealsGen % 5 === 3){
        bonusPtTimer--;
    }
    
    if(x[0] === newX && y[0] === newY){
        curSize++;
        //score++;
        
        if(mealsGen % campaignTargetSize === 3){
          score = score + floor(bonusPtTimer/6) ; 
          bonusPtTimer = 60;
        }
        else{
            score++;
        }
        genNewPointFlag = 0;
        x[curSize - 1] = x[curSize - 2];
        y[curSize - 1] = y[curSize - 2];
        if(mealsGen === campaignTargetSize && campaignModeFlag === 1){
            levelChangeFlag = 1;
        }

    }
    
    if(bonusPtTimer === 0){
        bonusPtTimer = 60;
        genNewPointFlag = 0;
    }
};

void drawSnake(){
    for(var i = 0 ; i < curSize ; i++){
        fill(0, 34, 255);
        rect(x[i],y[i],10,10);
    }
};

int campaign(){
    if(levelChangeFlag === 1){
            
            if(levelAnimCount < 30){
                levelAnimCount++;
                if(levelAnimCount % 2 === 0){
                    curSize--;
                }
                drawSnake();
                scoreDisplay(1);
                return 0;
            }
            
            campaignLevel = (campaignLevel + 1)%4; //keeps repeating 3 levels
            if(campaignLevel === 0){
                campaignTargetSize+=5;
            }
            
            count = 0; // disables initial collision
            setUpCount = 0;
            curSize = 10;
            mealsGen = 0;
            levelAnimCount = 0;
            levelChangeFlag = 0;
            state = 0;
            initSnake();
        }
    return 1;
};

void keyPressed()  {
    //state = (state + 1) % 4 ;
    
    if(selectMenuFlag === 0 && ( keyCode === UP || keyCode === DOWN )){
        campaignModeFlag = (campaignModeFlag + 1)%2;
        return;
    }
    
    if(selectMenuFlag === 0 && keyCode === SHIFT){
        selectMenuFlag = 1;
        return;
    }
    
    if(keyCode === SHIFT){
        paused = (paused + 1) % 2;
    }

    if(state % 2 === 0  && keyCode === RIGHT){
        state = 1 ; 
    } 
    if(state % 2 === 0  && keyCode === LEFT){
        state = 3 ; 
    } 
    if(state % 2 === 1  && keyCode === UP){
        state = 2 ; 
    } 
    if(state % 2 === 1  && keyCode === DOWN){
        state = 0 ; 
    } 
    
    if(keyCode === ALT && fps < 60){
        fps += 6;
        frameRate(fps);
    }
    if(keyCode === CONTROL && fps > 6){
        fps -= 6;
        frameRate(fps);
    }
};

void draw(){
       // the beautiful blue sky
    background(82, 222, 240);
    
    if(selectMenuFlag < 2){
        selectMenu();
        return;
    }
    setUpCount++;
    
    if(campaignModeFlag ===1){
        createBlockade();
        if(campaign() === 0){
            return;
        }
    }
    
    if(resetSnake() === 0){
        return;
    }
    
    drawSnake();
    
    //reset tilemap - will be updated in updatePosition()
    for(var i = 1 ; i < curSize ; i++){
        tilemap[x[i]/10][y[i]/10] = 0;
    }
    
  //Game Pause
    if(paused === 1){
        
        fill(255, 255, 255);
        rect(400,0,100,400);
        fill(0, 0, 0);
        text("Game Paused",410,50);

        return;
    }
    
    updatePosition();
    collisionCheck();
    newMealGen();
    scoreDisplay(1);
};
