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

        intro: "MathChaosEngine 是一个用于展示分形与混沌系统的可视化项目，当前实现了分形树生成，并支持参数控制与动态效果展示。",

        tech: [
            "C++ 图形绘制",
            "递归生成分形结构",
            "随机参数控制自然效果"
        ],

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

        learn: "通过该项目，深入理解了递归结构与图形生成的关系，并提升了对复杂系统可视化的设计能力。"
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
        subtitle: "MFC桌球小型交互式台球模拟游戏",

        intro: "MFC-Mini-Billiards 是一个用于简单的台球交互项目，当前实现了碰撞模拟，碰撞特效。",

        tech: [
            "C++ 图形绘制",
            "模拟物理碰撞",
            "流程控制"
        ],

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

        learn: "通过该项目，深入理解了物理碰撞，并提升了对简单模拟流程的设计能力。"
    }
        
    }
];