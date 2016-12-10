type UrlMap = { [name: string]: string };

/**
 * Manages images loaded from external URLs.
 * 
 * @class ImageManager
 */
class ImageManager {
    private urls: UrlMap;
    /**
     * Loaded images accessible by name.
     * 
     * This property is undefined if no images have been loaded.
     */
    images: { [name: string]: HTMLImageElement } = {};
    
    /**
     * @constructor
     * @param urls A collection of image names and their corresponding URLs.
     */
    constructor(urls: UrlMap) {
        this.urls = urls;
    }
    
    /**
     * Loads all images from the specified URLs.
     * 
     * @param next Function to be called when all images have been loaded.
     */
    load(next: () => void): void {
        let imageLoadedCount = 0;
        let t = this;

        for (let k in this.urls) {
            this.images[k] = new Image();

            this.images[k].onload = () => {
                imageLoadedCount++;
                if (imageLoadedCount == Object.keys(this.urls).length) {
                    next();
                }
            }

            this.images[k].src = this.urls[k];
        }
    }
}

