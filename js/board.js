class Board {

    constructor(cantX, cantY, ctx, width, height, pixels) {
        //cantidad de columnas
        this.cantX = cantX;
        //cantidad de filas
        this.cantY = cantY;
        //pixel de cada celda
        this.pixels = pixels;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.widthCanvas = width;
        this.heightCanvas= height;
        //tamaño del tablero
        this.width= this.pixels * this.cantX;
        this.height= this.pixels * this.cantY;
        //centra el tablero en el canvas
        this.posY= this.centerY();
        this.PosX= this.centerX();
    }

    getPosY(){
        return this.posY;
    }

    getPosX(){
        return this.PosX;
    }

    draw() {
        /** @type {CanvasRenderingContext2D} */
        let ImageData = this.ctx.createImageData(this.width, this.height);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height+this.pixels; y++) {
                this.setPixel(ImageData, x, y, 255, 0, 0, 255);
            }
        }
        this.ctx.putImageData(ImageData, this.centerX(), this.centerY());
    };

    setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.height)*4;
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

    getCantX(){
        return this.cantX;
    }
    getCantY(){
        return this.cantY;
    }
    //cambia la dimension del tablero
    setDimension(fichasEnLinea){
        //pregunta que cantidad de fichas en linea se eligió
        if(fichasEnLinea===4){
            //redimensiona
            //cambia la cantidad de columnas(cantX) y de filas(cantY)
            this.cantX= 7;
            this.cantY= 6;
        }else if(fichasEnLinea===6){
            //redimensiona
            //cambia la cantidad de columnas(cantX) y de filas(cantY)
            this.cantX= 8;
            this.cantY= 7;
        }else{
            //redimensiona
            //cambia la cantidad de columnas(cantX) y de filas(cantY)
            this.cantX= 9;
            this.cantY= 8;
        }
        //vuelve a calcular atributos relacionados con la dimensión.
        this.width= this.pixels * this.cantX;
        this.height= this.pixels * this.cantY;
        this.posY= this.centerY();
        this.PosX= this.centerX();
    }
}