class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson){
        ctx.drawImage(this.lowerImage, utils.withGrid(11) - cameraPerson.x, utils.withGrid(8) - cameraPerson.y);
    }
    drawUpperImage(ctx, cameraPerson){
        ctx.drawImage(this.upperImage, utils.withGrid(11) - cameraPerson.x, utils.withGrid(8) - cameraPerson.y);
    }

}

window.OverworldMaps = {
    DemoRoom:{
        lowerSrc:"../sitePersonnel/content/decor.png",
        upperSrc:"../sitePersonnel/content/shadow.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(5),
            }),
            npc: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(5),
                src: "../sitePersonnel/content/hero2.png"
            })
        },
        walls:{
            [utils.asGridCoord(7, 6)] : true,
            [utils.asGridCoord(8, 6)] : true,
            [utils.asGridCoord(9, 6)] : true,
            [utils.asGridCoord(10, 6)] : true,
        }
        
    },
}