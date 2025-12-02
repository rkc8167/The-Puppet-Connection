let locations = [];
let pencolor;
let username = prompt("Enter your name:"); 
console.log("p5working"); // Test to see if p5 is working
function setup() {
    createCanvas(600, 400);
    pencolor = color(random(0,255), random(0,255), random(0,255));
}
function draw() {
    background(255);
    fill(pencolor);
    stroke(pencolor);
    text(username, mouseX+10, mouseY+10); 

    //print(locations);
    for(let loc of locations){
        let x = loc[0];
        let y = loc[1];
        noStroke();
        ellipse(x, y, 10);
        
    }
}

function mouseDragged() {
    locations.push([mouseX, mouseY]);
}