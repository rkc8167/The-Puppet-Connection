let remoteLocations = [];
let locations = [];
let pencolor;
let username = prompt("Enter your name:"); 
let socket;
console.log("p5working"); 
function setup() {
    createCanvas(600, 400);
    pencolor = color(random(0,255), random(0,255), random(0,255));
    socket = io();
    socket.on('remote-draw', (data) => {
        remoteLocations.push(data);
    });
}
function draw() {
    background(255);
    fill(pencolor);
    stroke(pencolor);
    text(username, mouseX+10, mouseY+10); 

    for(let loc of locations){
        let x = loc[0];
        let y = loc[1];
        noStroke();
        ellipse(x, y, 10);
        
    }
    for(let rloc of remoteLocations){
        let x = rloc.x;
        let y = rloc.y;
        let colorData = rloc.color;
        fill(colorData);
        noStroke();
        ellipse(x, y, 10);
    }
}

function mouseDragged() {
    locations.push([mouseX, mouseY]);
    socket.emit('draw', {x: mouseX, y: mouseY, color: pencolor.toString(), user: username});
}