//var themeframe;
var song;
var player;
var playerBlast;
var road;
var playerImage;
var traffic = [];
var huts = [];
var trees = [];
var policeCars =[];
var updateOperator = '+';   //Updation Logic II

function preload(){
    road = loadImage('assets/road.png');
    police = loadImage('assets/police_car.png');
    car_type1 = loadImage('assets/car_type1.png');
    car_type2 = loadImage('assets/car_type2.png');
    car_type3 = loadImage('assets/car_type3.png');
    playerImage = loadImage('assets/player.png');
    
    ground = loadImage('assets/ground.png');
    tree_type1 = loadImage('assets/side_tree1.png');
    tree_type2 = loadImage('assets/side_tree2.png');
    hut_type1 = loadImage('assets/side_hut1.png');
    hut_type2 = loadImage('assets/side_hut2.png');
    
    playerBlast = loadGif('assets/car_blast.gif');

    document.getElementById('restartBt').addEventListener('click',restartGame);
    document.getElementById('savexitBt').addEventListener('click',saveAndExitGame);
    document.getElementById('exitBt').addEventListener('click',exitGame);
    
}

function setup(){
    
    createCanvas(1000,550);

    player = new Player(playerImage);
    song = loadSound('assets/game_music.mp3',function(){
        song.play();
    });
    
    registerScore();
}

function draw(){
    background(road);
    printGround();
    generateSurrounds();
    generatePoliceCars();
    printPoliceCars();
    player.printPlayer();
    printSurrounds();
    generateTraffic();
    printTraffic();
    showScore();
    
    
}

function printGround(){
    
    //left ground
    image(ground,0,0,210,600);

    //right ground
    image(ground,790,0,210,600);
}

function registerScore(){
    if(window.localStorage){
        if(localStorage.gamescore){
            score = isNaN( parseInt(localStorage.gamescore) ) ? 0 : parseInt(localStorage.gamescore);
        }
        else{
            score = 0;
        }
    }
}
function showScore(){
    
    
    fill('white');
    textSize(30);
    text('SCORE : '+parseInt(score), 40, 40);
   
}

function generateSurrounds(){
    
    if(frameCount%210 == 0){
        huts.push(new Hut());
    }
    
    if(frameCount%230 == 0){
        trees.push(new Tree());
    }
}

function printSurrounds(){
    
    for(var i=0; i<trees.length ;i++){
        
        
        if(trees[i].outOfFrame()){
            trees.slice(i,1);
            
        }
        
        trees[i].printTree();
    }
    
    for(var j=0; j<huts.length ;j++){
        
        
        if(huts[j].outOfFrame()){
            huts.slice(j,1);
            
        }
        
        huts[j].printHut();
    }
}


function generateTraffic(){
    if((frameCount%130 == 0) && (frameCount%310 != 0)){
		  traffic.push(new Car());
	}
}

function printTraffic(){
    
    
    for(var i=0; i<traffic.length ;i++){
        
        
        if(traffic[i].outOfFrame()){
            traffic.slice(i,1);
            
        }
        
        if(player.collide(traffic[i])){
            gameOver();
           
        }
        else{
            score += 0.01;
        }
        
        traffic[i].printCar();
    }
}

function generatePoliceCars(){
    
    if(frameCount%310 == 0){
        policeCars.push(new Police());
    }
}

function printPoliceCars(){
    
    for(var i=0; i<policeCars.length ;i++){
        
        
        if(policeCars[i].outOfFrame()){
            policeCars.slice(i,1);
            
        }
        
        if(player.collide(policeCars[i])){
            
            //penelty for colliding with police
            score += -100;
            score = score >=0 ? score : 0;
            gameOver();
             
        }
        
        else{
            score += 0.01;
        }
        
        policeCars[i].printPolice();
        
        
/*
        //Updation Logic I
        ( player.x > (230 + TRACK_SIZE/2) ) ? policeCars[i].updatePolice('+') : policeCars[i].updatePolice('-');
*/
   
        policeCars[i].updatePolice(updateOperator);
    }
}

function keyPressed(){
    const LEFT = 37;
    const TOP = 38;
    const RIGHT = 39;
    const BOTTOM = 40;
    
    if(keyCode == LEFT){
        player.left();
        updateOperator = '-';
    }
    if(keyCode == RIGHT){
        player.right();
        updateOperator = '+';
    }
    
    if(keyCode == TOP ){
        player.top();
       
    }
    
    if(keyCode == BOTTOM){
        player.bottom();
       
    }
    console.log('key code'+ keyCode);
    
}


function gameOver(){
    
    var animate = new WOW();

    //Overriding draw function
    draw= function(){
        image(playerBlast,player.x+20, player.y+10);
    }

    document.getElementById('dialog').innerHTML = 'game over';
    $('#dialog').addClass('wow bounceInDown');
    document.getElementById('dialog').classList.add('showdialogs');

    
    $('#dialog-menu').addClass('wow bounceInUp');
    document.getElementById('dialog-menu').classList.add('showdialogs');

    animate.init();

    noLoop();
    
    //loop recovery for 3000 milliseconds
    loop();
    
    setTimeout( function(){   
            song.stop();
            noLoop();
    },3000);
    
}

function restartGame(){
    window.location.reload();
}

function saveAndExitGame(){

    if(window.localStorage){
        localStorage.gamescore = score;
    }    
    else{
        alert('Your browser doesnt support save game feature');
    }
    
    closeWindow();
    
}

function exitGame(){

    closeWindow();
}

function closeWindow(){
    if(confirm('Do you want to exit ? ')){
        close();
    }
}