# 李继忠 · 个人作品集

性能审查与优化结果见 [PERFORMANCE.md](PERFORMANCE.md)。当前页面使用本地系统字体、响应式 WebP 封面与延迟加载的分设备背景视频；未使用原始视频备份保存在不参与发布的 `media-originals/`。

React + Vite 实现的个人作品集基础版本。版心最大 1700px，优先适配 PC，同时提供移动端布局。

## 运行

安装 Node.js 20.19+ 或 22.12+，在项目目录执行：

```sh
npm install
npm run dev
```

如使用 pnpm：`pnpm install`，然后 `pnpm dev`。构建使用 `npm run build`，预览构建使用 `npm run preview`。

## 修改内容

- `src/main.jsx`：个人信息、项目数据、页面模块和交互。
- `src/style.css`：配色、1700px 版心、字号和响应式布局。
- `public/portrait.jpeg`：从简历中提取的头像，可替换为更高清的个人照片。

个人经历、联系方式和短视频数据来自提供的简历。精选作品展示《创伤》《末代龙裔》《神经也是神》《百万富翁的动物耳语者》四部真实作品，封面均取自影片画面。

首页使用提供的 demo.mp4，保存在 `public/videos/hero-background.mp4`，静音自动循环播放；静态封面为 `public/videos/hero-poster.jpg`。视频采用 cover 铺满屏幕，会根据视口裁切。字体加载失败时自动使用系统中文字体。

目前为本地基础版本，尚未部署到公网。

AI 工具区位于 `src/ai-tools.jsx`，悬浮交互样式位于 `src/interactions.css`。本地图标来自 [Lobe Icons](https://github.com/lobehub/lobe-icons)，MIT 许可保存在 `public/icons/LICENSE`。Seedance 使用其所属字节跳动品牌图标，GPT Image 使用 OpenAI 品牌图标。

## 动效

`src/motion.jsx` 与 `src/motion.css` 使用 GSAP + ScrollTrigger：首屏双幕揭开、字标分段压缩复位、模块英文标题进场、卡片依次展开及作品遮罩揭幕。桌面作品画面附带轻微滚动视差，移动端关闭视差。开场总长约 4.5 秒，直接访问模块锚点时跳过；快速滚动会立即完成开场，页面保持原生滚动。

系统启用“减少动态效果”时跳过开场与滚动动画。背景视频在首页离屏或页面不可见时暂停，减少动态效果模式下显示静态封面。动画通过 matchMedia 管理清理，筛选作品时只重建项目动画。

## 精选影片《创伤》

网页播放版为 `public/videos/trauma-web.mp4`（1080p、30fps、H.264/AAC，约 44MB），完整保留原片约 106 秒的片长。原始 E 盘文件未修改。封面为 `public/videos/trauma-poster.jpg`。作品详情中可播放影片并查看 Libtv、ChatGPT、Deepseek 与剪映的制作流程；关闭详情会卸载播放器并停止播放。项目简介沿用提供的“90秒”创作描述，实际播放器时长约 1 分 46 秒。

## 分集短剧《末代龙裔》

项目紧接《创伤》，包含两集竖屏视频。按原文件顺序：`dragon heir.mp4` 为第 1 集（约 171 秒），`the last dragon heir2.mp4` 为第 2 集（约 105 秒），合计约 276 秒；项目简介沿用提供的“270秒”创作描述。网页副本为 `public/videos/dragon-heir-ep1.mp4`、`dragon-heir-ep2.mp4`，1080×1920，30fps，H.264/AAC，约 65MB。E 盘源文件未修改。

`src/series-player.jsx` 提供选集按钮；切换时卸载旧播放器，关闭详情停止播放。封面来自两集影片真实画面，卡片为双竖屏拼排。

## 3D 国漫《神经也是神》

项目排在《末代龙裔》下方，网页播放版为 `public/videos/neuro-god.mp4`（1920×1080、30fps、H.264/AAC），封面为 `public/videos/neuro-god.jpg`。原片 `E:/3D漫剧/9月19日(9).mp4` 未修改，完整保留约 100 秒片长和声音；项目简介沿用提供的“90秒”创作描述。作品详情包含简介及 Libtv、ChatGPT、Deepseek、剪映的制作分工。

## 《百万富翁的动物耳语者》

作品位于《神经也是神》下方，收录 EP26 和 EP27，分集编号与原文件一致。视频位于 `public/videos/animal-whisperer-ep26.mp4`、`animal-whisperer-ep27.mp4`，对应 JPG 是真实影片封面。简介和 Libtv、ChatGPT、Deepseek、剪映制作分工来自提供的说明。原始 E 盘文件未修改，播放保持完整画幅与声音。
