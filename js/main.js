//div del DOM que contiene mensaje del jugador ganador
let div = document.getElementById("winner");
//h1 del DOM que mostrará el jugador ganador
let h1 = document.getElementById("winnerPlayer");
//parrafo del DOM que muestra si hay un color elejido que ya esté en uso en las piezas del otro jugador
let pColor = document.getElementById("pColor");
//parrafo del DOM que va a indicar que jugador tiene el turno
let pStartPlayer = document.getElementById("pStartPlayer");
//canvas del DOM don de se pinta el tablero y las fichas
let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
//setamos el tamaño del canvas a tamaño del la pantalla window
canvas.width = window.innerWidth ;//document.documentElement.clientWidth,
canvas.height = window.innerHeight-20;//document.documentElement.clientHeight
let width = canvas.width;
let height = canvas.height;
//formulario del DOM para cambbiar la dimensión del tablero
let formDimension = document.getElementById("dimensionBoard");
//leemos la dimensión por defecto desde el DOM
let dimension = Number(extractDimension(formDimension));
//se calcula la cantidad de piezas por jugador dependiendo de as dimensiones del tablero
let cantPieceByPlayer = (dimension*dimension)/2;
//se establece el radio de las piezas, ya que son creadas a partir de un círculo.
let radio= 20;
//se establece el tamaño de las celdas del tablero
let pixels = 70;
//establece el tamaño de la imagen de las piezas
const piecePixel = radio*2;
//se les pasa la dimensión del tablero
//se les pasa width y height para centrarlo.
//se les pasa los pixels de cada celda.
//parte de atras del tablero
let board = new Board(dimension, dimension, ctx, width, height, pixels);
//parte frontal del tablero
let frontBoard = new FrontBoard(dimension, dimension, ctx, width, height, pixels);
//matrix que contiene las celdas del tablero
let matrixBoard = new MatrixBoard(dimension, dimension, ctx, width, height, pixels);
//se inicia una variable que maneja el comportamiento del juego
//usado para buscar el ganador
let game = new Game(matrixBoard);
//esta variable guarda el comportamiento de vista de los distintos elementos del DOM
let viewControl = new ViewControl();
//variable que determina si el juego comenzó
let start = false;
let gameEnd = false;
//Array de almacenamiento de las piezas del juego
let pieces = [];
//formulario del DOM de colores de piezas de los jugadores
let from1 = document.getElementById("formColorPlayer1");
let from2 = document.getElementById("formColorPlayer2");
//variables donde se guardan los respectivos colores de las piezas
let fill1 = viewControl.readColor(from1);
let fill2 = viewControl.readColor(from2);
//variable que guarda la pieza anterior clicleada
let lastClickedPiece = null;
//variable boolean que guarda si el mause hizo click
let isMouseDown = false;
//variables para controlar turnos
//en caso de comenzar el juego por primera vez se setea
//que el ultimo turno fue el del jugador 2, asi puede empezar el jugador 1
let lastTurn = 2;
let newTurn;
//se comienza dibujando la parte de atras del tablero
board.draw();
//se dibuja la parte frontal del tablero
frontBoard.draw();
//imagen para las piezas
image = new Image(); //iniciar ruta
image.src="img/piece.png";
//imagen para la parte frontal del tablero
imageBoard = new Image(); //iniciar ruta
imageBoard.src="img/ventana.png";

image.onload = function(){
    initPieces();
}

imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}
//extrae el valor del formilario de dimension del tablero
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
            let cell = matrixBoard.lastFreeCell(matrixBoard.whichColumn(x)).lastFreeCell;
            let posCelda= matrixBoard.lastFreeCell(matrixBoard.whichColumn(x)).posEnArreglo;
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
            let winner = game.searchWinner(cell.getNroColumn(), cell.getNroRow(), posCelda);

            //console.log(winner.winner);
            //console.log(winner.player);
            if(winner != null){
                gameEnd= true;
                setTimeout(function(){
                    viewControl.changeStartingPlayerParagraph(pStartPlayer, lastTurn);
                    h1.innerHTML = "Ganó el jugador "+winner;
                    viewControl.viewWinner(div, canvas);
                    
                    console.log(lastTurn+ " en funcion final. "+ newTurn);
                }, 4000);
            }
        }
    }
    //let p=matrixBoard.getCellByPosition(6,1);
    //console.log(p);
}

function onMouseDown(e){
    board.draw();
    isMouseDown = true;
    if(lastClickedPiece != null && gameEnd===false){
        if(lastClickedPiece.getInCell() && gameEnd===false){
            lastTurn = lastClickedPiece.getPlayer();
        }
        lastClickedPiece = null;
    }
    clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null && gameEnd===false){
        //determina que el juego se comenzó a jugar
        start = true;
        //oculta el mensaje (parrafo) del jugador que comienza
        viewControl.hidenParagraph(pStartPlayer);
        //guarda el numero de jugador del turno actual del jugador
        newTurn = clickPiece.getPlayer();
        lastClickedPiece = clickPiece;
    } else{
        start = false;
    }
    drawPiece();
    //board.draw();
    frontBoard.draw();
}

function onMouseMove(e){
    board.draw();
    if(isMouseDown && lastClickedPiece != null && game.playerTurnControl(lastTurn, newTurn) && start=== true){
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
    viewControl.changeStartingPlayerParagraph(pStartPlayer, newTurn);
    start = false;
    gameEnd= false;
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
    console.log("entra en el dos");
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