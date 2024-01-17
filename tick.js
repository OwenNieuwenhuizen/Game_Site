function startGame() {
    
    test = new component(5,30,black,200,300);
}

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.canvas.width = 780;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // this.frameNo = 0;
        // this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < myObstacles.length; i++) {
            var obj = myObstacles[i];
            var element = document.getElementById(obj.id);

            // Check if the element exists before trying to remove it
            if (element) {
                element.parentNode.removeChild(element);
            }
        }
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function component(width,height,color,x,y,type) {
    ctx=myGameArea.context;
    ctx.fillSytle=color;
    ctx.fillRect=(x,y,width,height);
}