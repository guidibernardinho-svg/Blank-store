// =============================================
//  3DS eShop — App Logic (app.js)
// =============================================

let currentTab    = 'home';
let currentFilter = 'all';
let searchQuery   = '';
let modalGame     = null;
let downloading   = false;

// ── Clock ──────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 10000);

// ── Tab Navigation ─────────────────────────────
function setTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab, .bottom-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  render();
}

document.querySelectorAll('.tab, .bottom-btn').forEach(btn => {
  btn.addEventListener('click', () => setTab(btn.dataset.tab));
});

// ── Platform Filter ────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Search ─────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase().trim();
  if (searchQuery && currentTab !== 'search') setTab('search');
  else render();
});

// ── Filter Logic ───────────────────────────────
function getFilteredGames() {
  let games = [...GAMES];

  // Tab filter
  const tabCfg = TABS[currentTab];
  if (tabCfg && tabCfg.filter) {
    games = games.filter(g => g.category === tabCfg.filter);
  }

  // Platform filter
  if (currentFilter !== 'all') {
    games = games.filter(g => g.platform === currentFilter);
  }

  // Search
  if (searchQuery) {
    games = games.filter(g =>
      g.title.toLowerCase().includes(searchQuery) ||
      g.genre.toLowerCase().includes(searchQuery) ||
      g.desc.toLowerCase().includes(searchQuery)
    );
  }

  return games;
}

// ── Stars HTML ─────────────────────────────────
function starsHTML(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// ── Tag HTML ───────────────────────────────────
function tagHTML(cat, platform) {
  const map = {
    cia:    ['CIA',    'tag-cia'],
    hackrom:['HACK',  'tag-hack'],
    dlc:    ['DLC',   'tag-dlc'],
    update: ['UPD',   'tag-update'],
  };
  const platMap = { gba: ['GBA','tag-gba'], ds: ['DS','tag-ds'] };
  if (platMap[platform]) {
    const [lbl, cls] = platMap[platform];
    return `<span class="card-tag ${cls}">${lbl}</span>`;
  }
  const [lbl, cls] = map[cat] || ['ROM','tag-cia'];
  return `<span class="card-tag ${cls}">${lbl}</span>`;
}

// ── Card HTML ──────────────────────────────────
function cardHTML(game) {
  return `
    <div class="card" onclick="openModal(${game.id})">
      <div class="card-art" style="background:${game.bg};">
        ${tagHTML(game.category, game.platform)}
        <span style="position:relative;z-index:1;">${game.emoji}</span>
      </div>
      <div class="card-info">
        <div class="card-title">${game.title}</div>
        <div class="card-meta">${game.genre} · ${game.region}</div>
        <span class="stars">${starsHTML(game.stars)}</span>
        <div class="card-bottom">
          <span class="card-size">${game.size}</span>
          <button class="btn-dl" onclick="event.stopPropagation(); openModal(${game.id})">⬇ Baixar</button>
        </div>
      </div>
    </div>
  `;
}

// ── Render ─────────────────────────────────────
function render() {
  const main  = document.getElementById('mainContent');
  const games = getFilteredGames();

  if (currentTab === 'home') {
    renderHome(main, games);
    return;
  }

  if (games.length === 0) {
    main.innerHTML = `
      <div class="empty">
        <span class="empty-icon">🔍</span>
        Nenhum jogo encontrado para este filtro.
      </div>`;
    return;
  }

  const sectionTitle = TABS[currentTab]?.label || 'Jogos';
  main.innerHTML = `
    <p class="section-label">${sectionTitle} — ${games.length} título${games.length !== 1 ? 's' : ''}</p>
    <div class="grid">
      ${games.map(cardHTML).join('')}
    </div>
  `;
}

function renderHome(main, _games) {
  const featured  = GAMES.filter(g => g.stars === 5).slice(0, 6);
  const newGames  = GAMES.slice(-4);
  const hackRoms  = GAMES.filter(g => g.category === 'hackrom').slice(0, 4);

  main.innerHTML = `
    <div class="banner">
      <div class="banner-text">
        <h2>Bem-vindo à<br>3DS eShop</h2>
        <p>CIA, Hack ROMs, DLC e Updates para seu 3DS homebrewado. Instale com o FBI Manager ou CIA Installer.</p>
      </div>
      <span class="banner-badge">CFW READY</span>
    </div>

    <p class="section-label">⭐ Mais Bem Avaliados</p>
    <div class="grid">
      ${featured.map(cardHTML).join('')}
    </div>

    <p class="section-label">🔧 Hack ROMs em Destaque</p>
    <div class="grid">
      ${hackRoms.map(cardHTML).join('')}
    </div>

    <p class="section-label">🆕 Adicionados Recentemente</p>
    <div class="grid">
      ${newGames.map(cardHTML).join('')}
    </div>
  `;
}

// ── Modal ──────────────────────────────────────
function openModal(id) {
  modalGame = GAMES.find(g => g.id === id);
  if (!modalGame) return;

  document.getElementById('modalTitle').textContent  = modalGame.title;
  document.getElementById('modalDesc').textContent   = modalGame.desc;

  const meta = document.getElementById('modalMeta');
  meta.innerHTML = `
    <span class="meta-chip">📦 ${modalGame.size}</span>
    <span class="meta-chip">🌍 ${modalGame.region}</span>
    <span class="meta-chip">🎮 ${modalGame.genre}</span>
    <span class="meta-chip">${starsHTML(modalGame.stars)}</span>
  `;

  document.getElementById('progressBar').classList.remove('show');
  document.getElementById('progressLabel').classList.remove('show');
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('modalDlBtn').textContent = '⬇ Baixar';
  document.getElementById('modalDlBtn').disabled = false;
  downloading = false;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  modalGame   = null;
  downloading = false;
}

// Close on backdrop click
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ── Download Simulation ────────────────────────
function startDownload() {
  if (!modalGame || downloading) return;

  // If a real link is set, open it
  if (modalGame.link && modalGame.link !== '#') {
    window.open(modalGame.link, '_blank');
    showNotification(`Abrindo download: ${modalGame.title}`);
    closeModal();
    return;
  }

  // Demo progress animation
  downloading = true;
  const btn = document.getElementById('modalDlBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Baixando...';

  const bar   = document.getElementById('progressBar');
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');

  bar.classList.add('show');
  label.classList.add('show');

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 4 + 1;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      label.textContent = '✅ Concluído! Instale com o FBI Manager.';
      btn.textContent = '✅ Baixado';
      showNotification(`${modalGame.title} — Download concluído!`);
      setTimeout(closeModal, 2200);
    } else {
      fill.style.width = pct.toFixed(0) + '%';
      label.textContent = `Baixando... ${pct.toFixed(0)}%`;
    }
  }, 120);
}

