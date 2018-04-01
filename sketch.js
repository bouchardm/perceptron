class Point {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
    }
    pixelX() {
        return map(this.x, 0, 1, 0, width);
    }
    pixelY() {
        return map(this.y, 0, 1, height, 0);
    }
    label() {
        return this.y < f(this.x) ? -1 : 1;
    }
}

class Perceptron {
    constructor(inputs) {
        this.weigth = [];
        for(let i = 0; i < inputs; i++) {
            this.weigth.push(random(-1, 1 ));
        }
        this.weigth.push(random(-1, 1)); // bias
        this.learningRate = 0.0002;
    }

    static activation(nb) {
        return Math.sign(nb);
    }

    guess(inputs) {
        inputs.push(1); // bias;
        let somme = 0;
        for (let i = 0; i < inputs.length; i++) {
            somme += inputs[i] * this.weigth[i];
        }
        return Perceptron.activation(somme);
    }

    train(data) {
        for(let i = 0; i < data.length; i++) {
            let input = [data[i].x, data[i].y];
            let error = data[i].label() - this.guess(input);

            for (let w = 0; w < this.weigth.length; w++) {
                this.weigth[w] += error * input[w] * this.learningRate;
            }
        }
    }
}

let points = [];
let train = false;
function f (x) { return 0.5*x + 0.4 }

function setup() {
    createCanvas(windowWidth - 100, windowHeight - 100);
    background(200);

    perceptron = new Perceptron(2);

    for (let i = 0; i < 3000; i++) {
        points.push(new Point())
    }

    drawPoints();
    drawFunctionLine();
    drawCorrecnessPoint();
}

function draw() {
    if (train) {
        perceptron.train(points);
        drawCorrecnessPoint();
    }
}

function mousePressed() {
    train = true;
}

function drawPoints()
{
    stroke(255);
    for (let i = 0; i < points.length; i++) {
        ellipse(points[i].pixelX(), points[i].pixelY(), 12, 12);
    }
}

function drawFunctionLine()
{
    stroke(0);
    strokeWeight(4);

    let x1 = 0;
    let y1 = map(f(0), 0, 1, height, 0);

    let x2 = width;
    let y2 = map(f(1), 0, 1, width, 0);

    line(x1, y1, x2, y2);

    strokeWeight(1);
}

function drawCorrecnessPoint()
{
    for (let i = 0; i < points.length; i++) {
        let guess = perceptron.guess([points[i].x, points[i].y]);

        if (points[i].label() !== guess) {
            fill(color('red'));
            stroke(color('red'));
        } else {
            fill(color('green'));
            stroke(color('green'));
        }

        ellipse(points[i].pixelX(), points[i].pixelY(), 8, 8);
    }
}