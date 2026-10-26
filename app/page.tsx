'use client'

import { useEffect, useRef } from 'react'

const PREVIEW_HTML = `<header class="status"><span>Cover Flow</span><div class="status-right"><span id="statusPlay">▶</span><span class="battery" aria-label="Baterai 76 persen"></span></div></header><section class="stage" id="stage"><div class="flow" id="flow"></div><div class="detail"><strong id="title"></strong><span id="artist"></span></div><div class="hint">J / F / T-Y-U-J-N-B-V-C-F-R-T · G H ENTER FLIP</div><section class="player" id="player"><div class="player-top"><span>Now Playing</span><span id="playerState">▶</span></div><img class="player-art" id="playerArt" alt="Album cover"><h2 id="playerTitle"></h2><p id="playerArtist"></p><div class="scrub"><i></i></div><div class="times"><span>0:42</span><span>3:42</span></div><div class="player-controls"><span>↶</span><span id="bigPlay">❚❚</span><span>↷</span></div></section></section>`

const PREVIEW_SCRIPT = `(function(){
'use strict';
function svg(label,a,b,c){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="500" height="500" fill="url(#g)"/><circle cx="390" cy="110" r="145" fill="'+c+'" opacity=".3"/><path d="M0 390Q190 250 500 365V500H0Z" fill="#000" opacity=".3"/><text x="34" y="78" fill="#fff" font-family="Arial" font-size="25" font-weight="bold">'+label+'</text><text x="34" y="455" fill="#fff" font-family="Arial" font-size="19">COVER FLOW EDITION</text></svg>')}
var albums=[['Discovery','Daft Punk',svg('DISCOVERY','#1b3156','#e5a82d','#65c8ff'),['One More Time','Aerodynamic','Digital Love','Harder Better Faster']],['Random Access Memories','Daft Punk',svg('RAM','#1e2027','#b9c4d0','#f5f5f5'),['Give Life Back','Get Lucky','Instant Crush']],['Currents','Tame Impala',svg('CURRENTS','#74252e','#e6b856','#ffd96a'),['Let It Happen','The Less I Know','Eventually']],['AM','Arctic Monkeys',svg('AM','#17191c','#474d54','#f2d4b0'),['Do I Wanna Know?','R U Mine?','Arabella']],['To Pimp a Butterfly','Kendrick Lamar',svg('TPAB','#17130f','#873b25','#e57937'),['Wesley Theory','King Kunta','Alright']],['Dark Side of the Moon','Pink Floyd',svg('DARK SIDE','#090b11','#344356','#fff'),['Speak to Me','Breathe','Time']]];
var flow=document.getElementById('flow'),stage=document.getElementById('stage'),currentPos=0,targetPos=0,index=0,flipped=false,playing=false,lastTick=-1;
function tick(){try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return;var c=tick.ctx||(tick.ctx=new C()),o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.value=1150;g.gain.setValueAtTime(.04,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.035);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.04)}catch(e){}}
function draw(){flow.innerHTML='';for(var i=0;i<albums.length;i++){var a=albums[i],el=document.createElement('article');el.className='card';el.dataset.index=i;el.innerHTML='<div class="face front"><img class="cover" src="'+a[2]+'" alt="'+a[0]+' - '+a[1]+'"><span class="shine"></span></div><div class="face back"><h3>'+a[0]+'</h3>'+a[3].map(function(t,n){return '<div class="track"><span>'+(n+1)+'. '+t+'</span><span>3:42</span></div>'}).join('')+'</div>';el.onclick=function(){var d=Number(this.dataset.index)-currentPos;if(Math.abs(d)<.5)flipped=!flipped;else targetPos+=d>0?1:-1;draw()};flow.appendChild(el)}update();}
function update(){var cards=flow.children;for(var i=0;i<cards.length;i++){var d=i-currentPos,abs=Math.abs(d),x,z,r;if(abs<1){r=d<0?72*d:-72*d;x=0;z=(1-abs)*90}else if(d<=-1){r=72;x=-110+(d+1)*38;z=-60}else{r=-72;x=110+(d-1)*38;z=-60}cards[i].style.transform='translateX('+x+'px) rotateY('+r+'deg) translateZ('+z+'px)';cards[i].style.zIndex=100-Math.round(abs*10);cards[i].style.opacity=abs>4?.35:1;cards[i].querySelector('.front').style.display=flipped&&abs<.5?'none':'';cards[i].querySelector('.back').style.display=flipped&&abs<.5?'block':''}var n=((Math.round(currentPos)%albums.length)+albums.length)%albums.length;if(n!==index){index=n;flipped=false;if(Math.round(currentPos)!==lastTick){tick();lastTick=Math.round(currentPos)}}document.getElementById('title').textContent=albums[index][0];document.getElementById('artist').textContent=albums[index][1]}
function loop(){currentPos+=(targetPos-currentPos)*.2;update();requestAnimationFrame(loop)}
function menu(){targetPos=Math.round(currentPos);flipped=false;document.getElementById('player').classList.remove('show');draw()}
function key(e){if(e.isComposing||e.keyCode===229)return;var k=e.key.toLowerCase();if(['arrowright','j','u','n','b'].indexOf(k)>=0){e.preventDefault();targetPos+=1}else if(['arrowleft','f','r','c','v'].indexOf(k)>=0){e.preventDefault();targetPos-=1}else if(k==='t'||k==='y'){e.preventDefault();menu()}else if(k==='g'||k==='h'||k==='enter'){e.preventDefault();flipped=!flipped;draw()} }
window.addEventListener('keydown',key);var startX=0;stage.addEventListener('touchstart',function(e){startX=e.touches[0].clientX},{passive:true});stage.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>35)targetPos+=dx<0?1:-1});draw();requestAnimationFrame(loop);
})();`

export default function Page() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!root.current) return
    const s = document.createElement('script')
    s.textContent = PREVIEW_SCRIPT
    root.current.appendChild(s)
    return () => {
      s.remove()
    }
  }, [])
  return (
    <main
      className="ipod"
      aria-label="iPod nano Cover Flow"
      ref={root}
      dangerouslySetInnerHTML={{ __html: PREVIEW_HTML }}
    />
  )
}