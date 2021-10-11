class Piece{

    constructor(x, y, fill, image, piecePixel, ctx, player, radio){
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.ctx = ctx;
        this.player = player;
        this.image = image;
        this.piecePixel = piecePixel;
        this.radio=radio;
        this.inCell = false;
    }

    getFill(){
        return this.fill;
    }

    setImg(source){
        this.image.src= source;
    }

    draw(){
        ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.drawImage(this.image, this.x-this.radio, this.y-this.radio, this.piecePixel, this.piecePixel);
    }

    isPointInside(x, y){
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(_x*_x+_y*_y)<this.radio;
    }
    setInCell(inCell){
        this.inCell = inCell;
    }
    //devuelve si la ficha se encuentra en el rango adecuado para caer dentro del tablero
    isPointInsideRange(x_ini,x_fin, y_ini, y_fin){
        return (this.getX()> x_ini && this.getX< x_fin) && (this.getY()> y_ini && this.getY< y_fin);
    }
    //devuelve si el mouse entra al tablero por un lado inadecuado del tablero
    isInsideBoard(xMouse, yMouse, boardPosX, boardPosY, boardWidth, boardHeight, radio){
        return xMouse > boardPosX-radio && xMouse < boardPosX+boardWidth+radio && yMouse < boardPosY+boardHeight+radio && yMouse > boardPosY-radio;
    }
    //cambia la posición de la ficha en caso que se arrastre por fuera del tablero
    //se usa en caso que la ficha no esté en una celda y limita hasta donde se lleva la ficha
    //para que las fichas de los jugadores no se mezclen
    setPosition(x, y, inCell, player, boardX, boardWidth, boardY, boardHeight){
        if(!inCell){
            if(player === 1 && x< boardX + boardWidth && y < boardY+boardHeight){
                this.x = x;
                this.y = y;
            }else if(player ===2 && x > boardX && y < boardY+boardHeight){
                this.x =x;
                this.y =y;
            }
        }
    }
    //cambia la posicion de la ficha cuando se le aplica la transicion dentro del tabero
    setPositionOfTransition(xTransition, yTransition){
        this.x =xTransition;
        this.y =yTransition;
    }
    //cambia la posición de la ficha de forma que no entre en el tablero
    //se usa en caso que la ficha no esté en una celda y se quiera insertar por un lado del tablero que no corresponde
    setPositionOffBoard(layerX, layerY, boardPosX, boardPosY, boardWidth, radio, inCell){
        if(!inCell){
            if((this.x > boardPosX-radio && this.x < boardPosX+boardWidth+radio && this.y < boardPosY-radio) ||
            (this.x > boardPosX-radio && this.x < boardPosX+boardWidth+radio && this.y > boardPosY-radio)){
                this.x = layerX;
            }else{
                this.y = layerY;
            }
        }
    }

    getPosition(){
        return{
            x: this.getX(),
            y: this.getY()
        };
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getPlayer(){
        return this.player;
    }

    getInCell(){
        return this.inCell;
    }

    setFill(fill){
        this.fill = fill;
    }
}