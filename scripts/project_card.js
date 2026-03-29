export function createCard(p) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${p.img}">
        <div class="card-content">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>

            <div class="tags">
                ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            
            <div class="card-buttons">
            <a href="project_detail.html?id=${p.id}">详情</a>
            <a href="${p.github}" target="_blank">GitHub</a>
            </div>
        </div>
    `;

    return card;
}