// ── Notification ───────────────────────────────
function showNotification(msg) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'notification';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ── Init ───────────────────────────────────────
render();
// =============================================
//  3DS eShop — App Logic (app.js)
// =============================================

let currentTab    = 'home';
let currentFilter = 'all';
let searchQuery   = '';
let modalGame     = null;
let downloading   = false;

// ── Clock ──────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 10000);

// ── Tab Navigation ─────────────────────────────
function setTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab, .bottom-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  render();
}

document.querySelectorAll('.tab, .bottom-btn').forEach(btn => {
  btn.addEventListener('click', () => setTab(btn.dataset.tab));
});

// ── Platform Filter ────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Search ─────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase().trim();
  if (searchQuery && currentTab !== 'search') setTab('search');
  else render();
});

// ── Filter Logic ───────────────────────────────
function getFilteredGames() {
  let games = [...GAMES];

  // Tab filter
  const tabCfg = TABS[currentTab];
  if (tabCfg && tabCfg.filter) {
    games = games.filter(g => g.category === tabCfg.filter);
  }

  // Platform filter
  if (currentFilter !== 'all') {
    games = games.filter(g => g.platform === currentFilter);
  }

  // Search
  if (searchQuery) {
    games = games.filter(g =>
      g.title.toLowerCase().includes(searchQuery) ||
      g.genre.toLowerCase().includes(searchQuery) ||
      g.desc.toLowerCase().includes(searchQuery)
    );
  }

  return games;
}

