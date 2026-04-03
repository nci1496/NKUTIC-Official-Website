import { projects } from "./projects.js";

const container = document.getElementById("project-detail");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const project = projects.find(p => p.id === id);

function esc(s) {
    if (s == null) return "";
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function renderNotFound() {
    document.title = "项目不存在 · NKUTIC";
    container.innerHTML = `
        <nav class="project-breadcrumb" aria-label="面包屑">
            <a href="index.html">首页</a>
            <span class="project-breadcrumb-sep">/</span>
            <a href="projects.html">全部项目</a>
            <span class="project-breadcrumb-sep">/</span>
            <span>未找到</span>
        </nav>
        <section class="project-detail-section">
            <h1 class="project-detail-missing-title">未找到该项目</h1>
            <p class="project-detail-missing-desc">链接可能过期，或项目 id 有误。</p>
            <a class="btn-primary" href="projects.html">返回项目列表</a>
        </section>
    `;
}

function render(p) {
    const d = p.detail || {};
    const codeLang = d.codeLang || "cpp";
    const codeLabel = d.codeLabel || "C++";
    const tagsHtml = Array.isArray(p.tags)
        ? p.tags.map(t => `<span class="project-detail-tag">${esc(t)}</span>`).join("")
        : "";

    const statusHtml = d.status
        ? `<span class="project-detail-status">${esc(d.status)}</span>`
        : "";

    const triple =
        d.problem || d.approach || d.outcome
            ? `
        <section class="project-detail-section">
            <h2>问题 · 方案 · 结果</h2>
            <div class="project-triple-grid">
                ${d.problem ? `
                <div class="project-triple-card">
                    <h3 class="project-triple-label">背景与问题</h3>
                    <p>${esc(d.problem)}</p>
                </div>` : ""}
                ${d.approach ? `
                <div class="project-triple-card">
                    <h3 class="project-triple-label">思路与实现</h3>
                    <p>${esc(d.approach)}</p>
                </div>` : ""}
                ${d.outcome ? `
                <div class="project-triple-card">
                    <h3 class="project-triple-label">当前结果</h3>
                    <p>${esc(d.outcome)}</p>
                </div>` : ""}
            </div>
        </section>`
            : "";

    const highlightsHtml =
        Array.isArray(d.highlights) && d.highlights.length
            ? `
        <section class="project-detail-section">
            <h2>实现亮点</h2>
            <ul class="project-highlights">
                ${d.highlights.map(h => `<li>${esc(h)}</li>`).join("")}
            </ul>
        </section>`
            : "";

    const galleryHtml =
        Array.isArray(d.gallery) && d.gallery.length
            ? `
        <div class="project-gallery">
            ${d.gallery
                .map(
                    g =>
                        `<figure class="project-gallery-item">
                            <img src="${esc(g.src)}" alt="${esc(g.alt || "")}" loading="lazy" class="project-gallery-img">
                            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
                        </figure>`
                )
                .join("")}
        </div>`
            : "";

    const techHtml = Array.isArray(d.tech)
        ? d.tech.map(t => `<li>${esc(t)}</li>`).join("")
        : "";

    const codeSection =
        d.code && String(d.code).trim()
            ? `
        <section class="project-detail-section">
            <h2>核心代码</h2>
            <pre data-lang="${esc(codeLabel)}"><code class="language-${esc(codeLang)}">${esc(d.code)}</code></pre>
        </section>`
            : "";

    const nextSection = d.next
        ? `
        <section class="project-detail-section">
            <h2>后续计划</h2>
            <p>${esc(d.next)}</p>
        </section>`
        : "";

    document.title = `${p.name} · 项目详情 · NKUTIC`;

    container.innerHTML = `
        <nav class="project-breadcrumb" aria-label="面包屑">
            <a href="index.html">首页</a>
            <span class="project-breadcrumb-sep">/</span>
            <a href="projects.html">全部项目</a>
            <span class="project-breadcrumb-sep">/</span>
            <span>${esc(p.name)}</span>
        </nav>

        <section class="project-detail-hero">
            <h1 class="project-detail-title">${esc(p.name)}</h1>
            <p class="project-detail-subtitle">${esc(d.subtitle || "")}</p>
            <div class="project-detail-meta">
                ${statusHtml}
                <div class="project-detail-tags">${tagsHtml}</div>
            </div>
            <div class="project-detail-actions">
                ${p.github && p.github !== "#" ? `<a class="btn-primary" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">在 GitHub 查看</a>` : ""}
                <a class="btn-primary" href="projects.html">返回项目列表</a>
            </div>
        </section>

        ${d.intro ? `
        <section class="project-detail-section">
            <h2>项目概述</h2>
            <p class="project-detail-lead">${esc(d.intro)}</p>
        </section>` : ""}

        ${triple}

        ${highlightsHtml}

        <section class="project-detail-section">
            <h2>效果展示</h2>
            <img src="${esc(p.img)}" alt="${esc(p.name)} 演示" class="project-img project-img-hero" loading="lazy">
            ${galleryHtml}
        </section>

        ${techHtml ? `
        <section class="project-detail-section">
            <h2>技术要点</h2>
            <ul class="project-tech-list">${techHtml}</ul>
        </section>` : ""}

        ${codeSection}

        ${d.learn ? `
        <section class="project-detail-section">
            <h2>收获与反思</h2>
            <p>${esc(d.learn)}</p>
        </section>` : ""}

        ${nextSection}
    `;

    if (typeof hljs !== "undefined" && hljs.highlightAll) {
        hljs.highlightAll();
    }
}

if (!project || !project.detail) {
    renderNotFound();
} else {
    render(project);
}
