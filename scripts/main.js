import { projects } from "./projects.js";
import { createCard } from "./project_card.js";

// 首页精选
const featured = document.getElementById("featured-projects");

if (featured) {
    projects
        .filter(p => p.featured)
        .forEach(p => {
            featured.appendChild(createCard(p));
        });
}

// 全部项目页
const all = document.getElementById("all-projects");

if (all) {
    projects.forEach(p => {
        all.appendChild(createCard(p));
    });
}