import React, {useEffect,useRef,useState} from 'react';

const initialLevel=()=>navigator.connection?.saveData || (navigator.connection?.downlink>0&&navigator.connection.downlink<1.2)?480:720;
export default function VideoPlayer({src,poster,label}){
 const video=useRef(null),pending=useRef({time:0,play:false}),timer=useRef(null);
 const [quality,setQuality]=useState('auto'),[autoLevel,setAutoLevel]=useState(initialLevel),[busy,setBusy]=useState(false),[note,setNote]=useState('');
 const level=quality==='auto'?autoLevel:Number(quality);
 const source=level===1080?src:src.replace(/\.mp4$/,`-${level}.mp4`);
 const remember=()=>{const v=video.current;pending.current={time:v?.currentTime||0,play:v?!v.paused:false}};
 useEffect(()=>{
  const v=video.current;setBusy(false);clearTimeout(timer.current);
  const metadata=()=>{if(pending.current.time>0)v.currentTime=Math.min(pending.current.time,Math.max(0,v.duration-.1));if(pending.current.play)v.play().catch(()=>{})};
  v.addEventListener('loadedmetadata',metadata);v.src=source;v.load();
  return()=>{clearTimeout(timer.current);v.removeEventListener('loadedmetadata',metadata);v.pause();v.removeAttribute('src');v.load()};
 },[source]);
 const waiting=()=>{setBusy(true);clearTimeout(timer.current);timer.current=setTimeout(()=>{if(quality==='auto'&&autoLevel===720&&!video.current.paused&&!document.hidden){remember();setAutoLevel(480);setNote('网络较慢，已切换为 480p 流畅播放')}},3000)};
 const playing=()=>{clearTimeout(timer.current);setBusy(false)};
 const change=e=>{remember();setNote('');setQuality(e.target.value);if(e.target.value==='auto')setAutoLevel(initialLevel())};
 return <div className="adaptive-video-player"><div className="video-stage"><video ref={video} className="project-video-player" poster={poster} controls playsInline preload="auto" aria-label={label} onWaiting={waiting} onStalled={waiting} onPlaying={playing} onPause={()=>{clearTimeout(timer.current);setBusy(false)}} onCanPlay={()=>setBusy(false)}/>{busy&&<span className="video-buffer-status" role="status">正在缓冲…</span>}</div><div className="video-quality-bar"><span aria-live="polite">{note||'完整画幅 · 原声播放'}</span><label>画质 <select aria-label="播放画质" value={quality} onChange={change}><option value="auto">自动（{autoLevel}p）</option><option value="480">流畅 480p</option><option value="720">清晰 720p</option><option value="1080">高清 1080p</option></select></label></div></div>
}
