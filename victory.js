// A self-contained victory sequence. Timers belong to the game and are cancelled on undo/reset.
export function createVictoryScene({document:doc,schedule,expression,impact}){
 let played=false;
 const frame=()=>doc.querySelector('.board-frame');
 function reset(){played=false;frame().classList.remove('raging','shattered');doc.getElementById('victory-message')?.remove();}
 function start(){if(played)return;played=true;expression('angry');doc.getElementById('bubble').textContent='«Nei! Det … det kan da ikke stemme?!»';doc.getElementById('status').textContent='Du slo Jan Petter!';doc.getElementById('help').textContent='Han trenger visst et lite øyeblikk …';frame().classList.add('raging');
 schedule(()=>{frame().classList.remove('raging');frame().classList.add('shattered');impact();doc.getElementById('bubble').textContent='«Det må være noe galt med dette brettet!»';for(const [i,sq] of [...doc.querySelectorAll('.square')].entries()){sq.style.setProperty('--fly-x',((i%8)-3.5)*24+'px');sq.style.setProperty('--fly-y',(45+(i*37)%150)+'px');sq.style.setProperty('--spin',((i*53)%110-55)+'deg');}},950);
 schedule(()=>{expression('brave');doc.getElementById('bubble').textContent='«Gratulerer! Du har klart mesterstykket å slå meg. Virkelig godt spilt!»';doc.getElementById('help').textContent='Et tappert smil. Et knust brett. En velfortjent seier.';const card=doc.createElement('div');card.id='victory-message';card.setAttribute('role','status');card.innerHTML='<span>♛ MESTERSTYKKE ♛</span><h2>Du slo Jan Petter!</h2><p>«Gratulerer! Du har klart mesterstykket å slå meg.<br>Virkelig godt spilt!»</p><small>— Jan Petter, med et tappert smil</small>';frame().after(card);},2700);
 }
 return {start,reset};
}
