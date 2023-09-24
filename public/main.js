// create canvas

let canvas;
let canvasWidth = 360;
let canvasHeight = 640;

// create canvas - end
// create bird - start

let player;
let birdY = canvasHeight >>> 1;
let birdX = canvasWidth >>> 3;
let bird = {
    width: 34,
    height: 24,
    x: birdX,
    y: birdY,
}

// create bird - end
// create pipes - start

let pipes = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = canvasWidth;
let pipeY = 0;
let topImg;
let bottomImg;

// create pipes - end
// physics - start

// let jumpVelocity = -6;
// let velocityX = -2;
// let velocityY = 0;
// let gravity = 0.5;

let jumpVelocity = -4;
let velocityX = -0.75;
let velocityY = 0;
let gravity = 0.1;

// physics - end
// states - start

let gameover = false;
let score = 0;

// states - end

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d"); // ctx is the context that we draw on

    // draw bird
    player = new Image();
    player.src = "/Images/flappybird.png";
    player.onload = function () {

        ctx.drawImage(player, bird.x, bird.y, bird.width, bird.height);
    }

    topImg = new Image();
    topImg.src = "/Images/toppipe.png";

    bottomImg = new Image();
    bottomImg.src = "/Images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    canvas.addEventListener("click", moveBird)

}

function update() {
    requestAnimationFrame(update);
    if (gameover) {
        return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);

    if (bird.y >= canvasHeight) {
        gameover = true;
    }

    ctx.drawImage(player, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x += velocityX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (((pipe.x + pipe.width) <= bird.x) && !pipe.passed) {
            pipe.passed = true;
            score++;
        }

        if (detectCollisions(bird, pipe)) {
            gameover = true;
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "45px Verdana";
    ctx.fillText(score / 2, 5, 45);

    if (gameover) {
        ctx.fillText("Game Over", 5, 90);
        bird.y = birdY;
        pipes = [];
        score = 0;
    }
}

function placePipes() {
    if (gameover) {
        return;
    }
    let randomPipes = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);

    let toppipe = {
        x: pipeX,
        y: randomPipes,
        img: topImg,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipes.push(toppipe);

    let bottompipe = {
        x: pipeX,
        y: randomPipes + pipeHeight + canvasHeight / 4,
        img: bottomImg,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipes.push(bottompipe);

    if (pipes.length > 6) {
        pipes.shift();
    }
}

function moveBird() {
    gameover = false;
    velocityY = jumpVelocity;
    
}

function detectCollisions(img1, img2) {
    if (img1.x < img2.x + img2.width &&
        img1.x + img1.width > img2.x &&
        img1.y < img2.y + img2.height &&
        img1.y + img1.height > img2.y) {
        return true;
    }
    return false;
}

