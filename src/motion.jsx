import React, {useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './motion.css';

gsap.registerPlugin(ScrollTrigger);

export function Opening(){return <div className="opening" aria-hidden="true"><div className="opening-panel opening-panel-top"/><div className="opening-panel opening-panel-bottom"/><div className="opening-caption"><span>LIJIZHONG®</span><span>CRAFTING WHAT’S NEXT.</span><span className="opening-count">00</span></div><div className="opening-rule"/></div>}
export function MotionHeading({children}){return <div className="motion-heading" aria-hidden="true"><span>{children}</span><i>↗</i></div>}

export function usePortfolioMotion(filter){
 useLayoutEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const home=document.querySelector('#home');
   const deepLink=location.hash && location.hash!=='#home';
   if(!deepLink && window.scrollY<100){
    let skipTrigger;
    const opening=gsap.timeline({defaults:{ease:'power4.inOut'},onComplete:()=>{document.querySelector('.opening')?.setAttribute('data-complete','true');skipTrigger?.kill()}});
    opening.set('.opening',{display:'block'})
     .fromTo('.opening-caption',{y:25,clipPath:'inset(100% 0 0 0)'},{y:0,clipPath:'inset(0% 0 0 0)',duration:.85},0)
     .to('.opening-count',{textContent:100,snap:{textContent:1},duration:1.25,ease:'power2.inOut'},0)
     .fromTo('.opening-rule',{scaleX:0},{scaleX:1,duration:1.3,transformOrigin:'left'},0)
     .to('.opening-caption',{y:-35,clipPath:'inset(0 0 100% 0)',duration:.6},1.1)
     .to('.opening-rule',{scaleX:0,transformOrigin:'right',duration:.7},1.25)
     .to('.opening-panel-top',{yPercent:-101,duration:1.45},1.3)
     .to('.opening-panel-bottom',{yPercent:101,duration:1.45},1.3)
     .set('.opening',{display:'none'},2.8)
     .fromTo('.hero-wordmark .wordmark-letters',{yPercent:120,scaleY:1.65,scaleX:.84,rotation:5},{yPercent:0,scaleY:1,scaleX:1,rotation:0,duration:1.9,stagger:.055,ease:'expo.out',clearProps:'transform'},1.65)
     .fromTo('.motion-bg video',{scale:1.12},{scale:1,duration:2.2,ease:'power4.out',clearProps:'transform'},1.75)
     .from('header',{y:-100,duration:1.2,ease:'power3.out',clearProps:'transform'},2)
     .fromTo('.hero-edition > span, .hero-note, .hero-proof, .hero-statement, .hero-actions > *, .hero-meta',{y:65,clipPath:'inset(100% 0 0 0)'},{y:0,clipPath:'inset(0% 0 0 0)',duration:1.25,stagger:.075,ease:'power3.out',clearProps:'transform,clipPath'},2.25);
    skipTrigger=ScrollTrigger.create({trigger:home,start:'30% top',once:true,onEnter:()=>opening.progress(1)});
   }

   document.querySelectorAll('main > .section').forEach(section=>{
    const title=section.querySelector('.motion-heading > span');
    const arrow=section.querySelector('.motion-heading > i');
    const timeline=gsap.timeline({scrollTrigger:{trigger:section,start:'top 82%',once:true},defaults:{ease:'power4.out'}});
    timeline.from(title,{xPercent:-22,yPercent:130,scaleY:1.5,rotation:5,duration:1.65,transformOrigin:'left bottom',clearProps:'transform'},0)
     .from(arrow,{x:-80,rotation:-50,scale:.3,duration:1.55,clearProps:'transform'},.15)
     .from(section.querySelector('.section-kicker'),{scaleX:.2,transformOrigin:'left',duration:1.1,clearProps:'transform'},.1);
    const content=section.querySelectorAll('.about-copy > .eyebrow, .about-copy > h2, .bio, .experience, .stats > div, .about-copy > .text-link, .section-heading > *, .filters, .contact-main > p, .contact-title, .contact-details > *, footer');
    timeline.from(content,{y:65,clipPath:'inset(100% 0 0 0)',duration:1.3,stagger:.1,clearProps:'transform,clipPath'},.48);
   });

   document.querySelectorAll('.ai-toolkit, .skills').forEach(group=>{
    const cards=group.querySelectorAll('.ai-tools-grid > li, article');
    const timeline=gsap.timeline({scrollTrigger:{trigger:group,start:'top 85%',once:true},defaults:{ease:'power4.out'}});
    const heading=group.querySelector('.ai-toolkit-heading');
    if(heading)timeline.from(heading,{y:70,clipPath:'inset(100% 0 0 0)',duration:1.25,clearProps:'transform,clipPath'},0);
    timeline.from(cards,{y:115,rotation:3,scaleY:.84,transformOrigin:'center bottom',duration:1.45,stagger:.16,clearProps:'transform,clipPath'},.25);
   });

  });
  return()=>mm.revert();
 },[]);

 useLayoutEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 701px) and (hover: hover)'},context=>{
   if(!context.conditions.motion)return;
   const desktop=context.conditions.desktop;
   document.querySelectorAll('.project').forEach((card,index)=>{
    const visual=card.querySelector('.project-art-motion');
    const curtain=card.querySelector('.image-curtain');
    const tl=gsap.timeline({scrollTrigger:{trigger:card,start:'top 92%',once:true},defaults:{ease:'power4.out'}});
    const delay=index>0?(index-1)%2*.16:0;
    tl.from(card,{y:95,rotation:1.8,duration:1.5,clearProps:'transform'},delay)
     .fromTo(curtain,{scaleY:1},{scaleY:0,transformOrigin:'center top',duration:1.6},delay+.1)
     .fromTo(visual,{scale:1.35},{scale:1.14,duration:2.1},delay+.1);
    if(desktop)gsap.fromTo(visual,{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:1.25}});
   });
   const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
   return()=>cancelAnimationFrame(frame);
  });
  return()=>mm.revert();
 },[filter]);
}
