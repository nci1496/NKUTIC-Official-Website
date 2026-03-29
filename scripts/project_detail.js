import { projects } from "./projects.js";

const container = document.getElementById("project-detail");

// 解析 URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 找项目
const project = projects.find(p => p.id === id);

if (!project) {
    container.innerHTML = "<p>项目不存在</p>";
} else {
    container.innerHTML = `<h1>${project.name}</h1>`;
}

function render(p) {
    container.innerHTML = `
        <section class="project-hero">
            <h1>${p.name}</h1>
            <p>${p.detail.subtitle}</p>
            <a class="btn" href="${p.github}" target="_blank">GitHub</a>
        </section>

        <section>
            <h2>效果展示</h2>
            <img src="${p.img}" class="project-img">
        </section>

        <section>
            <h2>项目介绍</h2>
            <p>${p.detail.intro}</p>
        </section>

        <section>
            <h2>技术实现</h2>
            <ul>
                ${p.detail.tech.map(t => `<li>${t}</li>`).join("")}
            </ul>
        </section>

        <section>
            <h2>核心代码</h2>
        <pre><code class="language-cpp">${p.detail.code}</code></pre>
        </section>

        <section>
            <h2>项目收获</h2>
            <p>${p.detail.learn}</p>
        </section>
    `;
    hljs.highlightAll();
}

render(project);
