// главная программа
let m = 1, km = 1;
const ctx = canvas1.getContext("2d");
const size = canvas1.width;
let p = {x:size, y:size};

// нарисовать ковер и сохранить картинку
ctx.fillRect(0, 0, size, size);
ctx.fillStyle = "white";
sierpinski(0, 0, size);  //3**6
const img = new Image();
img.src = canvas1.toDataURL("image/png");

setInterval(function () {
    next_scale();
    show(m);
}, 20);

// обработчики для кнопок
buttonPlus.addEventListener('click',  () => km += 1/128 );
buttonMinus.addEventListener('click', () => km -= 1/128 );

function next_scale() {
    const m_next = m * km;
    if (km > 1)
        m = m_next > 3 ? 1 : m_next;
    else
        m = m_next < 1/3 ? 1 : m_next;
}

function show(m) {
    ctx.save();
    ctx.translate(p.x, p.y)
    ctx.scale(m, m);
    ctx.translate(-p.x, -p.y)
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
