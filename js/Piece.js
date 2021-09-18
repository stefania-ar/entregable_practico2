class Piece{

    constructor(x, y, image, piecePixel, ctx, player){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.player = player;
        this.image = image;
        this.piecePixel = piecePixel;
    }

    draw(){
        this.ctx.drawImage(image, this.x, this.y, this.piecePixel, this.piecePixel);
    }

    isPointInside(x, y){
        if(x >= this.x && x <= this.x + this.piecePixel && y >= this.y && y <= this.y + this.piecePixel){
            return true;
        }else{
            return false;
        }
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

}