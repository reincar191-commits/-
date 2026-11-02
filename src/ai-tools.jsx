import React from 'react';

const tools = [
  {name:'Midjourney',icon:'midjourney',use:'风格探索 · 图像生成',stage:'IMAGE',color:'#b9d2f4'},
  {name:'Nano banana',icon:'nanobanana',use:'图像生成 · 视觉迭代',stage:'IMAGE',color:'#f2dc82'},
  {name:'GPT Image',icon:'openai',use:'创意构思 · 图像生成',stage:'IMAGE',color:'#bbd8c1'},
  {name:'Deepseek',icon:'deepseek',use:'剧本拆解 · 分镜构思',stage:'STORY',color:'#9cbbff'},
  {name:'Codex',icon:'codex',use:'辅助拆解 · 创作协作',stage:'STORY',color:'#ddd5f2'},
  {name:'Seedance 2.5',icon:'bytedance',use:'AI 视频生成',stage:'MOTION',color:'#a1e0de',note:'Seedance · 字节跳动品牌图标'},
];

export default function AITools(){
 return <div className="ai-toolkit" aria-labelledby="ai-toolkit-title">
  <div className="ai-toolkit-heading"><div><p className="eyebrow"><i/> MY AI TOOLKIT</p><h3 id="ai-toolkit-title">用 AI，让创意走得更远<span>.</span></h3></div><p>从图像到分镜，再到动态影像。<br/>将熟悉的工具，串联成完整的创作流程。</p></div>
  <ul className="ai-tools-grid">{tools.map(tool=><li key={tool.name} style={{'--tool-color':tool.color}}><div className="ai-tool-top"><span className="ai-tool-icon" title={tool.note || tool.name}><img src={'/icons/'+tool.icon+'.svg'} alt="" width="32" height="32" loading="lazy"/></span><small>{tool.stage}</small></div><h4>{tool.name}</h4><p>{tool.use}</p></li>)}</ul>
  <div className="ai-workflow"><span>我的创作路径</span><p>想法与脚本 <b>↗</b> 风格与分镜 <b>↗</b> 图像与视频生成 <b>↗</b> 剪辑与交付</p></div>
 </div>
}
