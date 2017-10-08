function Tree(){
    
    this.width = 100;
    this.height = 100;
    this.y = -10;
    this.x = random(100);
    
    if(parseInt(random(5)) < 2){
        this.x += 10;
    }
    else{
        this.x += 800;
    }
    
    if(parseInt(random(2)) == 1){
        this.treeImage = tree_type1;
    }
       
    else{                
        this.treeImage = tree_type2;  
    }
    
    this.printTree = function(){
        
        image(this.treeImage, this.x, this.y, this.width, this.height);
        this.y += SPEED  + parseInt(score)*0.01;
    }
    
    this.outOfFrame = function(){
        
        return ( this.y+this.height/2.5 >= height );
            
    }
}