class FrontBoard extends Board{

    constructor(cantX, cantY, ctx, width, height){
        super(cantX, cantY, ctx, width, height);
        this.image = new Image();
    }

    draw(){
        //console.log(this.centerY());
        //console.log(this.getHeight());
        //console.log(this.getWidth());
        for(let y = this.centerY(); y<this.centerY()+this.getHeight(); y+=100){
            //console.log("y: "+y);
           for(let x = this.centerX(); x< this.centerX()+this.getWidth(); x+=100){
                //console.log("x: "+x);
                //console.log(this.image);
                this.ctx.drawImage(this.image, x, y, 100, 100);
            }
        }
    }

    setImage(image){
        this.image = image;
    }
}