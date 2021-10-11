class ViewControl{
    //oculata elemento que se le pase del DOM
    hiden(element){
        element.classList.remove("show");
        element.classList.add("hiden");
    }
    //muestra elemento que se le pase del DOM
    show(element){
        element.classList.remove("hiden");
        element.classList.add("show");
    }
    //cambia colores de fichas segun el player que se le pase
    changeColor(color, player, pieces) {
        if(player == 1){
            for(let i = 0; i<pieces.length/2; i++){
                pieces[i].setFill(color);
            }
        }else{
            for(let i = pieces.length/2; i<pieces.length ;i++){
                pieces[i].setFill(color);
            }
        }
    }
    //retorna el string con el color que se hizo click en un formulario del DOM
    readColor(form){
        var data = new FormData(form);
        for (const entry of data) {
          return entry[1];
        }
    }
    //se cambia en el DOM en donde se muestra que jugador comienza a jugar
    changeStartingPlayerParagraph(p, turn){
        p.innerHTML = "Comienza el jugador " + turn;
        this.show(p);
    }
    //se cambia en el DOM el texto que dice de quien es el turno e jugar
    changeParagraphTurn(p, turn){
        p.innerHTML = "Turno del jugador " + turn;
    }
    //cambia en el DOm el alto e un elemento que se le pase
    resetHeight(element, height){
        element.style.height = height+'px';
    }

}