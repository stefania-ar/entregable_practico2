//boton del DOm que reinicia el juego
let btnReiniciar = document.getElementById("btn_reiniciar");
//div contenedor de todo, lo llamo en caso de ganar modifico su tamaño
let divContenedor = document.getElementById("div_contenedor");
//div del DOM que contiene formularios de apariencia
let divPStartPTurn= document.getElementById("div_pStart_pTurn");
//div del DOM que contiene formularios de apariencia
let divHer = document.getElementById("herramientas_de_apariencia");
//div del DOM que contiene mensaje del jugador ganador
let div = document.getElementById("winner");
//parrafo del DOM que marca columna de fichas del jugador 1
let pPlayer1 = document.getElementById("p_player1");
//parrafo del DOM que marca columna de fichas del jugador 2
let pPlayer2 = document.getElementById("p_player2");
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
//seteamos el tamaño del canvas a tamaño del la pantalla window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-20;
let width = canvas.width;
let height = canvas.height;
//formulario del DOM para cambbiar la dimensión del tablero
let formDimension = document.getElementById("dimensionBoard");
//leemos la dimensión por defecto desde el DOM
let fichasEnLinea = Number(extractDimension(formDimension));
//se calcula la cantidad de piezas por jugador dependiendo de as dimensiones del tablero
let cantPieceByPlayer = (dimension(fichasEnLinea).x * dimension(fichasEnLinea).y)/2;
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
let timerOnStart=false;
//se comienza dibujando la parte de atras del tablero
board.draw();
//se dibuja la parte frontal del tablero
frontBoard.draw();
//se cargan las imágenes para las piezas
image1 = new Image(); //iniciar ruta
image1.src="img/piece.png";

image2= new Image();
image2.src="img/piece2.png";
//imagen para la parte frontal del tablero
imageBoard = new Image(); //iniciar ruta
imageBoard.src="img/ventana.png";

//cambia la dimensión del tablero dependiendo la cantidad de fichas en línea que elija el jugador
function dimension(fichasEnLinea){
    if(fichasEnLinea===4){
        return {x: 7, y: 6}
    }else if(fichasEnLinea===6){
        return{x: 8,  y: 7}
    }else{
        return  {x: 9,  y: 8}
    }
}

//inicia las imágenes de las fichas
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

