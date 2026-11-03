import React, {useEffect,useRef} from 'react';

export default function MotionBackground({paused=false}){
 const video=useRef(null),pausedRef=useRef(paused),syncRef=useRef(()=>{});
 pausedRef.current=paused;
 useEffect(()=>{
  const player=video.current,motion=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  let active=false,ready=false,disposed=false,timer,idle;
  const sync=()=>{
   const constrained=connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType||'');
   if(!ready || !active || document.hidden || pausedRef.current || motion.matches || constrained){player.pause();return}
   if(!player.getAttribute('src')){player.src=innerWidth<=700?'/videos/hero-mobile.mp4':'/videos/hero-background.mp4'}
   if(player.paused)player.play().then(()=>{if(disposed || !active || document.hidden || pausedRef.current || motion.matches)player.pause()}).catch(()=>{});
  };
  const schedule=()=>{timer=setTimeout(()=>{if('requestIdleCallback' in window)idle=requestIdleCallback(()=>{ready=true;sync()},{timeout:1200});else{ready=true;sync()}},750)};
  if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
  const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;sync()});observer.observe(player.parentElement);
  syncRef.current=sync;document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);connection?.addEventListener('change',sync);
  return()=>{disposed=true;clearTimeout(timer);if(idle!==undefined)cancelIdleCallback(idle);window.removeEventListener('load',schedule);observer.disconnect();document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync);connection?.removeEventListener('change',sync);syncRef.current=()=>{};player.pause();player.removeAttribute('src');player.load()};
 },[]);
 useEffect(()=>{syncRef.current()},[paused]);
 return <div className="motion-bg" aria-hidden="true"><video ref={video} poster="/videos/hero-poster.webp" muted loop playsInline preload="none"/><div className="shade"/></div>
}
