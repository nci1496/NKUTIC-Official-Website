// 活动数据（首页活动专栏使用）
// 约定：date 使用 ISO 字符串（YYYY-MM-DD 或带时区的完整 ISO），用于排序
export const activities = [
  {
    id: "weekly-meetup-2026-03",
    title: "技术例会：项目进展 & 新人 Onboarding",
    date: "2026-03-20",
    location: "线上 · 腾讯会议",
    desc: "本周例会我们会过一遍在做的项目、下周任务拆分，并给新人快速介绍社团协作方式（Git/GitHub、项目卡片、资料沉淀）。",
    type: "例会",
    tags: ["例会", "协作", "Git"],
    featured: true,
    links: [
      { label: "会议纪要", href: "#" }
    ]
  },
  {
    id: "icpc-teamup-2026-spring",
    title: "比赛组队：ICPC/CCPC 春季热身",
    date: "2026-03-28",
    location: "线下 · 学院自习室",
    desc: "面向想打算法竞赛的同学，现场匹配队友、分方向刷题、约定训练节奏；也欢迎纯围观了解竞赛体系。",
    type: "比赛",
    tags: ["比赛组队", "算法", "训练"],
    featured: true,
    links: [
      { label: "报名", href: "#" }
    ]
  },
  {
    id: "project-sharing-mlops-101",
    title: "项目分享：从 0 到 1 做一个可复现的 AI 小实验",
    date: "2026-02-26",
    location: "线上",
    desc: "围绕一个小模型/小数据集，讲清楚如何做实验记录、参数管理、结果复现与分享，让项目不止停留在“跑通”。",
    type: "分享",
    tags: ["AI", "复现", "实践"],
    featured: false,
    links: [
      { label: "Slides", href: "#" }
    ]
  }
];

