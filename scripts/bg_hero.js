const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

// =======================
// 配置
// =======================
const CONFIG = {
    particleCount: 140,
    color: "rgba(88,166,255,0.65)",
    hoverRadius: 120,
    force: 0.06,
};

// =======================
// resize
// =======================
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


//确定是不是手机端
function isMobile() {
    return canvas.width < 600;
}

// =======================
// 初始化粒子（纯背景粒子）
// =======================
function createParticles() {
    particles = [];

    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
        });
    }
}

// =======================
// 更新
// =======================
function update() {
    for (let p of particles) {

        p.x += p.vx;
        p.y += p.vy;

        //电脑的话加一个衰减系数
        if(!isMobile()){
        p.vx *= 0.99;
        p.vy *= 0.99;
        }
        // 边界反弹
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    }
}

// =======================
// 绘制
// =======================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 点
    for (let p of particles) {
        ctx.fillStyle = CONFIG.color;
        ctx.fillRect(p.x, p.y, 2, 2);
    }

    // 连线（高级感关键）
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = dx * dx + dy * dy;

            if (dist < 12000) {
                ctx.strokeStyle = `rgba(88,166,255,${1 - dist / 12000})`;
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
}

// =======================
// 鼠标磁场（核心高级感）
// =======================
let mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.hoverRadius) {
            const force = (CONFIG.hoverRadius - dist) / CONFIG.hoverRadius;
            const realForce = force * 0.008;
            p.vx += dx * realForce;
            p.vy += dy * realForce;
        }
    }
});

// =======================
// 动画循环
// =======================
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// =======================
// init
// =======================
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
    animate();
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

init();