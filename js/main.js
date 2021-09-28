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
matrixBoard.draw();

let pieces = [];
let lastClickedPiece = null;
let isMouseDown = false;

board.draw();

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
    matrixBoard.draw();
    frontBoard.setImage(imageBoard);
}

imageBoard.onload = function(){
    matrixBoard.draw();
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

function onMouseDown(e){
    matrixBoard.draw();
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

function onMouseUp(e){
    let a= clickPiece.getX();
    let b= clickPiece.getY();
    isMouseDown = false;
    matrixBoard.draw();
    board.draw();
    drawPiece();
    frontBoard.draw();
    matrixBoard.isPieceWithinCell(a,b);
   // console.log(clickPiece);
    
}

function onMouseMove(e){
    matrixBoard.draw();
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
    matrixBoard.draw();
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