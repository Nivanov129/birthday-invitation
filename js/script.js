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
const sectionIds = ['hero','schedule','toys','place','rsvp'];
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

// Calendar button behaviour
const calendarBtn = document.getElementById('addToCalendar');
if(calendarBtn){
  const googleCalendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%D0%94%D0%B5%D0%BD%D1%8C+%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F+%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D1%8B&details=%D0%A2%D1%91%D0%BF%D0%BB%D0%B0%D1%8F+%D0%B2%D1%81%D1%82%D1%80%D0%B5%D1%87%D0%B0+%D0%B4%D1%80%D1%83%D0%B7%D0%B5%D0%B9+%D0%B8+%D1%80%D0%BE%D0%B4%D0%BD%D1%8B%D1%85.&location=%D0%9C%D0%B0%D0%B2%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%94%D0%B2%D0%BE%D1%80%D0%B8%D0%BA%2C+%D0%A2%D0%BE%D0%BB%D1%8C%D1%8F%D1%82%D1%82%D0%B8&dates=20251213T160000/20251213T200000&ctz=Europe%2FSamara";
  const appleCalendarLink = new URL('assets/calendar/nikita-30-birthday.ics', window.location.href).toString();
  const appleDevicePattern = /(iPad|iPhone|iPod|Macintosh)/i;
  if(appleDevicePattern.test(navigator.userAgent || "")){
    calendarBtn.href = appleCalendarLink;
    calendarBtn.removeAttribute('target');
    calendarBtn.rel = 'noopener';
  } else {
    calendarBtn.href = googleCalendarLink;
    calendarBtn.target = '_blank';
    calendarBtn.rel = 'noopener';
  }
}

// Wishlist link (замени на ссылку списка желаний)
const wishlistBtn = document.getElementById('wishlistBtn');

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
