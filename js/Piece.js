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

    draw(){
        ctx.beginPath();
        //this.ctx.strokeStyle = "black";
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.drawImage(image, this.x-this.radio, this.y-this.radio, this.piecePixel, this.piecePixel);
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

    setPosition(x, y){
        this.x = x;
        this.y = y;
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