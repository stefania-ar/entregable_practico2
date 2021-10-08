//div del DOM que contiene formularios de apariencia
let divPStartPTurn= document.getElementById("div_pStart_pTurn");
//div del DOM que contiene formularios de apariencia
let divHer = document.getElementById("herramientas_de_apariencia");
//div del DOM que contiene mensaje del jugador ganador
let div = document.getElementById("winner");
//h1 del DOM que mostrará el jugador ganador
let h1 = document.getElementById("winnerPlayer");
//parrafo del DOM que muestra si hay un color elejido que ya esté en uso en las piezas del otro jugador
let pColor = document.getElementById("pColor");
//parrafo del DOM que va a indicar que jugador tiene el turno
let pStartPlayer = document.getElementById("pStartPlayer");
//parrafo de DOM donde se muestra el turno
let pTurnPlayer = document.getElementById("pTurnPlayer");
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
let fichasEnLinea = Number(extractDimension(formDimension));
//se calcula la cantidad de piezas por jugador dependiendo de as dimensiones del tablero
let cantPieceByPlayer = (dimension(fichasEnLinea).x * dimension(fichasEnLinea).y)/2;
//se establece el radio de las piezas, ya que son creadas a partir de un círculo.
let radio= 15;
//se establece el tamaño de las celdas del tablero
let pixels = 70;
//establece el tamaño de la imagen de las piezas
const piecePixel = radio*2;
//se les pasa la dimensión del tablero
//se les pasa width y height para centrarlo.
//se les pasa los pixels de cada celda.
//parte de atras del tablero
let board = new Board(dimension(fichasEnLinea).x, dimension(fichasEnLinea).y, ctx, width, height, pixels);
//parte frontal del tablero
let frontBoard = new FrontBoard(dimension(fichasEnLinea).x, dimension(fichasEnLinea).y, ctx, width, height, pixels);
//matrix que contiene las celdas del tablero
let matrixBoard = new MatrixBoard(dimension(fichasEnLinea).x, dimension(fichasEnLinea).y, ctx, width, height, pixels);
//se inicia una variable que maneja el comportamiento del juego
//usado para buscar el ganador
let game = new Game(matrixBoard, fichasEnLinea);
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
//variable que controla cuantas piezas quedan sin jugar, para que cuando no queden piezas se corta el juego
let contPieceOffGame;
//se comienza dibujando la parte de atras del tablero
board.draw();
//se dibuja la parte frontal del tablero
frontBoard.draw();
//imagen para las piezas
image1 = new Image(); //iniciar ruta
image1.src="img/piece.png";

image2= new Image();
image2.src="img/piece2.png";
//imagen para la parte frontal del tablero
imageBoard = new Image(); //iniciar ruta
imageBoard.src="img/ventana.png";

function dimension(fichasEnLinea){
    if(fichasEnLinea===4){
        return {x: 7,
                y: 6}
    }else if(fichasEnLinea===6){
        return{x: 8,
               y: 7}
    }else{
        return  {x: 9,
                y: 8}
    }
}

image1.onload = function(){
    if(pieces.length < dimension(fichasEnLinea).x * dimension(fichasEnLinea).y){
        initPieces(1);
        contPieceOffGame = pieces.length;
    }
    board.draw();
    drawPiece();
    frontBoard.draw();
}

image2.onload = function(){
    if(pieces.length < dimension(fichasEnLinea).x * dimension(fichasEnLinea).y){
        initPieces(2);
        contPieceOffGame = pieces.length;
    }
    board.draw();
    drawPiece();
    frontBoard.draw();
}

imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

//extrae el valor del formulario de dimension del tablero
function extractDimension(form){
    var data = new FormData(form);
    for (const entry of data) {
      return entry[1];
    }
}

function initPieces(player){
    //pieces= [];
    let cantPiece = cantPieceByPlayer;
    let y = 50;
    let x = piecePixel;
    let marginY = (radio*2.3);
    if(player === 1){// hacer que vacíe las piezas que son del primer player, y que se agreguen después

        addPiecePlayer(image1, player, x, y, fill1, marginY, cantPiece, radio);
    }else{
        x = width - x;
        addPiecePlayer(image2, player, x, y, fill2, marginY, cantPiece, radio);
    }
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
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
    if(clickPiece != null && !clickPiece.getInCell()){
        let x= clickPiece.getX();
        let y= clickPiece.getY();
        if(matrixBoard.whichColumn(x, y) > 0){
            let cell = matrixBoard.lastFreeCell(matrixBoard.whichColumn(x, y)).lastFreeCell;
            let posCelda= matrixBoard.lastFreeCell(matrixBoard.whichColumn(x, y)).posEnArreglo;
            cell.setPiece(clickPiece);
            clickPiece.setInCell(true);
            turn = game.changeTurn(turn);
            contPieceOffGame= game.decreasePieceOffGame(contPieceOffGame);
            console.log(contPieceOffGame);
            console.log(pieces.length);
            //hasta acá tiene que ir la ficha
            xCell= cell.getXStart()+((cell.getXEnd()-cell.getXStart())/2);
            yCell= cell.getYStart()+((cell.getYEnd()-cell.getYStart())/2);
            rangeMove = (yCell-y)/30;
            xTransition = xCell;
            transition();
            //acá bloquear que se pueda mover la ficha
            let winner = game.searchWinner(cell.getNroColumn(), cell.getNroRow(), posCelda);

            if(winner != null){
                gameEnd = true;
                setTimeout(function(){
                    viewControl.changeParagraphTurn(pTurnPlayer, turn);
                    viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);
                    viewControl.hiden(divPStartPTurn);
                    h1.innerHTML = "Ganó el jugador "+winner;
                    viewControl.viewWinner(div, canvas);
                }, 3000);
            }else{
                viewControl.changeParagraphTurn(pTurnPlayer, turn);
            }
        }
        board.draw();
        drawPiece();
        frontBoard.draw();
        if(!game.pieceOffGame(contPieceOffGame)){
            console.log(contPieceOffGame);
            viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);
            viewControl.show(divPStartPTurn);
            start = false;
            gameEnd = false;
            loadBoardAndPieces();
            viewControl.show(divHer);
        }/*else{
            gameEnd =true;
        }*/
    }
}
let turn = 1;
function onMouseDown(e){
    board.draw();
    isMouseDown = true;
    if(lastClickedPiece != null && gameEnd===false){
        lastClickedPiece = null;
    }
    clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null && gameEnd===false){
        //determina que el juego se comenzó a jugar
        start = true;
        //oculta div con herramientas de apariencia de fichas y tablero
        viewControl.hiden(divHer);
        //oculta el mensaje (parrafo) del jugador que comienza
        viewControl.hiden(pStartPlayer);
        //setea el turno y lo muestra el turno
        viewControl.changeParagraphTurn(pTurnPlayer, turn);
        viewControl.show(pTurnPlayer);
        //guarda el numero de jugador del turno actual del jugador
        lastClickedPiece = clickPiece;
    }
    /**

    }
      else{
        start = false;
    }*/
    drawPiece();
    frontBoard.draw();
}

