
class ViewControl{

    viewWinner(div,canvas){
        div.classList.remove("hiden");
        div.classList.add("show");
        div.classList.remove("show");
        canvas.classList.add("hiden");
    }

    hidenWinner(div, canvas){
        div.className = "hiden";
        canvas.className = "show";
    }

    hidenParagraph(p){
        p.classList.remove("show");
        p.classList.add("hiden");
    }
    showParagraph(p){p
        p.classList.remove("hiden");
        p.classList.add("show");
    }

    /*loadBoard(){
        canvas.className = "sowCanvas";
        document.getElementById();
    }*/
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

    readColor(form){
        var data = new FormData(form);
        for (const entry of data) {
          return entry[1];
        }
    }

    changeStartingPlayerParagraph(p, turn){
        p.innerHTML = "Comienza el jugador " + turn;
        this.showParagraph(p);
    }

    changeParagraphTurn(p, turn){
        p.innerHTML = "Turno del jugador " + turn;
    }

    changePieceImage(source, player, pieces){
        if(player == 1){
            for(let i = 0; i<pieces.length/2; i++){
                pieces[i].setImg(source);
            }
        }else{
            for(let i = pieces.length/2; i<pieces.length ;i++){
                pieces[i].setImg(source);
            }
        }
    }

}