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
let audioUrl;
document.getElementById('audioFile').addEventListener('change',event=>{
 const file=event.target.files[0];if(!file)return;
 if(audioUrl)URL.revokeObjectURL(audioUrl);
 audioUrl=URL.createObjectURL(file);
 const player=document.getElementById('audioPlayer');player.src=audioUrl;player.hidden=false;
 document.getElementById('audioStatus').textContent=file.name+' · Pulsa play para escucharlo.';
});
document.getElementById('photoFiles').addEventListener('change',event=>{
 const gallery=document.getElementById('gallery');
 [...event.target.files].forEach(file=>{
  if(!file.type.startsWith('image/'))return;
  const image=document.createElement('img');image.alt=file.name;image.src=URL.createObjectURL(file);gallery.appendChild(image);
 });
 event.target.value='';
});