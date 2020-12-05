var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d"); // create canvas layout
var tx = window.innerWidth; //get width of view
var ty = window.innerHeightl; // get height of view
canvas.width= tx; // set canvas width
canvas.height = ty;// set canvas height

var xmouse =0, ymouse= 0;

addEventListener("mousemove",function(){
    xmouse = event.clientX; //   coor-X within application's viewpoint at which event occurred
    ymouse = event.clientY;// coor-Y within application's viewpoint at which event occurred
}) // function to active when mouse move

var grav = 0.99;
c.strokeWidth = 5; // set width of c 

function randomColor(){
    return("rgba(" + Math.round(Math.random()*250)+","
    + Math.round(Math.random()*250) + ","
    + Math.round(Math.random()*250) + ","
    + Math.ceil(Math.random() *10)/10 + ")" // Math.ceil: round number UP to the nearset Intenger
    );
}

function Ball(){ //create Ball
    this.color = randomColor();
    this.radius = Math.random()*20 +14 ; // 14 - > 33
    this.startRadius = this.radius;
    this.x = Math.random() * (tx- this.radius*2) + this.radius;
    this.y = Math.random() * (ty- this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random()-0.5) *10);
    this.vel = Math.random() / 5; 
    this.update = function(){
        c.beginPath();  
        c.arc(this.x,this.y, this.radius,0, Math.PI*2);
        c.fillStyle =this.color;
        c.fill();
    }
}

var balls = [];
for(var i = 0 ;i<50;i++)
    balls.push(new Ball());



function animate(){
    if(tx != window.innerWidth || ty != window.innerHeight){
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate); // call back animate
    c.clearRect(0,0,tx,ty); // clear canvas
    for(var i = 0 ;i<balls.length;i++){
        balls[i].update();
        balls[i].x += balls[i].dx; // help balls move horizontally
        balls[i].y += balls[i].dy; // help balls move vertically
        if(balls[i].y + balls[i].radius >= ty){
            balls[i].dy = -balls[i].dy * grav; 
        }else balls[i].dy += balls[i].vel; // if ball move up out of height of viewpoint then move down

        if(balls[i].x + balls[i].radius > tx || balls[i].x - balls[i].radius <0){
            balls[i].dx = - balls[i].dx 
        } // keep balls cant move out of width of viewpoint
        if(xmouse > balls[i].x - 100 && xmouse < balls[i].x +100 &&
            ymouse > balls[i].y - 100 && ymouse < balls[i].y +100 && balls[i].radius<100){
                balls[i].radius += 5;
            }else {
                if(balls[i].radius > balls[i].startRadius){ // if ball too big then have to make small
                    balls[i].radius += -5;
                }
            }
    }

}

animate();

setInterval(function(){
    balls.push(new Ball());
    balls.splice(0, 1); //add one ball in index=0 in balls
},400);

