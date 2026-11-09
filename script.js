const hero=document.querySelector('.hero');
const sections=[...document.querySelectorAll('.content-section')];
function showSection(id){
 const target=document.getElementById(id);
 if(!target)return;
 hero.hidden=true;
 sections.forEach(section=>section.hidden=section!==target);
 window.scrollTo({top:0,behavior:'instant'});
}
function showHome(){
 sections.forEach(section=>section.hidden=true);
 hero.hidden=false;
 window.scrollTo({top:0,behavior:'instant'});
}
hero.addEventListener('click',event=>{
 const rune=event.target.closest('[data-open]');
 if(rune){event.preventDefault();showSection(rune.dataset.open);}
});
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',showHome));
const message=document.getElementById('messageText');
try{message.value=localStorage.getItem('morchis-message')||'';}catch(error){}
document.getElementById('saveMessage').addEventListener('click',()=>{
 try{localStorage.setItem('morchis-message',message.value);document.getElementById('messageStatus').textContent='Mensaje guardado en este navegador.';}
 catch(error){document.getElementById('messageStatus').textContent='No se pudo guardar el mensaje en este navegador.';}
});
document.getElementById('photoFiles').addEventListener('change',event=>{
 const gallery=document.getElementById('gallery');
 [...event.target.files].forEach(file=>{
  if(!file.type.startsWith('image/'))return;
  const image=document.createElement('img');image.alt=file.name;image.src=URL.createObjectURL(file);gallery.appendChild(image);
 });
 event.target.value='';
});
/* Hojas que caen continuamente por toda la página */
(()=>{
 const layer=document.querySelector('.falling-leaves');
 if(!layer)return;
 const leaves=['🍂','🍁','🍃'];
 for(let i=0;i<19;i++){
  const leaf=document.createElement('span');
  leaf.className='falling-leaf';
  leaf.textContent=leaves[i%leaves.length];
  leaf.style.setProperty('--left',(Math.random()*100)+'%');
  leaf.style.setProperty('--size',(14+Math.random()*17)+'px');
  leaf.style.setProperty('--opacity',(0.38+Math.random()*0.42).toFixed(2));
  leaf.style.setProperty('--duration',(12+Math.random()*17)+'s');
  leaf.style.setProperty('--delay',(-Math.random()*28)+'s');
  layer.appendChild(leaf);
 }
})();
