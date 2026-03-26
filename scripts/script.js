const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let texts = ["构建 · 探索 · 创造", "NKUTIC", "犀牛鸟创新俱乐部"];
let textIndex = 0;

document.getElementById("toggleMode").onclick = () => {
    mode = mode === "dot" ? "code" : "dot";
};

const textsDesktop = ["构建 · 探索 · 创造", "NKUTIC", "犀牛鸟创新俱乐部"];

const textsMobile = [
    "构建\n探索\n创造",
    "NKU\nTIC",
    "犀牛鸟\n创新俱乐部"
];

// 模式：dot | code
let mode = "dot";

// 字符池（用于代码粒子）
const codeChars = [
    "{", "}", "(", ")", ";", "+", "-", "*", "/", "=","if","as","do","in","or","//","#"
];

// =======================
// 尺寸控制
// =======================
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

// 字体大小（自适应）
function getFontSize() {
    return Math.max(40, Math.floor(canvas.width / 10));
}

function getTexts() {
    return isMobile() ? textsMobile : textsDesktop;
}

// 粒子密度（自适应）
function getGap() {
    return canvas.width < 600 ? 10 : 6;
}

// 是否移动端
function isMobile() {
    return canvas.width < 600;
}

// =======================
// 获取文字像素点
// =======================
function getTextPoints(text) {
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");

    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    offCtx.fillStyle = "white";
    offCtx.font = `bold ${getFontSize()}px Arial`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    const lines = text.split("\n"); 
    const lineHeight = getFontSize() * 1.2;

    lines.forEach((line, i) => {
    offCtx.fillText(
        line,
        offCanvas.width / 2,
        offCanvas.height / 2 + (i - (lines.length - 1) / 2) * lineHeight);});
    const data = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;

    let points = [];

    const gap = getGap();

    for (let y = 0; y < offCanvas.height; y += gap) {
        for (let x = 0; x < offCanvas.width; x += gap) {
            const i = (y * offCanvas.width + x) * 4;
            if (data[i + 3] > 128) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

// =======================
// 创建粒子
// =======================
function createParticles(text) {
    const points = getTextPoints(text);

    particles = points.map(p => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: p.x,
        ty: p.y,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        char: codeChars[Math.floor(Math.random() * codeChars.length)]
    }));
}

// =======================
// 更新
// =======================
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

// =======================
// 绘制
// =======================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#58a6ff";

    if (mode === "dot") {
        for (let p of particles) {
            ctx.fillRect(p.x, p.y, 2, 2);
        }
    } else {
        ctx.font = isMobile() ? "4px monospace" : "10px monospace";
        ctx.globalAlpha = 0.9;

        for (let p of particles) {
            ctx.fillText(p.char, p.x, p.y);
        }

        ctx.globalAlpha = 1;
    }
}

// =======================
// 动画循环
// =======================
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// =======================
// 点击：爆散 + 切换文字
// =======================
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // 💥 爆散
    for (let p of particles) {
        let dx = p.x - cx;
        let dy = p.y - cy;
        let dist = Math.sqrt(dx * dx + dy * dy) + 1;

        let force = 20 / dist;

        p.vx += dx * force;
        p.vy += dy * force;
    }

    // 切换文字
    textIndex = (textIndex + 1) % texts.length;

    const newPoints = getTextPoints(texts[textIndex]);

    let newParticles = [];

    for (let i = 0; i < newPoints.length; i++) {
        let base = particles[Math.floor(Math.random() * particles.length)];

        if (particles[i]) {
            let p = particles[i];
            p.tx = newPoints[i].x;
            p.ty = newPoints[i].y;
            newParticles.push(p);
        } else {
            newParticles.push({
                x: base ? base.x : cx,
                y: base ? base.y : cy,
                tx: newPoints[i].x,
                ty: newPoints[i].y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                char: codeChars[Math.floor(Math.random() * codeChars.length)]
            });
        }
    }

    particles = newParticles;
});

// =======================
// 双击：切换模式（dot / code）
// =======================
canvas.addEventListener("dblclick", () => {
    mode = mode === "dot" ? "code" : "dot";
});

// =======================
// Resize：重建粒子（关键修复）
// =======================
window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles(texts[textIndex]);
});

// =======================
// 初始化
// =======================
function init() {
    resizeCanvas();
    const texts = getTexts();
    createParticles(texts[textIndex]);
    animate();
}

init();