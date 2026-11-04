async function setup() {
    createCanvas(800, 600);
    bebé= await loadImage("./assets/bebe.png");

}

function draw() {
    background(255, 10, 150 );
    image(bebé,1,1, 600,6000);
}



