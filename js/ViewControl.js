
class ViewControl{

    viewWinner(div,canvas){
        div.className = "showWinner";
        canvas.className = "hidenCanvas";
    }

    hidenWinner(div){
        div.className = "hidenwinner";
        canvas.className = "showCanvas";
    }

    hidenPColor(p){
        //classList.remove("");
        p.className = "hidenPColor";
    }
    showPColor(p){
        //classList.remove("");
        p.className = "showPColor";
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
}