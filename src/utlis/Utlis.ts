class Utils{
	 /**
     * Gets the canvas
     * @method getCanvas
     * @return CanvasElement
     */
	static getCanvas() {
		return document.getElementById('canvas');
	}

	/**
     * Gets the canvas size
     * @method getCanvasSize
     * @return CanvasElement
     */
	static getCanvasSize(){
		return {
			width: this.getCanvas().clientWidth,
			height: this.getCanvas().clientHeight
		};
	}

	/**
     * Gets the center of the canvas
     * @method getCanvasCenter
     * @return CanvasElement
     */
	static getCanvasCenter(){
		return {
			x: this.getCanvas().clientWidth / 2,
			y: this.getCanvas().clientHeight / 2
		};
	}
}