class MatrixBoard extends Board{
    constructor(cantX, cantY, ctx, width, height){
        super(cantX, cantY, ctx, width, height);
    }

    draw() {
        /** @type {CanvasRenderingContext2D} */
        let ImageData = this.ctx.createImageData(this.width, this.height); //ver qué onda por que tira long error

        for (let x = 0; x < this.width; x++) {

            for (let y = 0; y < this.height; y++) {
                this.setPixel(ImageData, x, y, 0, 0, 0, 0);
            }
        }
        //console.log(this.centerY());

        this.ctx.putImageData(ImageData, this.centerX(), this.centerY()); //ver qué onda por que tira long error
    };
}