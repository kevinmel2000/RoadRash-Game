function Hut(){
    
    this.width = 130;
    this.height = 130;
    this.y = -10;
    this.x = random(80);
    
    if(parseInt(random(5)) < 2){
        this.x += 10;
    }
    else{
        this.x += 800;
    }
    
    if(parseInt(random(2)) == 1){
        this.hutImage = hut_type1;
    }
       
    else{                
        this.hutImage = hut_type2;  
    }
    
    this.printHut = function(){
        
        image(this.hutImage, this.x, this.y, this.width, this.height);
        this.y += SPEED  + parseInt(score)*0.01;
    }
    
    this.outOfFrame = function(){
        
        return ( this.y+this.height/2.5 >= height );
            
    }
}