let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight-20;
let width = canvas.width;
let height = canvas.height;

let dimension=6;
const CANT_PIECE_BY_PLAYER = dimension*2;
let radio= 30;

//Este es el tamaño de la imagen
const piecePixel = radio*2;

//se le pasa width y height para centrarlo.
let board = new Board(dimension, dimension, ctx, width, height);
let frontBoard = new FrontBoard(dimension, dimension, ctx, width, height);
let matrixBoard = new MatrixBoard(dimension, dimension, ctx, width, height);
let game = new Game(matrixBoard);
console.log(game.getBoard().getCells()[1]);
//console.log(matrixBoard.getCells());

//constantes

let pieces = [];
let lastClickedPiece = null;
let isMouseDown = false;

board.draw();
//arreglar que se pinten las dos partes del tablero al iniciar
frontBoard.draw();

image = new Image(); //iniciar ruta
image.src="img/piece.png";

imageBoard = new Image(); //iniciar ruta
imageBoard.src="img/ventana.png";


image.onload = function(){
    let cantPiece = CANT_PIECE_BY_PLAYER;
    let player = 1;
    let y = 50;
    let x = piecePixel;
    let marginY = (radio*2)+1;
    addPiecePlayer(image, player, x, y, marginY, cantPiece, radio);
    player = 2;
    x = width - x;
    addPiecePlayer(image, player, x, y, marginY, cantPiece, radio);
    frontBoard.setImage(imageBoard);
}

imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

function addPiecePlayer(image, player, x, y, marginY, cantPiece, radio){
    addPiece(x, y, image, player, radio);
    drawPiece();
    y += marginY;
    cantPiece--;
    if(cantPiece > 0){
        addPiecePlayer(image, player, x, y, marginY, cantPiece, radio);
    }
}

function addPiece(x, y, image, player, radio){
    let piece = new Piece(x, y, image, piecePixel, ctx, player, radio);
    pieces.push(piece);
}

function drawPiece(){
    clearCanvas();
    for(let i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
}
let clickPiece;

let rangeMove;
let xTransition;
let yTransition;
let xCell;
let yCell;

function initTransition(){
   transition();
}

function transition(){
    console.log("entra");
    clickPiece.setPosition(xTransition, yTransition);
    drawPiece();
    frontBoard.draw();
    yTransition += rangeMove;
 if(yTransition <= yCell+1){
    window.requestAnimationFrame(transition);
  }
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
            //hasta acá tiene que ir la ficha
            xCell= cell.getXStart()+((cell.getXEnd()-cell.getXStart())/2);
            yCell= cell.getYStart()+((cell.getYEnd()-cell.getYStart())/2);
            //clickPiece.setPosition(xCell, yCell);
            rangeMove = (yCell-y)/30;
            xTransition = xCell;
            yTransition = y;
            initTransition();
            //acá bloquear que se pueda mover la ficha
            console.log(matrixBoard.getCells());
        }
    }
    //let p=matrixBoard.getCellByPosition(6,1);
    //console.log(p);
}

game.searchWinner();

function onMouseDown(e){
    board.draw();
    isMouseDown = true;
    if(lastClickedPiece != null){
        lastClickedPiece = null;
    }
    clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null){
        lastClickedPiece = clickPiece;
    }
    drawPiece();
    //board.draw();
    frontBoard.draw();
}

function onMouseMove(e){
    board.draw();
    if(isMouseDown && lastClickedPiece != null){
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



canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);