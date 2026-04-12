import { activities } from "./activities.js";

const container = document.getElementById("activity-detail");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const activity = activities.find(a => a.id === id);

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr || "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function renderNotFound() {
  document.title = "活动不存在 · NKUTIC";
  container.innerHTML = `
    <nav class="project-breadcrumb" aria-label="面包屑">
      <a href="index.html">首页</a>
      <span class="project-breadcrumb-sep">/</span>
      <a href="index.html#activity">活动</a>
      <span class="project-breadcrumb-sep">/</span>
      <span>未找到</span>
    </nav>
    <section class="project-detail-section">
      <h1 class="project-detail-missing-title">未找到该活动</h1>
      <p class="project-detail-missing-desc">链接可能已过期，或活动 id 有误。</p>
      <a class="btn-primary" href="index.html#activity">返回活动列表</a>
    </section>
  `;
}

function render(a) {
  const d = a.detail || {};
  const tagsHtml = Array.isArray(a.tags)
    ? a.tags.map(t => `<span class="project-detail-tag">${esc(t)}</span>`).join("")
    : "";

  const goalsHtml = Array.isArray(d.goals) && d.goals.length
    ? `
      <section class="project-detail-section">
        <h2>活动目的</h2>
        <div class="project-triple-grid">
          ${d.goals.map(g => `
            <article class="project-triple-card">
              <h3 class="project-triple-label">${esc(g.title || "")}</h3>
              <p>${esc(g.content || "")}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `
    : "";

  const divisionHtml = Array.isArray(d.division) && d.division.length
    ? `
      <section class="project-detail-section">
        <h2>活动分工</h2>
        <ul class="project-highlights">
          ${d.division.map(item => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </section>
    `
    : "";

  const agendaHtml = Array.isArray(d.agenda) && d.agenda.length
    ? `
      <section class="project-detail-section">
        <h2>活动流程</h2>
        <ol class="project-tech-list">
          ${d.agenda.map(item => `<li>${esc(item)}</li>`).join("")}
        </ol>
      </section>
    `
    : "";

  const promotionHtml = d.promotion
    ? `
      <section class="project-detail-section">
        <h2>宣传安排</h2>
        <p>${esc(d.promotion)}</p>
      </section>
    `
    : "";

  const reflectionHtml = d.reflection
    ? `
      <section class="project-detail-section">
        <h2>反思与总结</h2>
        <p>${esc(d.reflection)}</p>
      </section>
    `
    : "";

  const impactHtml = Array.isArray(d.impact) && d.impact.length
    ? `
      <section class="project-detail-section">
        <h2>活动意义与影响</h2>
        <ul class="project-highlights">
          ${d.impact.map(item => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </section>
    `
    : "";

  const galleryHtml = Array.isArray(d.gallery) && d.gallery.length
    ? `
      <section class="project-detail-section">
        <h2>活动照片</h2>
        <div class="project-gallery">
          ${d.gallery.map(g => `
            <figure class="project-gallery-item">
              <img src="${esc(g.src)}" alt="${esc(g.alt || a.title)}" loading="lazy" class="project-gallery-img">
              ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
            </figure>
          `).join("")}
        </div>
      </section>
    `
    : "";

  document.title = `${a.title} · 活动详情 · NKUTIC`;

  container.innerHTML = `
    <nav class="project-breadcrumb" aria-label="面包屑">
      <a href="index.html">首页</a>
      <span class="project-breadcrumb-sep">/</span>
      <a href="index.html#activity">活动</a>
      <span class="project-breadcrumb-sep">/</span>
      <span>${esc(a.title)}</span>
    </nav>

    <section class="project-detail-hero">
      <h1 class="project-detail-title">${esc(a.title)}</h1>
      <p class="project-detail-subtitle">${esc(d.subtitle || a.type || "活动详情")}</p>
      <div class="project-detail-meta">
        ${a.date ? `<span class="project-detail-tag">日期：${esc(formatDate(a.date))}</span>` : ""}
        ${a.location ? `<span class="project-detail-tag">地点：${esc(a.location)}</span>` : ""}
        <div class="project-detail-tags">${tagsHtml}</div>
      </div>
      <div class="project-detail-actions">
        <a class="btn-primary" href="index.html#activity">返回活动列表</a>
      </div>
    </section>

    ${d.intro ? `
      <section class="project-detail-section">
        <h2>活动简介</h2>
        <p class="project-detail-lead">${esc(d.intro)}</p>
      </section>
    ` : ""}

    ${divisionHtml}
    ${goalsHtml}
    ${agendaHtml}
    ${promotionHtml}
    ${reflectionHtml}
    ${impactHtml}
    ${galleryHtml}
  `;
}

if (!activity || !activity.detail) {
  renderNotFound();
} else {
  render(activity);
}
