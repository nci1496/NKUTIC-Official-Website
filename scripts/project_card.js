export function createCard(p) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${p.img}">
        <div class="card-content">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <p><strong>关键词：</strong>${p.tags}</p>
            <div class="card-buttons">
                <a href="${p.link}">详情</a>
                <a href="${p.github}" target="_blank">GitHub</a>
            </div>
        </div>
    `;

    return card;
}