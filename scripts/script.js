const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let texts = ["构建 · 探索 · 创造","NKUTIC", "犀牛鸟创新俱乐部"];
//,+
let textIndex = 0;

//保证尺寸正确
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 获取文字像素点
function getTextPoints(text) {
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");

    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    offCtx.fillStyle = "white";
    offCtx.font = "bold 180px Arial";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    offCtx.fillText(text, offCanvas.width / 2, offCanvas.height / 2);

    const data = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;

    let points = [];

    for (let y = 0; y < offCanvas.height; y += 6) {
        for (let x = 0; x < offCanvas.width; x += 6) {
            const i = (y * offCanvas.width + x) * 4;
            if (data[i + 3] > 128) {
                points.push({ x, y });
            }
        }
    }

    console.log("points:", points.length);
    return points;
}

// 创建粒子
function createParticles(text) {
    const points = getTextPoints(text);

    particles = points.map(p => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: p.x,
        ty: p.y,
        vx: 0,
        vy: 0
    }));
}

// 更新
function update() {
    for (let p of particles) {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;

        p.vx += dx * 0.02;
        p.vy += dy * 0.02;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;
    }
}

// 绘制
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#58a6ff";

    for (let p of particles) {
        ctx.fillRect(p.x, p.y, 2, 2);
    }
}

// 动画循环
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// 点击爆散 + 切换
canvas.addEventListener("click", (e) => {
    const cx = e.clientX;
    const cy = e.clientY;

    // 💥 爆散
    for (let p of particles) {
        let dx = p.x - cx;
        let dy = p.y - cy;
        let dist = Math.sqrt(dx * dx + dy * dy) + 1;

        let force = 20 / dist;

        p.vx += dx * force;
        p.vy += dy * force;
    }

    textIndex = (textIndex + 1) % texts.length;

    const newPoints = getTextPoints(texts[textIndex]);

    let newParticles = [];

    for (let i = 0; i < newPoints.length; i++) {
        let base;

        if (particles.length > 0) {
            // 从已有粒子随机选一个“克隆源”
            base = particles[Math.floor(Math.random() * particles.length)];
        }

        if (particles[i]) {
            // 复用已有粒子
            let p = particles[i];
            p.tx = newPoints[i].x;
            p.ty = newPoints[i].y;
            newParticles.push(p);
        } else {
            // 从已有粒子位置“分裂”
            newParticles.push({
                x: base ? base.x : cx,
                y: base ? base.y : cy,
                tx: newPoints[i].x,
                ty: newPoints[i].y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10
            });
        }
    }

    particles = newParticles;
});

setTimeout(() => {
    particles = newParticles;
}, 500);

function init() {
    const points = getTextPoints(texts[textIndex]);

    particles = points.map(p => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: p.x,
        ty: p.y,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20
    }));

    animate();
}

init();
