// главная программа
let m = 1, km = 1;
const canvas1 = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
const size = canvas1.width;

// нарисовать ковер и сохранить картинку
ctx.fillRect(0, 0, size, size);
ctx.fillStyle = "white";
sierpinski(0, 0, size);  //3**6
const img = new Image();
img.src = canvas1.toDataURL("image/png") ;

//let origin = {x: size/10, y: size/10};
let origin = {x:0, y:0};

let timerId;

// обработчики для клавиш
window.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 32:  // space
            movieOff();
            movieStep();
            break;
        case 37:  // left
            km -= 0.01;
            movieOn();
            break;
        case 39:  // right
            km += 0.01;
            movieOn();
            break;
    }
});

// обработчик для мыши
canvas1.addEventListener('mousedown', function(e) {
    if (e.clientX < size / 2)
        origin.x = 0;
    else
        origin.x = size;
    if (e.clientY < size / 2)
        origin.y = 0;
    else
        origin.y = size;
});

function movieOn() {
    if (!timerId) {
        timerId = setInterval(movieStep, 20);
    }
}

function movieOff() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function movieStep() {
    show(3 * m);
    nextScale();
}


function nextScale() {
    const m_next = m * km;
    if (km > 1)
        m = m_next > 3 ? 1 : m_next;
    else
        m = m_next < 1/3 ? 1 : m_next;
}

function show(m) {
    ctx.save();
    ctx.translate(origin.x, origin.y);
    ctx.scale(m, m);
    ctx.translate(-origin.x, -origin.y);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
}

// x, y – координаты верхнего левого угла ковра, zzz – длина стороны
//
function sierpinski(x, y, zzz) {
    const z = zzz / 3, zz = zzz - z;
    if (z < 0.35)
        return;
    for (let x1 of [x, x + z, x + zz]) {
        for (let y1 of [y, y + z, y + zz]) {
            if (x1 === x + z && y1 === y + z)
                ctx.fillRect(x1, y1, z, z);
            else
                sierpinski(x1, y1, z);
        }
    }
}
