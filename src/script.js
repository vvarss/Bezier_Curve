const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let p0 = { x: 100, y: canvas.height / 2 };
let p3 = { x: canvas.width - 100, y: canvas.height / 2 };

let p1 = { x: 300, y: canvas.height / 2 };
let p2 = { x: canvas.width - 300, y: canvas.height / 2 };


let vel1 = {x:0,y:0};
let vel2 = {x:0,y:0};

let target1 = {x:p1.x,y:p1.y};
let target2 = {x:p2.x,y:p2.y};


function bezier(t,p0,p1,p2,p3){
    let u=1-t;

    return {
        x:u*u*u * p0.x + 3*u*u*t * p1.x + 3*u*t*t * p2.x + t*t*t * p3.x,
        y:u*u*u * p0.y + 3*u*u*t * p1.y + 3*u*t*t * p2.y + t*t*t * p3.y,
        
    };
}

function bezierderivative(t,p0,p1,p2,p3){
    let u=1-t;
    return {
        x:3*u*u * (p1.x - p0.x) + 6*u*t * (p2.x-p1.x) + 3*t*t * (p3.x-p2.x),
        y:3*u*u * (p1.y - p0.y) + 6*u*t * (p2.y-p1.y) + 3*t*t * (p3.y-p2.y),
        
    };
}


function string(point,vel,target){
    const k=0.05;
    const damping = 0.12;

    let ax = -k * (point.x - target.x) - damping * vel.x;
    let ay = -k * (point.y - target.y) - damping * vel.y;

    vel.x += ax;
    vel.y += ay;

    point.x += vel.x;
    point.y += vel.y;
}

function update(){
    string(p1,vel1,target1);
    string(p2,vel2,target2);
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBezierCurve();
    Tangents();
    drawControlPoints();
} 

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}
loop();

function Tangents(){
        let t=0.5;
        let p = bezier(t, p0, p1, p2, p3);
        let tan = bezierderivative(t, p0, p1, p2, p3);

        let len = Math.hypot(tan.x, tan.y);
        tan.x /= len;
        tan.y /= len;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + tan.x * 40, p.y + tan.y * 40);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

function drawBezierCurve(){
    ctx.beginPath();
    let p = bezier(0,p0,p1,p2,p3);
    ctx.moveTo(p.x,p.y);

    for(let t=0;t<=1;t+=0.01){
        p = bezier(t,p0,p1,p2,p3);
        ctx.lineTo(p.x,p.y);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
}

function drawControlPoints(){
    ctx.fillStyle = "Red";
    [p0,p1,p2,p3].forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,6,0,Math.PI * 2);
        ctx.fill();
    });
}



canvas.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    target1.x = x - 150;
    target1.y = y;

    target2.x = x + 150;
    target2.y = y - 100;
});
















