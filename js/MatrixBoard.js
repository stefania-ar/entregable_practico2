class MatrixBoard extends Board {
    constructor(cantX, cantY, ctx, width, height) {
        super(cantX, cantY, ctx, width, height);
    }

    draw() {
        /** @type {CanvasRenderingContext2D} */
        let ImageData = this.ctx.createImageData(this.width, this.height);

        for (let x = 0; x < this.width; x++) {

            for (let y = 0; y < this.height; y++) {
                this.setPixel(ImageData, x, y, 0, 0, 0, 0);
            }
        }
        //console.log(this.centerY());

        this.ctx.putImageData(ImageData, this.centerX(), this.centerY());
    };

    isPieceWithinWidth(x) {
        console.log(x);
        return (x > this.PosX && x < this.PosX + this.width);

    }

    isPieceWithinCell(x,y) {
        console.log(this.isPieceWithinWidth(x));
        if (this.isPieceWithinWidth(x)) {
            this.whichCell(x);
            this.whichCellY(y);
            console.log("entro");
        }
    }

    whichCell(x) {
        let celda = 0;
        let i = 0;
        let bool = false;

        while (!bool && i < this.PosX + this.width) {
            if (x >= i && x <= i + this.pixels) {
                bool = true;
            } else {
                i += this.pixels;
                celda++;
            }

        }
        console.log(celda);
        this.freeCellY(celda);
        return celda;
    }

    whichCellY(y) {
        let celda = 1;
        let i = 0;
        let bool = false;

        while (!bool && i < this.posY + this.height) {
            if (y >= i && y <= i + this.pixels) {
                bool = true;
            } else {
                i += this.pixels;
                celda++;
            }

        }
        console.log("celda Y "+ celda);
        this.freeCellY(celda);
        return celda;
    }

    isCellYOccupied(nroCelda, celdaY, array) {

        let i = 0;
        let bool = false;

        let x_ini=this.pixelsXcolumn(nroCelda).x_ini;
        let x_fin=this.pixelsXcolumn(nroCelda).x_fin;
        let y_ini=this.pixelsYrow(celdaY).y_ini;
        let y_fin= this-this.pixelsYrow(celdaY).y_fin;

        while (!bool && i<array.lenght) {
            if (array[i].isPointInsideRange(x_ini,x_fin, y_ini, y_fin) ) {
                bool = true;
            } else {
                i ++;
            }
            //BUSCAR LA FILA LIBRE PARA DEVOLVERLA Y LLEVAR LA FICHA HASTA AHÍ
            //GUARDAR CELDA EN Y Y EN X DONDE ESTÁ
            //HACER UNA CLASE CELDA QUE SEPA SUS VALORES
        }
        console.log(celdaY);
        this.pixelsYcolumn(celdaY);
        return bool;
    }

    pixelsXcolumn(nroCol) {
        let fin = this.PosX + (this.pixels * nroCol);
        let ini = fin - this.pixels;
        console.log(fin + " inicio: " + ini);
        return {
            x_fin: fin,
            x_ini: ini
        }
        //let ini= this.PosX + (nroCol *100);
    }

    pixelsYrow(nroFila) {
        let fin = this.posY + (this.pixels * nroFila);
        let ini = fin - this.pixels;
        console.log(fin + " inicio: " + ini);
        return {
            y_fin: fin,
            y_ini: ini
        }
    }
}