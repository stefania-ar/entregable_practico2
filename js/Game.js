class Game {
    constructor(matrixBoard, cantPieceWinner) { //agregar atributo dimension y pointWinner, la dimension la necesitamos para recorrer lamatriz y los puntos para saber con cuantos puntos se gana
        this.board = matrixBoard;
        this.cantPieceWinner = cantPieceWinner;
    }
    setCantPieceWinner(cantPieceWinner){
        this.cantPieceWinner = cantPieceWinner;
    }

    playerTurnControl(turn, player) {
        return turn == player;
    }

    changeTurn(turn) {
        if (turn == 1) {
            return 2;//newTurn
        } else {
            return 1;//newTurn
        }
    }

    getBoard() {
        return this.board;
    }

    decreasePieceOffGame(contPieceOffGame){
        return contPieceOffGame-1;
    }
    pieceOffGame(contPieceOffGame){
        if(contPieceOffGame > 0){
            return true;
        }else{
            return false;
        }
    }

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

    searchByColumn() {
        let i = 0;
        let winnerInRow = { winner: false, player: null };
        let cantFila = this.board.getCantY();
        while (!winnerInRow.winner && i < this.board.getCells().length) {
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
            if (contPiece < this.cantPieceWinner) {
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
        if (contPiece >= this.cantPieceWinner) {
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

        for (let i = row-1; i < cells.length; i += this.board.getCantY() ) { //row es el indice del arreglo +1
            if(cont<this.cantPieceWinner && i + this.board.getCantY()< cells.length){
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
            if(cont >=this.cantPieceWinner){
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
        let player = this.board.getCells()[posCelda].getPiece().getPlayer();
         console.log(" ");
         if((this.searchDiagonalUpRight(posCelda) + this.searchDiagonalDownLeft(posCelda))+1 >= this.cantPieceWinner ){//mayor a dos porque no lo toma a dos, apartir del 3 más la ficha en la que estoy hace 4 fichas;
            return {winner:true, player:player};
        }else if(this.searchDiagonalUpLeft(posCelda) + this.searchDiagonalDownRight(posCelda)+1 >= this.cantPieceWinner){
            return {winner:true, player:player}
        }else{
            return {winner:false, player:null};
        }

    }

    searchDiagonalDownLeft(posCelda){
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        let contPiece = 0;
        let newCell, nextCell, nextPiece, player, nextPlayer;
        player = cells[posCelda].getPiece().getPlayer();

        while(equalsPlayer && i > 0){
            newCell = cells[i];
            if(i-(this.board.getCantY())> 0){
                nextCell = cells[i-(this.board.getCantY()-1)];
                if(this.trueCellDown(newCell, nextCell)){
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        nextPlayer = nextPiece.getPlayer();
                        if(player == nextPlayer){
                            contPiece++;
                        }else{
                            equalsPlayer = false;
                        }
                    }else{
                        equalsPlayer = false;
                    }
                }else{
                    equalsPlayer = false;
                }
            }else{
                equalsPlayer = false;
            }
            i -= (this.board.getCantY()-1);
        }
        return contPiece;
    }

    searchDiagonalUpRight(posCelda){
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        let contPiece = 0;
        let newCell, nextCell, nextPiece, player, nextPlayer;
        player = cells[posCelda].getPiece().getPlayer();

        while(equalsPlayer && i <=posCelda+((this.board.getCantY()-1)*this.cantPieceWinner-1) && i<cells.length){
            newCell = cells[i];
            nextCell = cells[i+(this.board.getCantY()-1)];
            if(nextCell != null){
                if(this.trueCellUp(newCell, nextCell)){
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        nextPlayer = nextPiece.getPlayer();
                        if(player == nextPlayer){
                            contPiece++;
                        }else{
                            equalsPlayer = false;
                        }
                    }else{
                        equalsPlayer = false;
                    }
                }else{
                    equalsPlayer = false;
                }
            }else{
                equalsPlayer = false;
            }
            i += (this.board.getCantY()-1);
        }
        return contPiece;
    }

    trueCellUp(newCell, nextCell){
        let newRow = newCell.getNroRow();
        let newColumn = newCell.getNroColumn();
        let nextRow = nextCell.getNroRow();
        let nextColumn = nextCell.getNroColumn();
        return nextRow < newRow  && nextColumn > newColumn;
    }

    trueCellDown(newCell, nextCell){
        let newRow = newCell.getNroRow();
        let newColumn = newCell.getNroColumn();
        let nextRow = nextCell.getNroRow();
        let nextColumn = nextCell.getNroColumn();
        return nextRow > newRow  && nextColumn < newColumn;
    }

    searchDiagonalDownRight(posCelda){
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        let contPiece = 0;
        let nextCell, nextPiece, player, nextPlayer;
        player = cells[posCelda].getPiece().getPlayer();

        while(equalsPlayer && i < cells.length){
            //newCell = cells[i];

            if(i+(this.board.getCantY())+1 < cells.length){

                nextCell = cells[i+(this.board.getCantY()+1)];
                //if(this.trueCellDown(newCell, nextCell)){
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        nextPlayer = nextPiece.getPlayer();
                        if(player == nextPlayer){
                            contPiece++;
                        }else{
                            equalsPlayer = false;
                        }
                    }else{
                        equalsPlayer = false;
                    }
                }else{
                    equalsPlayer =false;
                }
            i += (this.board.getCantY()+1);
        }
        return contPiece;
    }

    searchDiagonalUpLeft(posCelda){
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        let contPiece = 0;
        let nextCell, nextPiece, player, nextPlayer;
        player = cells[posCelda].getPiece().getPlayer();

        while(equalsPlayer && i >=posCelda-((this.board.getCantY()-1)*this.cantPieceWinner-1) && i> 0){

            if(i-(this.board.getCantY())+1 > 0){
            nextCell = cells[i-(this.board.getCantY()+1)];

            if(nextCell != null){
                //if(this.trueCellUp(newCell, nextCell)){
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        nextPlayer = nextPiece.getPlayer();
                        if(player == nextPlayer){
                            contPiece++;
                        }else{
                            equalsPlayer = false;
                        }
                    }else{
                        equalsPlayer = false;
                    }
                }else{
                    equalsPlayer = false;
                }
            }else{
                equalsPlayer = false;
            }
            i -= (this.board.getCantY()+1);
        }
        return contPiece;
    }

}
