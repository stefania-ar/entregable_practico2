class Game {
    constructor(matrixBoard){
        this.board = matrixBoard;
    }

    getBoard(){
        return this.board;
    }

    searchWinner(){
        let findWinner = false;
        let i = 0;
        //si no lo encuentra es null
        let winnerPlayer;
        while(!findWinner && i< this.board.getCells().lenght){
            let cell = this.board.getCells()[i];
            if(cell.getPiece() != null){
                //int
                let player = cell.getPiece().getPlayer();
                //int
                winnerPlayer = searchPiecesInLinePlayer(player, cell)
                if(winnerPlayer != null){
                    findWinner = true;
                }
            }else{
                i++;
            }
        }
        return winnerPlayer;
    }

    searchPiecesInLinePlayer(player, cell){
        if(searchRight(player, cell)){
            return player;
        }else if (searchLeft(player)){
            return player;
        }else if (searchDown(player)){
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

    searchRight(player, cell){
        let cells = this.board.getCells();
        let colunm = this.board.getCantX();
        let winner = searchRight();
        let contPieceWinner = 0;
        if(winner){
            searchRight();
        }
        for(let i = 1; i< colunm-cell.getNroColumn(); i++){

        }
    }
}