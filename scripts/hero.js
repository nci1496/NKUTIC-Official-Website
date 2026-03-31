
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let textIndex = 0;

////代码末尾有一段是专门为“鱼？”彩蛋写的，并且所有前面涉及到的我都加上 “ //鱼 ” 来区分了
//鱼？
let fishMode = false;

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
let easterEggCount = 0;//这只是用于彩蛋文本切换的计数
let clickCount = 0;//彩蛋点击计数
let clickFishCount =0;//鱼？模式点击计数

const clickEasterEggCount =10;//需要点多少次才能进入彩蛋模式

const easterEggTotal =3;//总切换次数 即彩蛋持续时间

function triggerEasterEgg() {
    isEasterEgg = true;
    easterEggCount = easterEggTotal; 
}

// 初始模式：dot | code
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

    //鱼？
    if(fishMode)
    {mode==="dot";}

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
        
        //鱼？
        if (!fishMode && clickFishCount >= fishTriggerCount) {
            enterFishText();
            return; // 截断原逻辑，优先级最高
        }
        if(fishMode){
            return; //进入”鱼？“模式了，不再执行自动切换
        }


        if(isEasterEgg){
        easterEggCount--;}
        else{
        //如果没用进入彩蛋模式，但是自动切换了，就清空
        clickCount=0;
        clickFishCount=0;
        }

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
        if (easterEggCount <= 0) {
            isEasterEgg = false;
        }
    }
}

