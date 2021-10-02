class MatrixBoard extends Board {

    constructor(cantX, cantY, ctx, width, height) {
        super(cantX, cantY, ctx, width, height);
        this.cells = this.createArrayCells();
    }

    createArrayCells(){
        let arrayCells = [];
        let nroColumn = 1;
        for (let x = this.PosX; x < this.PosX+this.width; x+=this.pixels) {
            let nroRow = 1;
            for (let y = this.posY; y < this.posY+this.height; y+=this.pixels) {
                let cell = new Cell(nroColumn, nroRow, x, x+(this.pixels-1), y, y+(this.pixels-1), null);
                arrayCells.push(cell);
                nroRow++;
            }
            nroColumn++;
        }
        return arrayCells;
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

    //retorna la ultima celda libre
    lastFreeCell(column){
        let lastFreeCell;
        let cells = this.filterCells(column);
        let lastFind = false;
        let i = this.cantY-1;
        while(!lastFind && i>=0){
            if(cells[i].getPiece() == null){
                lastFreeCell = cells[i];
                lastFind = true;
            }else{
                i--;
            }
        }
        //si no encuentra una celda libre retorna null.
        return lastFreeCell;
    }
    //filtra las celdas para quedarme con las de una columna en especifico
    filterCells(column){
        let arrayFilterCells = [];
        let retunrAllCells = false;
        let cont = this.cantY;
        let i = 0;
        while(!retunrAllCells && i<this.cells.length){
            if(this.cells[i].getNroColumn() == column){
                arrayFilterCells.push(this.cells[i]);
                cont--;
                if(cont == 0){
                    retunrAllCells = true;
                }
            }
            i++;
        }
        return arrayFilterCells;
    }
    //pregunta si la pieza está dentro del rango del tablero
    isPieceWithinWidth(x) {
        return (x > this.PosX && x < this.PosX + this.width);

    }
    //retorna el numero de columna en el que se encuentra
    whichColumn(x) {
        if(this.isPieceWithinWidth(x)){
            let column = 1;
            let i = this.PosX;
            let find = false;

            while (!find && i < this.PosX + this.width) {
                if (x >= i && x <= i + this.pixels) {
                    find = true;
                } else {
                    i += this.pixels;
                    column++;
                }
            }
            return column;
        }else{
            return -1;
        }
    }
/*
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
*/
    getCells(){
        return this.cells;
    }

    getCellByPosition(y, x){
        console.log("entro al cell")
        for (let i = 0; i < this.cells.length; i++) {
            if( this.cells[i].getNroColumn()===y && this.cells[i].getNroRow()===x){
                return this.cells[i];
            };
        }
    }

    cleanCells(){
        this.cells.forEach(function(cell) {
            cell.setPiece(null);
        });
    }

    setDimension(dimension){
        super.setDimension(dimension);
        this.cells = [];
        this.cells = this.createArrayCells();
    }
}