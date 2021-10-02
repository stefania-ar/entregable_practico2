let viewControl = new ViewControl();
let div = document.getElementById("winner");
let h1 = document.getElementById("winnerPlayer");
let pColor = document.getElementById("pColor");
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
/*let ceee = matrixBoard.getCells();
console.log(ceee);*/
//console.log(ceee[1].getPiece());

//constantes

let pieces = [];
let from1 = document.getElementById("formColorPlayer1");
let from2 = document.getElementById("formColorPlayer2");
let fill1 = viewControl.readColor(from1);
let fill2 = viewControl.readColor(from2);
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
    initPieces();
}

imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

function initPieces(){
    let cantPiece = CANT_PIECE_BY_PLAYER;
    let player = 1;
    let y = 50;
    let x = piecePixel;
    let marginY = (radio*2)+1;
    addPiecePlayer(image, player, x, y, fill1, marginY, cantPiece, radio);
    player = 2;
    x = width - x;
    addPiecePlayer(image, player, x, y, fill2, marginY, cantPiece, radio);
    frontBoard.setImage(imageBoard);
}

function addPiecePlayer(image, player, x, y, fill, marginY, cantPiece, radio){
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

function initTransition(){
   transition();
}
function transition(){
    setTimeout(function(){
        console.log("anima");
        let rangeMove = 30;//pixels
        let yTransition = Math.min(clickPiece.getY() + rangeMove, yCell);
        clickPiece.setPosition(xTransition, yTransition);
        drawPiece();
        frontBoard.draw();
        if(yTransition < yCell){
            console.log(yTransition);
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
            //hasta acá tiene que ir la ficha
            xCell= cell.getXStart()+((cell.getXEnd()-cell.getXStart())/2);
            yCell= cell.getYStart()+((cell.getYEnd()-cell.getYStart())/2);
            console.log(yCell);
            //yCell= cell.getYEnd();
            //clickPiece.setPosition(xCell, yCell);
            rangeMove = (yCell-y)/30;
            xTransition = xCell;
            //yTransition = y;
            initTransition();
            console.log("termina animacion");
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

//game.searchWinner();

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

function loadBoardAndPieces(){
    pieces = [];
    viewControl.hidenWinner(div);
    matrixBoard.cleanCells();
    initPieces();
    frontBoard.draw();
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
//recargar tablero

document.getElementById("btnLoadCanvas").addEventListener("click",function(){
    loadBoardAndPieces();
});
//cambia los colores de la fichas
document.getElementById("formColorPlayer1").addEventListener("change",function(e){
    viewControl.hidenPColor(pColor);
    fill1 = viewControl.readColor(this);
    if(fill1 != fill2){
        viewControl.changeColor(fill1, 1,pieces);
    }else{
        viewControl.showPColor(pColor);
        pColor.innerHTML = "El color "+fill1+" ya se encuentra elegido por el otro jugador.";
    }
});
document.getElementById("formColorPlayer2").addEventListener("change",function(e){
    viewControl.hidenPColor(pColor);
    fill2= viewControl.readColor(this);
    if(fill2 != fill1){
        viewControl.changeColor(fill2, 2,pieces);
    }else{
        viewControl.showPColor(pColor);
        pColor.innerHTML = "El color "+fill2+" ya se encuentra elegido por el otro jugador.";
    }
});