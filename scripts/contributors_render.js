import { contributors } from "./contributors.js";

const coreContainer = document.getElementById("core-members");
const allContainer = document.getElementById("all-members");
const leadershipContainer = document.getElementById("leadership-members");

function createCard(p) {
    const div = document.createElement("div");
    div.className = "member";

    div.classList.add(`dept-${p.department}`);

    
    div.innerHTML = `
        <img src="${p.avatar}">
        <h3>${p.name}</h3>
        <p>${p.signature}</p>

        <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>

    ${p.github && p.github !== "#" 
        ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` 
        : ""}
    `;

    if (p.core) div.classList.add("highlight");
    if (p.badge || p.core) {
    const badge = document.createElement("div");
    badge.className = "badge";

    badge.innerText = p.badge|| "";

    div.appendChild(badge);
}

        div.addEventListener("mousemove", e => {
        const rect = div.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        div.style.transform = `
            perspective(600px)
            rotateY(${x * 10}deg)
            rotateX(${-y * 10}deg)
            scale(1.03)
        `;

        div.style.setProperty("--x", `${x * 100 + 50}%`);
        div.style.setProperty("--y", `${y * 100 + 50}%`);
    });



    return div;
}

document.querySelectorAll(".member").forEach(card => {
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(600px)
            rotateY(0deg)
            rotateX(0deg)
            scale(1)
        `;
    });
});

// // 渲染核心
// contributors.filter(p => p.core).forEach(p => {
//     coreContainer.appendChild(createCard(p));
// });

// // 渲染全部
// contributors.forEach(p => {
//     allContainer.appendChild(createCard(p));
// });


const containers = {
    leadership: leadershipContainer,
    tech: document.getElementById("tech-members"),
    media: document.getElementById("media-members"),
    ops: document.getElementById("ops-members")
};

contributors.forEach(p => {
    if (p.leadership && containers.leadership) {
        containers.leadership.appendChild(createCard(p));
    }

    const container = containers[p.department];

    if (container) {
        container.appendChild(createCard(p));
    } else {
        console.warn("未知部门:", p);
    }
});