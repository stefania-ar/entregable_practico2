class Cell{
    //al instanciar la clase por primera vez se debe iniciar con la pieza en null y ocupied en false.
    //no tiene pieza en ella, y no se encuentra ocupada.
    constructor(nroColumn, nroRow, xStart, xEnd, yStart, yEnd, piece){
        //numero de columna en la que se encuentra
        this.nroColumn = nroColumn;
        //numero de fila en la que se encuentra
        this.nroRow = nroRow;
        //pixels que ocupa
        this.xStart = xStart;
        this.xEnd = xEnd;
        this.yStart = yStart;
        this.yEnd = yEnd;
        //si contiene una ficha, comienza en null
        this.setPiece(piece);
    }

    setPiece(piece){
        this.piece = piece;
    }

    getPiece(){
        return this.piece;
    }

    getXStart(){
        return this.xStart;
    }
    getXEnd(){
        return this.xEnd;
    }
    getYStart(){
        return this.yStart;
    }
    getYEnd(){
        return this.yEnd;
    }

    getNroColumn(){
        return this.nroColumn;
    }

    getNroRow(){
        return this.nroRow;
    }

    hasPiece(){
        return this.piece !=null;
    }
}