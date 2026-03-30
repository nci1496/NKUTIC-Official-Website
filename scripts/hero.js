
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let textIndex = 0;

const textsDesktop = ["构建 · 探索 · 创造", "NKUTIC", "犀牛鸟创新俱乐部"];

const textsMobile = [
    "构建\n探索\n创造",
    "NKU\nTIC",
    "犀牛鸟\n创新俱乐部"
];

const EasterEggTextsDesktop=["nci1496","NKUTIC","犀牛鸟创新俱乐部"];
const EasterEggTextsMobile=[ 
    "nci\n1496",
    "NKU\nTIC",
    "犀牛鸟\n创新俱乐部"];

let isEasterEgg=false;
let easterEggCount = 0;
const easterEggTotal =4;//总切换次数

function triggerEasterEgg() {
    isEasterEgg = true;
    easterEggCount = easterEggTotal; 
}

// 模式：dot | code
let mode = "code";

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
    if(isMobile()){

    return Math.max(40, Math.floor(canvas.width / 5.5));

    }else{

    return Math.max(40, Math.floor(canvas.width / 9));

    }

}

function getTexts() {
    const normal = isMobile() ? textsMobile : textsDesktop;
    //彩蛋
    if (isEasterEgg) {

        return isMobile() ? EasterEggTextsMobile : EasterEggTextsDesktop;
    }
    return normal;
}

// 粒子密度（自适应）
function getGap() {
    return isMobile()? 5 : 6;
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
    ctx.globalAlpha = 1;
    if (mode === "dot") {
        for (let p of particles) {
            if(isEasterEgg){
            ctx.fillStyle = `hsl(${(Date.now() / 10 + p.x) % 360}, 80%, 60%)`;
            }else{
                ctx.fillStyle = "#58a6ff";
            }

            ctx.fillRect(p.x, p.y, 2, 2);
        }
    } else {
        // 字符大小
        ctx.font = isMobile() ? "10px monospace" : "10px monospace";
        ctx.globalAlpha = 0.9;

        for (let p of particles) {
            if(isEasterEgg){
            ctx.fillStyle = `hsl(${(Date.now() / 10 + p.x) % 360}, 80%, 60%)`;
            }else{
                ctx.fillStyle = "#58a6ff";
            }

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

let autoTimer=null;

function startAutoSwitch() {
    if (autoTimer) clearInterval(autoTimer); 

    autoTimer = setInterval(() => {
        switchText();
    }, 4000); // 4秒切换
}

function switchText() {
    const texts = getTexts();

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
                x: base ? base.x : canvas.width / 2,
                y: base ? base.y : canvas.height / 2,
                tx: newPoints[i].x,
                ty: newPoints[i].y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                char: codeChars[Math.floor(Math.random() * codeChars.length)]
            });
        }
    }

    particles = newParticles;

        if (isEasterEgg) {
        easterEggCount--;

        if (easterEggCount <= 0) {
            isEasterEgg = false;
        }
    }
}

// =======================
// 点击：爆散 + 切换文字
// =======================
let clickCount = 0;//彩蛋计数

canvas.addEventListener("click", (e) => {
//点击中断自动
    if (autoTimer) clearInterval(autoTimer);

    clickCount++;

    if (clickCount >= 5) {
        triggerEasterEgg();
        clickCount = 0;

    }

    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    //  爆散
    for (let p of particles) {
        let dx = p.x - cx;
        let dy = p.y - cy;
        let dist = Math.sqrt(dx * dx + dy * dy) + 1;

        let force = 20 / dist;

        p.vx += dx * force;
        p.vy += dy * force;
    }
    // 3. 立即切换（不要延迟）
    switchText();

    // 4. 重新开始自动轮播（延迟一点更自然）
    setTimeout(() => {
        startAutoSwitch();
    }, 1000);
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
    const texts = getTexts();
    createParticles(texts[textIndex]);
});

// =======================
// 初始化
// =======================
function init() {
    resizeCanvas();
    const texts = getTexts();
    //随机初始文字
    textIndex = Math.floor(Math.random() * texts.length);
    createParticles(texts[textIndex]);
    animate();
    startAutoSwitch();
}

init();