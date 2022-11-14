const WIDTH = 480;
const HEIGHT = 360;
let draw = SVG().addTo("#race").size(WIDTH, HEIGHT);
let backround = draw.rect(WIDTH, HEIGHT).fill("#DDE3E1");
let left = draw.line(30, 0, 30, HEIGHT).stroke({width: 10, color: "black"});
let right = draw.line(WIDTH - 30, 0, WIDTH - 30, HEIGHT).stroke({width: 10, color: "black"});
let center = draw.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 5, color: "black", dasharray: 10});
let car = draw.image("img/car.png").height("100px").width("50px").x(WIDTH / 2).y(HEIGHT - 100);