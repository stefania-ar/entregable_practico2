class Game {
    constructor(matrixBoard){
        this.board = matrixBoard;
        this.contPieceWinner = 1;
    }

    getBoard(){
        return this.board;
    }

    searchWinner(){
        //console.log("entro a la funcion search winner");
        let findWinner = false;
        let i = 0;
        //si no lo encuentra es null
        let winnerPlayer;
        //console.log(this.board.getCells().length);
        while(findWinner===false && i< this.board.getCells().length){
            console.log("entro al while");
            let cell = this.board.getCells()[i];
            //console.log(cell);
            if(cell.getPiece() != null){
                console.log("entro al if");
                //int
                let player = cell.getPiece().getPlayer();
                //int
                winnerPlayer = this.searchPiecesInLinePlayer(player, cell);
                if(winnerPlayer != null){
                    findWinner = true;
                    console.log("funciona la derecha");
                }
            }else{
                i++;
            }
        }
        return winnerPlayer;
    }

    searchPiecesInLinePlayer(player, cell){
        
        //console.log("entro a la fx larga");
        if(this.searchRight(player, cell)){
            return player;}
       /**  }else if (this.searchLeft(player)){
            return player;
        }else if (this.searchDown(player)){
            return player;
        }else if (searchUp(player)){
            return player;
        }else if(searchUpLeft(player)){
            return player;
        }else if (searchUpRight(player)){
            return player;
        }else if (searchDownLeft(player)){
            return player;
        }else if (searchDownRight(player)){
            return player;
        }*/else{
            return null;
        }
    }//[1,1  1,2  1,3     2,1 2,2 2,3]

    searchRight(player, cell){
        let cells = this.board.getCells();
        let columns = this.board.getCantX();
        let col= cell.getNroColumn();
        let row= cell.getNroRow();
        //let winner = searchRight();
        console.log(row);
        //for (let i = 0; i < columns; i++) {
           let elemento = this.board.getCellByPosition(col+1, row);
           console.log(elemento);
            if(elemento.hasPiece()){
                let piecePlayer = elemento.getPiece.getPlayer;
                if (player === piecePlayer) {
                    this.contPieceWinner++;
                }
            }
            
        //}
        
        return this.contPieceWinner===4;
       
        
        /*//for(let i = a; i< column-cell.getNroColumn(); i++){
            if(this.searchRight(player, a, cell)<4 && a<=column-cells.getNroColumn()){
                if(cells[a].getPiece().getPlayer() === player){
                    //searchRight(player, i, cell);
                    contPieceWinner++;
                    console.log(cell, )
                }else{
                    a++;
                    this.searchRight(player, a, cell, contPieces);
                }
            }
            
        //}*/
    }
}