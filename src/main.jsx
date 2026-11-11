import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import './hero.css';
import AITools from './ai-tools.jsx';
import './interactions.css';
import './navigation.css';
import './project-video.css';
import SeriesPlayer from './series-player.jsx';
import VideoPlayer from './video-player.jsx';
import MotionBackground from './background.jsx';
import HalftoneBackground from './halftone.jsx';
import {Opening, MotionHeading, usePortfolioMotion} from './motion.jsx';

const projects = [
 {id:'01',name:'《创伤》',en:'TRAUMA / AN AI WAR SHORT FILM',category:'AI 影像',type:'film',video:'/videos/trauma-web.mp4',poster:'/videos/trauma-poster.webp',desc:'90秒真人战争题材短片，聚焦战争反思，以及创伤后应激障碍（PTSD）对退伍军人的影响。',tools:'Libtv / ChatGPT / Deepseek / 剪映',process:[{tool:'Libtv',task:'画面制作与镜头调度'},{tool:'ChatGPT',task:'剧本创作与分镜拆解'},{tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},{tool:'剪映',task:'视频剪辑'}]},
 {id:'02',name:'《末代龙裔》',en:'THE LAST DRAGON HEIR / FANTASY SERIES',category:'AI 影像',type:'film',poster:'/videos/dragon-heir-20261106-ep1.webp',episodes:[{src:'/videos/dragon-heir-20261106-ep1.mp4',poster:'/videos/dragon-heir-20261106-ep1.webp'},{src:'/videos/dragon-heir-20261106-ep2.mp4',poster:'/videos/dragon-heir-20261106-ep2.webp'}],desc:'270秒海外真人奇幻题材短剧。被巨龙收养长大的伊凡归来，回归王国，在隐藏实力、装逼打脸的同时调查当年母亲去世的真相。此作品主要用于展示作者海外剧的制作水平。',tools:'Libtv / ChatGPT / Deepseek / 剪映',process:[{tool:'Libtv',task:'画面制作与镜头调度'},{tool:'ChatGPT',task:'剧本创作与分镜拆解'},{tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},{tool:'剪映',task:'视频剪辑'}]},
 {id:'03',name:'《仙门有点神》',en:'NEURO GOD / 3D ANIMATION',category:'AI 影像',type:'film',video:'/videos/neuro-god.mp4',poster:'/videos/neuro-god.webp',badge:'3D 国漫 / 近身打戏',desc:'90秒3D国漫，讲述女主在各种神经过头的宗门之间斡旋的反差日常。此作品主要用于展现作者对于贴身打戏的制作水平。',tools:'Libtv / ChatGPT / Deepseek / 剪映',process:[{tool:'Libtv',task:'画面制作与镜头调度'},{tool:'ChatGPT',task:'剧本创作与分镜拆解'},{tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},{tool:'剪映',task:'视频剪辑'}]},
 {id:'04',name:'《百万富翁的动物耳语者》',en:'MIA’S WILD WONDERLAND',coverLines:['MIA’S WILD','WONDERLAND'],seriesLabel:'海外真人短剧 / EP26—27',badge:'海外真人短剧 / 第26—27集',category:'AI 影像',type:'film',poster:'/videos/mia-wild-wonderland-20261106-ep26.webp',episodes:[{number:26,src:'/videos/mia-wild-wonderland-20261106-ep26.mp4',poster:'/videos/mia-wild-wonderland-20261106-ep26.webp'},{number:27,src:'/videos/mia-wild-wonderland-20261106-ep27.mp4',poster:'/videos/mia-wild-wonderland-20261106-ep27.webp'}],desc:'140秒海外真人题材短剧。被富豪收养的米娅拥有和动物对话的能力，并以此逃脱二叔亚瑟为她制造的各种困境。此作品主要用于展示作者海外剧的制作水平。',tools:'Libtv / ChatGPT / Deepseek / 剪映',process:[{tool:'Libtv',task:'画面制作与镜头调度'},{tool:'ChatGPT',task:'剧本创作与分镜拆解'},{tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},{tool:'剪映',task:'视频剪辑'}]},
 {
  id:'05',
  portrait:true,
  name:'《THE WITCH OF WINDVALE》',
  en:'LIVE-ACTION FANTASY / SHORT FILM',
  category:'AI 影像',
  type:'film',
  video:'/videos/witch-of-windvale-v2.mp4',
  poster:'/videos/witch-of-windvale-v2.webp',
  badge:'海外真人奇幻短剧',
  desc:'60秒海外真人奇幻题材短剧，以女巫 Aria 为主角。她能够催生作物，并用自己的能力带领村民过上富足的生活。这部作品展示了我在海外短剧方面的制作能力。',
  tools:'Libtv / ChatGPT / Deepseek / 剪映',
  process:[
   {tool:'Libtv',task:'画面制作与镜头调度'},
   {tool:'ChatGPT',task:'剧本创作与分镜拆解'},
   {tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},
   {tool:'剪映',task:'视频剪辑'},
  ],
 },
 {
  id:'06',
  portrait:true,
  name:"《My husband's dream girl fell for me》",
  en:'LIVE-ACTION GL / SHORT DRAMA',
  category:'AI 影像',
  type:'film',
  video:'/videos/dream-girl.mp4',
  poster:'/videos/dream-girl.webp',
  badge:'海外真人短剧 / GL',
  desc:'80秒海外真人 GL 短剧。Aria 为钱嫁入豪门，陪丈夫演戏，却意外和丈夫真正的梦中情人相爱。这部作品展示了我在海外短剧方面的制作能力。',
  tools:'Libtv / ChatGPT / Deepseek / 剪映',
  process:[
   {tool:'Libtv',task:'画面制作与镜头调度'},
   {tool:'ChatGPT',task:'剧本创作与分镜拆解'},
   {tool:'Deepseek',task:'台词打磨与内容逻辑梳理'},
   {tool:'剪映',task:'视频剪辑'},
  ],
 },
];


