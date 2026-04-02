// 活动数据（首页活动专栏使用）
// 约定：date 使用 ISO 字符串（YYYY-MM-DD 或带时区的完整 ISO），用于排序
export const activities = [
  {
    id: "SchoolOpenDay",
    title: "2026梨园春荟",
    date: "2026-04-04",
    location: "津南梨园",
    cover: "images/activities/2026梨园春荟.png",
    desc: "每年一度梨园春荟是一场展示社团成果、分享社团故事、增进社团凝聚力的盛会。我们准备了小活动以及丰富的小奖品，欢迎大家参加",
    type: "纳新",
    tags: ["纳新", "分享"],
    featured: false,
    links: [
      { label: "详细链接", href: "https://mp.weixin.qq.com/s/kGVkueHFc6qcxhWV1V34-A" }
    ]
  },
  {
    id: "weekly-meetup-2026-04",
    title: "技术例会：C++ & EasyX 简单项目开发",
    date: "2026-04-5",
    location: "线下 · 大通活动中心",
    cover: "images/activities/20260405技术例会.gif",
    desc: "本周例会我们会通过从零开始发现项目，给新人快速介绍项目开发思路（C++、EasyX、面向对象开发）。",
    type: "例会",
    tags: ["例会", "C++", "EasyX"],
    featured: true,
    links: [
      { label: "", href: "#" }
    ]
  },
  {
    id: "icpc-teamup-2026-spring",
    title: "比赛分享：2026腾讯广告算法大赛",
    date: "2026-03-28",
    cover: "images/activities/2026腾讯广告算法大赛.png",
    location: "线上",
    desc: "本次大赛不仅能斩获高额奖金，获奖团队更有机会登上KDD国际学术舞台，Top 队伍选手有机会加入腾讯。<br>即使你的AUC不是最高的，只要方法有足够的新意和学术价值，同样有机会拿到重量级奖项。<br>报名时间：3月19日-4月23日（AOE时间），初赛、复赛依次于4-6月开展，8月9-13日KDD Workshop现场颁奖",
    type: "比赛",
    tags: ["比赛组队", "算法", "训练"],
    featured: true,
    links: [
      { label: "报名链接", href: "https://algo.qq.com/?type=register&sessionid=" }
    ]
  },

];

