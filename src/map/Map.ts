/// <reference path="../../references.ts" />
/**
 * Creates a Map object
 *
 * @class Map
 */
class Map {
    /**
     * A spritesheet containing the maps tiles
     *
     * @property tileSheet
     * @type HTMLImageElement
     */
    tileSheet: HTMLImageElement;
    /**
     * The size of each individual tile on the tilesheet
     *
     * @property tileSize
     * @type Size
     */
    tileSize: Size;
    /**
     * The width and height of the entire map
     *
     * @property tileSize
     * @type Size
     */
    mapSize: Size;
    /**
     * Stores the position of the tile on the tilesheet
     *
     * @property tileData
     * @type number[]
     */
    tileData: any[]; // Will change from any once this class is tested
    /**
     * Stores the entie map
     *
     * @property mapData
     * @type number[]
     */
    mapData: number[];
    /**
     * @constructor
     */
    constructor(tileSheet: HTMLImageElement, tileSize: Size, 
        mapSize: Size, tileData: any[], mapData: number[]) {
        this.tileSheet = tileSheet;
        this.tileSize = tileSize;
        this.mapSize = mapSize;
        this.tileData = tileData;
        this.mapData = mapData;
    }
    /**
     * Renders all tiles in the map. This method currently assumes cameraX
     * and cameraY is at the top left corner, will probably change to the center
     *
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @param {number} cameraX Camera x position
     * @param {number} cameraY Camera y position
     */
    render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
        let canvasSize = Utils.getCanvasSize();
        let width = this.tileSize.width;
        let height = this.tileSize.height;
        for (let x = 0; x < this.mapSize.width; x++) {
            for (let y = 0; y < this.mapSize.height; y++) {
                // Dont render tiles off the screen
                if (x * width < cameraX - width || 
                    x * width > cameraX + canvasSize.width + width ||
                    y * height < cameraY - height || 
                    y * height > cameraY + canvasSize.height + height) {
                    continue;
                }
                let tile = this.tileData[this.mapData[y][x]];
                // Render tile
                ctx.drawImage(
                    this.tileSheet,
                    tile.x * width,
                    tile.y * height,
                    width,
                    height,
                    x * width - cameraX,
                    y * height - cameraY,
                    width,
                    height
                );
            }
        }
    }
}