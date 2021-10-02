
class ViewControl{

    viewWinner(div,canvas){
        div.className = "show";
        canvas.className = "hiden";
    }

    hidenWinner(div, canvas){
        div.className = "hiden";
        canvas.className = "show";
    }

    hidenParagraph(p){
        //classList.remove("");
        p.className = "hiden";
    }
    showParagraph(p){
        //classList.remove("");
        p.className = "show";
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

    changeStartingPlayerParagraph(p, lastPlayer){
        let startPlayer;
        if(lastPlayer == 2){
            startPlayer = 1;
        }else{
            startPlayer = 2;
        }
        p.innerHTML = "Comienza el jugador " + startPlayer;
        this.showParagraph(p);
    }

}