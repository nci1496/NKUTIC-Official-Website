// 纯数据
export const projects = [
    {
    id: "mathChaos",
    name: "MathChaosEngine",
    img: "images/MathChaosEngine/demo.gif",
    desc: "基于MFC构建的数学混沌与生成系统轻量级可视化引擎",
    tags: ["递归分形", "混沌", "粒子模拟"], 
    featured: true,

    github: "https://github.com/nci1496/MathChaosEngine",

    // 详情页用
    detail: {
        subtitle: "分形与混沌系统可视化引擎",
        status: "维护中",

        intro: "MathChaosEngine 面向「把数学结构画出来」这一目标：用轻量引擎把分形树等结构实时画在屏幕上，并通过参数感受递归深度、分支角度与随机扰动带来的形态变化。适合作为图形入门与递归思维的练手项目。",

        problem: "分形与混沌相关概念如果只看公式，很难建立直觉；需要一个可交互、可反复调参的可视化载体，而不是一次性截图。",

        approach: "在 MFC 环境下完成绘制与刷新循环；用递归生成树枝结构，并在每一步引入可控随机（长度、角度微扰）让结果更接近自然形态；同时用分支数量等阈值做保护，避免无限递归拖垮帧率。",

        outcome: "已实现分形树的实时生成与动态展示，并沉淀了一套「参数 → 视觉反馈」的调试方式；工程上可继续扩展到更多吸引子或粒子类效果。",

        highlights: [
            "递归终止条件 + 分支上限：兼顾效果与性能",
            "随机映射到「像树」的形态，而不是纯几何对称",
            "为教学演示预留参数面板与状态重置思路"
        ],

        tech: [
            "C++ 图形绘制",
            "递归生成分形结构",
            "随机参数控制自然效果"
        ],

        codeLang: "cpp",
        codeLabel: "C++",

        gallery: [],

        code: `
// 分形树递归核心
void FractalTree::generateBranchesLessRandom(Vec2 pos, double length, double angle, int depth)
{

    if (depth <= 0) return;

    // 计算终点
    Vec2 end = pos + Vec2(length * cos(angle), length * sin(angle));

    if (depth <= 0 || length < 3)
    {
        return;
    }
    if (branches.size() > 5000)
    {
        return;
    }

    // 存储这条树枝
    addBranch(pos, end, depth, length, angle);

    // 随机变化：长度和角度
    double newLength = length * g_Random.range(0.65, 0.75);
    double angleOffset = g_Random.range(-5.0, 5.0) * M_PI / 180.0;

    // 递归生成左右分支
    generateBranchesLessRandom(end, newLength, angle + branchAngle + angleOffset, depth - 1);
    generateBranchesLessRandom(end, newLength, angle - branchAngle + angleOffset, depth - 1);

}
    `,

        learn: "通过该项目，深入理解了递归结构与图形生成的关系，并提升了对复杂系统可视化的设计能力。",

        next: "可尝试加入更多经典混沌/分形场景（如 L 系统等），并把参数与预设方案做成可切换的配置。"
    }
},
    {
    id: "miniBilliards",
    name: "MFC-Mini-Billiards",
    img: "images/MFC-Mini-Billiards/demo.gif",
    desc: "该项目完整实现了消息处理机制、图形设备接口渲染技术、基础物理引擎及实时交互功能。 玩家可通过鼠标操控的球杆瞄准并击打主球，系统可精准模拟碰撞效果、自动识别落袋情况，并呈现粒子特效的动态烟花效果。",
    tags: ["碰撞模拟","粒子特效","流程判断"],
    featured: true,

    github: "https://github.com/nci1496/MFC-Mini-Billiards",

    // 详情页用
    detail: {
        subtitle: "MFC 桌球小型交互式台球模拟游戏",
        status: "可玩演示",

        intro: "这是一个把 Windows 消息循环、GDI 绘制与简易 2D 物理串起来的小游戏：用鼠标瞄准击球，观察多球碰撞、落袋与简单粒子反馈。适合作为「从界面到物理」的完整链路练习。",

        problem: "课程或自学阶段往往分别练习消息处理、绘图与算法，缺少一个能把它们粘合起来、且反馈足够直观的综合小项目。",

        approach: "用 MFC 管理窗口消息与定时刷新；台球用圆与圆碰撞模型：根据圆心连线求法线，把速度分解到法向与切向，在质量相同假设下做弹性碰撞；碰撞后用位置分离减少穿模；在碰撞点触发粒子/烟花类特效增强手感。",

        outcome: "完成可操作的台球原型：瞄准、击球、多球碰撞、落袋判定与特效触发，并能在调试中直观看到「数值不稳定 → 穿模 → 修正」这类工程问题。",

        highlights: [
            "碰撞对的组织方式（朴素 O(n²) 在球数少时足够清晰）",
            "法向冲量 + 穿透修正：从物理式子落到可运行代码",
            "特效触发与游戏状态解耦，便于迭代视觉反馈"
        ],

        tech: [
            "C++ 图形绘制",
            "模拟物理碰撞",
            "流程控制"
        ],

        codeLang: "cpp",
        codeLabel: "C++",

        gallery: [],

        code: `
// 碰撞检测
void CheckCollision()
{
	for (size_t i = 0; i < balls.size(); i++)
	{
		for (size_t j = i + 1; j < balls.size(); j++)
		{
			Ball& a = balls[i];
			Ball& b = balls[j];

			if (!a.alive || !b.alive)
				continue;

			float dx = b.x - a.x;
			float dy = b.y - a.y;

			float dist2 = dx * dx + dy * dy;
			float minDist = a.r + b.r;

			if (dist2 >= minDist * minDist)
				continue;

			float dist = sqrt(dist2);

			if (dist == 0)
				dist = 0.01f;

			// 法线
			float nx = dx / dist;
			float ny = dy / dist;

			// 相对速度
			float rvx = b.vx - a.vx;
			float rvy = b.vy - a.vy;

			float velAlongNormal = rvx * nx + rvy * ny;

			// 如果正在远离，不处理
			if (velAlongNormal > 0)
				continue;

			// 弹性碰撞（质量相同）
			float impulse = -velAlongNormal;

			a.vx -= impulse * nx;
			a.vy -= impulse * ny;

			b.vx += impulse * nx;
			b.vy += impulse * ny;

			// 位置修正（防止黏住）
			float overlap = minDist - dist;

			float correction = overlap * 0.5f;

			a.x -= nx * correction;
			a.y -= ny * correction;

			b.x += nx * correction;
			b.y += ny * correction;

			CreateFirework((a.x + b.x) * 0.5f, (a.y + b.y) * 0.5f);
		}
	}
}

    `,

        learn: "通过该项目，深入理解了物理碰撞，并提升了对简单模拟流程的设计能力。",

        next: "可迭代方向：桌面摩擦与旋转、更真实的库边反弹、简易 AI 对手或关卡编辑。"
    }
        
    }
];