const sections=[...document.querySelectorAll('.content-section')];
function showSection(id){document.querySelector('.hero').hidden=true;sections.forEach(s=>s.hidden=s.id!==id);window.scrollTo(0,0)}
function showHome(){sections.forEach(s=>s.hidden=true);document.querySelector('.hero').hidden=false;window.scrollTo(0,0)}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>showSection(b.dataset.open)));
document.querySelectorAll('[data-home]').forEach(b=>b.addEventListener('click',showHome));
const message=document.getElementById('messageText');
try{message.value=localStorage.getItem('morchis-message')||''}catch(e){}
document.getElementById('saveMessage').addEventListener('click',()=>{try{localStorage.setItem('morchis-message',message.value);document.getElementById('messageStatus').textContent='Mensaje guardado en este navegador.'}catch(e){document.getElementById('messageStatus').textContent='No se pudo guardar el mensaje en este navegador.'}});
let audioUrl;
document.getElementById('audioFile').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;if(audioUrl)URL.revokeObjectURL(audioUrl);audioUrl=URL.createObjectURL(f);const p=document.getElementById('audioPlayer');p.src=audioUrl;p.hidden=false;document.getElementById('audioStatus').textContent=f.name+' · Pulsa play para escucharlo.'});
document.getElementById('photoFiles').addEventListener('change',e=>{const g=document.getElementById('gallery');[...e.target.files].forEach(file=>{if(!file.type.startsWith('image/'))return;const img=document.createElement('img');img.alt=file.name;img.src=URL.createObjectURL(file);g.appendChild(img)});e.target.value=''});