import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
	title: "Qgxs 友链导航页",
	imgurl: "https://www.20210701.xyz/icon.jpeg",
	desc: "独立友链页，自主申请",
	siteurl: "https://dh.20210701.xyz/",
	tags: ["导航"],
	weight: 10,
	enabled: true,
    },
    {
	title: "Hzの小站",
	imgurl: "https://favicon.im/zh/blog.mikufans520.top?t=1770102380342",
	desc: "记录碎碎念念，分享个人建站经验、教训及相关技术干货",
	siteurl: "https://blog.yumeacg.com/",
	tags: ["博客"],
	weight: 9,
	enabled: true,
    },
    {
	title: "小兔导航",
	imgurl: "https://moe520.com/wp-content/uploads/2025/09/1758255594-backgrounderaser_1758255571.png",
	desc: "二次元小兔导航",
	siteurl: "https://moe520.com/",
	tags: ["导航"],
	weight: 8,
	enabled: true,
    },
    {
	title: "风灵导航站",
	imgurl: "https://358520.xyz/uploads/icons/697f760948b78_b_7eb94da1441bd0d6336e7c1cb561b843.jpg",
	desc: "风灵导航站，大佬导航",
	siteurl: "https://358520.xyz/",
	tags: ["导航"],
	weight: 7,
	enabled: true,
    },
    {
	title: "yuyuの二次元技术小站",
	imgurl: "https://yuyu09.com/wp-content/uploads/2026/02/Image_1770562720489_783.png",
	desc: "专注专业建站教程资源分享、趣味脚本开发，从0到1搞定个人网站搭建~",
	siteurl: "https://yuyu09.com/",
	tags: ["博客"],
	weight: 6,
	enabled: true,
    },
    {
	title: "猫小诗の小站",
	imgurl: "https://mcddos.top/logo.jpg",
	desc: "猫小诗的个人网站与IDCAMS（IDC联盟管理系统）官方网站",
	siteurl: "https://mcddos.top",
	tags: ["博客"],
	weight: 5,
	enabled: true,
    },
    {
	title: "小兔互联",
	imgurl: "https://358520.xyz/uploads/icons/697f734a5352d_local6952f7a99cdd5.png",
	desc: "小兔互联已运营3年之久，提供稳定，高性价比的服务器、免费主机及免费域名等",
	siteurl: "https://moebun.com/",
	tags: ["服务商"],
	weight: 4,
	enabled: true,
    },
    {
	title: "明月 frp",
	imgurl: "https://358520.xyz/uploads/icons/697f73f90b7a5_FA682E5C0F9999014E85C2340A8B3475.jpg",
	desc: "明月 frp 提供企业级内网穿透能力",
	siteurl: "https://frp.cmcure.com",
	tags: ["服务商"],
	weight: 3,
	enabled: true,
    },
    {
	title: "灵烁的个人博客",
	imgurl: "http://blog.xn--5nx6f.top/wp-content/uploads/2026/02/吃瓜.jpg",
	desc: "灵烁的个人小窝，记录自己技术增长过程的博客",
	siteurl: "http://blog.xn--5nx6f.top/",
	tags: ["博客"],
	weight: 2,
	enabled: true,
    },
    {
	title: "烤鸭の雪屋",
	imgurl: "https://www.yadelei.top/images/avatar.png",
	desc: "美味烤鸭の雪屋，记录烤鸭的日常趣事",
	siteurl: "https://www.yadelei.top",
	tags: ["博客"],
	weight: 1,
	enabled: true,
    },
    {
	title: "凉白导航",
	imgurl: "https://imgbed.20210701.xyz/file/图标/1771431908690_769306e305725267e1c50d726311ba61.jpg",
	desc: "凉白导航页(Liangbai Spage)致力于简洁高效无广告的上网导航和搜索入口，沉淀最具价值链接，全站无商业推广，简约而不简单。",
	siteurl: "https://dh.liangbai.xyz/",
	tags: ["导航网"],
	weight: 0,
	enabled: true,
    },
    {
	title: "C佳家",
	imgurl: "https://wang-sz.cn/wp-content/uploads/logos/WebLogo.ico",
	desc: "专注打造最好的IT学习社区",
	siteurl: "https://wang-sz.cn/",
	tags: ["博客"],
	weight: -1,
	enabled: true,
    },
    {
	title: "第一剧场",
	imgurl: "https://imgbed.20210701.xyz/file/图标/1771824542032_favicon.png",
	desc: "第一剧场-VIP级沉浸看剧",
	siteurl: "https://www.tvs1.vip/",
	tags: ["视频网"],
	weight: -2,
	enabled: true,
    },
    {
	title: "worable's Blog",
	imgurl: "https://www.worable.top/wp-content/uploads/2026/02/2026020109015019.jpg",
	desc: "≡ω≡ 嗯对，一名普通的职一牲~",
	siteurl: "https://www.worable.top/",
	tags: ["博客"],
	weight: -3,
	enabled: true,
    },
    {
	title: "小满的墨水瓶",
	imgurl: "https://static.yhdzz.cn/imgs/xiaoman1221/512x512.png",
	desc: "天上如是，地下亦然",
	siteurl: "https://www.yhdzz.cn/",
	tags: ["博客"],
	weight: -4,
	enabled: true,
    },
    {
	title: "UpXuu's blog",
	imgurl: "https://upxuu.com/images/20260214145619.jpg",
	desc: "逐光而上！",
	siteurl: "https://upxuu.com/",
	tags: ["博客"],
	weight: -5,
	enabled: true,
    },
    {
	title: "语初博客",
	imgurl: "https://file.icve.com.cn/file_doc/1775486276275-szrqpk.jpg",
	desc: "致力于互联网优质资源共享",
	siteurl: "https://www.yc520.top/",
	tags: ["博客", "资源网"],
	weight: -6,
	enabled: true,
    },
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
