import React, {useState} from 'react';
import VideoPlayer from './video-player.jsx';

export default function SeriesPlayer({project}){
 const [active,setActive]=useState(0);
 const episode=project.episodes[active];
 const episodeNumber=episode.number ?? active+1;
 return <div className="series-player">
  <VideoPlayer key={episode.src} src={episode.src} poster={episode.poster} label={`${project.name} 第${episodeNumber}集播放器`}/>
  <div className="series-episode-panel"><div className="series-episode-heading"><span>EPISODE SELECT / 分集观看</span><span aria-live="polite">已选择第 {episodeNumber} 集 · 收录 {project.episodes.length} 集</span></div>
   <div className="series-episode-list" role="group" aria-label="选择剧集">{project.episodes.map((item,i)=><button key={item.src} type="button" aria-pressed={active===i} className={active===i?'episode-choice active':'episode-choice'} onClick={()=>setActive(i)}><img src={item.poster.replace('.webp','-sm.webp')} alt="" loading="lazy" decoding="async" width="320" height="569"/><span><small>EPISODE {String(item.number ?? i+1).padStart(2,'0')}</small><b>第 {item.number ?? i+1} 集</b><em>{active===i?'当前选集':'切换观看'} ↗</em></span></button>)}</div>
  </div>
 </div>
}
