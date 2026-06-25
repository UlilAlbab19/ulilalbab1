// ============================================================
// Portfolio renderer — reads data/content.json, builds the page,
// and wires up click-to-detail modals.
// ============================================================

const ICONS = {
  tool: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14.7 6.3a1 1 0 0 1 0 1.4L9.4 13l-2.1-2.1 5.3-5.3a1 1 0 0 1 1.4 0Z"/><path d="M7.3 10.9 4 19l8.1-3.3"/><path d="M16 8l3-3"/></svg>',
  speaker: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="15" r="3.2"/><circle cx="12" cy="7" r="1"/></svg>',
  cpu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
  code: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/></svg>'
};

const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle     = document.getElementById('modalTitle');
const modalBody      = document.getElementById('modalBody');
const modalEyebrow   = document.getElementById('modalEyebrow');
const modalImg       = document.getElementById('modalImg');

function openModal(eyebrow, title, body, image){
  modalEyebrow.textContent = eyebrow;
  modalTitle.textContent   = title;
  modalBody.textContent    = body;
  if(image){
    modalImg.src = image;
    modalImg.alt = title;
    modalImg.style.display = 'block';
    modalImg.onerror = () => { modalImg.style.display = 'none'; };
  } else {
    modalImg.style.display = 'none';
  }
  modalBackdrop.classList.add('open');
}
function closeModal(){ modalBackdrop.classList.remove('open'); }

document.getElementById('modalClose').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if(e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

function makeCard({eyebrow, title, sub, detail, icon, listStyle, thumb, projectStyle, image}){
  const btn = document.createElement('button');
  btn.className = 'card' + (listStyle ? ' list-card' : '') + (projectStyle ? ' project-card' : '');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');

  if(projectStyle){
    btn.innerHTML = `
      <div class="project-img-wrap">
        <img src="${image}" alt="${title}" loading="lazy"
             onerror="this.closest('.project-img-wrap').style.display='none'">
      </div>
      <div class="project-body">
        <span class="meta">${eyebrow}</span>
        <h3 style="margin-top:8px;">${title}</h3>
        <p class="card-sub">${sub}</p>
        <p class="card-more">→ Lihat detail</p>
      </div>
    `;
  } else if(listStyle){
    const thumbHtml = thumb
      ? `<img class="card-thumb" src="${thumb}" alt="${title}" loading="lazy" onerror="this.remove()">`
      : '';
    btn.innerHTML = `
      <div class="list-card-main">
        ${thumbHtml}
        <div>
          <h3>${title}</h3>
          <p class="card-sub">${sub}</p>
          <p class="card-more">→ Lihat detail</p>
        </div>
      </div>
      <span class="meta">${eyebrow}</span>
    `;
  } else {
    btn.innerHTML = `
      <span class="card-icon">${ICONS[icon] || ''}</span>
      <h3>${title}</h3>
      ${sub ? `<p class="card-sub">${sub}</p>` : ''}
      <p class="card-more">→ Lihat detail</p>
    `;
  }

  btn.addEventListener('click', () => openModal(eyebrow, title, detail, image));
  return btn;
}

async function init(){
  document.getElementById('year').textContent = new Date().getFullYear();

  let data;
  try{
    const res = await fetch('data/content.json');
    data = await res.json();
  } catch(err){
    console.error('Gagal memuat content.json — pastikan dijalankan lewat server (mis. GitHub Pages atau `python3 -m http.server`).', err);
    return;
  }

  const { profile, education, experience, skills } = data;

  // Hero / about text
  document.getElementById('heroDesc').textContent = profile.about;
  document.getElementById('aboutText').textContent = profile.about;
  document.getElementById('scopeLoc').textContent = profile.location;

  // Photo
  const holder = document.getElementById('photoHolder');
  if(profile.photo){
    const img = new Image();
    img.onload = () => { holder.innerHTML = ''; holder.appendChild(img); };
    img.onerror = () => { /* keep initials fallback */ };
    img.src = profile.photo;
    img.alt = profile.name;
  }

  // CV link
  document.getElementById('cvLink').href = profile.cv_file;

  // Personal data table
  const dataTable = document.getElementById('dataTable');
  const rows = [
    ['Gender', profile.gender],
    ['Status', profile.status],
    ['Kewarganegaraan', profile.citizenship],
    ['Bahasa', profile.languages.join(', ')]
  ];
  dataTable.innerHTML = rows.map(([k,v]) => `
    <div class="data-row"><dt>${k}</dt><dd>${v}</dd></div>
  `).join('');

  // Education
  const eduList = document.getElementById('educationList');
  education.forEach(item => {
    eduList.appendChild(makeCard({
      eyebrow: item.period,
      title: item.school,
      sub: item.summary,
      detail: item.detail,
      listStyle: true
    }));
  });

  // Experience
  const expList = document.getElementById('experienceList');
  experience.forEach(item => {
    expList.appendChild(makeCard({
      eyebrow: item.role,
      title: item.company,
      sub: item.summary,
      detail: item.detail,
      listStyle: true,
      thumb: item.image,
      image: item.image
    }));
  });

  // Projects
  const projectsList = document.getElementById('projectsList');
  (data.projects || []).forEach(item => {
    projectsList.appendChild(makeCard({
      eyebrow: item.period,
      title: item.title,
      sub: item.summary,
      detail: item.detail,
      projectStyle: true,
      image: item.image
    }));
  });

  // Skills
  const skillsList = document.getElementById('skillsList');
  skills.forEach(item => {
    skillsList.appendChild(makeCard({
      eyebrow: 'Skill',
      title: item.title,
      sub: '',
      detail: item.detail,
      icon: item.icon
    }));
  });

  // Contact
  const contactGrid = document.getElementById('contactGrid');
  const contacts = [
    { label: 'WhatsApp', value: profile.phone, href: `https://wa.me/${profile.whatsapp}` },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Instagram', value: '@muhammad.al_10', href: profile.instagram }
  ];
  contactGrid.innerHTML = contacts.map(c => `
    <a class="contact-card" href="${c.href}" target="_blank" rel="noopener">
      <p class="eyebrow">${c.label}</p>
      <p class="value">${c.value}</p>
    </a>
  `).join('');
}

init();
