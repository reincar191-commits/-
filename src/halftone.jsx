import React, {useEffect,useRef} from 'react';
import './halftone.css';

export default function HalftoneBackground({paused=false}){
 const element=useRef(null),syncRef=useRef(()=>{}),pausedRef=useRef(paused);
 pausedRef.current=paused;
 useEffect(()=>{
  const node=element.current,motion=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
  const sync=()=>{node.dataset.running=String(visible&&!document.hidden&&!motion.matches&&!pausedRef.current)};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(node.parentElement);
  document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);syncRef.current=sync;
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync);syncRef.current=()=>{}};
 },[]);
 useEffect(()=>{syncRef.current()},[paused]);
 return <div className="halftone-backdrop" ref={element} data-running="false" aria-hidden="true"><div className="halftone-glow"/><div className="halftone-field"/></div>
}
