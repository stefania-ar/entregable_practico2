class Board {


    constructor(cantX, cantY, ctx, width, height) {
        this.cantX = cantX;
        this.canY = cantY;
        this.pixels = 100;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.widthCanvas = width;
        this.heightCanvas= height;
        this.width= this.pixels * this.cantX;
        this.height= this.pixels * this.cantY;
        this.posY= this.centerY();
        this.PosX= this.centerX();
    }

    draw() {
        let p= parseInt(this.width, 10);
        let o= parseInt(this.height, 10);

        /** @type {CanvasRenderingContext2D} */
        let ImageData = this.ctx.createImageData(100, 100); //ver qué onda por que tira long error
           
        for (let x = 0; x < this.width; x++) {

            for (let y = 0; y < this.height; y++) {
                this.setPixel(ImageData, x, y, 0, 0, 255, 255);
            }
        }

        this.ctx.putImageData(ImageData, 30, 30); //ver qué onda por que tira long error
    };

    setPixel(imageData, x, y, r, g, b, a){
            let index = (x+y*imageData.this.height)*4;
            imageData.data[index+0] = r;
            imageData.data[index+1] = g;
            imageData.data[index+2] = b;
            imageData.data[index+3] = a;
    }

    getWidth(){
        return this.pixels * this.cantX;
    }

    getHeight(){
        return this.pixels * this.cantY;
    }

    centerX(){
        return ( this.widthCanvas - (this.width)) / 2;
    }

    centerY(){
        return ( this.heightCanvas - (this.height)) / 2;
    }
}