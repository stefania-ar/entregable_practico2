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
//se le setea la imagen ya que se crea con la imagen vacia y cuando esta se cargue se la agrega
    setImage(image){
        this.image = image;
    }
}