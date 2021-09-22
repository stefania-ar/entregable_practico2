let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const CANT_PIECE_BY_PLAYER = 10;
const piecePixel = 40;
let board = new Board(5, 5, ctx, width, height);


let pieces = [];
let lastClickedPiece = null;
let isMouseDown = false;

image = new Image(); //iniciar ruta
image.src="img/piece.png";

image.onload = function(){
    let cantPiece = CANT_PIECE_BY_PLAYER;
    let player = 1;
    let y = 50;
    let x = piecePixel;
    let marginY = 50;
    addPiecePlayer(image, player, x, y, marginY, cantPiece);
    player = 2;
    x = width - x;
    addPiecePlayer(image, player, x, y, marginY, cantPiece);
    board.draw();
}

function addPiecePlayer(image, player, x, y, marginY, cantPiece){
    addPiece(x, y, image, player);
    drawPiece();
    y += marginY;
    cantPiece--;
    if(cantPiece > 0){
        addPiecePlayer(image, player, x, y, marginY, cantPiece);
    }
    
}

function addPiece(x, y, image, player){
    let piece = new Piece(x, y, image, piecePixel, ctx, player);
    pieces.push(piece);
}

function drawPiece(){
    clearCanvas();
    for(let i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
}

function onMouseDown(e){
    isMouseDown = true;
    if(lastClickedPiece != null){
        lastClickedPiece = null;
    }
    let clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null){
        lastClickedPiece = clickPiece;
    }
    drawPiece();
    board.draw();
}

function onMouseUp(e){
    isMouseDown = false;
}

function onMouseMove(e){
    if(isMouseDown && lastClickedPiece != null){
        lastClickedPiece.setPosition(e.layerX, e.layerY);
        drawPiece();
    }
    board.draw();
}

function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
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