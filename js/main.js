let viewControl = new ViewControl();
let div = document.getElementById("winner");
let h1 = document.getElementById("winnerPlayer");
let pColor = document.getElementById("pColor");
let pStartPlayer = document.getElementById("pStartPlayer");
let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight-20;
let width = canvas.width;
let height = canvas.height;

let formDimension = document.getElementById("dimensionBoard");
let dimension = Number(extractDimension(formDimension));
let cantPieceByPlayer = (dimension*dimension)/2;
let radio= 20;
let pixels = 70;

//Este es el tamaño de la imagen
const piecePixel = radio*2;

//se le pasa width y height para centrarlo.
let board = new Board(dimension, dimension, ctx, width, height, pixels);
let frontBoard = new FrontBoard(dimension, dimension, ctx, width, height, pixels);
let matrixBoard = new MatrixBoard(dimension, dimension, ctx, width, height, pixels);
let game = new Game(matrixBoard);
/*let ceee = matrixBoard.getCells();
console.log(ceee);*/
//console.log(ceee[1].getPiece());

//constantes
let start = false;
let pieces = [];
let from1 = document.getElementById("formColorPlayer1");
let from2 = document.getElementById("formColorPlayer2");
let fill1 = viewControl.readColor(from1);
let fill2 = viewControl.readColor(from2);
let lastClickedPiece = null;
let isMouseDown = false;
//en caso de comenzar el juego por primera vez se setea
//que el ultimo turno fue el del jugador 2, asi puede empezar el jugador 1
let lastTurn = 2;
let newTurn;

board.draw();
//arreglar que se pinten las dos partes del tablero al iniciar
frontBoard.draw();

image = new Image(); //iniciar ruta
image.src="img/piece.png";

imageBoard = new Image(); //iniciar ruta
imageBoard.src="img/ventana.png";

image.onload = function(){
    initPieces();
}

imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

function extractDimension(form){
    var data = new FormData(form);
    for (const entry of data) {
      return entry[1];
    }
}

function initPieces(){
    let cantPiece = cantPieceByPlayer;
    let player = 1;
    let y = 50;
    let x = piecePixel;
    let marginY = (radio*2.3);
    addPiecePlayer(image, player, x, y, fill1, marginY, cantPiece, radio);
    player = 2;
    x = width - x;
    addPiecePlayer(image, player, x, y, fill2, marginY, cantPiece, radio);
    frontBoard.setImage(imageBoard);
}

function addPiecePlayer(image, player, x, y, fill, marginY, cantPiece, radio){
    let cantPieceByRow = Math.round(cantPieceByPlayer / 2);
    if(cantPieceByRow>10){
        cantPieceByRow = Math.round(cantPieceByPlayer / 3);
        if(cantPiece == cantPieceByRow){
            y = 50;
            if(player == 1){
                x+=piecePixel+(piecePixel/2);
            }else{
                x-=piecePixel+(piecePixel/2);
            }
        }else if(cantPiece == cantPieceByRow*2){
            y = 50;
            if(player == 1){
                x+=piecePixel+(piecePixel/2);
            }else{
                x-=piecePixel+(piecePixel/2);
            }
        }
    }else{
        if(cantPiece == cantPieceByRow){
            y = 50;
            if(player == 1){
                x+=piecePixel+(piecePixel/2);
            }else{
                x-=piecePixel+(piecePixel/2);
            }
        }
    }
    addPiece(x, y, fill, image, player, radio);
    drawPiece();
    y += marginY;
    cantPiece--;
    if(cantPiece > 0){
        addPiecePlayer(image, player, x, y, fill, marginY, cantPiece, radio);
    }
}

function addPiece(x, y, fill, image, player, radio){
    let piece = new Piece(x, y, fill, image, piecePixel, ctx, player, radio);
    pieces.push(piece);
}

