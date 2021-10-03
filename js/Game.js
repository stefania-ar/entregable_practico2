class Game {
    constructor(matrixBoard) { //agregar atributo dimension y pointWinner, la dimension la necesitamos para recorrer lamatriz y los puntos para saber con cuantos puntos se gana
        this.board = matrixBoard;
    }

    playerTurnControl(lastTurn, newTurn) {
        return lastTurn != newTurn;
    }

    changeTurn(lastTurn) {
        if (lastTurn == 1) {
            return 2;//newTurn
        } else {
            return 1;//newTurn
        }
    }

    getBoard() {
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

    searchWinner(column, row, posCelda) {

        if(this.searchByColumn().winner){ // hay que agregar el parametro que sea e numero de columna
            return this.searchByColumn().player;
        }else if (this.searchPiecesByRow(row).winner){
            return this.searchPiecesByRow(row).player;
        }else if (this.searchDiagonal(posCelda).winner){
            return this.searchDiagonal(posCelda).player;
        }
        else {
            return null;
        }
    }

    searchPiecesInLinePlayer() {
        return this.searchVertical();
        //console.log("entro a la fx larga");
        //{winner: winner, player: player}
        /* if(this.searchRight(0).winner){
             return this.searchRight();
         }else if (this.searchLeft(player)){
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

    searchByColumn() {
        let i = 0;
        let winnerInRow = { winner: false, player: null };
        let cantFila = this.board.getCantY();
        let cantColumn = this.board.getCantX() - 1;
        while (!winnerInRow.winner && i < this.board.getCells().length - cantColumn) {
            winnerInRow = this.searchPiecesByColumn(i);
            i += cantFila;
        }
        return winnerInRow;
    }

    searchPiecesByColumn(i) {
        let winner = false;
        let player, playerNexPiece;
        let cells = this.board.getCells();
        let contPiece = 1;
        let cantFila = this.board.getCantY() - 1;
        for (let ix = i; ix < i + cantFila; ix++) {
            if (contPiece < 4) {
                let piece = cells[ix].getPiece();
                let nexPiece = cells[ix + 1].getPiece();
                if (piece != null && nexPiece != null) {
                    player = piece.getPlayer();
                    playerNexPiece = nexPiece.getPlayer();
                    if (player == playerNexPiece) {
                        contPiece++;
                    } else {
                        if (contPiece > 1) {
                            contPiece = 1;
                        }
                        player = -1;
                    }
                } else {
                    player = null;
                }
            }
        }
        if (contPiece >= 4) {
            //console.log("columna evaluada: "+i);
            winner = true;
        } else {
            player = null;
        }
        return { winner: winner, player: player };
    }

    searchPiecesByRow(row) {
        let cells = this.board.getCells();
        let cont = 1;
        let player;

        for (let i = row-1; i < row * this.board.getCantX() - 1; i += this.board.getCantX()) {
            if(cont<4){

                let piece = cells[i].getPiece();
                let p1 = cells[i + this.board.getCantY()].getPiece();
                
                if (piece != null && p1 != null) {
                    player = piece.getPlayer();
                    let pl1 = p1.getPlayer();
                    
                    if (player === pl1) {
                        cont++;
                    } else {
                        cont = 1
                        player=null;
                    }
                }
            }
        }
            if(cont >=4){
                return {
                    winner: true,
                    player: player
                }
            }else{
                return {
                winner: false,
                player: player
            }
        }

    }
    
    searchDiagonal(posCelda){
        let cells= this.board.getCells();

        //búsqueda hacia arriba
        for (let i = posCelda; i <= posCelda*4 ; i++) {
            const element = array[i];
            
        }
        
        //busqueda hacia abajo ?
        for (let i = posCelda; i < posCelda*4; i++) {
            const element = array[i];
            
        }
        
    }
    
}