// ── Stars HTML ─────────────────────────────────
function starsHTML(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// ── Tag HTML ───────────────────────────────────
function tagHTML(cat, platform) {
  const map = {
    cia:    ['CIA',    'tag-cia'],
    hackrom:['HACK',  'tag-hack'],
    dlc:    ['DLC',   'tag-dlc'],
    update: ['UPD',   'tag-update'],
  };
  const platMap = { gba: ['GBA','tag-gba'], ds: ['DS','tag-ds'] };
  if (platMap[platform]) {
    const [lbl, cls] = platMap[platform];
    return `<span class="card-tag ${cls}">${lbl}</span>`;
  }
  const [lbl, cls] = map[cat] || ['ROM','tag-cia'];
  return `<span class="card-tag ${cls}">${lbl}</span>`;
}

// ── Card HTML ──────────────────────────────────
function cardHTML(game) {
  return `
    <div class="card" onclick="openModal(${game.id})">
      <div class="card-art" style="background:${game.bg};">
        ${tagHTML(game.category, game.platform)}
        <span style="position:relative;z-index:1;">${game.emoji}</span>
      </div>
      <div class="card-info">
        <div class="card-title">${game.title}</div>
        <div class="card-meta">${game.genre} · ${game.region}</div>
        <span class="stars">${starsHTML(game.stars)}</span>
        <div class="card-bottom">
          <span class="card-size">${game.size}</span>
          <button class="btn-dl" onclick="event.stopPropagation(); openModal(${game.id})">⬇ Baixar</button>
        </div>
      </div>
    </div>
  `;
}

// ── Render ─────────────────────────────────────
function render() {
  const main  = document.getElementById('mainContent');
  const games = getFilteredGames();

  if (currentTab === 'home') {
    renderHome(main, games);
    return;
  }

  if (games.length === 0) {
    main.innerHTML = `
      <div class="empty">
        <span class="empty-icon">🔍</span>
        Nenhum jogo encontrado para este filtro.
      </div>`;
    return;
  }

  const sectionTitle = TABS[currentTab]?.label || 'Jogos';
  main.innerHTML = `
    <p class="section-label">${sectionTitle} — ${games.length} título${games.length !== 1 ? 's' : ''}</p>
    <div class="grid">
      ${games.map(cardHTML).join('')}
    </div>
  `;
}

function renderHome(main, _games) {
  const featured  = GAMES.filter(g => g.stars === 5).slice(0, 6);
  const newGames  = GAMES.slice(-4);
  const hackRoms  = GAMES.filter(g => g.category === 'hackrom').slice(0, 4);

  main.innerHTML = `
    <div class="banner">
      <div class="banner-text">
        <h2>Bem-vindo à<br>3DS eShop</h2>
        <p>CIA, Hack ROMs, DLC e Updates para seu 3DS homebrewado. Instale com o FBI Manager ou CIA Installer.</p>
      </div>
      <span class="banner-badge">CFW READY</span>
    </div>

    <p class="section-label">⭐ Mais Bem Avaliados</p>
    <div class="grid">
      ${featured.map(cardHTML).join('')}
    </div>

    <p class="section-label">🔧 Hack ROMs em Destaque</p>
    <div class="grid">
      ${hackRoms.map(cardHTML).join('')}
    </div>

    <p class="section-label">🆕 Adicionados Recentemente</p>
    <div class="grid">
      ${newGames.map(cardHTML).join('')}
    </div>
  `;
}

// ── Modal ──────────────────────────────────────
function openModal(id) {
  modalGame = GAMES.find(g => g.id === id);
  if (!modalGame) return;

  document.getElementById('modalTitle').textContent  = modalGame.title;
  document.getElementById('modalDesc').textContent   = modalGame.desc;

  const meta = document.getElementById('modalMeta');
  meta.innerHTML = `
    <span class="meta-chip">📦 ${modalGame.size}</span>
    <span class="meta-chip">🌍 ${modalGame.region}</span>
    <span class="meta-chip">🎮 ${modalGame.genre}</span>
    <span class="meta-chip">${starsHTML(modalGame.stars)}</span>
  `;

  document.getElementById('progressBar').classList.remove('show');
  document.getElementById('progressLabel').classList.remove('show');
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('modalDlBtn').textContent = '⬇ Baixar';
  document.getElementById('modalDlBtn').disabled = false;
  downloading = false;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  modalGame   = null;
  downloading = false;
}

// Close on backdrop click
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ── Download Simulation ────────────────────────
function startDownload() {
  if (!modalGame || downloading) return;

  // If a real link is set, open it
  if (modalGame.link && modalGame.link !== '#') {
    window.open(modalGame.link, '_blank');
    showNotification(`Abrindo download: ${modalGame.title}`);
    closeModal();
    return;
  }

  // Demo progress animation
  downloading = true;
  const btn = document.getElementById('modalDlBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Baixando...';

  const bar   = document.getElementById('progressBar');
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');

  bar.classList.add('show');
  label.classList.add('show');

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 4 + 1;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      label.textContent = '✅ Concluído! Instale com o FBI Manager.';
      btn.textContent = '✅ Baixado';
      showNotification(`${modalGame.title} — Download concluído!`);
      setTimeout(closeModal, 2200);
    } else {
      fill.style.width = pct.toFixed(0) + '%';
      label.textContent = `Baixando... ${pct.toFixed(0)}%`;
    }
  }, 120);
}

// ── Notification ───────────────────────────────
function showNotification(msg) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'notification';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ── Init ───────────────────────────────────────
render();
