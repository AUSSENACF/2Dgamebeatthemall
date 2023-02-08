class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up":["y",-1],
            "down":["y",1],
            "left":["x",-1],
            "right":["x",1],   
        }
        this.directionUpdates = {
            "up":[0,-1],
            "down":[0,1],
            "left":[-1,0],
            "right":[1,0],   
        }
    }

    update(state){
        this.updatePosition();
        this.updateSprite(state);

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.directions = state.arrows;
            this.movingProgressRemaining = 2;
        }
        
    }
    directionReturn(){
        let x = 0;
        let y = 0;
        this.directions.forEach(element =>{
                x += this.directionUpdates[element][0];
                y += this.directionUpdates[element][1];
        });
        return[x , y];
    }
    updatePosition(){
        if(this.movingProgressRemaining > 0){   
            if(this.directionReturn()[1] !== 0 && this.directionReturn()[0] !== 0){
                this.x += this.directionReturn()[0] * 2;
                this.y += this.directionReturn()[1] * 2;
            }else{
                this.x += this.directionReturn()[0] * 3;
                this.y += this.directionReturn()[1] * 3;
            }
            
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state){

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
        this.sprite.setAnimation("idle"+this.direction);
        return;
        }
        if(this.movingProgressRemaining > 0){
            if(this.directionReturn().toString() === "1,1"){
                this.sprite.setAnimation("walk"+"right")
                
            }else if(this.directionReturn().toString() === "1,-1"){
                this.sprite.setAnimation("walk"+"up")

            }else if(this.directionReturn().toString() === "-1,1"){
                this.sprite.setAnimation("walk"+"down")

            }else if(this.directionReturn().toString() === "-1,-1"){
                this.sprite.setAnimation("walk"+"right")

            }else{
                this.sprite.setAnimation("walk"+this.direction);

            }
            
        }
        
    }
}