//pinta las imágenes de las ventanas del tablero
imageBoard.onload = function(){
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

//extrae el valor del formulario de dimensión del tablero
function extractDimension(form){
    var data = new FormData(form);
    for (const entry of data) {
      return entry[1];
    }
}

//agrega las piezas a los jugadores y las ubica en el canvas
function initPieces(player){
    let cantPiece = cantPieceByPlayer;
    let y = 50;
    let x = piecePixel*3;
    let marginY = (radio*2.3);
    if(player === 1){
        addPiecePlayer(image1, player, x, y, fill1, marginY, cantPiece, radio);
    }else{
        x = width - x;
        addPiecePlayer(image2, player, x, y, fill2, marginY, cantPiece, radio);
    }
    frontBoard.setImage(imageBoard);
    frontBoard.draw();
}

//divide las fichas a cada jugador
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

//crea las fichas y las agrega al arreglo
function addPiece(x, y, fill, image, player, radio){
    let piece = new Piece(x, y, fill, image, piecePixel, ctx, player, radio);
    pieces.push(piece);
}

//Dibuja cada una de las piezas y limpia el canvas para que no se superpongas las fichas
function drawPiece(){
    clearCanvas();
    for(let i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
}

//variables auxiliares de la animación de las fichas al caer
let clickPiece;
let xTransition;
let xCell;
let yCell;

//función que permite que se vea la caída de las fichas
function transition(){
    setTimeout(function(){
        let rangeMove = 30;//pixels
        let yTransition = Math.min(clickPiece.getY() + rangeMove, yCell);
        clickPiece.setPositionOfTransition(xTransition, yTransition);
        drawPiece();
        frontBoard.draw();
        if(yTransition < yCell){
            transition();
        }
    }, 10);
}

//obtiene el título para pasar el mensaje de que el juego terminó
let h1fromHTML =document.getElementById("H1GameOver");

//termina el juego, muestra los mensajes correspondientes, esconde el tablero y las fichas y frena el timer
function endGame(){
    clearInterval(inter);
    gameEnd =true;
    timerOnStart= false;
    viewControl.hiden(btnReiniciar);
    viewControl.hiden(pPlayer1);
    viewControl.hiden(pPlayer2);
    viewControl.hiden(pTurnPlayer);
    viewControl.hiden(canvas);
    viewControl.hiden(divHer);
    viewControl.show(div);
    viewControl.hiden(h1);
    viewControl.show(h1fromHTML);
    viewControl.resetHeight(divContenedor, 482);
}

//5 minutos son 300000 milisegundos, un minuto son 60000 milisegundos
//variables necesarias para iniciar el timer y mostrar el tiempo restante en el HTML
let m=4;
let s=60;
let txt= document.getElementById('txt');

function startTimer() {
    if(m ==0 && s==0){
        endGame();
    }else{
        if(m>=0){
            if(s== 0){
                m = m-1;
                s= 60;
            }
            s= s-1;
            if (s < 10) {
                txt.innerHTML = m+ ":" + "0"+s;
            }else{
                txt.innerHTML =  m + ":" + s;
            }
        }
    }
};

//cuando termina el juego, espera unos segundos a que termine la animación de la ficha y muestra al final el mensaje de terminado el juego
function showEndGame(){
    setTimeout(function(){
        viewControl.changeParagraphTurn(pTurnPlayer, turn);
        viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);
        viewControl.hiden(divPStartPTurn);
        viewControl.hiden(pPlayer1);
        viewControl.hiden(pPlayer2);
        viewControl.hiden(btnReiniciar);
        viewControl.hiden(canvas);
        viewControl.resetHeight(divContenedor, 482);
        viewControl.show(div);
        clearInterval(inter);
    }, 3000);
}

//esta función gestiona todo lo que sucede cuando se levanta el click del mouse.
function onMouseUp(e){
    isMouseDown = false;
    //si se selecciona una ficha y no está dentro de una celda del tablero obtiene su posición
    if(clickPiece != null && !clickPiece.getInCell()){
        let x= clickPiece.getX();
        let y= clickPiece.getY();
        //si la posicion se encuentra dentro del arreglo
        if(matrixBoard.whichColumn(x, y) > 0){
            //recorre las celdas cuando se suelta una ficha preguntando cuál está disponible
            let cell = matrixBoard.lastFreeCell(matrixBoard.whichColumn(x, y)).lastFreeCell;
            let posCelda= matrixBoard.lastFreeCell(matrixBoard.whichColumn(x, y)).posEnArreglo;
            cell.setPiece(clickPiece);
            //setea una ficha en una celda y se vuelve no disponible para insertar otra ficha
            clickPiece.setInCell(true);
            turn = game.changeTurn(turn);
            //decrementa el número de fichas que hay disponibles
            contPieceOffGame= game.decreasePieceOffGame(contPieceOffGame);
            //hasta acá va la ficha
            xCell= cell.getXStart()+((cell.getXEnd()-cell.getXStart())/2);
            yCell= cell.getYStart()+((cell.getYEnd()-cell.getYStart())/2);
            rangeMove = (yCell-y)/30;
            xTransition = xCell;
            transition();
            //busca si hay ganador cada vez que se suelta una ficha
            let winner = game.searchWinner(cell.getNroRow(), posCelda);
            //si hay ganador se termina el juego y se muestran los mensajes, si no el juego continua y se cambian los turnos
            if(winner != null){
                gameEnd = true;
                h1.innerHTML = "Ganó el jugador "+winner;
                showEndGame();
            }else{
                viewControl.changeParagraphTurn(pTurnPlayer, turn);
            }
        }
        board.draw();
        drawPiece();
        frontBoard.draw();
        //en caso de que se agoten las fichas disponibles de los jugadores se termina el juego
        if(!game.pieceOffGame(contPieceOffGame)){
            h1.innerHTML = "Los jugadores se quedaron sin fichas";
            showEndGame();
        }
    }
}
let turn = 1;
let inter;

//esta funcion gestiona cuando se arrastra una ficha
function onMouseDown(e){
    board.draw();
    isMouseDown = true;
    //en caso de que no se esté en juego y se esté seleccionando una ficha no permite el movimiento de ella
    if(lastClickedPiece != null && gameEnd===false){
        lastClickedPiece = null;
    }
    clickPiece = findClickedFigure(e.layerX, e.layerY);
    if(clickPiece  != null && gameEnd===false){
        //determina que el juego se comenzó a jugar
        start = true;
        if(!timerOnStart){
            inter = setInterval(startTimer, 1000);
            timerOnStart = true;
        }
        //muestra boton de reiniciar
        viewControl.show(btnReiniciar);
        //oculta div con herramientas de apariencia de fichas y tablero
        viewControl.hiden(divHer);
        //oculta el mensaje (parrafo) del jugador que comienza
        viewControl.hiden(pStartPlayer);
        //setea el turno y lo muestra el turno
        viewControl.changeParagraphTurn(pTurnPlayer, turn);
        viewControl.show(pTurnPlayer);
        //seteo e tamaño del div contenedor del canvas para que se ajuste mejor
        viewControl.resetHeight(divContenedor, 750);
        //guarda el numero de jugador del turno actual del jugador
        lastClickedPiece = clickPiece;
    }
    drawPiece();
    frontBoard.draw();
}

function onMouseMove(e){
    board.draw();
    //si el juegó empezó y se seleccióno una ficha permite lo siguiente
    if(isMouseDown && lastClickedPiece != null && start=== true){
        if(game.playerTurnControl(turn, lastClickedPiece.getPlayer())){
            //si es el turno del jugador, permite mover sólo su ficha y dentro de los límites permitidos, sólo por arriba del tablero y no más de él
            if(!lastClickedPiece.isInsideBoard(e.layerX, e.layerY, board.getPosX(), board.getPosY(), board.getWidth(), board.getHeight(), radio)){
                lastClickedPiece.setPosition(e.layerX, e.layerY, lastClickedPiece.getInCell(), lastClickedPiece.getPlayer(), board.getPosX(), board.getWidth(), board.getPosY(), board.getHeight());
            }else{ //no permite mover fichas que ya estén dentro del tablero
                lastClickedPiece.setPositionOffBoard(e.layerX, e.layerY, board.getPosX(),
                        board.getPosY(), board.getWidth(), radio, lastClickedPiece.getInCell());
            }
        }
    }
    drawPiece();
    frontBoard.draw();
}

//limpia el canvas de todas las figuras dibujadas hasta el momento
function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
    board.draw();
}