function onMouseMove(e){
    board.draw();
    //game.playerTurnControl(lastTurn, newTurn)
    if(isMouseDown && lastClickedPiece != null && start=== true){
        if(game.playerTurnControl(turn, lastClickedPiece.getPlayer())){
            if(!lastClickedPiece.isInsideBoard(e.layerX, e.layerY, board.getPosX(), board.getPosY(), board.getWidth(), board.getHeight(), radio)){
                lastClickedPiece.setPosition(e.layerX, e.layerY, lastClickedPiece.getInCell());
            }else{
                lastClickedPiece.setPositionOffBoard(e.layerX, e.layerY, board.getPosX(), board.getPosY(), board.getWidth(), radio);
            }
        }
    }
    drawPiece();
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
    initPieces(1);
    initPieces(2);
    frontBoard.draw();
}
//cambia en el DOM el jugador que comienza a jugar.
viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
//recargar tablero una vez que la partida se gana y se aprieta en el botón correspondiente
document.getElementById("btnLoadCanvas").addEventListener("click",function(){
    viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);
    viewControl.show(divPStartPTurn);
    start = false;
    gameEnd= false;
    loadBoardAndPieces();
    viewControl.show(divHer);
});

//cambia los colores de la fichas del jugador 1
document.getElementById("formColorPlayer1").addEventListener("change",function(e){
    if(!start){
        viewControl.hiden(pColor);
        fill1 = viewControl.readColor(this);
        if(fill1 != fill2){
            viewControl.changeColor(fill1, 1,pieces);
        }else{
            viewControl.show(pColor);
            pColor.innerHTML = "El color "+fill1+" ya se encuentra elegido por el otro jugador.";
            fill1= pieces[1].getFill();
        }
    }
    board.draw();
    drawPiece();
    frontBoard.draw();
});
//cambia los colores de la fichas del jugador 2
document.getElementById("formColorPlayer2").addEventListener("change",function(e){
    if(!start){
        viewControl.hiden(pColor);
        fill2= viewControl.readColor(this);
        if(fill2 != fill1){
            viewControl.changeColor(fill2, 2,pieces);
        }else{
            viewControl.show(pColor);
            pColor.innerHTML = "El color "+fill2+" ya se encuentra elegido por el otro jugador.";
            fill2= pieces[pieces.length-1].getFill();
        }
    }
    board.draw();
    drawPiece();
    frontBoard.draw();
});
//cambiar dimensión de tablero
document.getElementById("dimensionBoard").addEventListener("change",function(e){
    if(!start){
        //clearCanvas();
        fichasEnLinea = Number(extractDimension(this));
        cantPieceByPlayer = (dimension(fichasEnLinea).x * dimension(fichasEnLinea).y)/2;
        game.setCantPieceWinner(fichasEnLinea);
        board.setDimension(fichasEnLinea);
        frontBoard.setDimension(fichasEnLinea);
        matrixBoard.setDimension(fichasEnLinea);
        board.draw();
        pieces = [];
        initPieces(1);
        initPieces(2);
        contPieceOffGame = pieces.length;
        drawPiece();
        frontBoard.draw();
    }
});

let imagenes = document.getElementsByClassName("pieza1");
let array1= Array.from(imagenes);

array1.forEach(img => {
    img.onload=function(){
        img.addEventListener("click", function () {
            let source= img.getAttribute("src");
            if(!start){
                image1.src= source;
            }
        });
    }
});

let imagePlayer2 = document.getElementsByClassName("pieza1Player2");
let arrayImagePlayer2 = Array.from(imagePlayer2);

arrayImagePlayer2.forEach(img => {
    img.onload=function(){
        img.addEventListener("click", function () {
            console.log("click");
            let source= img.getAttribute("src");
            if(!start){
                image2.src= source;
            }
        });
    }
});