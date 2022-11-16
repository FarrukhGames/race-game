const WIDTH = 480;
const HEIGHT = 360;
let draw = SVG().addTo("#race").size(WIDTH, HEIGHT);
let backround = draw.rect(WIDTH, HEIGHT).fill("#DDE3E1");
let left = draw.line(30, 0, 30, HEIGHT).stroke({width: 10, color: "black"});
let right = draw.line(WIDTH - 30, 0, WIDTH - 30, HEIGHT).stroke({width: 10, color: "black"});
let center = draw.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 5, color: "black", dasharray: 10});
let car = draw.image("img/car.png").height("80px").width("40px").x(WIDTH / 2).y(HEIGHT - 80);
let obstacle = draw.image("img/wall.png").width("100px").height("20px").x(WIDTH / 2 - 20).y(20);
let restartButton = document.querySelector(".restart-button");
let stepX = 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let roadMove = setInterval(() => {
    if (center.y() == 0) {
        center.dy(10);
    } else {
        center.dy(-10);
    }
    car.dx(stepX);
    obstacle.dy(3);
    if (obstacle.y() > HEIGHT) {
        obstacle.y(-500);
        obstacle.x(getRandomInt(32, WIDTH - 132));
    }
    setTimeout(() => {
        clearInterval(roadMove);
    }, 2000);
}, 10);

restartButton.addEventListener("click", () => {
    let restartRoadmove = setInterval(() => {
        if (center.y() == 0) {
            center.dy(10);
        } else {
            center.dy(-10);
        }
        car.dx(stepX);
        obstacle.dy(3);
        if (obstacle.y() > HEIGHT) {
            obstacle.y(-500);
            obstacle.x(getRandomInt(32, WIDTH - 132));
        }
    }, 10);
});

document.addEventListener("keydown", (event) => {
    console.dir(event)
    if (event.code == "ArrowRight") {
        stepX = 5;
    }
    if (event.code == "ArrowLeft") {
        stepX = -5;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowRight") {
        stepX = 0;
    }
    if (event.code == "ArrowLeft") {
        stepX = 0;
    }
})