var myObstacles = [];
var myScore;
var tankTop;
var tankBottom;
var tankGun;
var tankTred;
var shots = [];
var upP = false;
var downP = false;
var setShot = [];

// main.js

function startGame() {
    tankTop = new component(150,30,"black",50,140);
    tankBottom = new component(250,80,"green",0,170);
    tankGun = new component(60,10,"black",200,150);
    tankTred = new component(230,20,"grey",10,250);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

function restartGame() {
    myGameArea.stop();
    myObstacles = [];
    myScore = null;
    shots = [];
    myGameArea.clear();
}
function takeShot() {
    shots.push(new component(10,10,"purple",270,150));
}

function shotUp() {
    for(i=0;i<shots.length;i+=1) {
        shots[i].y += -1;
        shots[i].update();
    }
}
function upPressed(upP) {
    this.upP = upP;
}
function shotDown() {
    for(i=0;i<shots.length;i+=1) {
        shots[i].y += 1;
        shots[i].update();
    }
}
function downPressed(downP) {
    this.downP = downP;
}

function set() {
    setShot.push(shots[0]);
    shots.splice(1,1);
}

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.canvas.width = 780;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
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


function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.id = "";
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if(tankGun.crashWith(myObstacles[i]) || tankBottom.crashWith(myObstacles[i]) || tankTop.crashWith(myObstacles[i]) || tankTred.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "red", x, 0));
        myObstacles.id = "obstacle"+this.frameNo;
        myObstacles.push(new component(10, x - height - gap, "red", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    for(i=0;i<shots.length;i+=1) {
        shots[i].x += 1;
        shots[i].update();
    }
    for(i=0;i<setShot.length;i+=1) {
        setShot[i].x += 1;
        setShot[i].update();
    }
    for(let j=0;j<myObstacles.length;j+=1) {
        for(let i=0;i<shots.length;i+=1) {
            if(shots[i].crashWith(myObstacles[j])) {
                shots.splice(i,1);
                myObstacles.splice(j,1);
            }
        }
    }
    if(upP) {
        shotUp();
    }
    if(downP) {
        shotDown();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    
    myScore.update();
    tankBottom.update();
    tankTop.update();
    tankGun.update();
    tankTred.update();

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}