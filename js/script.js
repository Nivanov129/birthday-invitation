// Countdown
const target = new Date("2025-12-13T16:00:00");
function pad(n){return String(n).padStart(2,'0')}
function tick(){
  const now = new Date();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60)); diff -= hours*(1000*60*60);
  const minutes = Math.floor(diff / (1000*60)); diff -= minutes*(1000*60);
  const seconds = Math.floor(diff/1000);
  document.getElementById('d').textContent = pad(days);
  document.getElementById('h').textContent = pad(hours);
  document.getElementById('m').textContent = pad(minutes);
  document.getElementById('s').textContent = pad(seconds);
}
tick(); setInterval(tick,1000);

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{ if(ent.isIntersecting) ent.target.classList.add('inview'); });
},{threshold:0.2});
document.querySelectorAll('.slide').forEach(sec=>observer.observe(sec));

// Scroll spy
const sectionIds = ['hero','about','toys','place','rsvp'];
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      const id = ent.target.id;
      navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
},{rootMargin:'-40% 0px -55% 0px', threshold:0});
sectionIds.forEach(id=>{ const el = document.getElementById(id); if(el) spy.observe(el); });

// Smooth scroll on nav click
navLinks.forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    target?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Back to top
document.getElementById('toTop').addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

// RSVP link (замени на ссылку формы)
const RSVP = "https://docs.google.com/forms/d/e/1FAIpQLSd0wdBUpz-jen53QYkazvADCkaMZb1tYUamDgQEZgyKB96mKg/viewform?usp=dialog";
document.getElementById('rsvpTop').href = RSVP;
document.getElementById('rsvpMain').href = RSVP;

// Wishlist link (замени на ссылку списка желаний)
const WISHLIST = "YOUR_WISHLIST_LINK_HERE";
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) wishlistBtn.href = WISHLIST;

// Hero comparison slider
document.querySelectorAll('[data-compare]').forEach(frame => {
  const overlay = frame.querySelector('.compare-overlay');
  const handle = frame.querySelector('.compare-handle');
  const range = frame.querySelector('.compare-range');
  if (!overlay || !handle || !range) return;

  const clamp = (value) => {
    const bounded = Math.min(100, Math.max(0, Number(value)));
    return Math.round(bounded * 10) / 10;
  };
  const setPosition = (value) => {
    const safe = clamp(value);
    const pct = safe + '%';
    overlay.style.width = pct;
    handle.style.left = pct;
  };

  const syncFromEvent = (clientX) => {
    const rect = frame.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPosition(raw);
    range.value = clamp(raw);
  };

  range.addEventListener('input', () => setPosition(range.value));

  frame.addEventListener('pointerdown', (event) => {
    frame.setPointerCapture(event.pointerId);
    syncFromEvent(event.clientX);
  });

  frame.addEventListener('pointermove', (event) => {
    if (!frame.hasPointerCapture(event.pointerId)) return;
    syncFromEvent(event.clientX);
  });

  frame.addEventListener('pointerup', (event) => {
    if (frame.hasPointerCapture(event.pointerId)) {
      frame.releasePointerCapture(event.pointerId);
    }
  });

  frame.addEventListener('pointercancel', (event) => {
    if (frame.hasPointerCapture(event.pointerId)) {
      frame.releasePointerCapture(event.pointerId);
    }
  });

  setPosition(range.value || 50);
});

// Arrow navigation
document.addEventListener('keydown', (e)=>{
  if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  const sections = sectionIds.map(id=>document.getElementById(id));
  const y = window.scrollY + window.innerHeight*0.2;
  let currentIndex = sections.findIndex(s => s && s.offsetTop <= y && (s.offsetTop + s.offsetHeight) > y);
  if(currentIndex === -1) currentIndex = 0;
  if(e.key === 'ArrowDown' && currentIndex < sections.length-1){
    e.preventDefault(); sections[currentIndex+1].scrollIntoView({behavior:'smooth'});
  } else if(e.key === 'ArrowUp' && currentIndex > 0){
    e.preventDefault(); sections[currentIndex-1].scrollIntoView({behavior:'smooth'});
  }
});
