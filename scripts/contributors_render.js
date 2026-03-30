import { contributors } from "./contributors.js";

const coreContainer = document.getElementById("core-members");
const allContainer = document.getElementById("all-members");

function createCard(p) {
    const div = document.createElement("div");
    div.className = "member";

    if (p.core) div.classList.add("highlight");
    if (p.badge) {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.innerText = p.badge;
    div.appendChild(badge);
    }
    div.innerHTML = `
        <img src="${p.avatar}">
        <h3>${p.name}</h3>
        <p>${p.role}</p>

        <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>

        <a href="${p.github}" target="_blank">GitHub</a>
    `;

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

// 渲染核心
contributors.filter(p => p.core).forEach(p => {
    coreContainer.appendChild(createCard(p));
});

// 渲染全部
contributors.forEach(p => {
    allContainer.appendChild(createCard(p));
});