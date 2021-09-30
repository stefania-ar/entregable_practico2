class Cell{
    //al instanciar la clase por primera vez se debe iniciar con la pieza en null y ocupied en false.
    //no tiene pieza en ella, y no se encuentra ocupada.
    constructor(nroColumn, nroRow, xStart, xEnd, yStart, yEnd, piece){
        this.nroColumn = nroColumn;
        this.nroRow = nroRow;
        this.xStart = xStart;
        this.xEnd = xEnd;
        this.yStart = yStart;
        this.yEnd = yEnd;
        this.setPiece(piece);
    }

    /*inSide(pieces){
        let piece = null;
        let find = false;
        let i = 0;
        while(!find && i< pieces.lenght){
            if(pieces[i].inCell(this)){
                piece = pieces[i];
            }
        }
        //console.log(piece);
        //return piece.getX() > this.xStart && piece.getX() < this.xEnd && piece.getY() >this.yStart && piece.getY() < this.yEnd;
        return piece;
    }*/
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

    getCell(nroCol, nroRow){
        console.log("ESTOY en cell. COL "+nroCol + " "+ this.getNroColumn() + " ROW " +nroRow);

        if((nroCol=== this.getNroColumn()) && (nroRow=== this.getNroRow())){
            return this;
        }
    }

    hasPiece(){
        return this.piece !=null;
    }
}