function drawPiece(){
    clearCanvas();
    for(let i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
}
let clickPiece;

let xTransition;
let xCell;
let yCell;

function transition(){
    setTimeout(function(){
        let rangeMove = 30;//pixels
        let yTransition = Math.min(clickPiece.getY() + rangeMove, yCell);
        clickPiece.setPosition(xTransition, yTransition);
        drawPiece();
        frontBoard.draw();
        if(yTransition < yCell){
            //window.requestAnimationFrame(transition);
            transition();
        }
    }, 30);
}

function onMouseUp(e){
    isMouseDown = false;
    if(clickPiece != null){
        let x= clickPiece.getX();
        let y= clickPiece.getY();
        board.draw();
        drawPiece();
        frontBoard.draw();
        if(matrixBoard.whichColumn(x) > 0){
            let cell = matrixBoard.lastFreeCell(matrixBoard.whichColumn(x));
            cell.setPiece(clickPiece);
            clickPiece.setInCell(true);
            //hasta acá tiene que ir la ficha
            xCell= cell.getXStart()+((cell.getXEnd()-cell.getXStart())/2);
            yCell= cell.getYStart()+((cell.getYEnd()-cell.getYStart())/2);
            //yCell= cell.getYEnd();
            //clickPiece.setPosition(xCell, yCell);
            rangeMove = (yCell-y)/30;
            xTransition = xCell;
            //yTransition = y;
            transition();
            //acá bloquear que se pueda mover la ficha
            //console.log(matrixBoard.getCells());
            //let winner = game.searchWinner();
            let winner = game.searchWinner();
            //console.log(winner.winner);
            //console.log(winner.player);
            if(winner.winner){
                h1.innerHTML = "Ganó el jugador "+winner.player;
                viewControl.viewWinner(div, canvas);
            }
        }
    }
    //let p=matrixBoard.getCellByPosition(6,1);
    //console.log(p);
}

function onMouseDown(e){
    board.draw();
    isMouseDown = true;
    if(lastClickedPiece != null){
        if(lastClickedPiece.getInCell()){
            lastTurn = lastClickedPiece.getPlayer();
        }
        lastClickedPiece = null;
    }
    clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null){
        //determina que el juego se comenzó a jugar
        start = true;
        //oculta el mensaje (parrafo) del jugador que comienza
        viewControl.hidenParagraph(pStartPlayer);
        //guarda el numero de jugador del turno actual del jugador
        newTurn = clickPiece.getPlayer();
        lastClickedPiece = clickPiece;
    }
    drawPiece();
    //board.draw();
    frontBoard.draw();
}

function onMouseMove(e){
    board.draw();
    if(isMouseDown && lastClickedPiece != null && game.playerTurnControl(lastTurn, newTurn)){
        lastClickedPiece.setPosition(e.layerX, e.layerY);
        drawPiece();
    }else{
        drawPiece();
    }

    frontBoard.draw();
}


function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
    board.draw();
}

function findClickedFigure(x, y){
    for(let i = 0; i< pieces.length; i++){
        const element = pieces[i];
        if(element.isPointInside(x, y)){
            return element;
        }
    }
}

function loadBoardAndPieces(){
    pieces = [];
    viewControl.hidenWinner(div, canvas);
    matrixBoard.cleanCells();
    initPieces();
    frontBoard.draw();
}
//cambia en el DOM el jugador que comienza a jugar.
viewControl.changeStartingPlayerParagraph(pStartPlayer, lastTurn);

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
//recargar tablero una vez que la partida se gana y se aprieta en el botón correspondiente

document.getElementById("btnLoadCanvas").addEventListener("click",function(){
    console.log(lastTurn);
    console.log(newTurn);
    viewControl.changeStartingPlayerParagraph(pStartPlayer, newTurn);
    start = false;
    loadBoardAndPieces();
});
//cambia los colores de la fichas del jugador 1
document.getElementById("formColorPlayer1").addEventListener("change",function(e){
    if(!start){
        viewControl.hidenParagraph(pColor);
        fill1 = viewControl.readColor(this);
        if(fill1 != fill2){
            viewControl.changeColor(fill1, 1,pieces);
        }else{
            viewControl.showParagraph(pColor);
            pColor.innerHTML = "El color "+fill1+" ya se encuentra elegido por el otro jugador.";
        }
    }
});
//cambia los colores de la fichas del jugador 2
document.getElementById("formColorPlayer2").addEventListener("change",function(e){
    if(!start){
        viewControl.hidenParagraph(pColor);
        fill2= viewControl.readColor(this);
        if(fill2 != fill1){
            viewControl.changeColor(fill2, 2,pieces);
        }else{
            viewControl.showParagraph(pColor);
            pColor.innerHTML = "El color "+fill2+" ya se encuentra elegido por el otro jugador.";
        }
    }
});
//cambiar diensión de tablero
document.getElementById("dimensionBoard").addEventListener("change",function(e){
    if(!start){
        //clearCanvas();
        dimension = Number(extractDimension(this));
        cantPieceByPlayer = (dimension*dimension)/2;

        /*board = new Board(dimension, dimension, ctx, width, height);
        frontBoard = new FrontBoard(dimension, dimension, ctx, width, height);
        matrixBoard = new MatrixBoard(dimension, dimension, ctx, width, height);*/
        board.setDimension(dimension);
        frontBoard.setDimension(dimension);
        matrixBoard.setDimension(dimension);
        board.draw();
        pieces = [];
        initPieces();
        frontBoard.draw();
    }
});