//encuentra gracias a una posición x e y en el canvas encontrar qué pieza fue clickeada
function findClickedFigure(x, y){
    for(let i = 0; i< pieces.length; i++){
        const element = pieces[i];
        if(element.isPointInside(x, y)){
            return element; //si se hizo click dentro de una ficha se devuelve a sí misma
        }
    }
}

//se dibuja el tablero y se inician sus piezas
function loadBoardAndPieces(){
    pieces = [];
    viewControl.hiden(div);
    viewControl.show(canvas);
    matrixBoard.cleanCells();
    initPieces(1);
    initPieces(2);
    frontBoard.draw();
}
//cambia en el DOM el jugador que comienza a jugar.
viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);

//addEventListeners
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

//una vez clickeado el botón para resetear se llama a pintar el tablero, las fichas, y el tablero comando con las opciones a elegir
//se reinicia el timer. Se puede comenzar un juego nuevo
function resetGame(){
    timerOnStart=false;
    clearInterval(inter);
    viewControl.hiden(btnReiniciar);
    viewControl.hiden(pTurnPlayer);
    viewControl.resetHeight(divContenedor, 950);
    viewControl.changeStartingPlayerParagraph(pStartPlayer, turn);
    viewControl.show(divPStartPTurn);
    viewControl.show(pPlayer1);
    viewControl.show(pPlayer2);
    start = false;
    gameEnd= false;
    loadBoardAndPieces();
    viewControl.show(divHer);
    viewControl.show(canvas);
    txt.innerHTML = "5:00";
    m= 4;
    s= 60;
    if(!timerOnStart && start){
        inter= setInterval(startTimer, 1000);
        timerOnStart= true;
    }
}
//reinicia el juego
btnReiniciar.addEventListener("click",  resetGame);
//recargar tablero una vez que la partida se termina y se aprieta en el botón correspondiente
document.getElementById("btnLoadCanvas").addEventListener("click",resetGame);

//cambia los colores de la fichas del jugador 1
document.getElementById("formColorPlayer1").addEventListener("change",function(e){
    //No se puede cambiar de color una vez iniciado el juego
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
//cambia los colores de la fichas del jugador 2. 
document.getElementById("formColorPlayer2").addEventListener("change",function(e){
    //No se puede cambiar de color una vez iniciado el juego
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

//cambia la dimensión de tablero en función de lo elegido por el jugador. No se puede cambiar la dimensión del tablero
//una vez iniciado el juego
document.getElementById("dimensionBoard").addEventListener("change",function(e){
    if(!start){
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
//cambia imagen de fichas del player 1
let btnsPlayer1 = document.querySelectorAll(".pieza1Player1");
btnsPlayer1.forEach(boton => {
	boton.addEventListener("click", function(e){
        let source = e.path[0].getAttribute("src");
        if(!start && source != null){
            image1.src= source;
        }
    });
});
//cambia imagen de fichas del player 2
let btnsPlayer2 = document.querySelectorAll(".pieza1Player2");
btnsPlayer2.forEach(boton => {
	boton.addEventListener("click", function(e){
        let source = e.path[0].getAttribute("src");
        if(!start && source != null){
            image2.src= source;
        }
    });
});