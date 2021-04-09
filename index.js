
var bg_color = [1,0,0,0];
var fd_color = [255,0,0,0];
var hungerCount = 0;
var hungerLevel = 0;
var count5 =0;
var flag = 0;
var flagger = 0;
var btn = document.getElementById('submit');
btn.addEventListener('click', func);
function func() {
    startGame(document.getElementById("fname").value);
}

function startGame(initialHunger) {
    myGameArea.start();
    map();
    myGamePiece = new robot(30, 30, "red", 240, 270);
    myHunger = new hunger(initialHunger)
    hungerLevel = initialHunger;
    // console.log(initialHunger);
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 370;
        this.context = this.canvas.getContext("2d");
        // var ctx = myGameArea.context;
        // bg_color = ctx.getImageData(1,1,1,1).data;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
};
function hunger(initialHunger){
    
    this.update =function(hungerDegree){
        ctx = myGameArea.context;
        ctx.font = "30px" + " " + "Consolas";
        ctx.fillStyle = "blue";
        // hungerLevel = myGamePiece.onFeedingCourse;
        hungerLevel = hungerLevel-Math.ceil(hungerDegree/10000);
        if(myGamePiece.onFeedingCourse){
            hungerLevel += 5;
        }
        // myHunger.text = "Hunger: " + hungerLevel;
        myHunger.text = "Hunger " + hungerLevel;

        ctx.fillText(this.text, 480, 40);
    }
}
function robot(width, height, color, x, y) {

    this.width = width;
    this.height = height;
    this.speed = 2;
    this.angle = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();    
    }
    this.newPos = function() {
        if (this.type == "turn") {
            this.angle += 1 * Math.PI / 180;
        }
        // this.angle += 1 * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    this.steering = function(){
        ctx = myGameArea.context;
        var rightsensorx = this.x + 25 * Math.sin(this.angle+Math.PI/4); 
        var rightsensory = this.y - 25 * Math.cos(this.angle+Math.PI/4);
        // ctx.fillRect(rightsensorx, rightsensory,2, 2);
        var rightsensorValue = ctx.getImageData(rightsensorx,rightsensory,1,1).data;

        var leftsensorx = this.x + 25 * Math.sin(this.angle-Math.PI/4); 
        var leftsensory = this.y - 25 * Math.cos(this.angle-Math.PI/4);
        // ctx.fillRect(leftsensorx, leftsensory,2, 2);
        var leftsensorValue = ctx.getImageData(leftsensorx,leftsensory,1,1).data;
        
        this.steerRight = function(){
            myGamePiece.angle += Math.PI/6;
        }

        this.steerLeft = function(){
            myGamePiece.angle -= Math.PI/6;
        }
        
        this.checkingLineColor = function(leftsensorValue,rightsensorValue,onFeedingCourse){
            // onFeedingCourse = 0;
            
            if(!onFeedingCourse){
                if(leftsensorValue[0]==bg_color[0]){
                    // this.speed=0;
                    // flag=1;
                    flag=1;
                    flagger=1;
                    this.steerLeft();
                }
                if(rightsensorValue[0]==bg_color[0]){
                    // this.speed=0;
                    // flag=1;
                    flag=1;
                    flagger=1;
                    this.steerRight();
                }
                
                if(leftsensorValue[0]==fd_color[0]&&hungerLevel<=500){
                    // onFeedingCourse = 1;
                    this.onFeedingCourse=1;
                    flag=1;
                    flagger=1;
                    // this.speed=0;
                    this.steerLeft();
                }
                if(rightsensorValue[0]==fd_color[0]&&hungerLevel<=500){
                    // onFeedingCourse = 1;
                    this.onFeedingCourse=1;
                    flag=1;
                    flagger=1;
                    // this.speed=0;
                    this.steerRight();
                }
            }

          else  if(onFeedingCourse){
                if(leftsensorValue[0]==fd_color[0]){
                    // this.speed=0;
                    // flag=1;
                    flag=1;
                    flagger=1;
                    this.steerLeft();
                }
                if(rightsensorValue[0]==fd_color[0]){
                    // this.speed=0;
                    // flag=1;
                    flag=1;
                    flagger=1;
                    this.steerRight();
                }
                if(leftsensorValue[0]==bg_color[0]){
                    // this.speed=0;
                    // onFeedingCourse = 0;
                    this.onFeedingCourse=0;
                    flag=1;
                    flagger=1;
                    this.steerLeft();
                }
                if(rightsensorValue[0]==bg_color[0]){
                    // this.speed=0;
                    // onFeedingCourse = 0;
                    this.onFeedingCourse=0;
                    flag=1;
                    flagger=1;
                    this.steerRight();
                }

            }
            
            // this.speed = 2;
            // console.log(onFeedingCourse);
        }

        this.checkingLineColor(leftsensorValue, rightsensorValue, this.onFeedingCourse);
        
       
    }

  
}



function updateGameArea() {
    myGameArea.clear();
    map();
    hungerCount+=1;
    myGamePiece.newPos();
    myGamePiece.update();
    if(flagger){
        if(flag==1){
            count5 = hungerCount;
            flag=0;
        }
        if(hungerCount-count5>2){
            myGamePiece.steering();
            // flag=0;
            flagger = 0;
        }
        
    }
    else{
        myGamePiece.steering();
    }
   console.log(flag);
    
    myHunger.update(hungerCount);
    // myGamePiece.newPos();
    // myGamePiece.update();


    // console.log(myGamePiece.speed);
}