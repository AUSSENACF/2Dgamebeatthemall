class Sprite{
    constructor(config){
        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = ()=>{
            this.isLoaded = true;
        }
        //Shadow
        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false
        if(this.useShadow){
            this.shadow.src = "../sitePersonnel/content/shadow.png";
        }
        
        this.shadow.onload = ()=>{
            this.isShadowLoaded = true;
        }
        

        // Configure Animation & Initial State
        this.animation = config.animations|| {
            "idledown": [[0,1]],
            "idleup": [[0,0]],
            "idleleft": [[1,2]],
            "idleright": [[1,3]],
            "walkdown":[[1,1],[0,1],[2,1],[0,1]],
            "walkup":[[1,0],[0,0],[2,0],[0,0]],
            "walkleft":[[0,2],[1,2],[2,2],[1,2]],
            "walkright":[[0,3],[1,3],[2,3],[1,3]],
        };
        this.currentAnimation = config.currentAnimation || 'idledown';
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress = this.animationFrameLimit;
        // Reference the game object
        this.gameObject = config.gameObject;
    }
    get frame(){
        return this.animation[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        //Downtick Frame Progress
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }

        // Reset counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }
    draw(ctx, cameraPerson){
        const x = this.gameObject.x + utils.withGrid(11) - cameraPerson.x;
        const y = this.gameObject.y + 6 + utils.withGrid(8) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x,y)

        const [frameX , frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 64 ,  // image crop position X Start
            frameY * 64 , // image crop postion Y start
            64, //crop size X
            64, //crop size Y
            x , // position on map X
            y , // position on map Y    
            64, // dimention image X
            64  // dimention image Y
            )
        this.updateAnimationProgress();       
    }
}