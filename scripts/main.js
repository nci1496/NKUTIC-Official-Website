import { projects } from "./projects.js";
import { createCard } from "./project_card.js";
import { activities } from "./activities.js";
import { createActivityCard } from "./activity_card.js";
import { contributors } from "./contributors.js";

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

// 首页活动专栏
const activityContainer = document.getElementById("featured-activities");

function toTime(d) {
    const t = new Date(d).getTime();
    return Number.isNaN(t) ? 0 : t;
}

if (activityContainer) {
    const featuredActivities = activities.filter(a => a.featured);
    const sortedByDateDesc = [...activities].sort((a, b) => toTime(b.date) - toTime(a.date));

    const seen = new Set();
    const picked = [];

    for (const a of [...featuredActivities, ...sortedByDateDesc]) {
        if (!a?.id || seen.has(a.id)) continue;
        seen.add(a.id);
        picked.push(a);
        if (picked.length >= 6) break;
    }

    picked.forEach(a => {
        activityContainer.appendChild(createActivityCard(a));
    });
}

// 首页团队架构（头像墙）
function createMiniMember(p) {
    const a = document.createElement("a");
    a.className = "mini-member";
    a.href = "contributors.html";
    a.setAttribute("aria-label", `${p?.badge ? `${p.badge} ` : ""}${p?.name ?? "成员"}`);
    a.innerHTML = `
        <img src="${p.avatar}" alt="${p.name}" loading="lazy">
        <div class="mini-member-meta">
            <div class="mini-member-name">${p.name}</div>
            ${p.badge ? `<div class="mini-member-badge">${p.badge}</div>` : ""}
        </div>
    `;
    return a;
}

function pickLeadership(list) {
    const roleRe = /(主席|社长|团支书|部长)/;
    const leadership = list.filter(p => p?.core && roleRe.test(p?.badge ?? ""));
    // 如果某次数据没写 badge，也兜底放 core
    return leadership.length ? leadership : list.filter(p => p?.core);
}

const homeLeadership = document.getElementById("home-leadership");
const homeTech = document.getElementById("home-tech");
const homeMedia = document.getElementById("home-media");
const homeOps = document.getElementById("home-ops");

if (homeLeadership || homeTech || homeMedia || homeOps) {
    const leadership = pickLeadership(contributors);
    const tech = contributors.filter(p => p.department === "tech");
    const media = contributors.filter(p => p.department === "media");
    const ops = contributors.filter(p => p.department === "ops");

    if (homeLeadership) leadership.forEach(p => homeLeadership.appendChild(createMiniMember(p)));
    if (homeTech) tech.forEach(p => homeTech.appendChild(createMiniMember(p)));
    if (homeMedia) media.forEach(p => homeMedia.appendChild(createMiniMember(p)));
    if (homeOps) ops.forEach(p => homeOps.appendChild(createMiniMember(p)));
}