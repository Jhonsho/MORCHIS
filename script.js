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
if(hero){
 hero.addEventListener('click',event=>{
  const rune=event.target.closest('[data-open]');
  if(rune){event.preventDefault();showSection(rune.dataset.open);}
 });
}
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',showHome));

/* Compatibilidad con las antiguas funciones opcionales de Vida y Fertilidad.
   Si los campos no existen, no debe detenerse el resto del script. */
const message=document.getElementById('messageText');
const saveMessage=document.getElementById('saveMessage');
if(message){
 try{message.value=localStorage.getItem('morchis-message')||'';}catch(error){}
}
if(saveMessage && message){
 saveMessage.addEventListener('click',()=>{
  try{
   localStorage.setItem('morchis-message',message.value);
   const status=document.getElementById('messageStatus');
   if(status)status.textContent='Mensaje guardado en este navegador.';
  }catch(error){
   const status=document.getElementById('messageStatus');
   if(status)status.textContent='No se pudo guardar el mensaje en este navegador.';
  }
 });
}
const photoFiles=document.getElementById('photoFiles');
if(photoFiles){
 photoFiles.addEventListener('change',event=>{
  const gallery=document.getElementById('gallery');
  if(!gallery)return;
  [...event.target.files].forEach(file=>{
   if(!file.type.startsWith('image/'))return;
   const image=document.createElement('img');
   image.alt=file.name;
   image.src=URL.createObjectURL(file);
   gallery.appendChild(image);
  });
  event.target.value='';
 });
}

/* Hojas otoñales: inicializar sin depender de campos de otras secciones. */
(()=>{
 const layer=document.querySelector('.falling-leaves');
 if(!layer)return;
 if(layer.childElementCount>0)return;
 const leaves=['🍂','🍁','🍃'];
 for(let i=0;i<24;i++){
  const leaf=document.createElement('span');
  leaf.className='falling-leaf';
  leaf.textContent=leaves[i%leaves.length];
  leaf.style.setProperty('--left',(Math.random()*100)+'%');
  leaf.style.setProperty('--size',(17+Math.random()*17)+'px');
  leaf.style.setProperty('--opacity',(0.55+Math.random()*0.4).toFixed(2));
  leaf.style.setProperty('--duration',(10+Math.random()*13)+'s');
  leaf.style.setProperty('--delay',(-Math.random()*22)+'s');
  layer.appendChild(leaf);
 }
})();
