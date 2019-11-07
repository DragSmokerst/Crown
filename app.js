var myGamePiece;
var myEnermy1;
var myScore;
function startGame(){
    myGameArea.start();
    myGamePiece = new components(10,10, "red", 20,250);
    myEnermy1 = new components(200,10,"green",250,300);
    mySteet = new components(10,30,"green", 10, 480);
    myScore = new components(50,50,"black", 375,25,"text");

}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.frameNo = 0;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        //mutikeyboard
        window.addEventListener('keydown', function(e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup',function(e){
            myGameArea.keys[e.keyCode] = false;
        })
        //singlekeyboard
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
          })

    },
    clear: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

function updateGameArea(){
    if(myGamePiece.crashWith(myEnermy1)){
        myGameArea.stop();
    }
    else{
    myGameArea.clear();
    myGamePiece.controler();
    myGamePiece.newPods();
    myEnermy1.update();
    myGamePiece.update();
    mySteet.update();
    myGameArea.frameNo +=1;
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    }
}
function components(height,width,color,x,y,type)
{
    this.type = type;
    this.height = height;
    this.width = width;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravityspeed = 0;
    this.update = function(){
    ctx = myGameArea.context;
    if(this.type == "text"){
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
    else{
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }
    this.newPods = function(){
        this.gravityspeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravityspeed;
        //Limit
        this.hitBottom();
        this.hitTop();
        this.hitRight();
        this.hitLeft();
    }
    //Limit
    this.hitRight = function(){
        var rockright = myGameArea.canvas.width - this.width ;
        if (this.x > rockright) {
            this.x = rockright;
        }
    }
    //Left 
    this.hitLeft = function(){
        var rockleft = 0;
        if (this.x < rockleft) {
            this.x = rockleft;
        }
    }    
    //Top
    this.hitTop = function(){
        var rocktop = 0;
        if (this.y < rocktop) {
            this.y = rocktop;
        }
    }
    //Bottom
    this.hitBottom = function(){
        var rockbottom = myGameArea.canvas.height - this.height;
        if(this.y > rockbottom){
            this.y = rockbottom;
        }
    
    }
    ////////////
    //Controller
    this.controler = function(){
            var A = 65;
            var S = 83;
            var D = 68;
            var W = 87;
            var Space = 32;
            this.speedX = 0;
            this.speedY = 0;
            this.gravity = 0.2;
            if(myGameArea.keys && myGameArea.keys[A])
            {
                this.speedX -=10;
            }
            if(myGameArea.keys && myGameArea.keys[D])
            {
                this.speedX +=10;
            }
            if(myGameArea.keys && myGameArea.keys[S])
            {
                this.speedY +=10;
            }
            if(myGameArea.keys && myGameArea.keys[W])
            {
                this.speedY -=10;
            }
            if(myGameArea.keys && myGameArea.keys[Space]){
                    this.gravity = -1;
        }            
    }
    //Sự kiện 
    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherobjleft = otherobj.x;
        var otherobjright = otherobj.x + (otherobj.width);
        var otherobjtop = otherobj.y;
        var otherobjbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((myleft > otherobjright) || (myright < otherobjleft) || (mytop > otherobjbottom) || (mybottom < otherobjtop)) {
            crash = false;
        }
        return crash;

}
}