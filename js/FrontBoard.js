class FrontBoard extends Board{

    constructor(cantX, cantY, ctx, width, height){
        super(cantX, cantY, ctx, width, height);
        this.image = new Image();
    }

    draw(){
        for(let y = this.centerY(); y<this.centerY()+this.getHeight(); y+=100){
           for(let x = this.centerX(); x< this.centerX()+this.getWidth(); x+=100){
                this.ctx.drawImage(this.image, x, y, 100, 100);
            }
        }
    }

    setImage(image){
        this.image = image;
    }
}