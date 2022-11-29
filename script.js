const WIDTH = 480;
const HEIGHT = 360;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let walls = ["wall.png", "wall2.png", "wall3.png", "wall4.png"];
let randomWall = walls[getRandomInt(0, walls.length - 1)];
let cars = ["enemycar.png", "Blue Car.png", "black car.png"];
let randomCar = cars[getRandomInt(0, cars.length - 1)];

let draw = SVG().addTo("#race").size(WIDTH, HEIGHT);
let backround = draw.rect(WIDTH, HEIGHT).fill("#DDE3E1");
let left = draw.line(30, 0, 30, HEIGHT).stroke({width: 10, color: "black"});
let right = draw.line(WIDTH - 30, 0, WIDTH - 30, HEIGHT).stroke({width: 10, color: "black"});
let center = draw.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 5, color: "black", dasharray: 10});
let car = draw.image("img/car.png").height("80px").width("40px").x(WIDTH / 2).y(HEIGHT - 80);
let obstacle = draw.image("img/" + randomWall).width("100px").height("20px").move(WIDTH / 2 - 20,20);
let obstacle2 = draw.image("img/" + randomCar).width("50px").height("100px").move(WIDTH / 2 - 150, 110);
let restartButton = document.querySelector(".restart-button");
let startButton = document.querySelector(".start-button");
let score = 0;
let scoreText = draw.text(score.toString()).font({size: 50}).fill("white").x(WIDTH - 100);
let stepX = 0;
let wall1 = draw.rect(WIDTH / 2, HEIGHT).fill("#008000");
let wall2 = draw.rect(WIDTH / 2, HEIGHT).fill("#008000").x(WIDTH / 2);
let isCollide = false;
console.log(randomWall);
let roadMoveInterval;
startButton.addEventListener("click", () => {  
    let animationWall1 = setInterval(() => {
        wall1.dx(-1)
    });
    let animationWall2 = setInterval(() => {
        wall2.dx(1)
    });
    setTimeout(() => {
        roadMoveInterval = setInterval(() => {
            roadMove();
        }, 10)
      }, 2500);
});
function roadMove() {
    if (center.y() == 0) {
        center.dy(10);
    } else {
        center.dy(-10);
    }
    car.dx(stepX);
    obstacle.dy(3);
    obstacle2.dy(3);
    let randomX;
    if (obstacle.y() > HEIGHT) {
        randomWall = walls[getRandomInt(0, walls.length - 1)];
        obstacle.load("img/" + randomWall);
        obstacle.y(-500);
        randomX = getRandomInt(32, WIDTH - parseInt(obstacle.width()) - 32);
        obstacle.x(randomX);
        while (obstacle2.x() < obstacle.x() + parseInt(obstacle.width()) && obstacle2.x() + parseInt(obstacle2.width()) > obstacle.x()){
            randomX = getRandomInt(32, WIDTH - parseInt(obstacle.width()) - 32);
            obstacle.x(randomX);
        }
        score = score + 1;
        scoreText.text(score.toString());
        console.log(score);
    }
    if (obstacle2.y() > HEIGHT) {
        randomCar = cars[getRandomInt(0, cars.length - 1)];
        obstacle2.load("img/" + randomCar);
        obstacle2.y(-500);
        randomX = getRandomInt(32, WIDTH - parseInt(obstacle2.width()) - 32);
        obstacle2.x(randomX);
        while (obstacle2.x() < obstacle.x() + parseInt(obstacle.width()) && obstacle2.x() + parseInt(obstacle2.width()) > obstacle.x()){
            randomX = getRandomInt(32, WIDTH - parseInt(obstacle2.width()) - 32);
            obstacle2.x(randomX);
        }
        score = score + 1;
        scoreText.text(score.toString());
        console.log(score);
    }
    if (obstacle.y() + parseInt(obstacle.height()) > car.y() && obstacle.x() + parseInt(obstacle.width()) > car.x() && obstacle.x() < car.x() + parseInt(car.width())) {
        clearInterval(roadMoveInterval);
        isCollide = true;
    }
    if (obstacle2.y() + parseInt(obstacle2.height()) > car.y() && obstacle2.x() + parseInt(obstacle2.width()) > car.x() && obstacle2.x() < car.x() + parseInt(car.width())) {
        clearInterval(roadMoveInterval);
        isCollide = true;
    }
    if (car.x() < 35) {
        car.x(35);
    }
    if (car.x() + 40 > WIDTH - 35) {
        car.x(WIDTH - 75);
    }
}

restartButton.addEventListener("click", () => {
    draw.clear();
    backround = draw.rect(WIDTH, HEIGHT).fill("#DDE3E1");
    left = draw.line(30, 0, 30, HEIGHT).stroke({width: 10, color: "black"});
    right = draw.line(WIDTH - 30, 0, WIDTH - 30, HEIGHT).stroke({width: 10, color: "black"});
    center = draw.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 5, color: "black", dasharray: 10});
    car = draw.image("img/car.png").height("80px").width("40px").x(WIDTH / 2).y(HEIGHT - 80);
    obstacle = draw.image("img/" + randomWall).width("100px").height("20px").move(WIDTH / 2 - 20,20);
    obstacle2 = draw.image("img/" + randomCar).width("50px").height("100px").move(WIDTH / 2 - 150, 110);
    score = 0;
    scoreText = draw.text(score.toString()).font({size: 50}).fill("white").x(WIDTH - 100);
    clearInterval(roadMoveInterval);
    roadMoveInterval = setInterval(() => {
        roadMove();
    }, 10);
    isCollide = false;
});

document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowRight") {
        stepX = 5;
    }
    if (event.code == "ArrowLeft") {
        stepX = -5;
    }
    if (event.code == "ArrowUp") {
        if (isCollide == false) {
            clearInterval(roadMoveInterval);   
            roadMoveInterval = setInterval(() => {
                roadMove();
            }, 3);
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowRight") {
        stepX = 0;
    }
    if (event.code == "ArrowLeft") {
        stepX = 0;
    }
    if (event.code == "ArrowUp") {
        if (isCollide == false) {
            clearInterval(roadMoveInterval);   
            roadMoveInterval = setInterval(() => {
                roadMove();
            }, 10);
        }
    }
})