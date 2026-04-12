function formatDate(dateStr) {
  // dateStr: "YYYY-MM-DD" or ISO
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function createActivityCard(a) {
  const card = document.createElement("div");
  card.className = "card activity-card";

  const metaBits = [
    a?.date ? `<span class="activity-date">${formatDate(a.date)}</span>` : "",
    a?.location ? `<span class="activity-location">${a.location}</span>` : "",
    a?.type ? `<span class="activity-type">${a.type}</span>` : ""
  ].filter(Boolean);

  const coverHtml = a?.cover
    ? `<img src="${a.cover}" alt="${a.title || "活动封面"}" loading="lazy">`
    : `<div class="activity-cover-placeholder" aria-hidden="true"></div>`;

  const tagsHtml = Array.isArray(a?.tags)
    ? a.tags.map(t => `<span class="tag">${t}</span>`).join("")
    : "";

  const detailLink = a?.id && a?.detail
    ? `<a href="activity_detail.html?id=${encodeURIComponent(a.id)}">活动详情</a>`
    : "";

  const linksHtml = Array.isArray(a?.links)
    ? a.links
        .filter(l => l && l.href && l.label)
        .map(
          l =>
            `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`
        )
        .join("")
    : "";

  const mergedButtons = [detailLink, linksHtml].filter(Boolean).join("");

  card.innerHTML = `
    ${coverHtml}
    <div class="card-content">
      <h3>${a?.title ?? ""}</h3>
      ${metaBits.length ? `<p class="activity-meta">${metaBits.join(" · ")}</p>` : ""}
      <p>${a?.desc ?? ""}</p>
      <div class="tags">${tagsHtml}</div>
      ${mergedButtons ? `<div class="card-buttons">${mergedButtons}</div>` : ""}
    </div>
  `;

  return card;
}