// =======================
// 点击：爆散 + 切换文字
// =======================
canvas.addEventListener("click", (e) => {
//点击中断自动
    if (autoTimer) clearInterval(autoTimer);

    clickCount++;
    clickFishCount++;
    
    // 鱼？
    if (!fishMode && clickFishCount >= fishTriggerCount) {
        enterFishText();
        console.log("clickFishCount满足");
        return; // 截断原逻辑，有限最高
    }
    if (fishMode && fishState === "text") {
    fishTextClickCount++;
    // 增强吸力，体现汇聚
        for (let p of particles) {
            let dx = canvas.width / 2 - p.x;
            let dy = canvas.height / 2 - p.y;

            p.vx += dx * 0.05;
            p.vy += dy * 0.05;
        }

        if (fishTextClickCount >= fishCardCount) {
            triggerFishExplosion();
        }
        return;
    }

    //end of 鱼？

    if (clickCount >= clickEasterEggCount) {
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
    //鱼？ 在鱼模式下，不切
    if(fishMode){
        mode="dot";
        return;
    }
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



//////下面是专门为“鱼？”彩蛋写的，并且所有前面涉及到的我都加上 “ //鱼 ” 来区分了

let fishState = "idle"; //用于 idle → text → collecting → explode → card 状态


let fishTextClickCount = 0;

let fishCanReRoll = false;//判断能不能继续变化

const fishTriggerCount =30;//进入鱼？模式
const fishCardCount =10;//进入鱼画面到渲染卡牌的点击次数

//全局变量
let moveX = 0;
let moveY = 0;
let rotateX = 0;
let rotateY = 0;
let scale = 1;
let press = 1;


function enableFishOverlay() {
    document.getElementById("fishOverlay").classList.add("active");
}

function disableFishOverlay() {
    document.getElementById("fishOverlay").classList.remove("active");
}


function enterFishText() {
    fishMode = true;
    fishState = "text";
    fishTextClickCount = 0;
    createParticles("鱼？");
}

function triggerFishExplosion() {
    fishState = "explode";

    // 爆炸
    for (let p of particles) {
        p.vx += (Math.random() - 0.5) * 50;
        p.vy += (Math.random() - 0.5) * 50;
    }

    setTimeout(() => {
        enterFishCard();
    }, 500);
}

function enterFishCard() {
    fishState = "card";

    enableFishOverlay();
    // 禁止canvas点击（防冲突）
    canvas.style.pointerEvents = "none";

    const result=randomFishResult();
    fishCanReRoll=(result==="morefish");

    showFishImage(result);
     applyFishEffect(result)
}

function getFishImage(type) {
    return `./images/fish/${type}.webp`; //goodfish,badfish,morefish,fishbot
}

function showFishImage(type) {
    let layer = document.getElementById("fishLayer");

    if (!layer) {
        layer = document.createElement("div");
        layer.id = "fishLayer";
        document.body.appendChild(layer);
    }

    layer.innerHTML = "";

    const img = document.createElement("img");
    img.src = getFishImage(type);
    img.className = "fish-card";
    img.draggable="false"

    const wrapper = document.createElement("div");
    wrapper.className = "fish-wrapper";

    wrapper.appendChild(img);
    layer.appendChild(wrapper);

    fishTextClickCount = 0;

    img.onclick = () => {
    fishTextClickCount++;
    scale = 1 - fishTextClickCount * 0.03;
    updateTransform(img);
    if (fishTextClickCount >= fishCardCount) {
        explodeFishImage(type);
    }


    };

addFishFollowEffect(img);

}

function updateTransform(img) {
    img.style.transform = `
        perspective(800px)
        translate(${moveX}px, ${moveY}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale * press})
    `;
}

function explodeFishImage(type) {
    const img = document.querySelector(".fish-card");

    img.style.transform = "scale(2)";
    img.style.opacity = "0";

    setTimeout(() => {
        const result = randomFishResult();

        if (result === "morefish") {
            fishCanReRoll=true;
            showFishImage("morefish");applyFishEffect("morefish");
        } else {
            fishCanReRoll = false; 
            showFishImage(result);applyFishEffect(result);
            lockFishImage();
        }
    }, 300);
}

function randomFishResult() {
    const r = Math.random();

    // if (r < 0.01) return "fishbot";
    // if (r < 0.34) return "goodfish";
    // if (r < 0.67) return "badfish";
    if (r < 0.1) return "fishbot";
    if (r < 0.4) return "goodfish";
    if (r < 0.7) return "badfish";

    return "morefish";
}

function lockFishImage() {
    const img = document.querySelector(".fish-card");

    img.onclick = () => {
        img.style.transform = "scale(0.95)";
        setTimeout(() => {
            img.style.transform = "scale(1)";
        }, 100);
    };
}

function addFishFollowEffect(img) {
    let rect = null;
    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    img.addEventListener("mouseenter", () => {
        rect = img.getBoundingClientRect();
    });

    img.addEventListener("mousemove", e => {
        if (!rect || isDragging) return; // ❗拖拽时禁用hover

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        moveX = (x - cx) / 6;
        moveY = (y - cy) / 6;

        rotateY = (x - cx) / 10;
        rotateX = -(y - cy) / 10;

        updateTransform(img);
    });

    // ====================
    // 🔥 拖拽开始
    // ====================
    img.addEventListener("mousedown", e => {
        isDragging = true;

        const rect = img.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        img.style.transition = "none"; // ❗拖动时不要过渡
    });

    // ====================
    // 🔥 拖拽中（监听全局）
    // ====================
    document.addEventListener("mousemove", e => {
        if (!isDragging) return;

        moveX = e.clientX - offsetX - window.innerWidth / 2 + rect.width / 2;
        moveY = e.clientY - offsetY - window.innerHeight / 2 + rect.height / 2;

        rotateX = 0;
        rotateY = 0;

        updateTransform(img);
    });

    // ====================
    // 🔥 松开 → 回弹
    // ====================
    document.addEventListener("mouseup", () => {
        if (!isDragging) return;

        isDragging = false;

        moveX = 0;
        moveY = 0;
        rotateX = 0;
        rotateY = 0;

        img.style.transition = "transform 0.4s cubic-bezier(0.2,0.8,0.4,1)";

        updateTransform(img);
    });
}

function applyFishEffect(type) {

    const img = document.querySelector(".fish-card");

    if (!img) return;

    // 先清掉旧效果（避免叠加）
    img.style.filter = "";
    img.style.boxShadow = "";

    switch (type) {

        case "goodfish":
            //金色
            img.style.filter = "drop-shadow(0 0 30px gold)";

            break;

        case "badfish":
            //黑色
            img.style.filter = "brightness(0.6)";
            break;

        case "morefish":
            // 白色
            img.style.filter = "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))";
            break;

        case "fishbot":
            img.style.filter = "contrast(1.2)";
            break;
    }
}