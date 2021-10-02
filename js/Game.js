class Game {
    constructor(matrixBoard){ //agregar atributo dimension y pointWinner, la dimension la necesitamos para recorrer lamatriz y los puntos para saber con cuantos puntos se gana
        this.board = matrixBoard;
        this.contPieceWinner = 1;
    }


    playerTurnControl(player, lastPlayer){
        return player == lastPlayer;
    }

    getBoard(){
        return this.board;
    }

    /*searchWinner(){
        //console.log("entro a la funcion search winner");
        let findWinner = false;
        let i = 0;
        //si no lo encuentra es null
        //se va a guardar el numero del player ganador
        let winnerPlayer;
        //console.log(this.board.getCells().length);
        while(!findWinner && i< this.board.getCells().length){
            console.log("entro al while");
            let cell = this.board.getCells()[i];
            
            if(cell.getPiece() != null){
                console.log("entro al if");
                console.log(cell);
                //int
                let player = cell.getPiece().getPlayer();
                console.log("player: "+player);
                //variable que fija la busqueda en cuatro posiciones a partir de i
                let iCopy = i+(6*(6-i));
                //devuelve el numero del ganador
                //busca que un mismo player tenga cuatro fichas en linea
                let winner = this.searchPiecesInLinePlayer(player, i, iCopy);
                if(winner!= null){
                    findWinner = true;
                    winnerPlayer = player;
                    console.log("funciona la derecha");
                }else{
                    i+=3;
                }
            }else{
              i++;
            }
        }
        if(findWinner){
            return winnerPlayer;
        }else{
            return -1;
        }
    }*/

    searchWinner(){
        let findWinner = this.searchPiecesInLinePlayer();
        //let winnerPlayer = findWinner.player;
        /*if(findWinner.winner){
            return findWinner;
        }else{
            return null;
        }*/
        return findWinner;
    }

    searchPiecesInLinePlayer(){
        return this.searchVertical();
        //console.log("entro a la fx larga");
        //{winner: winner, player: player}
       /* if(this.searchRight(0).winner){
            return this.searchRight();
        }*else if (this.searchLeft(player)){
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
        }else{
            return null;
        }*/
    }//[1,1  1,2  1,3     2,1 2,2 2,3]

    winnerInColumn(i){
        let winner = false;
        let player, playerNexPiece;
        let cells = this.board.getCells();
        let contPiece = 1;
        for(let ix = i; ix<i+5; ix++){
            if(contPiece < 4){
                let piece = cells[ix].getPiece();
                let nexPiece = cells[ix+1].getPiece();
                if(piece != null && nexPiece != null){
                    player = piece.getPlayer();
                    playerNexPiece = nexPiece.getPlayer();
                    if(player == playerNexPiece){
                        contPiece++;
                    }else{
                        if(contPiece >1){
                            contPiece = 1;
                        }
                        player = -1;
                    }
                }else{
                    player = null;
                }
            }
        }
        if(contPiece >= 4){
            //console.log("columna evaluada: "+i);
            winner = true;
        }else{
            player = null;
        }
        return {winner: winner, player: player};
    }
    searchVertical(){
        let i = 0;
        let winnerInRow = {winner: false, player: null};
        while(!winnerInRow.winner && i <this.board.getCells().length-5){
            winnerInRow = this.winnerInColumn(i);
            i+=6;
        }
        return winnerInRow;
    }
/*
    searchPiecesInLinePlayer(player, i, iCopy){
        //console.log("entro a la fx larga");
        if(this.searchRight(player, i,iCopy)){
            return player;
        }/**else if (this.searchLeft(player)){
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
        }else{
            return null;
        }
    }//[1,1  1,2  1,3     2,1 2,2 2,3]

    searchRight(player, i, iCopy){
        let index = i;
        let winner = false;
        let cells = this.board.getCells();
        //let columns = this.board.getCantX();
        //let col= cell.getNroColumn();
        //let row= cell.getNroRow();
        //let winner = searchRight();
        //console.log(row);
        index+=6;
        let piece = cells[index].getPiece();
        console.log("siguiente celda");
        console.log(cells[index]);
        if( piece != null){
            winner = piece.getPlayer() == player;
        }else{
            winner = false;
        }
        //let elemento = this.board.getCellByPosition(col+1, row);
        //console.log(elemento);
        if(winner && index <= iCopy){
            searchRight(player, index, iCopy);
        }
        //}
        return winner;
        //for(let i = a; i< column-cell.getNroColumn(); i++){
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
        //}
    }*/
}