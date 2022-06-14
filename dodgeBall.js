var sketchProc=function(processingInstance){ with (processingInstance){
//PImage aImg;
//aImg = loadImage("Grass Block.png");


//Beginning of processing sketch
/*
Author : Ameya S Khandekar
Course : Video Game Design - ECE 4525
Date : October 18 2016
Project 6
*/

size(400, 400); 
frameRate(60);

/*
Creative Aspects :- 

- I created a soccer ball which rolls around realistically - the rotations appear to be both in along the plane and around it. The 3-d rolling effect is achieved by using 6 images as sprites for the soccer ball which approximate it's rotation along the 3rd dimension. When the ball moves, along with rotate function, each of the 6 images are used one-by-one - giving a realistic rolling effect.
The ball also casts a slight shadow as it moves.

- the motion of the NPC is achieved using a combination of steering forces and state machine. The NPCs behavior is modified in accordance with the number of hits it has taken. Depending on the state it is in, the steering forces are applied in differing combinations and using differing weights, so as to achieve the required motion. Obstacles are avoided using obstacle Avoidance steering force , or the evade steering force. Bumping into other NPCs is avoided using a Separation steering force.
Since the NPC reacts differently depending on the number of hits it has taken, it gives a good feeling of a weak AI. 

- NPCS avoid each other using the Separation flocking behavior.

- the different NPCs will have different behavior such as aggression by using different states for them, or by making them change states at differing number of hits. For example, one NPC may continue to approach the balls head-on even if it takes many hits, while other NPC may adapt early and use a waiting behavior.


*/
var toPI = PI/180;
var aImg ; 

//debug variables :-
var gamePause  = 0;
var rMat,gMat,bMat ;
var gameVariables = {
    score:0,
    start:0,
    images:[],
    snakeImages:[],
    ballImages:[],
    turImages:[],
    customCharMade:0,
    keyArray:[],
    hits:0,
    time:0,
    endScreenTimer:0,
    gameObjectsRecreate:0,
    crossed:0
};

gameVariables.init = function(){
    gameVariables.start = 0;
    gameVariables.score = 0;
    gameVariables.hits = 0;
    gameVariables.time = 0;
    gameVariables.endScreenTimer = 0;
    gameVariables.crossed = 0;
};
gameVariables.endGame = function(){
    gameVariables.start = 2;
};


var customChar = function(){
    gameVariables.customCharMade = 1;
    
    //grass Tile :- // might change this later
    background(0,0,0,0);
rMat = [
"ħħħħĩŁŘŒŉĽİĩħħħħħħħħħħħħħħħħħħħħħħħħħħħħ",
"ħħħħħħĳŋŏŋŉŅĿĵİĭĪħħħħħħħħħħħħħħħħħħħħħħħ",
"ħħħħħħħħĳŅňŅĿĹĴįīĨħħħħħħħħħħħħħħħħħħħħħħ",
"ħħħħħħħħĦħıĿĿĺĴįīĨħħħħħħħħħħħħħħħħħħħħħħ",
"ħħħħħħĨĨĨĩĨħīĳĴİīĪĬĩĨħħħħħħħħħħħĬĪĪĩĩĩĨĨ",
"ĩĭĭĭĬĭĶĸĹŃĿļĸĶĶİĬĨĻŊķīĩĨĨħħħħħħħĥŀŌņńŀĻĸ",
"ľŠŦţşŞřŔőōŉŅŀĻĵİĬĨĦĴŉŋŀĸıĪħħħħħħħĥĨĺņŇłļ",
"ĥĤķłŇŔŐōŌŉŇńŀĻĵİĬĨħĥħĵĿĽĶĭĨħħħħħħħħĥĤīįĶ",
"ħħĦĥĤĤĤĩİİĶĸĻķĴİīĨĩĩĩĩĪıĴĮĨħħħħħħĦĦĨĪĬĸĿ",
"ħħħħħħħħĦĦĥĥĦĪİĴĵļŃľĽŀĿĸĴįĨħħħħħĩįĲĺńōŊł",
"ħħħħħħħħħħĩĭĴĹķŀœŘŖŔŏŋńĽĵĮĨħħħħĦĶōŜŗŐŇĿĵ",
"ħħħħħħħħĨĮĹńŃļĵĮħģĩĳķĹĵĳĳĮĨĦħħħĦķĶĳııĥĥĦ",
"ħħħħħħĦīķňŌŃļĶİĪħħĦĦĥĤĨİĳİĬĪĦĦĦħĥĥĦĦĦħħħ",
"ħħħħħħıńőŉĿĴĬĨĦħħħħĦħįĽĿĴįįĶĸĲĭĩĦĦĦĦħħħħ",
"ħħħħħĴŋŎŀĴĨĥĦħħħħħĦīķŀĿĴĪħĥıŉŉņľĵĳĮĭīĨĨħ",
"ħħħħīŁĿįģĦħħħħħħħħĨĶŀĲĦĥħħħĦĥĲŃŉŎōłľĸıĮĬ",
"ħħħħīĬĤĦħħħħħħħħħħīĮĨĥħħħħħħħĥĦĮĹŀŃńĿĹĴı",
"ħħħħħĦħħħħħħħħħħħħħĦħħħħĦĦĦĦĦĦĥĥģĩįĵĵĳĲİ",
"ħħħħħħħħħħħħħħħħħħħħħħĦĦĭĮĭĭĬĳĳĲĵĶĴĲĲĲĲİ",
"ħħħħħħħħħħħħħħĦĦħħħħħĦĭľŋœœŏŋŐŎŋōŌňńĿĹĳİ",
"ħħħħħħħħħħħħħĨĮįĥĥħħħĦĮļŁŅņŅŊňŊŌňŋŉńĿĹĳİ",
"ħħħħħħħħħħħħħħİłłĳĩĦĦħĦĥĤĤģĥīĬİĲıĶĵĳİĲĲİ",
"ħĦĥħħħħħħħħħħħĨĶŊŋŀĸıīĩħħħħħĦĦĦĦĦĤĥĭİĴĳİ",
"ħįĴģĦĦħħħħħħħħħħĮĻņņļĲīħħħħħħħħĦĦİĺľľĻĵį",
"ħĭŉŅĲīĥĦĦħħħĦĥĥĤĤĥĬĳĶĳĬħħħħħħĥĥıĿņŉŃĺĲĭĩ",
"ħħĴňōŃĹĳĬĩĦĪĴĶĺľĺĺļĻĸĳīħħħħĦĦĳŅŊňĽĴįĬĩħħ",
"ħħĦĭĸŃŇļĲĬħĨıŅőŖŖŏŌņļĳĪħħħĦīŅōŇĵįĪħĦĦħħħ",
"ĥĥĤĤĥĪİĵĳĭħħĨįĳĳķĻĹĸķįĨħħħĩĶĶĲĭħĦħħħħħħħ",
"ĶĿŁĽĻłĽĹĳĬħħħĦĦĦħĩĩĩĪĨħħħħĨīħĦĦħħĥĦħħħħħ",
"ŅŐŘŖŏōņļĴĬħħħħħħħħħħħħħħħħħħħħħħĦĺįĥĦĦħħ",
"ĭįİıĻķĶķıĭħħħħħħħħħħħħħħħħħħħħħħĦĮōŉĵīĥĦ",
"ĦĦĦĦĩĨĨĴĴĬħħħħħħħħħħħħħħħħħħħħħħħħıŇōņľĳ",
"ħħħħĦĭĿļĵĭħħħħħħħĦĥĦĦĦĦĦĦħħħħħħħħħħĪĳńńĻ",
"ħħħĦĸŊŅĴĪĨħħħħħĦīĹľķıİĮįįĬĨħħħħĦĦĥĥĥĦĨĭĴ",
"ħħħŅŋĸĩĨħħħħħħħħħĨĭĿŎŌņĿķıĪħħĦĬĺĹňŅłŁņŀĹ",
"ħħĲķĩĨħħħħħħħħħħħħħĨīĴĽľĹĳīħħħĦĴŇŎŚŖŏŋŃĺ",
"ħħĨĨħħħħħħħħħħħħħħħħħħĦĭĵĴĭĨħħħĨĩĩĪĭĶĴĴĳ",
"ħħħħħħħħħħħħħħħħħħĦĥĪĵŃņľķĬħħħħħħħħħħħĨĶ",
"ħħħħħħħħħħħħħħħħĦīļŊŒœōňłķīħħħħħħħħħĦĴłĻ",
"ħĨĿıħħħħħħħħħħħĦįňŒŌŉĿĶĬħħħħħħħħħħħĪĿŉŁİ",
];
gMat = [
"ƉƉƉƉƊƔƞƛƗƒƌƊƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉ",
"ƉƉƉƉƉƉƎƙƚƙƘƗƓƎƍƌƊƈƈƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉ",
"ƉƉƉƉƉƉƉƉƎƖƘƖƓƐƎƍƋƈƈƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉ",
"ƉƉƉƉƉƉƉƉƉƉƍƓƓƐƎƍƋƈƈƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉ",
"ƉƉƉƉƉƉƉƉƉƊƉƉƋƍƎƌƊƊƋƊƉƉƉƉƉƉƉƉƉƉƉƉƌƊƊƊƊƊƉƊ",
"ƊƌƌƌƋƋƏƐƐƔƔƒƐƎƏƌƊƉƒƘƏƊƊƊƉƉƉƉƉƉƉƉƈƓƘƖƕƔƑƐ",
"ƓƢƥƣơƠƟƝƛƙƘƖƓƐƎƌƊƈƈƏƗƘƔƐƍƊƉƉƉƉƉƉƉƈƉƑƖƗƔƑ",
"ƈƈƐƕƗƜƛƚƙƗƗƕƓƑƎƌƋƉƈƈƉƏƔƒƏƌƊƉƉƉƉƉƉƉƉƈƈƊƍƏ",
"ƉƉƈƈƈƈƈƊƌƍƐƑƑƐƏƌƊƉƉƊƊƊƊƍƎƌƉƉƉƉƉƉƉƉƉƉƊƋƐƔ",
"ƉƉƉƉƉƉƉƉƉƉƈƈƉƋƍƎƎƒƕƓƒƔƔƑƏƌƉƉƉƉƉƉƊƌƎƑƕƙƘƕ",
"ƉƉƉƉƉƉƉƉƉƉƊƌƎƑƐƓƜƞƝƜƚƙƖƒƏƌƉƉƉƉƉƉƏƙƟƝƚƗƓƏ",
"ƉƉƉƉƉƉƉƉƉƌƑƕƔƒƏƋƉƇƊƎƐƑƏƎƎƌƉƉƉƉƉƈƐƐƎƍƍƈƈƈ",
"ƉƉƉƉƉƉƉƋƏƗƙƕƒƏƌƊƉƉƉƈƈƈƉƌƎƍƋƊƉƈƉƉƈƈƈƈƉƉƉƉ",
"ƉƉƉƉƉƉƍƕƛƘƓƏƋƉƉƉƉƉƉƉƉƌƒƓƎƍƍƏƐƎƋƊƉƈƉƉƉƉƉƉ",
"ƉƉƉƉƉƎƘƙƔƏƉƈƉƉƉƉƉƉƉƋƐƔƔƎƊƉƈƍƗƘƖƒƎƎƌƋƋƉƉƉ",
"ƉƉƉƉƋƔƓƌƇƈƉƉƉƉƉƉƉƉƉƏƔƎƈƈƉƉƉƈƈƎƕƘƙƙƕƒƐƍƌƋ",
"ƉƉƉƉƋƋƈƉƉƉƉƉƉƉƉƉƉƉƊƌƉƈƉƉƉƉƉƉƉƈƈƌƑƓƕƕƓƑƎƌ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƈƈƈƇƉƍƏƏƎƎƌ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƋƌƌƋƋƎƎƎƏƐƎƍƎƎƍƌ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƌƓƘƛƛƚƙƛƚƘƙƙƗƕƓƐƎƌ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƌƍƈƈƉƉƉƉƌƒƔƖƖƖƘƗƘƘƗƙƗƕƓƐƎƍ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƍƕƔƎƊƈƉƉƉƈƈƈƇƈƋƋƍƎƍƐƏƎƍƍƎƍ",
"ƉƉƈƉƉƉƉƉƉƉƉƉƉƉƉƏƘƙƓƐƍƊƉƉƉƉƉƉƉƉƉƈƈƈƈƋƌƎƏƍ",
"ƉƍƏƇƈƉƉƉƉƉƉƉƉƉƉƉƌƒƖƗƑƍƊƉƉƉƉƉƉƉƉƈƈƍƑƓƒƑƐƍ",
"ƉƋƗƖƎƋƈƈƉƉƉƉƈƈƈƈƇƈƋƎƏƎƋƉƉƉƉƉƉƈƉƍƓƖƗƖƑƍƋƊ",
"ƉƉƎƗƚƕƑƎƊƉƉƊƏƏƑƓƑƑƒƑƐƎƋƉƉƉƉƉƈƎƖƘƗƓƎƍƋƊƉƉ",
"ƉƉƉƋƐƕƗƑƍƊƉƉƍƖƛƝƝƚƙƖƒƎƊƉƉƉƉƋƕƙƗƏƌƊƉƉƉƉƉƉ",
"ƈƈƈƈƈƊƍƏƍƊƉƉƉƌƎƎƐƒƑƐƐƍƉƉƉƉƊƏƏƎƋƉƉƉƉƉƉƉƉƉ",
"ƐƓƔƒƒƔƒƑƎƋƉƉƉƉƈƈƉƊƊƊƊƊƉƉƉƉƉƋƉƈƉƉƉƈƉƉƉƉƉƉ",
"ƕƛƞƝƛƙƖƒƎƊƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƈƑƌƈƈƉƉƉ",
"ƋƌƍƍƒƐƏƏƍƋƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƌƙƘƏƋƈƉ",
"ƉƉƉƉƊƉƉƎƎƋƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƍƖƙƗƒƎ",
"ƉƉƉƉƉƌƔƒƏƋƉƉƉƉƉƉƉƉƈƈƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƊƎƕƖƑ",
"ƉƉƉƉƑƘƖƎƊƉƉƉƉƉƉƉƋƐƓƐƍƌƌƌƌƊƉƉƉƉƉƈƈƈƈƈƈƉƌƎ",
"ƉƉƉƖƙƐƊƉƉƉƉƉƉƉƉƉƉƊƌƓƚƙƖƓƐƍƊƉƉƉƋƑƑƗƖƕƔƖƔƑ",
"ƉƉƍƐƊƉƉƉƉƉƉƉƉƉƉƉƉƉƉƊƊƎƒƓƑƎƋƉƉƉƉƎƗƙƟƝƚƙƖƑ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƌƏƎƋƉƉƉƉƉƊƊƊƌƏƎƏƎ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƈƊƏƕƖƒƏƋƉƉƉƉƉƉƉƉƉƉƉƊƏ",
"ƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƉƋƒƘƜƜƙƗƔƐƋƉƉƉƉƉƉƉƉƉƉƎƕƑ",
"ƉƉƓƍƉƉƉƉƉƉƉƉƉƉƉƉƌƗƛƙƗƓƏƋƉƉƉƉƉƉƉƉƉƉƉƊƓƘƔƍ",
];
bMat = [
"ĐĐĐĐđĤĶıĩġĖđĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐ",
"ĐĐĐĐĐĐĚīįĬĪħĢěėĔĒĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐ",
"ĐĐĐĐĐĐĐĐęħĩħģğěėĔđĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐ",
"ĐĐĐĐĐĐĐĐĐĐėĢĢĞĚėĔđĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐ",
"ĐĐĐĐĐĐĐđđđđđĔęĚėĔēĔĒđĐĐĐĐĐĐĐĐĐĐĐĔĒĒĒđđđđ",
"ĒĕĕĕĔĔĜĞĞĥĢġĝĜěėĔđĠīĝēđđđĐĐĐĐĐĐĐĎģĭĨĥģĠĞ",
"ġĽŀĿļĺĶĳıĭĪĨģğěėĔđĐĚĩīģĝĘēĐĐĐĐĐĐĐďđğĨĨĦĠ",
"ďčĜĥĨĳįĮĭĪĨĦģğěĘĔđĐďĐěģġěĖđĐĐĐĐĐĐĐĐďĎēĖĜ",
"ĐĐďĎĎčĎĒėėĜĞğĜĚėēđĒđđđēĘĚĖđĐĐĐĐĐĐďďđēēĝĢ",
"ĐĐĐĐĐĐĐĐďďďďĐēėĚěĠĥġġģĢĞĚĖđĐĐĐĐĐĒĖĘĞĦĭīĥ",
"ĐĐĐĐĐĐĐĐĐĐđĕĚĞĜģĲķĴĲįīħġěĖđĐĐĐĐďěĮĹĵİĩģě",
"ĐĐĐĐĐĐĐĐđĖĝĦĥğěĖđčđęĝĞěĚĚĖđĐĐĐĐďĜěęĘėĎĎď",
"ĐĐĐĐĐĐĐēĝĩĬĦĠěĖēĐĐĐďďĎđėęėĔēďďďĐďďďďďĐĐĐ",
"ĐĐĐĐĐĐĘĦİĪĢĚĔĐďĐĐĐĐďĐĖġĢĚėėĜĝęĕđďďďďĐĐĐĐ",
"ĐĐĐĐĐĚīĭģĚđďďĐĐĐĐĐďēĜģģĚĒĐĎĘĪĪĨġĚęĕĔēđđĐ",
"ĐĐĐĐēĤĢĖčďĐĐĐĐĐĐĐĐđĜģĘďďĐĐĐďďĘĦĪĮĭĥĢĝĘĕĔ",
"ĐĐĐĐēĔĎďĐĐĐĐĐĐĐĐĐĐēĕđďĐĐĐĐĐĐĐďďĕĞģĦħģğĚė",
"ĐĐĐĐĐďĐĐĐĐĐĐĐĐĐĐĐĐĐďĐĐĐĐďďďďďďďĎčđėěĚĚęė",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐďďĔĖĕĔĔęĚĘěěĚĘĘęęė",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐĐďďĐĐĐĐĐďĕġīııĮĬİįīĭĬĪħĢĞĚė",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐđĖėďďĐĐĐďĕĠģħĨħīĪīīĩīĪħģĞĚė",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐĐėĥĥęđďďĐďĎĎččďēĔėĘĘěěęėĘęė",
"ĐďďĐĐĐĐĐĐĐĐĐĐĐđĜīĬģĝėēđĐĐĐĐĐďďďďďĎĎĔėęęė",
"ĐėęčďďĐĐĐĐĐĐĐĐĐĐĕĠħĨĠĘēĐĐĐĐĐĐĐĐďďĖğĢĢĞĜĖ",
"ĐĕĪĨęĔĎďĐĐĐĐďďĎĎčďĔęěęĔĐĐĐĐĐĐďďĘģħīĦğĘĕĒ",
"ĐĐĚĪĭĥĞęĔđĐĒĚĜğĢĞğĠğĝĚēĐĐĐĐďďęĦĪĪĠĚėĔđĐĐ",
"ĐĐďĕĝĥĩĠęēĐđĘħıĴĳįĭħġĚēĐĐĐďēĦĭĩěĖĒĐďĐĐĐĐ",
"ďĎĎĎďĒėěęĕĐĐđĖęęĜĠĞĝĜėđĐĐĐĒěěęĕĐďĐĐĐĐĐĐĐ",
"ĜģĤĠğĤġĞĚĕĐĐĐďďďĐđĒĒĒđĐĐĐĐđēĐďďĐĐďďĐĐĐĐĐ",
"ħİĵĳįĬĨĠĚĕĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐďĞĖĎďĐĐĐ",
"ĔĖėėğĝěĜęĕĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĕĭīĚĔďď",
"ĐďďďđđĐĚěĕĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĘĨĭĨĢĚ",
"ĐĐĐĐďĕģġěĕĐĐĐĐĐĐĐďďďďďĐĐĐĐĐĐĐĐĐĐĐĐĐĒęĦĦğ",
"ĐĐĐďĝĪĨĚĒĐĐĐĐĐĐĐēĝġĜĘėĕĖĖĔđĐĐĐĐďďĎĎĎďđĕĚ",
"ĐĐĐĨĬĜđđĐĐĐĐĐĐĐĐĐđĔĢĮĭĨģĝėĒĐĐĐĔĞĞĩħĤĤħģğ",
"ĐĐĘĝĒđĐĐĐĐĐĐĐĐĐĐĐĐĐđēĚĠġğęēĐĐĐĐęĨĮķĳįīĦğ",
"ĐĐĐđĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐďĕěĚĕđĐĐĐĐđĒĒĔěęĚĚ",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐďĒěĥĨĢĜĔĐĐĐĐĐĐĐĐĐĐĐđĜ",
"ĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐĐďēġīııĭĩĥĝēĐĐĐĐĐĐĐĐĐďĚĥĠ",
"ĐĐĢėĐĐĐĐĐĐĐĐĐĐĐďĖĪıĭĪģěēĐĐĐĐĐĐĐĐĐĐĐĒģĪĤė",
];


noStroke();
for(var i  = 0 ; i < 40 ; i++){
    for(var j = 0 ; j < 40 ; j++){
        if(rMat[i].charCodeAt(j) + gMat[i].charCodeAt(j) + bMat[i].charCodeAt(j) < 1355 ){
            fill(rMat[i].charCodeAt(j) - 200,gMat[i].charCodeAt(j) - 200, bMat[i].charCodeAt(j) - 200);
            rect(10*i,10*j,10,10);
        }
    }
}


	//image(aImg,0,0,400,400);
    gameVariables.images.push(get(0,0,400,400));
    
    background(0,0,0,0);
    pushMatrix();
    translate(200,200);
    scale(2,1);
    strokeWeight(1);
    stroke(0,0,0);

    strokeWeight(3);
    line(2,-170,7,-183);
    line(-2,-170,-7,-183);
    noStroke();
    
    noStroke();
    fill(214, 7, 7);
    ellipse(0,-140,36,60);
    rect(-10,-140,20,40);
    fill(0,0,0);
    ellipse(8,-154,7,5);
    ellipse(-8,-154,7,5);
    fill(214, 7, 7);
    

    beginShape();
        curveVertex(-31,4); 
        curveVertex(8,-60); 
        curveVertex(-10,-105); 
        curveVertex(7,-104); 
        curveVertex(23,-55); 
        curveVertex(-12,3); 
        curveVertex(32,53); 
        curveVertex(-3,120); 
        curveVertex(34,162); 
        curveVertex(19,155); 
        curveVertex(-20,121); 
        curveVertex(12,55); 
        curveVertex(-31,4); 
        curveVertex(8,-60); 
        curveVertex(-10,-105); 
    endShape();
    popMatrix();
    
    gameVariables.snakeImages.push(get(80,0,240,400)); // snakeImages 0
    
    background(0,0,0,0);
    pushMatrix();
    translate(200,200);
    scale(2,1);
    strokeWeight(1);
    stroke(0,0,0);

    strokeWeight(3);
    line(2,-170,7,-183);
    line(-2,-170,-7,-183);
    noStroke();
    
    noStroke();
    fill(214, 7, 7);
    ellipse(0,-140,36,60);
    rect(-10,-140,20,40);
    fill(0,0,0);
    ellipse(8,-154,7,5);
    ellipse(-8,-154,7,5);
    fill(214, 7, 7);
    beginShape();
        curveVertex(31,4); 
        curveVertex(-8,-60); 
        curveVertex(10,-105); 
        curveVertex(-7,-104); 
        curveVertex(-23,-55); 
        curveVertex(12,3); 
        curveVertex(-32,53); 
        curveVertex(3,120); 
        curveVertex(-34,162); 
        curveVertex(-19,155); 
        curveVertex(20,121); 
        curveVertex(-12,55); 
        curveVertex(31,4); 
        curveVertex(-8,-60); 
        curveVertex(10,-105);
    endShape();
    popMatrix();
    
    gameVariables.snakeImages.push(get(80,0,240,400));    //snakeImages 1
        
    
    //soccer ball images :- 
    var pointSet = [];

    
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

gameVariables.ballImages.push(get(125,125,150,150));  //image 0 for soccer_animation_0

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


gameVariables.ballImages.push(get(125,125,150,150)); //image 1 for soccer_animation_1


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


gameVariables.ballImages.push(get(125,125,150,150)); //image 2 for soccer_animation_2


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


gameVariables.ballImages.push(get(125,125,150,150)); //image 3 for soccer_animation_3

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


gameVariables.ballImages.push(get(125,125,150,150)); //image 4 for soccer_animation_4*/

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


gameVariables.ballImages.push(get(125,125,150,150)); //image 5 for soccer_animation_5*/

//Turtle :- 
  
    
        //background.
    background(0,0,0,0);
    noStroke();
    
    //Turtle Head :- 
    fill(74, 122, 35);

    ellipse(200,73,50,90);

    fill(0, 0, 0);
    ellipse(197,36,7,3);
    ellipse(203,36,7,3);

    fill(255,255,255);
    ellipse(190,53,10,10);
    ellipse(210,53,10,10);
    fill(0,0,0);
    ellipse(191,51,6,6);
    ellipse(209,51,6,6);


    //Flippers
    pushMatrix();
    translate(198,215);
   // rotate(this.angle);
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( 28,  - 105);
        bezierVertex( 71,-121,196, -12,   165, - 76);
        bezierVertex( 108, -160,21, -160 , 28, - 105);
    endShape();
    popMatrix();
    
    pushMatrix();
    translate(171,370);
       // rotate(this.angle);
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( 28,  - 105);
        bezierVertex( 71,-121,196, -12,   165, - 76);
        bezierVertex( 108, -160,21, -160 , 28, - 105);
    endShape();
    popMatrix();
    
    
    
    pushMatrix();
    translate(208,215);
   // rotate(this.angle);
    noStroke();
    fill(74, 122, 35);

    beginShape();
        vertex( -28,  - 105);
        bezierVertex( -71,-121,-196, -12,   -165, - 76);
        bezierVertex( -108, -160,-21, -160 , -28, - 105);
    endShape();
    popMatrix();

    pushMatrix();
    translate(229,370);
   // rotate(this.angle);
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( -28,  - 105);
        bezierVertex( -71,-121,-196, -12,   -165, - 76);
        bezierVertex( -108, -160,-21, -160 , -28, - 105);
    endShape();
    popMatrix();

    
    //Body 
    fill(99, 209, 25);
    ellipse(200,200,200,250);
    fill(74, 122, 35);
    ellipse(200,200,175,207);
   // gameVariables.turImages.push(get(100,0,200,400)); 
    gameVariables.turImages.push(get(0,0,400,400));  //turtle position 0

   
    background(0,0,0,0);

    noStroke();
    
    //Turtle Head :- 
    fill(74, 122, 35);
    ellipse(200,73,50,90);

    fill(0,0,0);
    ellipse(197,36,7,3);
    ellipse(203,36,7,3);

    fill(255,255,255);
    ellipse(190,53,10,10);
    ellipse(210,53,10,10);
    fill(0,0,0);
    ellipse(191,51,6,6);
    ellipse(209,51,6,6);

    pushMatrix();
    translate(198,215);
    rotate(toPI*15);
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( 28,  - 105);
        bezierVertex( 71,-121,196, -12,   165, - 76);
        bezierVertex( 108, -160,21, -160 , 28, - 105);
    endShape();
    popMatrix();
    
    pushMatrix();
    translate(171,370);
    rotate(toPI*9);
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( 28,  - 105);
        bezierVertex( 71,-121,196, -12,   165, - 76);
        bezierVertex( 108, -160,21, -160 , 28, - 105);
    endShape();
    popMatrix();
    
    
    
    pushMatrix();
    translate(208,215);
    rotate(toPI*(-15));
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( -28,  - 105);
        bezierVertex( -71,-121,-196, -12,   -165, - 76);
        bezierVertex( -108, -160,-21, -160 , -28, - 105);
    endShape();
    popMatrix();

    pushMatrix();
    translate(229,370);
    rotate(toPI*(-7));
    noStroke();
    fill(74, 122, 35);
    beginShape();
        vertex( -28,  - 105);
        bezierVertex( -71,-121,-196, -12,   -165, - 76);
        bezierVertex( -108, -160,-21, -160 , -28, - 105);
    endShape();
    popMatrix();

    
    //Body 
    fill(99, 209, 25);
    ellipse(200,200,200,250);
    fill(74, 122, 35);
    ellipse(200,200,175,207); 
   // gameVariables.turImages.push(get(100,0,200,400)); //turtle position 1
    gameVariables.turImages.push(get(0,0,400,400));

    
    //Turtle Position 3 (inside Shell)
 
    background(0,0,0,0);
    noStroke();
    
    //Body 
    fill(99, 209, 25);
    ellipse(200,200,200,250);
    fill(74, 122, 35);
    ellipse(200,200,175,207); 
    gameVariables.turImages.push(get(0,0,400,400)); //turtle position 2
    

};

//Start Screen.
{
var startScreen = function(){

};

}
//end Screen.
{
var endScreen = function(){
    
};
endScreen.draw = function() {
    fill(43, 133, 67);
    rect(0,0,400,400);
    fill(31, 28, 28);
    textSize(22);
    text("You lose",100,200);
    text("New game in :-",100,230);
    text(floor(5-(gameVariables.endScreenTimer)/60),150,260);
    
};
endScreen.update = function(){
    gameVariables.endScreenTimer++;
    if(gameVariables.endScreenTimer === 300){
        gameVariables.init();
       
    }
};
}


//backDrop
{
    var backDrop = function(){
    
    };
    backDrop.draw = function() {
        //Draw grass tiles
        for(var i = 0 ; i < 20 ; i++){
            for(var j = 0; j < 20 ; j++){
                image(gameVariables.images[0],i*20,j*20,20,20);
            }
        }
        
        //Draw Ground Shooter Zone
        noStroke();
        fill(27, 161, 184);
        rect(0,360,400,40,2);
        fill(0,0,0);
        text("Hits :- "+gameVariables.hits,10,393);
        text("Time :- "+floor(gameVariables.time/60),300,393);
    };
}

//ball object - decorate later
{
var ballObj = function(x,y){
    this.position = new PVector(x,y);
    //this.velocity = new PVector(0,-random(5,10));
    this.velocity = new PVector(0,-3); //same velocity as the max speed for NPC
    // Based on the equation of motion :- v^2 - u^2 = 2*a*s :-
    // A drag of less than (this.velocity.y)*(this.velocity.y)/800 ensures ball reaches the top.
    this.drag  = new PVector(0, random(0,(this.velocity.y)*(this.velocity.y)/800));
    
    this.tag = false; 
    
    //this.size = random(40,60);
    this.size = 40;
    this.color = [round(random(1,254)),round(random(1,254)),round(random(1,254))];
    
    this.skipWait = false;
    
    this.aAcc = 0;
    this.aVelocity = 0;
    this.angle = 0;
    this.idx = 0;
    this.moveCount = 0;
    this.prevPosition = new PVector(x,y);
    this.changePos = new PVector(x,y);
    
    
};

ballObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    var xpos = 10 - this.position.y/20;
    ellipse(xpos,10,4*abs(xpos),20);
    rotate(toPI*this.angle);
    image(gameVariables.ballImages[this.idx],-20,-20,40,40);
    popMatrix();
};

ballObj.prototype.update = function(){
    this.position.add(this.velocity);
    this.velocity.add(this.drag);

    
    //angular dynamics :-
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
    
    
    
    if(this.position.y < 0){  //might need to change this.
        return false;
    }
    else{
        return true;
    }

};

var rollingBalls = [];

}

var startScreenBall = new ballObj(0,100);
startScreenBall.velocity.set(4,0,0);
startScreenBall.drag.set(0,0,0);
startScreen.draw = function() {

    fill(54, 81, 150);
    rect(0,0,400,400);
    fill(26, 217, 147);
    noStroke();
    rect(120,180,200,50,15);
    fill(224, 75, 20);
    textSize(24);
    text("Dodge-Ball",150,210);
    fill(31, 28, 28);
    textSize(18);
    text("click mouse to begin",50,290);
    text("Move shooter using arrow keys",50,320);
    text("press SHIFT to shoot the animals",50,350);
    text("You lose if all animals cross safely",50,380);
    startScreenBall.draw();
    startScreenBall.update();
    if(startScreenBall.position.x > 400){
        startScreenBall.position.x = 0;
    }
};
//ground Shooter - also manages the drawing and update of the balls.
//can fire two balls per second

{
    var groundShooterObj = function(x,y){
        this.position = new PVector(x,y);
        this.speed = 3;
        this.gunRestoreTimer = 0;
        this.framesBetnShots = 30;
    };
    
    groundShooterObj.prototype.draw = function() {
        fill(0,0,0);
        pushMatrix();
            translate(this.position.x,this.position.y);
            rect(-20,0,40,10);
            rect(-4,-10,8,10);
        popMatrix();
        
        for(var i = 0 ; i < rollingBalls.length ; i++){
            rollingBalls[i].draw();
        }
    };
    
    groundShooterObj.prototype.update = function(){
        if(gameVariables.keyArray[RIGHT] === 1){
            
            if(this.position.x < 380){
                this.position.x += this.speed;
            }
        }
        
        if(gameVariables.keyArray[LEFT] === 1){
            if(this.position.x > 20){
                this.position.x -= this.speed;
            }
        }
        
        if(gameVariables.keyArray[SHIFT] === 1 && this.gunRestoreTimer === 0){
            rollingBalls.push(new ballObj(this.position.x,this.position.y));
            this.gunRestoreTimer = 1;
        }
        
        if(this.gunRestoreTimer > 0){
            this.gunRestoreTimer = (this.gunRestoreTimer + 1)%this.framesBetnShots;
        }
        
        var spliceIdx = -1;
        
        for(var i = 0 ; i < rollingBalls.length ; i++){
            if(!rollingBalls[i].update()){
             spliceIdx = i;   
            }
        }
        if(spliceIdx !== -1){
             rollingBalls.splice(spliceIdx,1);
        }
    };
    
    var groundShooter = new groundShooterObj(200,370);
}
/*
var aggressiveState = function(){
    this.hits = 0;
};

aggressiveState.prototype.reset = function(){
    this.hits = 0;
};
*/

var turnState = function(){
    this.numTurns = 0;
    this.dontSeekTimer = 0;
    this.hits = 0;
};

turnState.prototype.reset = function(){
    this.numTurns = 0;
    this.dontSeekTimer = 0;
    this.hits = 0;
};
var backTrackingState = function(){
  
    this.dontSeekTimer = 0;
    this.hits = 0;
};

backTrackingState.prototype.reset = function(){
    this.dontSeekTimer = 0;
    this.hits = 0;
};

var waitState = function(){
    this.hits = 0;
    this.beginWait = 0;
    this.time = 0;
};
waitState.prototype.reset = function(){
    this.hits = 0;
    this.beginWait = 0;
    this.time = 0;
};
var evadeState = function(){
    this.dontSeekTimer = 0;
    this.hits = 0;
};
evadeState.prototype.reset = function(){};

var npcs = [];

// steering functions and data owned by the NPC itself.
// but steering behavior will be chosen by the states.
{
    //might use a general npc object instead of separate later    
    var npcObj =  function(dir, id){
        this.id = id;
        this.dir = dir; // 0 or 1
        this.animCount = 0;
        //npc data
        this.position = new PVector(this.dir*400,round(random(this.id*75+75,this.id*75 + 100)));  //goes from left to right.
        this.velocity = new PVector(0,0);
        this.acceleration = new PVector(0,0);
        this.angle = 0;
        this.currState = 0;
        
        this.aggression = floor(random(1,2));  // this will be used to change the behavior of the NPCs when they are hit in accordance with the aggression factor.

      //  this.states = [new aggressiveState(),  new turnState(), new backTrackingState(), new waitState() , new evadeState()];
        
        this.states = [new turnState(), new backTrackingState(), new waitState()];
        this.maxSpeed = 1 + this.aggression;
        this.maxForce = 5; //experimental
        
        if(this.id === 0){
            this.aggression = 1;
            this.maxSpeed = 1;
        }
        
        this.target = (1-this.id)*400;  
        
        this.detectionBoxLength = 50;
        
        this.tag = false;
        this.crossed = false;
        
        // Steering data :- 
        this.seekWeight = 1;   // let these weights be controlled by state machine instead.
        this.obstacleAvoidanceWeight = 20.0; 
        this.brakingWeight = 0.5;
        
        
        //these variables will be used to hold data for steering,to avoid freq memory allocation.
        this.steeringForce = new PVector(0,0);
        //seek :- 
        this.curTarget = new PVector(0,0); 
        this.desiredVelocity = new PVector(0,0);
        this.dontSeekTimer = 0;
        this.dontSeekTime = 30;
        //obstacle information :- 
        this.closestIntersectingObstacleId = -1;
        this.distToClosestIntersectingObstacle = -1;
        this.localPos = new PVector(0,0);
        this.closestObstacleLocalPos = new PVector(0,0);
        this.relPos = new PVector(0,0);
        this.relHeading = 0;

        
        //debug data :-
        this.obstacleFound = 0;
        this.detBoxDispTimer = 0;

    };
    var npc = new npcObj(200);

    npcs.push(new npcObj(0,0));
    npcs.push(new npcObj(0,1));
    npcs.push(new npcObj(1,2));
    npcs.push(new npcObj(1,3));
  
    npcObj.prototype.changeState = function(x){
        this.currState  = x;
        this.states[this.currState].reset();

    };
    npcObj.prototype.nextState = function(){
        this.currState = (this.currState + 1)%(this.states.length);    
        this.states[this.currState].reset();
    };
    
    
    npcObj.prototype.tagNeighbors = function(){
    // for now just tagging rollingBalls.
    for(var i = 0 ; i < rollingBalls.length ; i++){
        rollingBalls[i].tag = false; //clear any previous tags.
        var range = (rollingBalls[i].size/2) + this.detectionBoxLength ;
        var dsq = ((rollingBalls[i].position.x - this.position.x)*(rollingBalls[i].position.x-this.position.x)) + ((rollingBalls[i].position.y - this.position.y)*(rollingBalls[i].position.y-this.position.y));
        if(dsq < (range*range)){
            rollingBalls[i].tag = true;  
        }
    }
};    
    npcObj.prototype.tagNearNpcs = function(){
    
        for(var i = 0 ; i < npcs.length ; i++){
            npcs[i].tag = false; //clear any previous tags.
            var range = 80;//(npcs[i].size/2) + this.detectionBoxLength ;
            var dsq = ((npcs[i].position.x - this.position.x)*(npcs[i].position.x-this.position.x)) + ((npcs[i].position.y - this.position.y)*(npcs[i].position.y-this.position.y));
            if(dsq < (range*range)){
                npcs[i].tag = true;  
            }
        }
        this.tag = false;
    };
    //finds closest obstacle (it's id, distance, localPosition) within the detection box range
    //can use this in wait and approach too.
    npcObj.prototype.detBoxObstacleSearch = function(){
            
        this.closestIntersectingObstacleId = -1;
        this.distToClosestIntersectingObstacle = -1;
        for(var i = 0 ; i < rollingBalls.length ; i++){
        
            if(rollingBalls[i].tag){
            //compute local position :- 
            {
                this.relPos.set(rollingBalls[i].position.x,rollingBalls[i].position.y,0);
                this.relPos.sub(this.position);
                
                this.relHeading = this.relPos.heading() - this.velocity.heading();
                if(this.relHeading < -(PI) ){
                    this.relHeading += 2*PI;
                }
                if(this.relHeading > PI){
                    this.relHeading = 2*PI - this.relHeading;
                }
                this.localPos.set((cos(this.relHeading))*this.relPos.mag(),(sin(this.relHeading))*this.relPos.mag(),0);
            }
            if(this.localPos.x >= 0){
                var expRadius = 0.5*(rollingBalls[i].size + this.detectionBoxLength);
                if(abs(this.localPos.y) < expRadius){
                    var cX = this.localPos.x ;
                    var cY = this.localPos.y ;
                            
                    var sqrtPart = sqrt(expRadius*expRadius - cY*cY);
                    var ip = cX - sqrtPart;
                    if(ip <= 0){
                        ip = cX + sqrtPart;
                    }
                    
                    if(this.distToClosestIntersectingObstacle === -1                                                       || ip < this.distToClosestIntersectingObstacle){
                        this.distToClosestIntersectingObstacle = ip;
                        this.closestIntersectingObstacleId = i;
                        this.closestObstacleLocalPos.set(this.localPos.x,this.localPos.y,0);
                    }
                        
                }
                    
                    
            }
                
        }
        
        
    }
    };
    
    //simplified version of seek, since target is x = 400.
    npcObj.prototype.seek = function(){
        //set target :-
        //modify this later. taking into consideration which direction is the target.
        this.steeringForce.set(((-2)*this.dir + 1)*3,0,0);
    };
    //dir should be 1 or -1
    npcObj.prototype.obstacleAvoidance =  function(dir){
        this.steeringForce.set(0,0,0);
        //Tag obstacles within viewing range :- 
        this.tagNeighbors();

        //for now assume obstacles are rollingBalls.
        this.detBoxObstacleSearch();


        if(this.distToClosestIntersectingObstacle !== -1){
            
        var multiplier = 1.0 + (this.detectionBoxLength - this.closestObstacleLocalPos.x)/this.detectionBoxLength ; 
            this.steeringForce.y = (dir)*(multiplier)*(rollingBalls[this.closestIntersectingObstacleId].size - this.closestObstacleLocalPos.y );
           this.steeringForce.x = this.brakingWeight*(rollingBalls[this.closestIntersectingObstacleId].size - this.closestObstacleLocalPos.x );
            //convert force to global co-ordinates
            var angle = this.steeringForce.heading() + this.velocity.heading();
            if(angle > PI){
                angle = 2*PI - angle;
            }
            if(angle < -PI){
                angle += 2*PI;
            }
            var magn = this.steeringForce.mag();
            this.steeringForce.set(magn*cos(angle),magn*sin(angle),0);
            if(this.steeringForce.mag() !== 0){
                this.steeringForce.normalize();
            }
      //      this.steeringForce.mult(this.obstacleAvoidanceWeight);
            //modify the acceleration in accordance with steering force as unit mass. :- 
            //this.dontSeekTimer++;  //do this inside state machine
            return true;
        }
        return false;
};
    
    npcObj.prototype.separation = function(){
        
        this.steeringForce.set(0,0,0);
        this.tagNearNpcs();
        for(var i = 0 ; i < npcs.length ; i++){
            if(npcs[i].tag){
                this.relPos.set(this.position.x,this.position.y,0);
                this.relPos.sub(npcs[i].position);
                var d = this.relPos.mag();
           
                if(d !== 0){
                    this.relPos.normalize();
                    this.relPos.mult(1/d);
                    this.steeringForce.add(this.relPos);
                }
            }
        }
        this.steeringForce.mult(120);
        
    };
    
    
    //update positions in accordance with steering force :-
    npcObj.prototype.updatePos = function(){
        
        //add the separation force.
        this.separation();
        this.acceleration.add(this.steeringForce);
        
        
        //truncate the acceleration :- (need to experiment this).
        if(this.acceleration.mag() !== 0){
            this.acceleration.normalize();
            this.acceleration.mult(this.maxForce);
        }
        this.velocity.add(this.acceleration);
/*        if(abs(this.velocity.x) < 0.000001){
            this.velocity.x = 0;
        }
        if(abs(this.velocity.y) < 0.000001){
            this.velocity.y = 0;
        }*/
        
        if(this.velocity.mag() > 3){
            this.velocity.normalize();
            this.velocity.mult(this.maxSpeed);
        }
        this.position.add(this.velocity);
        
        //basic roof wall avoidance , replace with steering force later.
        if(this.position.y < 0 || this.position.y > 360){
            this.position.sub(this.velocity);
            this.velocity.y = -this.velocity.y;
        }
        
        this.angle = this.velocity.heading();
        this.detBoxDispTimer++;
        

        //For the purpose of developing, make the object come back from the other side.
        {
        if((this.dir === 0 && this.position.x > 400) || (this.dir === 1 && this.position.x < 0)){
            this.crossed = true;
            gameVariables.crossed++;
            if(gameVariables.crossed === 4){
                gameVariables.endGame();
            }
            return;
        }

        if(this.position.x < 0 || this.position.x > 400){
            this.position.sub(this.velocity);
            this.velocity.x = -this.velocity.x;
        }

        }
        
    };
    
    
// implement steering forces for separation, wall avoidance. 

    
    npcObj.prototype.update = function(){
        this.animCount++;
      // this.detectionBoxLength = 50*(this.velocity.mag()/3);
        
        //checks for collision with the balls.
        for(var i  = 0 ; i < rollingBalls.length ; i++){
            if(dist(this.position.x,this.position.y,rollingBalls[i].position.x,rollingBalls[i].position.y) < rollingBalls[i].size/2 ){
                
                this.position.set(this.dir*400,round(random(this.id*75+75,this.id*75 + 100)),0);
                
                this.velocity.set(0,0,0);
                gameVariables.hits++;
                this.states[this.currState].hits++;
                return;
             }
        }
    

        this.acceleration.set(0,0,0);
        this.states[this.currState].execute(this);

       
    };
    
    npcObj.prototype.draw = function() {
        pushMatrix();
            translate(this.position.x,this.position.y);
            rotate(this.angle+PI/2);
/*            stroke(0,0,0);
           // line(-200,0,200,0);
           // line(0,-200,0,200);
            noStroke();
            fill(30, 204, 175);
            rect(-20,-10,40,20,5);
            fill(255,24,24);
            rect(10,-10,10,20,5);
            fill(0,0,0);
            textSize(16);
            text(1,-3,5);
            if(this.detBoxDispTimer%60 < 30){
                fill(0,255,0);
                //rect(20,-10,this.detectionBoxLength,20);
            }*/
        if(this.id !== 0){
            if(this.animCount % 30 < 15){
                image(gameVariables.snakeImages[0],-10,-20,20,40);
            }
            else{
                image(gameVariables.snakeImages[1],-10,-20,20,40);
            }
        }
        else{
            if(this.velocity.mag() === 0){
                image(gameVariables.turImages[2],-10,-20,20,40);
            }
            else{
                if(this.animCount % 30 < 15){
                    image(gameVariables.turImages[0],-10,-20,20,40);
                }
                else{
                    image(gameVariables.turImages[1],-10,-20,20,40);
                }
            }
        }
        popMatrix();
    };
    
}

//state execution :- 
{
    //not using this state :- as it produces jitery behavior
    /*
    aggressiveState.prototype.execute = function(me){
        me.obstacleAvoidance(-1);
        me.steeringForce.mult(20.0);
        me.acceleration.add(me.steeringForce); 
        
        me.seek();
        me.acceleration.add(me.steeringForce);
        me.updatePos();
        
        if(this.hits === 3){
            me.nextState();
        }

    };
    */
    turnState.prototype.execute = function(me){
        var obstacleFound = me.obstacleAvoidance(-1*(this.numTurns%2));
        if(obstacleFound){
            this.dontSeekTimer++;
        }
        if(this.dontSeekTimer > 0 ){
            this.dontSeekTimer++;
        }
        if(this.dontSeekTimer > 30){
            this.dontSeekTimer = 0;
            this.numTurns++;
        }
       
        me.steeringForce.mult(20.0);
        me.acceleration.add(me.steeringForce); 
        if(this.dontSeekTimer === 0){
            me.seek();
            me.acceleration.add(me.steeringForce);
        }
        me.updatePos();
        if(this.hits === 4 * me.aggression){
            me.nextState();
        }
    };
    
    backTrackingState.prototype.execute = function(me){
        var obstacleFound = me.obstacleAvoidance(-1);
        if(obstacleFound){
            this.dontSeekTimer++;
            me.steeringForce.set((2*me.dir)-1,0,0); //depending on target use -1 or 1
            me.steeringForce.mult(20.0);
            me.acceleration.add(me.steeringForce); 
        }
        if(this.dontSeekTimer > 0 ){
            this.dontSeekTimer++;
        }
        if(this.dontSeekTimer > 30){
            this.dontSeekTimer = 0;
            this.numTurns++;
        }

        if(this.dontSeekTimer === 0){
            me.seek();
            me.acceleration.add(me.steeringForce);
        }
        me.updatePos();
        if(this.hits === 2 * me.aggression){
            me.nextState();
        }
    };
    
    waitState.prototype.execute = function(me){
    this.time++;
    //wait behavior :-
    var minD = -1;
    var minId = -1;
    for(var i = 0 ; i < rollingBalls.length ; i++){
        var d = (me.position.x-rollingBalls[i].position.x)*(me.position.x-rollingBalls[i].position.x) + (me.position.y-rollingBalls[i].position.y)*(me.position.y-rollingBalls[i].position.y);
        
        if(minD === -1 || d < minD){
            minD = d;
            minId = i;
        }
        
    }
    
    if( minId !== -1 && minId < rollingBalls.length  && minD > 0 && minD < 5000 && rollingBalls[minId].position.x -(0.5*rollingBalls[minId].size) > me.position.x){
    //&& (rollingBalls[minId].position.x -(0.5*rollingBalls[minId].size)) > me.position.x && (rollingBalls[minId].position.y + (0.5*rollingBalls[minId].size)) > me.position.y){
        //return;
        if(rollingBalls[minId].skipWait === false){
            if(this.beginWait === 0){
                this.beginWait = 1;
                if(minId !== rollingBalls.length - 1){
                    rollingBalls[rollingBalls.length - 1].skipWait = true;
                }
            }

            return;
        }
    }
        this.beginWait = 0;
        me.seek();
        me.acceleration.add(me.steeringForce);
        me.updatePos();
        if(this.hits === (3-me.aggression) || this.time > (3600/me.aggression)){
            me.nextState();
        }
    };
}

keyPressed = function(){
    gameVariables.keyArray[keyCode] = 1;
};
keyReleased = function(){
    gameVariables.keyArray[keyCode] = 0;
};

mouseClicked =  function(){
    if(gameVariables.start === 0){
        gameVariables.start = 1;
        return;
    }
    if(gamePause === 1){
        gamePause = 0;
    }
};

draw = function() {
    background(24,24,24);
    if(gameVariables.start === 0){
        if(gameVariables.customCharMade === 0){
            customChar();
        }
        startScreen.draw();
    }
    else if(gameVariables.start === 1){
        
        // Draw the game objects
        backDrop.draw();
        groundShooter.draw();
        // Update the game objects
        groundShooter.update();
        gameVariables.time++;

        for(var i = 0 ; i < npcs.length ; i++){
            if(!npcs[i].crossed){
                npcs[i].draw();
            }
        }
        for(var i = 0 ; i < npcs.length ; i++){
            if(!npcs[i].crossed){
                npcs[i].update();
            }
           
        }


    }
    else{
        endScreen.draw();
        endScreen.update();
        if(gameVariables.gameObjectsRecreate === 0){
                npcs = [];
                npcs.push(new npcObj(0,0));
                npcs.push(new npcObj(0,1));
                npcs.push(new npcObj(1,2));
                npcs.push(new npcObj(1,3));
        }
    }
    
    
};



}};
