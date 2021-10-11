class Game {
    constructor(matrixBoard, cantPieceWinner) {
        //Array con todaslas celdas, necesarias para hacer los chequeos.
        this.board = matrixBoard;
        //cantidad de fichas en linea para ganar
        this.cantPieceWinner = cantPieceWinner;
    }
    //setea a cantidad de fichas para ganar
    setCantPieceWinner(cantPieceWinner){
        this.cantPieceWinner = cantPieceWinner;
    }
    //controla que la fica del player sea igual a la del turno actual
    playerTurnControl(turn, player) {
        return turn == player;
    }
    //cambia los turnos
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
    //decrementa un contador de fichas restantes el total
    //se usa para cortar el juego en caso de que se usen todas las fichas
    decreasePieceOffGame(contPieceOffGame){
        return contPieceOffGame-1;
    }
    //consulta si todavia quedan fichas en juego
    pieceOffGame(contPieceOffGame){
        if(contPieceOffGame > 0){
            return true;
        }else{
            return false;
        }
    }
    //busca las fichas en linea para determinar un ganador
    searchWinner(row, posCelda) {
        if(this.searchByColumn().winner){ //vertical
            return this.searchByColumn().player;
        }else if (this.searchPiecesByRow(row).winner){ //horizontal
            return this.searchPiecesByRow(row).player;
        }else if (this.searchDiagonal(posCelda).winner){ //diagonales
            return this.searchDiagonal(posCelda).player;
        }else {
            return null;
        }
    }
    //busqueda de ganadores de forma vertical
    searchByColumn() {
        //itera en cada columna deltablero y busca las fichas necesarias en linea
        //se comienza desde el principio
        let i = 0;
        //se crea winnerInRow en false para que entre en el while
        let winnerInRow = { winner: false, player: null };
        //se busca la cantidad de filas que se considera para una columna para dar el salto adecuado
        //ya que se almacenaron as celdas en un array
        let cantFila = this.board.getCantY();
        while (!winnerInRow.winner && i < this.board.getCells().length) {
            //busca ganador
            winnerInRow = this.searchPiecesByColumn(i);
            //salta a la posición en el array del inicio de la siguiente columna
            i += cantFila;
        }
        return winnerInRow;
    }
//busqueda de fichas ganadoras por cada columna
    searchPiecesByColumn(i) {
        let winner = false;
        //variables donde se va a guardar los numeros de player pra luego compararlos entre si
        let player, playerNexPiece;
        let cells = this.board.getCells();
        //contador de fichas en linea encontradas
        let contPiece = 1;
        let cantFila = this.board.getCantY() - 1;
        //se itera toda la fila
        for (let ix = i; ix < i + cantFila; ix++) {
            //se pregunta si no se encontraron todas las fichas ganadoras
            if (contPiece < this.cantPieceWinner) {
                //se guarda la ficha de dos celdas contiguas
                //celda actual
                let piece = cells[ix].getPiece();
                //celda siguiente
                let nexPiece = cells[ix + 1].getPiece();
                if (piece != null && nexPiece != null) {
                    //se guardan sus numeros de jugadores(1/2)
                    player = piece.getPlayer();
                    playerNexPiece = nexPiece.getPlayer();
                    //se pregunta si son iguales(misma ficha)
                    if (player == playerNexPiece) {
                        //se incrementa el contador de fichas encontradas
                        contPiece++;
                    } else {
                        //si llega a encontrar que son distintos jugadores se reinicia el contador de fichas
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
            winner = true;
        } else {
            player = null;
        }
        return { winner: winner, player: player };
    }
    //busqueda de ganadores de forma horizontal
    searchPiecesByRow(row) {
        //guardo todas las celdas para recorrerlas
        let cells = this.board.getCells();
        //contador de fichas iguaes encontradas
        let cont = 1;
        let player;
        //recorro desde la pos del array correspondiente a la primer celda de la fila en la que cayó la ficha
        for (let i = row-1; i < cells.length; i += this.board.getCantY() ) { //row es el indice del arreglo +1
            //se pregunta si el contador de fichas iguales es menos al deseado
            //se pregunta que el proximo salto que se hace de posiciones en el array no supere su length
            if(cont<this.cantPieceWinner && i + this.board.getCantY()< cells.length){
                //se guardan dos celdas contiguas
                //ficha actual
                let piece = cells[i].getPiece();
                //ficha siguiente
                let p1 = cells[i + this.board.getCantY()].getPiece();
                //se pregunta si se encontró fichas para comparar
                if (piece != null && p1 != null) {
                    //se guardan sus numeros de jugadores (1/2)
                    player = piece.getPlayer();
                    let pl1 = p1.getPlayer();
                    //si son iguales(misma ficha)
                    if (player === pl1) {
                        //se incrementa el numero de fichas iguales contiguas encontradas
                        cont++;
                    } else {
                        //se reinicia el contador de fichas iguales
                        cont = 1
                        player=null;
                    }
                }
            }
        }
        if(cont >=this.cantPieceWinner){
            return { winner: true, player: player }
        }else{
            return { winner: false, player: player }
        }

    }
 //busqueda de ganadores de forma diagonal
    searchDiagonal(posCelda){
        //se guarda el numero de jugador(1/2) para retornarlo en caso de encontrar que junta la cantidad de fichas necesarias
        let player = this.board.getCells()[posCelda].getPiece().getPlayer();
        //pregunta si la suma de las fichas encontradas en esta diagonal(/) es mayor o igua al minimo de fichas necesarias
        if((this.searchDiagonalUpRight(posCelda) + this.searchDiagonalDownLeft(posCelda))+1 >= this.cantPieceWinner ){
            return {winner:true, player:player};
            //pregunta si la suma de las fichas encontradas en esta diagonal(\) es mayor o igua al minimo de fichas necesarias
        }else if(this.searchDiagonalUpLeft(posCelda) + this.searchDiagonalDownRight(posCelda)+1 >= this.cantPieceWinner){
            return {winner:true, player:player}
        }else{
            return {winner:false, player:null};
        }

    }

    searchDiagonalDownLeft(posCelda){
        //mientras sean iguales los numeros de jugadores itera el while
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        //contador de fichas iguales encontradas
        let contPiece = 0;
        //variables don de se van a ir guardando los valoes para poder comparar players
        let newCell, nextCell, nextPiece, player, nextPlayer;
        //se guarda el player con el cual deben coincidir las fichas
        player = cells[posCelda].getPiece().getPlayer();
        while(equalsPlayer && i > 0){
            //se guarda la celda actual
            newCell = cells[i];
            //se pregunta si la pos del array anterior de forma diagonal se encuentra dentro el array
            if(i-(this.board.getCantY())> 0){
                //se guarda la siguiente celda
                nextCell = cells[i-(this.board.getCantY()-1)];
                //se aplica una funcion que determina si es una celda válida
                //que respete la diagonal que se quiere
                if(this.trueCellDown(newCell, nextCell)){
                    //se guarda la ficha de la siguiente celda
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        //se guarda su numero de jugador
                        nextPlayer = nextPiece.getPlayer();
                        //se comparan los numeros de jugadores(1/2)
                        if(player == nextPlayer){
                            //si son iguales se incrementa el numero de fichas iguales encontradas
                            contPiece++;
                        }else{
                            //si no son iguales se cambia esta variable a falsa para que corte el while
                            equalsPlayer = false;
                        }
                    }else{
                        //corta while
                        equalsPlayer = false;
                    }
                }else{
                    //corta while
                    equalsPlayer = false;
                }
            }else{
                //corta while
                equalsPlayer = false;
            }
            //se decrementa el indice del iteradora para que valla a la celda anterior de forma diagonal
            i -= (this.board.getCantY()-1);
        }
        return contPiece;
    }

    searchDiagonalUpRight(posCelda){
        //mientras sean iguales los numeros de jugadores itera el while
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        //contador de fichas iguales encontradas
        let contPiece = 0;
        //variables don de se van a ir guardando los valoes para poder comparar players
        let newCell, nextCell, nextPiece, player, nextPlayer;
        //se guarda el player con el cual deben coincidir las fichas
        player = cells[posCelda].getPiece().getPlayer();
        //la siguiente condición determina que se itere solo lo minimo requerido
        //lo minimo requerido será la cantidad de filas*cantPieceWinner-1
        //se calcula así ya que es un array
        //i <=posCelda+((this.board.getCantY()-1)*this.cantPieceWinner-1)
        while(equalsPlayer && i <=posCelda+((this.board.getCantY()-1)*this.cantPieceWinner-1) && i<cells.length){
            //guarda las celdas contiguas para compararlas
            newCell = cells[i];
            nextCell = cells[i+(this.board.getCantY()-1)];
            if(nextCell != null){
                //se pregunta si es una celda valida
                //si es la posicion siguiente en diagona hacia arriba a la derecha
                if(this.trueCellUp(newCell, nextCell)){
                    //guarda la ficha de la siguiente celda
                    nextPiece = nextCell.getPiece();
                    if(nextPiece != null){
                        //guarda el numero de jugador(1/2)
                        nextPlayer = nextPiece.getPlayer();
                        //si son iguales
                        if(player == nextPlayer){
                            //incrementa el numero de fichas iguales
                            contPiece++;
                        }else{
                            //corta while
                            equalsPlayer = false;
                        }
                    }else{
                        //corta while
                        equalsPlayer = false;
                    }
                }else{
                    //corta while
                    equalsPlayer = false;
                }
            }else{
                //corta while
                equalsPlayer = false;
            }
            //pasa el iterador a la siguiente celda en forma diagonal arriba a la derecha
            i += (this.board.getCantY()-1);
        }
        return contPiece;
    }
//función para validar que sea una celda correcta
//celda diagonal arriba a la derecha
    trueCellUp(newCell, nextCell){
        let newRow = newCell.getNroRow();
        let newColumn = newCell.getNroColumn();
        let nextRow = nextCell.getNroRow();
        let nextColumn = nextCell.getNroColumn();
        return nextRow < newRow  && nextColumn > newColumn;
    }
//función para validar que sea una celda correcta
//celda diagonal abajo a la izquierda
    trueCellDown(newCell, nextCell){
        let newRow = newCell.getNroRow();
        let newColumn = newCell.getNroColumn();
        let nextRow = nextCell.getNroRow();
        let nextColumn = nextCell.getNroColumn();
        return nextRow > newRow  && nextColumn < newColumn;
    }
//funciona de forma similar función antes mencionada: searchDiagonalDownLeft.
    searchDiagonalDownRight(posCelda){
        let equalsPlayer = true;
        let i = posCelda;
        let cells= this.board.getCells();
        let contPiece = 0;
        let nextCell, nextPiece, player, nextPlayer;
        player = cells[posCelda].getPiece().getPlayer();

        while(equalsPlayer && i < cells.length){
            if(i+(this.board.getCantY())+1 < cells.length){
                nextCell = cells[i+(this.board.getCantY()+1)];
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
//funciona de forma similar función antes mencionada: searchDiagonalUpRight.
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
