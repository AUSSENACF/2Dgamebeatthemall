class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    };

    startGameLoop() {
        
        const step = ()=> {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //Establish the camera person
            const cameraPerson = this.map.gameObjects.hero;
            
            //update all objects
            Object.values(this.map.gameObjects).forEach(object =>{
                //console.log(object);
                object.update({
                    
                    arrows : this.directionInput.directions,
                    arrow : this.directionInput.direction
                })
            });
            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);
            
            //Draw Game Objects
            Object.values(this.map.gameObjects).forEach(object =>{
                object.sprite.draw(this.ctx, cameraPerson);
            });
            
            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson);
            requestAnimationFrame(()=>{
                step();
            });
        };
        step();
    };
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        console.log(this.map.walls);

        this.directionInput = new DirectionInput(this.canvas);
        this.directionInput.init();

        this.startGameLoop();

    };
    
}
