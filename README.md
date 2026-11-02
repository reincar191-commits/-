# 李继忠 · 个人作品集

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

个人经历、联系方式和短视频数据来自提供的简历。三个项目封面为 CSS 绘制的概念视觉，均标明待替换，并非真实商业案例。

首页使用提供的 demo.mp4，保存在 `public/videos/hero-background.mp4`，静音自动循环播放；静态封面为 `public/videos/hero-poster.jpg`。视频采用 cover 铺满屏幕，会根据视口裁切。字体加载失败时自动使用系统中文字体。

目前为本地基础版本，尚未部署到公网。

AI 工具区位于 `src/ai-tools.jsx`，悬浮交互样式位于 `src/interactions.css`。本地图标来自 [Lobe Icons](https://github.com/lobehub/lobe-icons)，MIT 许可保存在 `public/icons/LICENSE`。Seedance 使用其所属字节跳动品牌图标，GPT Image 使用 OpenAI 品牌图标。

## 动效

`src/motion.jsx` 与 `src/motion.css` 使用 GSAP + ScrollTrigger：首屏双幕揭开、字标分段压缩复位、模块英文标题进场、卡片依次展开及作品遮罩揭幕。桌面作品画面附带轻微滚动视差，移动端关闭视差。开场总长约 4.5 秒，直接访问模块锚点时跳过；快速滚动会立即完成开场，页面保持原生滚动。

系统启用“减少动态效果”时跳过开场与滚动动画。背景视频在首页离屏或页面不可见时暂停，减少动态效果模式下显示静态封面。动画通过 matchMedia 管理清理，筛选作品时只重建项目动画。