function App(){
 const [filter,setFilter]=useState('全部'),[selected,setSelected]=useState(null),[copied,setCopied]=useState(false),[menu,setMenu]=useState(false);
 const [floatingNav,setFloatingNav]=useState(false);
 useEffect(()=>{
  const hero=document.querySelector("#home");
  const observer=new IntersectionObserver(([entry])=>{setFloatingNav(!entry.isIntersecting && entry.boundingClientRect.bottom<=1)},{rootMargin:"-1px 0px 0px 0px"});
  observer.observe(hero);
  const anchorFrame=requestAnimationFrame(()=>{if(location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:"instant",block:"start"})});
  return()=>{observer.disconnect();cancelAnimationFrame(anchorFrame)};
 },[]);
 usePortfolioMotion(projects.filter(p=>filter==='全部'||filter===p.category).map(p=>p.id).join(','),Boolean(selected));
 const closeRef=useRef(null),opener=useRef(null);
 useEffect(()=>{if(!selected)return;opener.current=document.activeElement;closeRef.current?.focus();const old=document.body.style.overflow;document.body.style.overflow='hidden';document.body.classList.add('watching-video');const key=e=>{if(e.key==='Escape')setSelected(null);if(e.key==='Tab'){const focusable=[...document.querySelectorAll('.modal button, .modal video[controls], .modal select, .modal a[href]')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;document.body.classList.remove('watching-video');window.removeEventListener('keydown',key);opener.current?.focus()}},[selected]);
 async function copy(){try{await navigator.clipboard.writeText('3189118462@qq.com');setCopied(true);setTimeout(()=>setCopied(false),2200)}catch{location.href='mailto:3189118462@qq.com'}}
 return <>
 <Opening/>
 <header className={floatingNav?"site-header is-floating":"site-header"}><a className="logo" href="#home" aria-label="李继忠 首页">李继忠</a><nav className={menu?'open':''} aria-label="主导航">{[['home','首页'],['about','关于我'],['work','精选作品'],['expertise','个人优势']].map(([id,label],i)=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}</a>)}</nav><a className="nav-contact" href="#contact">聊聊合作 <span>↗</span></a><button className="menu" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="展开导航">☰</button></header>
 <main><section id="home" className="hero hero-editorial"><MotionBackground paused={Boolean(selected)}/><div className="hero-content"><div className="hero-edition"><span>VISUAL DESIGN / AI / BRAND</span><span>独立创作者 · 李继忠</span><span>SELECTED PORTFOLIO — 2026</span></div><h1 className="hero-wordmark" aria-label="LIJIZHONG 李继忠个人作品集">{["LI","JI","ZHONG"].map((part,i)=><span className="wordmark-letters" key={i} aria-hidden="true">{part}</span>)}<b className="wordmark-registration" aria-hidden="true">®</b></h1><div className="hero-note"><span className="note-cross">✳</span><p>用视觉赋予想法形状，<br/>用 AI 打开创作的下一种可能。</p></div><div className="hero-stage"><div className="hero-proof"><span className="proof-slashes">///</span><strong>8万<span>+</span></strong><p>单条短视频观看</p><small>4000+ 点赞 / 来自个人创作</small></div><div className="hero-statement"><span className="statement-arrow" aria-hidden="true">↗</span><div><span className="statement-label">IMAGINATION, MADE VISIBLE.</span><h2>让想象<span>发生。</span></h2><p>视觉设计师 / AI 设计师 / 品牌设计师</p></div></div></div><div className="hero-actions"><a className="hero-work-cta" href="#work">探索我的作品 <span>↗</span></a><a className="hero-about-link" href="#about">关于我的创作 <span>↓</span></a><span className="hero-location"><i/> BASED IN BENGBU, CHINA</span></div><div className="hero-meta"><span>IDEAS INTO VISION.</span><span>SCROLL TO EXPLORE ↓</span><span>创意持续发生 / 01</span></div></div></section>
 <section id="about" className="section about"><HalftoneBackground paused={Boolean(selected)}/><div className="section-kicker"><span>01 / ABOUT ME</span><span>理性思考，感性创造</span></div><MotionHeading>ABOUT ME</MotionHeading><div className="about-grid"><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT MYSELF</p><h2>你好，我是李继忠<span>让创意，有迹可循。</span></h2><p className="bio">从会计学的严谨逻辑，走向视觉与 AI 创作的开放探索。我关注画面背后的叙事，也重视每一个细节的准确表达。通过 AI 图像生成、分镜拆解与视频剪辑，将想法逐步转化为可感知的作品。</p><div className="experience"><span>2022 — 2026</span><div><b>安徽工业大学</b><p>会计学 · 本科</p></div><span>教育经历 ↗</span></div><div className="stats"><div><strong>8万<span>+</span></strong><p>单条短视频观看</p></div><div><strong>4000<span>+</span></strong><p>单条短视频点赞</p></div><div><strong>AI<span> × </span>创意</strong><p>图像 · 分镜 · 视频</p></div></div><a className="text-link" href="mailto:3189118462@qq.com">3189118462@qq.com <span>↗</span></a><AITools/></div></div></section>
 <section id="work" className="section work"><HalftoneBackground paused={Boolean(selected)}/><div className="section-kicker"><span>02 / SELECTED WORK</span><span>探索、实验与表达</span></div><MotionHeading>SELECTED WORK</MotionHeading><div className="section-heading"><h2>创作进行时<span className="lime">.</span></h2><p>从一个想法，到一个值得被看见的画面。<br/>影像创作与视觉探索，持续更新中。</p></div><div className="filters" aria-label="作品分类">{['全部','AI 影像'].map(x=><button key={x} className={filter===x?'active':''} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}{x==='全部'&&<sup>{String(projects.length).padStart(2,'0')}</sup>}</button>)}</div><div className="project-grid">{projects.filter(p=>filter==='全部'||filter===p.category).map(p=><button className={'project project-'+p.id+(p.episodes?' project-series':p.video?' project-film':'')+(p.portrait?' project-portrait':'')} key={p.id} onClick={()=>setSelected(p)} aria-label={'查看'+p.name}><div className="project-image"><div className="project-art-motion">{p.episodes?<div className="series-cover"><div><small>{p.seriesLabel?"OVERSEAS DRAMA SERIES":"OVERSEAS FANTASY SERIES"}</small><strong>{(p.coverLines||["THE LAST","DRAGON","HEIR"]).map((line,i)=><React.Fragment key={line}>{i>0&&<br/>}{line}</React.Fragment>)}<span>{p.seriesLabel||"末代龙裔 / 全 2 集"}</span></strong></div>{p.episodes.map((ep,i)=><img key={ep.src} src={ep.poster} srcSet={`${ep.poster.replace(".webp","-sm.webp")} 320w, ${ep.poster} 600w`} sizes="(max-width:700px) 20vw, 26vw" width="600" height="1067" alt={p.name+" 第"+(ep.number??i+1)+"集画面"} loading="lazy" decoding="async"/>)}</div>:p.poster?<img className="project-poster" src={p.poster} srcSet={`${p.poster.replace(".webp","-sm.webp")} 320w, ${p.poster} 1280w`} sizes={p.portrait?"(max-width:480px) 90vw, 400px":"(max-width:700px) 100vw, (max-width:1700px) 90vw, 1572px"} width={p.portrait?720:1280} height={p.portrait?1280:720} alt={p.name+"作品画面"} loading="lazy" decoding="async"/>:null}</div><div className="image-curtain" aria-hidden="true"/><span className="demo-badge">{p.episodes?(p.badge||"海外奇幻短剧 / 全2集"):p.video?(p.badge||"AI 短片 / 战争反思"):"概念视觉 / 待替换作品"}</span>{(p.video||p.episodes)&&<span className="project-play"><span>▶</span> {p.episodes?"分集观看 / 02 EPISODES":"播放短片"}</span>}<span className="project-arrow">↗</span></div><div className="project-caption"><div><small>{p.en}</small><h3>{p.name}</h3></div><span>{p.category} <i>/{p.id}</i></span></div>{(p.video||p.episodes)&&<p className="project-summary">{p.desc}<span>查看影片与制作流程 ↗</span></p>}</button>)}</div></section>
 <section id="expertise" className="section expertise"><HalftoneBackground paused={Boolean(selected)}/><div className="section-kicker"><span>03 / WHAT I BRING</span><span>创意背后的能力</span></div><MotionHeading>EXPERTISE</MotionHeading><div className="section-heading"><h2>想法之外，<br/>更有执行力<span className="lime">.</span></h2><p>结合 AI 工具与细致的工作方法，<br/>让创作的每一步都有清晰的方向。</p></div><div className="skills">{[{n:'01',icon:'✳',title:'AI 视觉与影像',body:'熟悉 AI 图像与视频生成工具，从风格探索到分镜画面，持续拓展视觉表达。',tags:'Midjourney · Nano banana · Seedance'},{n:'02',icon:'↗',title:'叙事与内容创作',body:'结合热点进行内容创作，使用 AI 辅助剧本与分镜拆解，完成视频剪辑和节奏处理。',tags:'Deepseek · Codex · PR · AE · 剪映'},{n:'03',icon:'⊞',title:'严谨与协作',body:'将细心严谨、分析问题的习惯带入设计，用清晰沟通推进协作，保持学习与迭代。',tags:'细节把控 · 沟通协调 · 持续学习'}].map(s=><article key={s.n}><div className="skill-top"><span>{s.icon}</span><small>/{s.n}</small></div><h3>{s.title}</h3><p>{s.body}</p><div className="skill-tags">{s.tags}</div></article>)}</div></section>
 <section id="contact" className="contact section"><HalftoneBackground paused={Boolean(selected)}/><div className="section-kicker"><span>04 / LET’S CONNECT</span><span><i className="status-dot"/> 开启新的创作对话</span></div><MotionHeading>LET’S TALK</MotionHeading><div className="contact-main"><p>下一个好想法，或许从一次交谈开始。</p><a href="mailto:3189118462@qq.com" className="contact-title">一起创造<br/><span>新的可能。</span><b>↗</b></a><div className="contact-details"><button onClick={copy} aria-live="polite"><small>EMAIL / 点击复制</small><span>{copied?'邮箱已复制 ✓':'3189118462@qq.com'} ↗</span></button><a href="tel:15155223630"><small>PHONE</small><span>151 5522 3630 ↗</span></a><div><small>LOCATION</small><span>中国 · 安徽 · 蚌埠</span></div></div></div><footer><a className="logo" href="#home">LIJIZHONG</a><span>© 2026 李继忠 · 保持好奇，持续创造。</span><a href="#home">回到顶部 ↑</a></footer></section></main>
 {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className={selected.portrait?"modal modal-portrait":"modal"} role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e=>e.stopPropagation()}><button ref={closeRef} className="close" onClick={()=>setSelected(null)} aria-label="关闭项目详情">✕</button>{selected.episodes?<SeriesPlayer key={selected.id} project={selected}/>:selected.video?<VideoPlayer key={selected.id} src={selected.video} poster={selected.poster} label={selected.name+"短片播放器"}/>:null}<div className="modal-copy"><small>{selected.en}</small><h2 id="project-title">{selected.name}</h2><p>{selected.desc}</p>{selected.process&&<div className="project-process"><h3>制作流程</h3><ol>{selected.process.map((step,i)=><li key={step.tool}><small>0{i+1}</small><div><b>{step.tool}</b><p>{step.task}</p></div></li>)}</ol></div>}<span>{selected.tools}</span></div></div></div>}
 </>
}
createRoot(document.getElementById('root')).render(<App/>);


