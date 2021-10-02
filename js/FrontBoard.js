class FrontBoard extends Board{

    constructor(cantX, cantY, ctx, width, height, pixels){
        super(cantX, cantY, ctx, width, height, pixels);
        this.image = new Image();
    }

    draw(){
        for(let y = this.centerY(); y<this.centerY()+this.getHeight(); y+=this.pixels){
           for(let x = this.centerX(); x< this.centerX()+this.getWidth(); x+=this.pixels){
                this.ctx.drawImage(this.image, x, y, this.pixels, this.pixels);
            }
        }
    }

    setImage(image){
        this.image = image;
    }
}