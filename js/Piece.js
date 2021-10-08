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
        //this.ctx.strokeStyle = "black";
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

    /*inCell(cell){
        let xStart = cell.getXStart();
        let xEnd = cell.getXEnd();
        let yStart = cell.getYStart();
        let yEnd = cell.getYEnd();
        return this.getX()> xStart && this.getX< xEnd && this.getY()> yStart && this.getY< yEnd;
    }*/

    isPointInsideRange(x_ini,x_fin, y_ini, y_fin){
        return (this.getX()> x_ini && this.getX< x_fin) && (this.getY()> y_ini && this.getY< y_fin);
    }

    isInsideBoard(xMouse, yMouse, boardPosX, boardPosY, boardWidth, boardHeight, radio){
        return xMouse > boardPosX-radio && xMouse < boardPosX+boardWidth+radio && yMouse < boardPosY+boardHeight+radio && yMouse > boardPosY-radio;
    }

    setPosition(x, y, inCell){
        if(!inCell){
            this.x = x;
            this.y = y;
        }
    }

    setPositionOffBoard(layerX, layerY, boardPosX, boardPosY, boardWidth, radio){
        if((this.x > boardPosX-radio && this.x < boardPosX+boardWidth+radio && this.y < boardPosY-radio) || (this.x > boardPosX-radio && this.x < boardPosX+boardWidth+radio && this.y > boardPosY-radio)){
            this.x = layerX;
        }else{
            this.y = layerY;
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