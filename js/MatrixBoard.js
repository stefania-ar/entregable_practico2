class MatrixBoard extends Board {

    constructor(cantX, cantY, ctx, width, height, pixels) {
        super(cantX, cantY, ctx, width, height, pixels);
        this.cells = this.createArrayCells();
    }
    //crea array con las celdas y sus minimo de datos necesarios
    createArrayCells(){
        let arrayCells = [];
        let nroColumn = 1;
        //recorre todo el espacio que ocuparioa el tablero
        //para poder guardar los pixels que ocupa
        //numero de column y numero de fila
        for (let x = this.PosX; x < this.PosX+this.width; x+=this.pixels) {
            let nroRow = 1;
            for (let y = this.posY; y < this.posY+this.height; y+=this.pixels) {
                //crea un objeto celda
                let cell = new Cell(nroColumn, nroRow, x, x+(this.pixels-1), y, y+(this.pixels-1), null);
                //lo inserta en e array de las celdas
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

        this.ctx.putImageData(ImageData, this.centerX(), this.centerY());
    };

    //retorna la ultima celda libre en una determinada columna
    lastFreeCell(column){
        let lastFreeCell;
        let lastFind = false;
        let i = this.cells.length-1;
        //comienza a recorrer el array desde el final
        while(!lastFind && i>=0){
            //encuentra la ultima celda de la columna que se le pasó
            if(this.cells[i].getNroColumn() == column){
                //si en esta la piece es nulla es que está libre
                if(this.cells[i].getPiece() == null){
                    //la guarda para retornarla
                    lastFreeCell = this.cells[i];
                    //corta el while
                    lastFind = true;
                }else{
                    i--;
                }
            }else{
                i--;
            }
        }
        //si no encuentra una celda libre retorna null.
        return {
            lastFreeCell: lastFreeCell,
            posEnArreglo : i
        };
    }
    //pregunta si la pieza está dentro del rango del tablero
    isPieceWithinWidth(x, y) {
        return (x > this.PosX && x < this.PosX + this.width && y < this.posY);

    }
    //retorna el numero de columna en el que se encuentra la ficha
    whichColumn(x, y) {
        if(this.isPieceWithinWidth(x, y)){
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
    getCells(){
        return this.cells;
    }

    getCellByPosition(y, x){
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